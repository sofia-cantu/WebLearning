import Image from "next/image"
import { navigateToCharacter } from '../actions';
import { Character } from "../services/characterService"

export default function CharacterCard({ character, favorites, setFavorites }: { 
  character: Character, 
  favorites: number[], 
  setFavorites: (favorites: number[]) => void 
}) {
  const handleFavorite = (characterId: number) => {
    const isFavorite = favorites.includes(characterId);
    const updatedFavorites = isFavorite
      ? favorites.filter((id) => id !== characterId)
      : [...favorites, characterId];
    setFavorites(updatedFavorites);
  };

  return (
    <div className="rounded-full flex gap-4 items-center bg-pink-50 my-3 overflow-hidden w-full relative">
      <Image src={character.image} height={120} width={120} alt={`${character.name} image`} className="opacity-80" />

      <div className="m-5">
        <button onClick={() => navigateToCharacter(character.id)}>
          <h1 className="text-pink-700 text-xl font-mono font-bold">
            {character.name}
          </h1>
        </button>

        <p className="text-pink-900 font-mono px-2 text-xs select-none font-bold">
          {character.status} - {character.species}
        </p>

        <p className="text-pink-900 font-mono px-2 text-xs select-none">
          Origin: {character.origin.name}
        </p>

        <p className="text-pink-900 font-mono px-2 text-xs select-none">
          Location: {character.location.name}
        </p>
      </div>

      <button className="ml-auto mr-2 px-3 py-1 rounded-lg" onClick={() => handleFavorite(character.id)}>
        <Image src={favorites.find((id) => id === character.id) ? "/filledStar.svg" : "/emptyStar.svg"} height={25} width={25} alt="Favorite" className="transition-opacity duration-200 hover:opacity-50" />
      </button>

    </div>
  )
};