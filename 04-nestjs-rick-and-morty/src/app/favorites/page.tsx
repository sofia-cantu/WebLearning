"use client"

import { useState, useEffect } from "react";
import { getCharactersByIds, Character} from "../services/characterService";
import CharacterCard from "../components/CharacterCard";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Favorites() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [characters, setCharacters] = useState<Character[] | Character>();
  const [canEdit, setCanEdit] = useState<boolean>(false);

  useEffect(() => {
    const favoritesTemp = localStorage.getItem("favorites");

    if (favoritesTemp != null) {
      setFavorites(JSON.parse(favoritesTemp));
    }
  }, []);

  useEffect(() => {
    if (!canEdit) {
      if (favorites?.length > 0) {
        getCharactersByIds(favorites).then((characters) => {
          if (!Array.isArray(characters)) {
            characters = [characters];
          }

          setCharacters(characters);
          setCanEdit(true);
        });
      }
    } else {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites])

  return (
    <>
      <Header />

      <div className="bg-pink-900" >
        { (favorites.length == 0) && <h1 className="text-white text-4xl ml-5">No favorites</h1> }

        {(!Array.isArray(characters) && characters != null) ? (
          <CharacterCard character={characters} favorites={favorites} setFavorites={setFavorites} />
        ) : (
          <div className="py-20 m-10 mt-7 sticky bottom-2 flex flex-col items-center">

            {characters?.map((character) => (
              (favorites.find((id) => id === character.id)) &&
              <CharacterCard key={character.id} character={character} favorites={favorites} setFavorites={setFavorites} />
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </>
    
  );
}