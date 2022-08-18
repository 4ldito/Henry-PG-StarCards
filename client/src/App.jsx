import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Registro from './components/Registro/Registro'
import UserProfile from './components/UserProfile/UserProfile'
import LandingPage from './components/LandingPage/LandingPage'
import NavigationBar from './components/NavigationBar/NavigationBar'
import Playroom from './components/Playroom/Playroom'
import ShopCart from './components/Shop/ShopCart/ShopCart'
import Invetary from './components/Inventary/Inventary'
import Shop from './components/Shop/Shop'
import Inventory from './components/Inventory/Inventory'
import PurchaseCompleted from './components/Shop/PurchaseCompleted'

import './App.css'
// import Profile from './components/Profile/Profile'

function App () {
  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/playroom' element={<Playroom />} />
        <Route path='/register' element={<Registro />} />
        {/* <Route path='/profile' element={<Profile />} /> */}
        <Route path='/shop' element={<Shop />} />
        <Route path='/shopcart' element={<ShopCart />} />
        <Route path='/userProfile' element={<UserProfile />} />
        <Route path='/inventary' element={<Invetary />} />
        <Route path='/inventory' element={<Inventory />} />
        <Route path='/purchase-completed' element={<PurchaseCompleted />} />
      </Routes>
    </div>
  )
}

export default App
