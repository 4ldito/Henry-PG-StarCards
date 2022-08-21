import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isValidToken } from './../redux/actions/user';

const useValidToken = ({ navigate }) => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.userReducer.id)
  const token = useSelector(state => state.userReducer.token)
  const validToken = useSelector(state => state.userReducer.validToken)
  const navigateTo = useNavigate();

  useEffect(() => {
    dispatch(isValidToken(userId, token))
  }, [])

  useEffect(() => {
    if (validToken === false && navigate) navigateTo("/")
  }, [validToken])

  return { validToken }
}

export default useValidToken