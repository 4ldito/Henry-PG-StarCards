import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import ProtectedRoutes from './ProtectedRoutes'
import Registro from './components/Registro/Registro'
import Login from './components/Registro/Login'
import UserProfile from './components/UserProfile/UserProfile'
import LandingPage from './components/LandingPage/LandingPage'
import NavigationBar from './components/NavigationBar/NavigationBar'
import Playroom from './components/Playroom/Playroom'
import ShopCart from './components/Shop/ShopCart/ShopCart'
import Shop from './components/Shop/Shop'
import Detail from './components/Detail/Detail'
import Inventory from './components/Inventory/Inventory'
import PurchaseCompleted from './components/Shop/PurchaseCompleted'
import { useSelector } from 'react-redux'
import './App.css'
import { setToken } from './redux/actions/user'
// import Profile from './components/Profile/Profile'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const credentials = window.localStorage.getItem('STARCARDS_USER_CREDENTIALS'); 
  
    if (credentials) dispatch(setToken(JSON.parse(credentials)));
    
    
  }, []);

  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route path='/' element={<LandingPage />} />

        <Route path='/register' element={<Registro />} />
        <Route path='/login' element={<Login />} />
        {/* <Route path='/profile' element={<Profile />} /> */}
        <Route path='/shop' element={<Shop />} />
        <Route path='/userProfile' element={<UserProfile />} />
        <Route path='/purchase-completed' element={<PurchaseCompleted />} />
        <Route path='/detail' element={< Detail />} />
        <Route element={<ProtectedRoutes />}>
          <Route path='/playroom' element={<Playroom />} />
          <Route path='/shopcart' element={<ShopCart />} />
          <Route path='/inventory' element={<Inventory />} />
        </Route>
      </Routes>

    </div>
  )
}

export default App
