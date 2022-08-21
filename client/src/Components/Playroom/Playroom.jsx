import React from 'react'
import useValidToken from './../../hooks/useValidToken';
import style from '../../styles/playRoom/playRoom.module.css'

export default function Playroom() {

  useValidToken({ navigate: true });


  return (
    <div className={style.container}>
      <div> esto es la playroom</div>
    </div>
  )
}
