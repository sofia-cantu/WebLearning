'use client'
import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Image from 'next/image'
import {
  type Character,
  getCharacterById,
} from '../../services/characterService'

export default function Character({
  params,
}: {
  params: { characterId: number }
}) {
  const [character, setCharacter] = useState<Character>()
  const [favorites, setFavorites] = useState<number[]>([])
  const [canEdit, setCanEdit] = useState<boolean>(false)

  const formatURL = (url: string) => {
    return url.replace('https://rickandmortyapi.com/api/episode/', '')
  }

  useEffect(() => {
    getCharacterById(params.characterId).then((response: Character) => {
      setCharacter(response)
    })

    const favoritesTemp = localStorage.getItem('favorites')

    if (favoritesTemp != null) {
      setFavorites(JSON.parse(favoritesTemp))
    }

    setCanEdit(true)
  }, [])

  useEffect(() => {
    if (canEdit) {
      localStorage.setItem('favorites', JSON.stringify(favorites))
    }
  }, [favorites])

  const handleFavorite = () => {
    if (favorites.includes(character?.id || -1)) {
      setFavorites(favorites.filter((id) => id !== character?.id))
    } else {
      setFavorites([...favorites, character?.id || -1])
    }
  }

  return (
    <>
      <Header />

      <div className='p-4'>
        <div className='flex gap-7'>
          <div className='max-w-fit overflow-hidden rounded-lg'>
            <Image
              src={character?.image ?? '/emptyUser.png'}
              height={300}
              width={300}
              alt={`${character?.name} image`}
            />
          </div>

          <div className='flex flex-col'>
            <h1 className='mb-4 text-6xl text-white'>{character?.name}</h1>

            <div className='absolute right-4'>
              <button
                className='rounded-md bg-slate-500 p-3 text-white transition-colors hover:bg-slate-600'
                onClick={() => handleFavorite()}
              >
                <div className='flex items-center gap-3'>
                  {favorites.includes(character?.id || -1)
                    ? 'Remove from favorites'
                    : 'Add to favorites'}
                  <Image
                    src={
                      favorites.includes(character?.id || -1)
                        ? '/filledStar.svg'
                        : '/emptyStar.svg'
                    }
                    height={30}
                    width={30}
                    alt='Star icon'
                  ></Image>
                </div>
              </button>
            </div>

            <p className='mb-1 ml-3 text-xl text-gray-400'>
              {character?.status} - {character?.species}
            </p>

            <p className='mb-1 ml-3 text-xl text-gray-400'>
              Origin: {character?.origin.name}
            </p>

            <p className='ml-3 text-xl text-gray-400'>
              Location: {character?.location.name}
            </p>
          </div>
        </div>

        <h2 className='mt-7 text-4xl text-gray-300'>Episodes:</h2>

        <div className='ml-3 mt-5 flex'>
          <ul className='grid grid-flow-row grid-cols-10 gap-7'>
            {character?.episode.map((episode) => (
              <li
                key={episode}
                className='ml-4 select-none list-disc text-xl text-gray-500 transition-colors duration-200 hover:text-sky-300'
              >
                Episode {formatURL(episode)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
