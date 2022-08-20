import React from 'react'
import style from '../../styles/ProfileUser/UserProfile.module.css'
import BtnUserProfile from '../Buttons/BtnUserProfile'
import { useNavigate } from 'react-router-dom';

export default function Config({user}){

  const navigateTo = useNavigate();

  function deleteAccount(){
    dispatch(deleteUser(user.id))
    navigateTo('/playroom')
  }

    return(
        <>
        <div className={style.config}>
          <h1>Hola! {user.username}</h1>
          <h3>Informacion Personal</h3>
          <div><span>Username: {user.username} ({user.RolId !== 'user' ? user.RolId : ''})</span><BtnUserProfile value='username'/></div>
          <div><span>Password: {user.password}</span><BtnUserProfile value='password'/></div>
          <div><span>Email: {user.email}</span></div>
          <div><span>Stars: {user.stars}</span></div>
          <div><span>Score: {user.score}</span></div>
          <div><span>Selected Package:{user.DeckId}</span></div>
          <div><span>Account Status: {user.StatusId}</span> <button className={style.bdelete} onClick={deleteAccount} >Delete Account</button></div>
        </div>
        </>
    )
}