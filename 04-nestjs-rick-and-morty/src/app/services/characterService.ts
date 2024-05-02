// /services/characterService.ts
import { Character, CharacterResponse } from '../types/characterTypes';

export async function getCharactersFirstPage(): Promise<CharacterResponse> {
  const response = await fetch("https://rickandmortyapi.com/api/character");
  return response.json();
}

export async function getCharacterAtPage(url: string): Promise<CharacterResponse> {
  const response = await fetch(url);
  return response.json();
}

export async function getCharacterById(id: number): Promise<Character> {
  const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  return response.json();
}

export async function getCharactersByIds(ids: number[]): Promise<Character[] | Character> {
  const response = await fetch(`https://rickandmortyapi.com/api/character/${ids.join(",")}`);
  return response.json();
}
