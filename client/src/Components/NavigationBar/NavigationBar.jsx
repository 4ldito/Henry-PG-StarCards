import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import UserOptions from './UserOptions/UserOptions'
import styles from '../../styles/NavigationBar/NavigationBar.module.css'

export default function NavigationBar () {
  const [visibleUserOptions, setVisibleUserOptions] = useState(false)
  return (
    <div className={styles.navBar}>
      <button onClick={() => setVisibleUserOptions(!visibleUserOptions)}>UserOptions</button>
      <Link to='/playroom'>Playroom</Link>
      <Link to='/shop'>Shop</Link>
      {visibleUserOptions ? <div className={styles.userOptions}><UserOptions /> </div> : <></>}
    </div>
  )
}
