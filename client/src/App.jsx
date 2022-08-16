import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Registro from './components/Registro/Registro'
import LandingPage from './components/LandingPage/LandingPage'
import Shop from './components/Shop/Shop'
import ShopCart from './components/Shop/ShopCart/ShopCart'

import './App.css'

function App () {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/register' element={<Registro />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/shopcart' element={<ShopCart />} />
      </Routes>
    </div>
  )
}

export default App
