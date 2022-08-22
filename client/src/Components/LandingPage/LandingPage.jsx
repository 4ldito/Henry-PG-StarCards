import React from 'react'
import { Link } from 'react-router-dom'
import style from '../../styles/landingPage/landingPage.module.css'


const LandingPage = () => {
  return (
    <div className={style.container}>
      <div className={style.options}>
      <h1 className = {style.title} style={{"fontSize":"50px"}}>Entrar</h1>
      <div className={style.buttons}>
      <Link to='/register'>
        <button className={style.button} data='Registro'></button>
      </Link>
      <Link to='/login'>
        <button className={style.button} data='login'></button>
      </Link>
      </div>
      </div>
    </div>
  )
}

export default LandingPage
