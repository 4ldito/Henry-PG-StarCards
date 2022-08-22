import React from 'react'
import { Link } from 'react-router-dom'
import style from '../../styles/landingPage/landingPage.module.css'


const LandingPage = () => {
  return (
    <div className={style.container}>
      
      <h1>Entrar</h1>
      <div className={style.buttons}>
      <Link to='/register'>
        <button className={style.buttonx}>Registro</button>
      </Link>
      <Link to='/login'>
        <button className={style.buttony}>Login</button>
      </Link>
      </div>

    </div>
  )
}

export default LandingPage
