import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../../../styles/NavigationBar/UserOptions.module.css'
export default function UserOptions () {
  return (
    <div className={styles.userOptions}>
      <Link to='/shopcart'> Shopcart </Link>
      <Link to='/userProfile'> User Profile </Link>
    </div>

  )
}
