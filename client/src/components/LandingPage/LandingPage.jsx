import React from 'react'
import { Link } from 'react-router-dom'
import style from '../../styles/landingPage/landingPage.module.css'


const LandingPage = () => {
  return (
    <div className={style.container}>
      <div className={style.options}>

        <h1 className={style.title} style={{ "fontSize": "50px" }}>Entrar</h1>
       
          <Link to='/register'>
            <button className={style.button} data='Registrarse'></button>
          </Link>
          <Link to='/login'>
            <button className={style.button} data='Ingresar'></button>
          </Link>
        </div>
     
    </div>
  )
}

export default LandingPage
