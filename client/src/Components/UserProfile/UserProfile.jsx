import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

export default function UserProfile () {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  return (
    <div>
      console.log(asd)
    </div>
  )
}
