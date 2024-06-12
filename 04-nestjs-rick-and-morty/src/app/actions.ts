'use server'

import { redirect } from 'next/navigation'

export async function navigateToAllCharacters() {
  redirect('/home')
}

export async function navigateToCharacter(id: number) {
  redirect(`/character/${id}`)
}

export async function navigateToFavorites() {
  redirect('/favorites')
}
