import React from 'react'
import Registro from './components/Registro/Registro'
import LandingPage from './components/LandingPage/LandingPage'
import { Route, Routes } from 'react-router-dom'
import './App.css'
// import Profile from './components/Profile/Profile'

function App () {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/register' element={<Registro />} />
        {/* <Route path='/profile' element={<Profile />} /> */}
      </Routes>
    </div>
  )
}

export default App
