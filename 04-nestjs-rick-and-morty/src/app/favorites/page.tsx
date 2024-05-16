// favorites/page.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { getCharactersByIds } from '@/actions/actions'
import { Character } from '../utils/schemas'
import CharacterCard from '../components/CharacterCard'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Favorites() {
  const [favorites, setFavorites] = useState<number[]>([])
  const [characters, setCharacters] = useState<Character[]>([])
  const [canEdit, setCanEdit] = useState<boolean>(false)

  useEffect(() => {
    const favoritesTemp = localStorage.getItem('favorites')
    if (favoritesTemp) {
      setFavorites(JSON.parse(favoritesTemp))
    }
    setCanEdit(true) // Moved here to ensure it sets only after loading favorites
  }, [])

  useEffect(() => {
    if (favorites.length > 0) {
      getCharactersByIds(favorites)
        .then((chars) => {
          setCharacters(Array.isArray(chars) ? chars : [chars])
        })
        .catch((error) => console.error('Failed to fetch characters:', error))
    }
  }, [favorites])

  useEffect(() => {
    if (canEdit) {
      localStorage.setItem('favorites', JSON.stringify(favorites))
    }
  }, [favorites, canEdit])

  return (
    <>
      <Header />

      <div className='bg-pink-900'>
        {favorites.length === 0 && (
          <h1 className='ml-5 text-4xl text-white'>No favorites</h1>
        )}

        {characters.length > 0 ? (
          <div className='sticky bottom-2 m-10 mt-7 flex flex-col items-center py-20'>
            {characters.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            ))}
          </div>
        ) : (
          <h1 className='text-center text-xl text-white'>
            Loading favorites...
          </h1>
        )}
      </div>

      <Footer />
    </>
  )
}
