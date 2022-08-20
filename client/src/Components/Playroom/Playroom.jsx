import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isValidToken } from '../../redux/actions/user';

export default function Playroom() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector(state => state.userReducer.id)
  const token = useSelector(state => state.userReducer.token)
  const validToken = useSelector(state => state.userReducer.validToken)

  useEffect(() => {
    dispatch(isValidToken(userId, token))
  }, [])

  useEffect(() => {
    if (validToken === false) navigate("/")
  }, [validToken])

  return (
    <div>
      <div> esto es la playroom</div>
    </div>
  )
}
