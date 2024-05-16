import React, { useEffect, useState } from 'react'
import { getCharacterById } from '@/actions/actions'
import { Character } from '../../utils/schemas'

export default function CharacterPage({
  params,
}: {
  params: { characterId: number }
}) {
  const [character, setCharacter] = useState<Character | null>(null)
  const [favorites, setFavorites] = useState<number[]>([])
  const [canEdit, setCanEdit] = useState(false)

  /*
  useEffect(() => {
    if (!params.characterId) return

    getCharacterById(params.characterId)
      .then(setCharacter)
      .catch((error) => console.error('Failed to fetch character:', error))

    const favoritesTemp = localStorage.getItem('favorites')
    if (favoritesTemp) {
      setFavorites(JSON.parse(favoritesTemp))
    }

    setCanEdit(true)

    return () => {
      if (canEdit) {
        localStorage.setItem('favorites', JSON.stringify(favorites))
      }
    }
  }, [params.characterId])
  */
  useEffect(() => {
    if (!params.characterId) return

    getCharacterById(params.characterId)
      .then(setCharacter)
      .catch((error) => console.error('Failed to fetch character:', error))

    const favoritesTemp = localStorage.getItem('favorites')
    if (favoritesTemp) {
      setFavorites(JSON.parse(favoritesTemp))
    }

    setCanEdit(true)

    return () => {
      if (canEdit) {
        localStorage.setItem('favorites', JSON.stringify(favorites))
      }
    }
  }, [params.characterId, canEdit, favorites]) // Add canEdit and favorites here

  const handleFavorite = () => {
    setFavorites((prevFavorites) => {
      return prevFavorites.includes(character?.id || -1)
        ? prevFavorites.filter((id) => id !== character?.id)
        : [...prevFavorites, character?.id || -1]
    })
  }

  if (!character) {
    return <div>Loading character...</div>
  }

  return (
    <>
      <button onClick={handleFavorite}>Toggle Favorite</button>
      <div>{character.name}</div> {/* usar los datos por ejemplo */}
    </>
  )
}
