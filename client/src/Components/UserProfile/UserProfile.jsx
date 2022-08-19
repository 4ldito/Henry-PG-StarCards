import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

// import { getUser } from '../../redux/actions/user'
import style from './UserProfile.module.css'
import BtnUserProfile from '../Buttons/BtnUserProfile'
import { deleteUser } from '../../redux/actions/user';

export default function UserProfile () {
  const dispatch = useDispatch()
  const navigateTo = useNavigate();
  // const user = useSelector(state => state.user)
  // const users = useSelector(state => state.users)
  const user2 = {
    id: '9488d2c4-e4bd-4f7f-9f1f-1de8ee56e15f',
    username: '4ldito',
    email: 'aldoaliscioni18@gmail.com',
    password: '123asd',
    stars: 100,
    profileImg: 'https://static-cdn.jtvnw.net/jtv_user_pictures/jfv888-profile_image-ad6b23cd6b99e422-150x150.jpeg',
    coverImg: 'https://bnetcmsus-a.akamaihd.net/cms/blog_header/2g/2G4VZH5TIWJF1602720144046.jpg',
    score: 0,
    roles: null,
    DeckId: null,
    RolId: 'superadmin',
    StatusId: null
  }
  // useEffect(() => {

  // }, [user])

  function deleteAccount(){
    dispatch(deleteUser(user2.id))
    navigateTo('/playroom')
  }

  return (
    <div className={style.p}>
       <h1>Hola! {user2.username}</h1>
      <div>
        <h3>Informacion Personal</h3><span></span>
        <div><span>Username: {user2.username} ({user2.RolId ? user2.RolId : ''})</span><BtnUserProfile value='username'/></div>
        <div><span>Password: {user2.password}</span><BtnUserProfile value='password'/></div>
        <div><span>Email: {user2.email}</span></div>
        <div><span>Stars: {user2.stars}</span></div>
        <div><span>Score: {user2.score}</span></div>
        <div><span>Selected Package:{user2.DeckId}</span></div>
        <div><span>Account Status: {user2.StatusId}</span> <button className={style.bdelete} onClick={deleteAccount} >Delete Account</button></div>
        <div><img src={user2.profileImg} alt="ProfileImg" /></div>
        <div><img src={user2.coverImg} alt="coverImg" /></div>
      </div>
    </div>
  )
}

// personalizar mi perfil
// eliminar mi cuenta
// ver estadísticas
// stars
// foto de perfil con foto de fondo

// Como usuario quiero acceder a otro perfil para:
