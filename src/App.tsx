import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Cleaning from './pages/Cleaning'
import Exercise from './pages/Exercise'
import Garden from './pages/Garden'
import Home from './pages/Home'
import Rehearsals from './pages/Rehearsals'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/ejercicio' element={<Exercise />} />
      <Route path='/limpieza' element={<Cleaning />} />
      <Route path='/ensayos' element={<Rehearsals />} />
      <Route path='/jardin' element={<Garden />} />
    </Routes>
  </BrowserRouter>
)

export default App
