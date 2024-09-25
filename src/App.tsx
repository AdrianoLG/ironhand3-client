import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Exercise from './pages/Exercise'
import Cleaning from './pages/Cleaning'
import Rehearsals from './pages/Rehearsals'
import Garden from './pages/Garden'
import Header from './components/header'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ejercicio' element={<Exercise />} />
        <Route path='/limpieza' element={<Cleaning />} />
        <Route path='/ensayos' element={<Rehearsals />} />
        <Route path='/jardin' element={<Garden />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
