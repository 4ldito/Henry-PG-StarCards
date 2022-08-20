import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteUser, getUser } from '../../redux/actions/user';
import style from '../../styles/ProfileUser/UserProfile.module.css'
import Config from '../Config/Config'

export default function UserProfile () {
  const dispatch = useDispatch()
  const userId = useSelector(state => state.userReducer.user)
  const [user, setUser] = useState()
  const [render, setRender] = useState()

  // const user = {
  //   id: '9488d2c4-e4bd-4f7f-9f1f-1de8ee56e15f',
  //   username: '4ldito',
  //   email: 'aldoaliscioni18@gmail.com',
  //   password: '123asd',
  //   stars: 100,
  //   profileImg: 'https://static-cdn.jtvnw.net/jtv_user_pictures/jfv888-profile_image-ad6b23cd6b99e422-150x150.jpeg',
  //   coverImg: 'https://bnetcmsus-a.akamaihd.net/cms/blog_header/2g/2G4VZH5TIWJF1602720144046.jpg',
  //   score: 0,
  //   roles: null,
  //   DeckId: null,
  //   RolId: 'superadmin',
  //   StatusId: null
  // }
  let username = 'antu' //para que me traiga un usuario sin estar

  useEffect(() => {
    dispatch(getUser(username))
  },[])

  useEffect(() => {
    setUser(userId)
  },[userId])

  function changeRender(e){
    let value = e.target.value
      value === '1' ? setRender('Inventory')
    : value === '2' ? setRender('Stats')
    : value === '3' ? setRender('config')
    : setRender('Chat')
    console.log(user)
  }

  return (user?
    (<>
      <div className={style.img}>
          <img className={style.coverimg} src={user.coverImg} alt="coverImg" />
          <button className={style.changecv}>Change Cover Imagen</button>
          <img className={style.profileimg} src={user.profileImg} alt="ProfileImg" />
          <button className={style.changep}></button>
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

