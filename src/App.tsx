import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { useReactiveVar } from '@apollo/client'

import { mode } from './main'
import Budget from './pages/Budget'
import Catalog from './pages/Catalog'
import Cleaning from './pages/Cleaning'
import Exercise from './pages/Exercise'
import Garden from './pages/Garden'
import Home from './pages/Home'
import Notes from './pages/Notes'
import Nutrition from './pages/Nutrition'
import Projects from './pages/Projects'
import Rehearsals from './pages/Rehearsals'

const App = () => {
  const isDarkMode = useReactiveVar(mode)
  return (
    <div id='mode' className={`${isDarkMode === 'dark' ? 'dark' : 'light'}`}>
      <div className='bg-primary min-h-screen'>
        <BrowserRouter
          future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
        >
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/ejercicio' element={<Exercise />} />
            <Route path='/limpieza' element={<Cleaning />} />
            <Route path='/ensayos' element={<Rehearsals />} />
            <Route path='/jardin' element={<Garden />} />
            <Route path='/comida' element={<Nutrition />} />
            <Route path='/presupuestos' element={<Budget />} />
            <Route path='/catalogo' element={<Catalog />} />
            <Route path='/proyectos' element={<Projects />} />
            <Route path='/notas' element={<Notes />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
