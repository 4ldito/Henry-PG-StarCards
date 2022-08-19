import axios from 'axios'
import { GET_ALL_USERS, CREATE_USER, DELETE_USER, MODIFY_USER, GET_USER } from './actionTypes'

/// ////////////////////////////////////////////////////////////////////////////////////////////

export function getUser (id) {
  return async function (dispatch) {
    const response = await axios('http://localhost:3001/user', id)
    dispatch({ type: GET_USER, payload: response.data })
  }
}

export function getAllUsers () {
  return async function (dispatch) {
    const response = await axios('http://localhost:3001/user')
    dispatch({ type: GET_ALL_USERS, payload: response.data })
  }
}

export function createUser (user) {
  return async function (dispatch) {
    const response = await axios.post('http://localhost:3001/login/signup', user)
    dispatch({ type: CREATE_USER, payload: response.data.token })
  }
}
export function signIn (user) {
  return async function (dispatch) {
    const response = await axios.post('http://localhost:3001/login/signin', user)
    dispatch({ type: CREATE_USER, payload: response.data.token })
  }
}

export function modifyUser (payload) {
  return async function (dispatch) {
    const response = await axios.post('http://localhost:3001/user', payload)
    dispatch({ type: MODIFY_USER, payload: response.data })
  }
}

export function deleteUser (id) {
  return async function (dispatch) {
    const response = await axios.delete('http://localhost:3001/user', id)
    dispatch({ type: DELETE_USER, payload: response.data })
  }
}
