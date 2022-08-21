import React from 'react'
import { Link } from 'react-router-dom'
import style from '../../styles/landingPage/landingPage.module.css'


const LandingPage = () => {
  return (
    <div className={style.container}>

      <h1 >LandingPage</h1>
      <Link to='/register'>
        <br />
        <button>Registro</button>
      </Link>
      <Link to='/login'>
        <br />
        <button>Login</button>
      </Link>


    </div>
  )
}

export default LandingPage
