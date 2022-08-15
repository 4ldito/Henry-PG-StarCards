import React from 'react'
import Registro from './components/Registro/Registro'
import LandingPage from './components/LandingPage/LandingPage'
import { Route, Routes } from 'react-router-dom'
import Shop from './components/Shop/Shop'

import './App.css'

function App () {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/register' element={<Registro />} />
        <Route path='/shop' element={<Shop />} />
      </Routes>
    </div>
  )
}

export default App
