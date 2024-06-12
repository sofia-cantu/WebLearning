// Home.tsx
'use client'

import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CharacterCard from '../components/CharacterCard'
import {
  getCharacterAtPage,
  getCharactersFirstPage,
} from '../services/characterService'
//import { Character, CharacterResponse } from './utils/schemas' // Import directly from schemas
import { Character, CharacterResponse } from '../utils/schemas' 

export default function Home() {
  const [characters, setCharacters] = useState<CharacterResponse | null>(null)
  const [favorites, setFavorites] = useState<number[]>([])
  const [canEdit, setCanEdit] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCharactersFirstPage()
        setCharacters(response)

        const favoritesData = localStorage.getItem('favorites')
        if (favoritesData) {
          setFavorites(JSON.parse(favoritesData))
        }

        setCanEdit(true)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (canEdit) {
      localStorage.setItem('favorites', JSON.stringify(favorites))
    }
  }, [favorites, canEdit])

  const handlePageChange = async (next: boolean) => {
    if (!characters) return

    try {
      const url = next ? characters.info.next : characters.info.prev
      if (url) {
        const response = await getCharacterAtPage(url)
        setCharacters(response)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return (
    <>
      <Header />
      <div className='bg-pink-900'>
        <div className='blur-5 sticky bottom-2 flex items-center justify-center gap-5 bg-pink-50'>
          <button
            className='mx-2 mb-4 rounded-full px-7 py-1 pt-24 text-2xl text-pink-600'
            onClick={() => handlePageChange(false)} // for previous page
            disabled={!characters?.info.prev}
          >
            ⬸
          </button>

          <button
            className='mx-2 mb-4 rounded-full px-7 py-1 pt-24 text-2xl text-pink-600'
            onClick={() => handlePageChange(true)} // for next page
            disabled={!characters?.info.next}
          >
            ⤑
          </button>
        </div>

        <div className='m-10 pb-20'>
          {characters?.results.map((character: Character) => (
            <CharacterCard
              key={character.id}
              character={character}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}
