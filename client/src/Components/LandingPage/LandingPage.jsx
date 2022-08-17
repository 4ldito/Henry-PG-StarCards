import React from 'react'
import { Link } from 'react-router-dom'

import css from './LandingPage.module.css'

const LandingPage = () => {
  return (
    <div>
      <h1 className={css.h1}>LandingPage</h1>
      <Link to='/register'>
        <br />
        <button>Registro</button>
      </Link>

    </div>
  )
}

export default LandingPage
