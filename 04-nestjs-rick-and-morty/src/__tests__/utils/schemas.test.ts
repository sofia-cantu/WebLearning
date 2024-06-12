// __tests__/utils/schemas.test.ts
/* eslint-disable  @typescript-eslint/no-explicit-any */

import { CharacterSchema, CharacterResponseSchema } from '@/app/utils/schemas'

describe('Character Schema', () => {
  it('should validate valid character data', () => {
    const validCharacterData = {
      image: 'https://example.com/image.jpg',
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      origin: {
        name: 'Earth',
        url: 'https://rickandmortyapi.com/api/location/1',
      },
      location: {
        name: 'Earth',
        url: 'https://rickandmortyapi.com/api/location/20',
      },
      episode: ['https://rickandmortyapi.com/api/episode/1'],
      url: 'https://rickandmortyapi.com/api/character/1',
      created: '2017-11-04T18:48:46.250Z',
    }
    const result = CharacterSchema.safeParse(validCharacterData)
    expect(result.success).toBe(true)
  })

  it('should fail validation for missing required fields', () => {
    const invalidCharacterData = {
      image: 'https://example.com/image.jpg',
      id: 1,
      // missing 'name'
      status: 'Alive',
      species: 'Human',
    }
    const result = CharacterSchema.safeParse(invalidCharacterData)
    expect(result.success).toBe(false)
    expect(result.error.issues).toContainEqual(
      expect.objectContaining({
        path: ['name'],
        message: 'Required',
      }),
    )
  })

  it('should handle optional fields correctly', () => {
    const characterDataWithOptionals = {
      image: 'https://example.com/image.jpg',
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      // optional fields omitted
    }
    const result = CharacterSchema.safeParse(characterDataWithOptionals)
    expect(result.success).toBe(true)
  })
})

describe('Character Response Schema', () => {
  it('should validate valid character response data', () => {
    const validCharacterResponseData = {
      info: { count: 1, pages: 1, next: null, prev: null },
      results: [
        {
          image: 'https://example.com/image.jpg',
          id: 1,
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
          origin: {
            name: 'Earth',
            url: 'https://rickandmortyapi.com/api/location/1',
          },
          location: {
            name: 'Earth',
            url: 'https://rickandmortyapi.com/api/location/20',
          },
          episode: ['https://rickandmortyapi.com/api/episode/1'],
          url: 'https://rickandmortyapi.com/api/character/1',
          created: '2017-11-04T18:48:46.250Z',
        },
      ],
    }
    const result = CharacterResponseSchema.safeParse(validCharacterResponseData)
    expect(result.success).toBe(true)
  })

  it('should fail validation for invalid character response data', () => {
    const invalidCharacterResponseData = {
      // Provide invalid character response data according to schema
    }
    const result = CharacterResponseSchema.safeParse(
      invalidCharacterResponseData,
    )
    expect(result.success).toBe(false)
  })

  it('should fail validation when info object has missing fields', () => {
    const invalidCharacterResponseData = {
      info: { count: 1, pages: 1, next: null },
      results: [],
    }
    const result = CharacterResponseSchema.safeParse(
      invalidCharacterResponseData,
    )
    expect(result.success).toBe(false)
    expect(result.error.issues).toContainEqual(
      expect.objectContaining({
        path: ['info', 'prev'],
        message: 'Required',
      }),
    )
  })
})
