// /services/characterService.ts

import { Character, CharacterCurrentPage } from '../types/characterTypes'
import { characterSchema } from '../utils/schemas'

export type characterSchema = z.infer<typeof characterSchema>
//export const CharacterArraySchema = z.array(characterSchema)

export async function getCharactersFirstPage(): Promise<characterTypes.CharacterCurrentPage> {
  const response = await fetch('https://rickandmortyapi.com/api/character')
  //return response.json();

  /*
  const result = characterSchema.safeParse(response);
  if (!result.success) {
    // Log error or handle it as needed
    console.error("Validation failed:", result.error);
    return null;
  }
  */
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

  //const result = characterSchema.safeParse(response);

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
