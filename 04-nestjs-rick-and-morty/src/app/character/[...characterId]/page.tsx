"use client"
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Image from "next/image";
import { type Character, getCharacterById } from "../../services/characterService";

export default function Character({ params }: { params: { characterId: number } }) {
  const [character, setCharacter] = useState<Character>();
  const [favorites, setFavorites] = useState<number[]>([]);
  const [canEdit, setCanEdit] = useState<boolean>(false);

  const formatURL = (url: string) => {
    return url.replace("https://rickandmortyapi.com/api/episode/", "");
  }

  useEffect(() => {
    getCharacterById(params.characterId).then((response: Character) => {
      setCharacter(response);
    })

    const favoritesTemp = localStorage.getItem("favorites");

    if (favoritesTemp != null) {
      setFavorites(JSON.parse(favoritesTemp));
    }

    setCanEdit(true);
  }, []);

  useEffect(() => {
    if (canEdit) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]);

  const handleFavorite = () => {
    if (favorites.includes(character?.id || -1)) {
      setFavorites(favorites.filter((id) => id !== character?.id));
    } else {
      setFavorites([...favorites, character?.id || -1]);
    }
  }
  
  return (
    <>
      <Header />
      
      <div className="p-4">
        <div className="flex gap-7">
          <div className="rounded-lg overflow-hidden max-w-fit">
            <Image src={character?.image ?? "/emptyUser.png"} height={300} width={300} alt={`${character?.name} image`} />
          </div>

          <div className="flex flex-col">
            <h1 className="text-white text-6xl mb-4">
              {character?.name}
            </h1>

            <div className="absolute right-4">
              <button className="text-white bg-slate-500 rounded-md p-3 transition-colors hover:bg-slate-600" onClick={() => handleFavorite()}>
                <div className="flex items-center gap-3">
                  { favorites.includes(character?.id || -1) ? "Remove from favorites" : "Add to favorites" }
                  <Image src={ favorites.includes(character?.id || -1) ? "/filledStar.svg" : "/emptyStar.svg" } height={30} width={30} alt="Star icon"></Image>
                </div>
              </button>
            </div>

            <p className="text-gray-400 ml-3 text-xl mb-1">
              {character?.status} - {character?.species}
            </p>

            <p className="text-gray-400 ml-3 text-xl mb-1">
              Origin: {character?.origin.name}
            </p>

            <p className="text-gray-400 ml-3 text-xl">
              Location: {character?.location.name}
            </p>
          </div>
        </div>

        <h2 className="text-gray-300 text-4xl mt-7">
          Episodes: 
        </h2>

        <div className="flex ml-3 mt-5">
          <ul className="grid grid-flow-row grid-cols-10 gap-7">
            {character?.episode.map((episode) => (
              <li 
                key={episode}
                className="text-gray-500 ml-4 text-xl list-disc transition-colors duration-200 hover:text-sky-300 select-none"
              >
                Episode {formatURL(episode)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}