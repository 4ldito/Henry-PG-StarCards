/* eslint-disable no-case-declarations */
import { GET_ALL_USERS, CREATE_USER, DELETE_USER, MODIFY_USER, GET_USER, SIGN_IN, SET_TOKEN, IS_VALID_TOKEN } from '../actions/actionTypes'


const initialState = {
  user: {},
  users: [],
  actualUser: {},
  validToken: false,
  token: null,
  id: null,
  rol: null
}

export default function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_USER:
      return { ...state, users: payload }
    case GET_ALL_USERS:
      return { ...state, users: payload }
    case CREATE_USER:
      return { ...state, id: payload.id, token: payload.token, rol: payload.rol }
    case SIGN_IN:
      return { ...state, id: payload.id, token: payload.token, rol: payload.rol }
    case MODIFY_USER:
      return { ...state, user: payload }
    case DELETE_USER:
      const usersUpdated = state.users.filter(user => user.id !== payload)
      return { ...state, users: usersUpdated }
    case SET_TOKEN:
      return { ...state, token: payload.token, rol: payload.rol }
    case IS_VALID_TOKEN:
      return { ...state, validToken: payload }
    default:
      return state
  }
}
