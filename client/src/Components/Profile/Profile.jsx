import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

import css from './Profile.module.css'

export default function Profile () {
  const { user, isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    isAuthenticated &&
      <div>
        <img src={user.picture} alt={user.name} />
        <h2 className={css.white}>{user.name}</h2>
        <p className={css.white}>Email is: {user.email}</p>
      </div>
  )
}
