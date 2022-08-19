import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { getUser } from '../../redux/actions/user'
import style from './UserProfile.module.css'

export default function UserProfile () {
  // const dispatch = useDispatch()
  // const user = useSelector(state => state.user)
  // const users = useSelector(state => state.users)
  const user2 = {
    id: '9488d2c4-e4bd-4f7f-9f1f-1de8ee56e15f',
    username: '4ldito',
    email: 'aldoaliscioni18@gmail.com',
    password: '123asd',
    stars: 100,
    profileImg: 'https://static.wikia.nocookie.net/starcraft2/images/a/a1/Zerg_SC2_Icon2.jpg/revision/latest?cb=20100826205116&path-prefix=es',
    coverImg: 'https://bnetcmsus-a.akamaihd.net/cms/blog_header/2g/2G4VZH5TIWJF1602720144046.jpg',
    score: 0,
    roles: null,
    DeckId: null,
    RolId: 'superadmin',
    StatusId: null
  }
  // useEffect(() => {
  //   dispatch(getUser(id))
  // })

  // useEffect(() => {

  // }, [user])
  console.log(user2)
  return (
    <div className={style.p}>
      <p>Hola! <h1>{user2.username}</h1></p>
      <div>
        <p><h3>Informacion Personal</h3></p>
        <span>{user2.username}</span>
        <span>{user2.password}</span>
        <span>{user2.email}</span>
        <span>{user2.stars}</span>
        <span>{user2.profileImg}</span>
        <span>{user2.coverImg}</span>
        <span>{user2.score}</span>
        <span>{user2.RolId ? user2.RolId : ''}</span>
        <span>Mazo{user2.DeckId}</span>
      </div>
    </div>
  )
}

// Perfil de usuario (SP: 14)
// Como usuario quiero acceder a mi perfil para:
// personalizar mi perfil
// eliminar/desactivar mi cuenta
// ver estadísticas
// ver estadísticas
// stars
// foto de perfil con foto de fondo

// Como usuario quiero acceder a otro perfil para:
