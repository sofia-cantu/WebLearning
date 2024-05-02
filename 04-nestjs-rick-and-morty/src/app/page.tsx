"use client"

import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CharacterCard from "./components/CharacterCard";
import { CharacterResponse, getCharacterAtPage, getCharactersFirstPage } from "./services/characterService";

export default function Home() {
  const [characters, setCharacters] = useState<CharacterResponse>();
  const [favorites,  setFavorites] = useState<number[]>([]);
  const [canEdit, setCanEdit] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCharactersFirstPage();
        setCharacters(response);

        const favoritesData = localStorage.getItem("favorites");
        if (favoritesData !== null) {
          setFavorites(JSON.parse(favoritesData));
        }
        
        setCanEdit(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (canEdit) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites, canEdit]);

  const handlePageChange = async (next: number) => {
    if (characters === undefined) return;

    try {
      const response = await getCharacterAtPage(next === -1 ? characters?.info.prev : characters?.info.next);
      setCharacters(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="bg-pink-900">
      <div className="bg-pink-50 sticky bottom-2 flex justify-center gap-5 blur-5 items-center">
        <button 
          className="text-pink-600 text-2xl mx-2 mb-4  px-7 py-1 rounded-full pt-24"
          onClick={() => handlePageChange(-1)} 
          disabled={characters?.info.prev == null}
        >
          ⬸
        </button>

        <button 
          className="text-pink-600 text-2xl mx-2 mb-4  px-7 py-1 rounded-full pt-24"
          onClick={() => handlePageChange(1)} 
          disabled={characters?.info.next == null}
        >
          ⤑
        </button>
      </div>


      <div className=" m-10 pb-20">
        {characters?.results.map((character) => (
          <CharacterCard key={character.id} character={character} favorites={favorites} setFavorites={setFavorites} />
        ))}
      </div>
      
      </div>
      <Footer />
    </>
  );
}
