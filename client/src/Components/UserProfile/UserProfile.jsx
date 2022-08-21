import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { deleteUser, getUser } from '../../redux/actions/user';
import style from '../../styles/ProfileUser/UserProfile.module.css'
import Config from '../Config/Config'

export default function UserProfile () {
  const dispatch = useDispatch()
  const userActive = useSelector(state => state.userReducer.user)
  const idUserActive = useSelector(state => state.userReducer.id)
  const [user, setUser] = useState()
  const [render, setRender] = useState()

  // let username = 'antu' //para que me traiga un usuario sin estar logeado

  useEffect(() => {
    dispatch(getUser(idUserActive))
  },[])

  useEffect(() => {
    console.log(userActive);
    setUser(userActive)
  },[userActive])

  function changeRender(e){
    let value = e.target.value
      value === '1' ? setRender('Inventory')
    : value === '2' ? setRender('Stats')
    : value === '3' ? setRender('config')
    : setRender('Chat')
    // console.log(user)
  }

  return (user?
    (<>
      <div className={style.img}>
          <img className={style.coverimg} src={user.coverImg} alt="coverImg" />
          <button className={style.changecv}>Change Cover Imagen</button>
          <img className={style.profileimg} src={user.profileImg} alt="ProfileImg" />
          <button className={style.changep}></button>
          <Link className={style.stars} to='/shop'> Stars: {user.stars}</Link>

      </div>
      <div className={style.buttonsbar}>
          {/* <Link to='/inventory'><button>Inventory</button></Link> */}
          <button className={style.buttons} value='1' onClick={(e)=>changeRender(e)}>Inventory</button> 
          <button className={style.buttons} value='2' onClick={(e)=>changeRender(e)}>Stats</button>
          <button className={style.buttons} value='3' onClick={(e)=>changeRender(e)}>Config</button>
          <button className={style.buttons} value='4' onClick={(e)=>changeRender(e)}>Chat</button>
      </div>
        {render === 'config' ? <Config user={user} />
        :render === 'Inventory' ?  'Inventory'
        :render === 'Stats' ?  'Stats'
        : 'Chat'
        // : ''      
        }
    </>)
  :'loading...')
}
