// /services/characterService.ts

// /services/characterService.ts

import { fetch } from 'cross-fetch'
import {
  //CharacterSchema,
  //CharacterResponseSchema,
  Character,
  CharacterResponse,
} from '../utils/schemas'

export async function getCharactersFirstPage(): Promise<CharacterResponse> {
  const response = await fetch('https://rickandmortyapi.com/api/character')
  return response.json()
  /*
  const data = await response.json();
  const parsed = CharacterResponseSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error('Validation failed for CharacterResponse');
  }
  return parsed.data;
  */
}

export async function getCharacterAtPage(
  url: string,
): Promise<CharacterResponse> {
  const response = await fetch(url)
  return response.json()
  /*
  const data = await response.json();
  const parsed = CharacterResponseSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error('Validation failed for CharacterResponse at a specific page');
  }
  return parsed.data;
  */
}

export async function getCharacterById(id: number): Promise<Character> {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${id}`,
  )
  return response.json()
  /*
  const data = await response.json();
  const parsed = CharacterSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error('Validation failed for Character by ID');
  }
  return parsed.data;
  */
}

export async function getCharactersByIds(ids: number[]): Promise<Character[]> {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${ids.join(',')}`,
  )
  return response.json()
  /*
  const data = await response.json();
  // This case is tricky because we don't know if the API returns a single character or an array when multiple IDs are passed.
  // You might want to check if the data is an array or not before parsing.
  if (!Array.isArray(data)) {
    const singleParsed = CharacterSchema.safeParse(data);
    if (!singleParsed.success) {
      throw new Error('Validation failed for a single Character by IDs');
    }
    return [singleParsed.data];
  } else {
    const arrayParsed = CharacterSchema.array().safeParse(data);
    if (!arrayParsed.success) {
      throw new Error('Validation failed for multiple Characters by IDs');
    }
    return arrayParsed.data;
  }
  */
}


export type { Character }
//export { Character, CharacterCurrentPage }

/*
import { Character, CharacterCurrentPage } from '../types/characterTypes'
import { CharacterSchema } from '../utils/schemas'

export type CharacterSchema = z.infer<typeof CharacterSchema>
//export const CharacterArraySchema = z.array(characterSchema)

export async function getCharactersFirstPage(): Promise<characterTypes.CharacterCurrentPage> {
  const response = await fetch('https://rickandmortyapi.com/api/character')  
  return response.json()
}

export async function getCharacterAtPage(
  url: string,
): Promise<characterTypes.CharacterCurrentPage> {
  const response = await fetch(url)
  return response.json()
}

export async function getCharacterById(
  id: number,
): Promise<characterTypes.Character> {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${id}`,
  )

  //const result = CharacterSchema.safeParse(response);

  return response.json()
}

export async function getCharactersByIds(
  ids: number[],
): Promise<characterTypes.Character[] | characterTypes.Character> {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${ids.join(',')}`,
  )
  return response.json()
}
export { Character, CharacterCurrentPage }
*/
