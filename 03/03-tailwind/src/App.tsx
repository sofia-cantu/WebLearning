import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-gray-50">
      <div className="flex justify-center">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className='text-5xl text-center'>Vite + React</h1>
      <div>
        <button className="max-w-md mx-auto mt-6 bg-gray-100 rounded-xl shadow-md overflow-hidden md:max-w-2xlß" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p className="max-w-md mx-auto mt-6 bg-gray-100 rounded-xl shadow-md overflow-hidden md:max-w-2xlß">
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      </div>
    </>
  )
}

export default App
