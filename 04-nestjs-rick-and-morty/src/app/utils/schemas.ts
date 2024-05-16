// /utils/schemas.ts

// create schema
import { z } from 'zod'

export const feedbackSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name should be a string',
    })
    .min(5, {
      message: 'Name must be at least 5 characters long',
    }),

  subject: z.string(),

  comments: z.string().optional(),
})

export const CharacterSchema = z.object({
  image: z.string(),
  id: z.number(),
  name: z.string(),
  status: z.string(),
  species: z.string(),
  origin: z.object({ name: z.string(), url: z.string().optional() }),
  location: z.object({ name: z.string(), url: z.string().optional() }),
  episode: z.array(z.string()).optional(),
  url: z.string().optional(),
  created: z.string().optional(),
})

export type Character = z.infer<typeof CharacterSchema>

export const CharacterResponseSchema = z.object({
  info: z.object({
    count: z.number(),
    pages: z.number(),
    next: z.string().nullable(),
    prev: z.string().nullable(),
  }),
  results: z.array(CharacterSchema),
})

export type CharacterResponse = z.infer<typeof CharacterResponseSchema>
export const CharacterArraySchema = z.array(CharacterSchema)

/*
It's very similar to Typescript to work with properties, please take a look at zod Objects: https://zod.dev/?id=objects

Expect exact key names with .strict: https://zod.dev/?id=strict

Example of using a form to submit to an internal API. /api/feedback/route.ts:

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// create schema
const feedbackSchema = z.object({
  name: z.string().min(5),
  subject: z.string(),
  comments: z.string().optional(),
})

// create type from schema
export type FeedbackPayload = z.infer<typeof feedbackSchema>

export async function POST(request: NextRequest) {
  const payload: FeedbackPayload = await request.json()

  // validate schema
  const payloadParsed = feedbackSchema.safeParse(payload)
  if (!payloadParsed.success) {
    // extract errors
    const { fieldErrors, formErrors } = payloadParsed.error.flatten()
    const issues = payloadParsed.error.issues
    const formattedErrors = payloadParsed.error.format()
    return NextResponse.json(
      { fieldErrors, formErrors, issues, formattedErrors },
      { status: 400 },
    )
  }

  // continue with rest of the code

  return NextResponse.json({ payload })
}
ESLint and Prettier
*/
