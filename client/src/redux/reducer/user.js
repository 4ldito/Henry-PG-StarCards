/* eslint-disable no-case-declarations */
import { GET_ALL_USERS, CREATE_USER, DELETE_USER, MODIFY_USER, GET_USER, SIGN_IN, SET_TOKEN, LOG_OUT } from '../actions/actionTypes'


const initialState = {
  user: {},
  users: [],
  token: null,
  rol: null
}

export default function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_USER:
      return { ...state, user: payload }
    case GET_ALL_USERS:
      return { ...state, users: payload }
    case CREATE_USER:
      return { ...state, token: payload.token, rol: payload.rol }
    case SIGN_IN:
      return { ...state, token: payload.token, rol: payload.rol }
    case MODIFY_USER:
      return { ...state, user: payload }
    case DELETE_USER:
      const usersUpdated = state.users.filter(user => user.id !== payload)
      return { ...state, users: usersUpdated }
    case SET_TOKEN:
      console.log(payload);
      return { ...state, token: payload.token, rol: payload.rol }
    case LOG_OUT: 
      return {...state, token: null, rol:null}
    default:
      return state
  }
}
