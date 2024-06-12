import { navigateToAllCharacters, navigateToFavorites } from '../actions'

export default function Header() {
  return (
    <header className='fixed left-0 right-0 top-0 z-10 space-x-5 border-b-4 border-pink-700 bg-pink-900 py-6 text-center text-2xl font-bold text-white'>
      <button onClick={() => navigateToAllCharacters()}>Characters</button>

      <button onClick={() => navigateToFavorites()}>Favorites</button>
    </header>
  )
}
