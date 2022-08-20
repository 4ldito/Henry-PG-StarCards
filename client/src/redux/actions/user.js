import axios from 'axios'
import { GET_ALL_USERS, CREATE_USER, DELETE_USER, MODIFY_USER, GET_USER, SIGN_IN, SET_TOKEN } from './actionTypes'
import { useToken } from '../../hooks/useToken'
/// ////////////////////////////////////////////////////////////////////////////////////////////

export function getUser(id) {
  return async function (dispatch) {
    const response = await axios(`http://localhost:3001/user?${id}`)
    dispatch({ type: GET_USER, payload: response.data })
  }
}

export function getAllUsers () {
  return async function (dispatch) {
    const response = await axios('http://localhost:3001/user')
    dispatch({ type: GET_ALL_USERS, payload: response.data })
  }
}

export function createUser(user) {
  return async function (dispatch) {
    const response = await axios.post('http://localhost:3001/login/signup', user)
    const credentials = { token: response.data.token, rol: response.data.rol }
    window.localStorage.setItem('STARCARDS_USER_CREDENTIALS', JSON.stringify(credentials));
    dispatch({ type: CREATE_USER, payload: response.data })
  }
}

export function signIn(user) {
  return async function (dispatch) {
    const response = await axios.post('http://localhost:3001/login/signin', user)
    const credentials = { token: response.data.token, rol: response.data.rol }
    window.localStorage.setItem('STARCARDS_USER_CREDENTIALS', JSON.stringify(credentials));
    
    dispatch({ type: SIGN_IN, payload: response.data })
  }
}

export function setToken(credentials) {
  console.log(credentials)
  return { type: SET_TOKEN, payload: credentials };
}

export function modifyUser (id, property) {
  return async function (dispatch) {
    const response = await axios.patch(`http://localhost:3001/user/${id}`, property)
    dispatch({ type: MODIFY_USER, payload: response.data })
  }
}

export function deleteUser (id) {
  return async function (dispatch) {
    const response = await axios.delete(`http://localhost:3001/user?id=${id}`)
    dispatch({ type: DELETE_USER, payload: response.data })
  }
}
