import { navigateToCharacters, navigateToFavorites } from "../actions";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-pink-900 text-white py-6 text-center text-2xl font-bold space-x-5 z-10 border-b-4 border-pink-700">
      <button onClick={() => navigateToCharacters()}>
        Characters
      </button>

      <button onClick={() => navigateToFavorites()}>
        Favorites
      </button>
    </header>
  );
}
