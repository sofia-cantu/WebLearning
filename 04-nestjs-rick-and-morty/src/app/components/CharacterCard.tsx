import Image from 'next/image'
import { navigateToCharacter } from '../actions'
import { Character } from '../services/characterService'

export default function CharacterCard({
  character,
  favorites,
  setFavorites,
}: {
  character: Character
  favorites: number[]
  setFavorites: (favorites: number[]) => void
}) {
  const handleFavorite = (characterId: number) => {
    const isFavorite = favorites.includes(characterId)
    const updatedFavorites = isFavorite
      ? favorites.filter((id) => id !== characterId)
      : [...favorites, characterId]
    setFavorites(updatedFavorites)
  }

  return (
    <div className='relative my-3 flex w-full items-center gap-4 overflow-hidden rounded-full bg-pink-50'>
      <Image
        src={character.image}
        height={120}
        width={120}
        alt={`${character.name} image`}
        className='opacity-80'
      />

      <div className='m-5'>
        <button onClick={() => navigateToCharacter(character.id)}>
          <h1 className='font-mono text-xl font-bold text-pink-700'>
            {character.name}
          </h1>
        </button>

        <p className='select-none px-2 font-mono text-xs font-bold text-pink-900'>
          {character.status} ✏ {character.species}
        </p>


      </div>

      <button
        className='ml-auto mr-2 rounded-lg px-3 py-1'
        onClick={() => handleFavorite(character.id)}
      >
        <Image
          src={
            favorites.find((id) => id === character.id)
              ? '/filledStar.svg'
              : '/emptyStar.svg'
          }
          height={25}
          width={25}
          alt='Favorite'
          className='transition-opacity duration-200 hover:opacity-50'
        />
      </button>
    </div>
  )
}
