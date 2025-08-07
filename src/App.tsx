import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { useReactiveVar } from '@apollo/client'

import { mode } from './main'
import Cleaning from './pages/Cleaning'
import Exercise from './pages/Exercise'
import Garden from './pages/Garden'
import Home from './pages/Home'
import Rehearsals from './pages/Rehearsals'

const App = () => {
  const isDarkMode = useReactiveVar(mode)
  return (
    <div id='mode' className={`${isDarkMode === 'dark' ? 'dark' : 'light'}`}>
      <div className='bg-primary min-h-screen'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/ejercicio' element={<Exercise />} />
            <Route path='/limpieza' element={<Cleaning />} />
            <Route path='/ensayos' element={<Rehearsals />} />
            <Route path='/jardin' element={<Garden />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
