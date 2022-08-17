import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

// import css from './Registro.module.css'

export default function Login () {
  const { loginWithRedirect } = useAuth0()
  return (
    <button onClick={() => loginWithRedirect()}>Login</button>
  )
}
