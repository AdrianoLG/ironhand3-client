import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Exercise from './pages/Exercise'
import Cleaning from './pages/Cleaning'
import Rehearsals from './pages/Rehearsals'
import Garden from './pages/Garden'
import Header from './components/header/MainHeader'

const App = () => (
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

export default App
