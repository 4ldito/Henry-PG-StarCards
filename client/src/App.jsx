import React from 'react'
import Registro from './Components/Registro/Registro'
import LandingPage from './Components/LandingPage/LandingPage'
import Marketplace from './Components/Marketplace/Marketplace'
import Playroom from './Components/Playroom/Playroom'
import { Route, Routes } from 'react-router-dom'
import './App.css'

function App () {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/playroom' element={<Playroom />} />
        <Route path='/marketplace' element={<Marketplace />} />
        <Route path='/register' element={<Registro />} />
      </Routes>
    </div>
  )
}

export default App
