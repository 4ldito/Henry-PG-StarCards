/* eslint-disable no-case-declarations */
import { GET_ALL_USERS, CREATE_USER, DELETE_USER, MODIFY_USER, GET_USER } from '../actions/actionTypes'

const initialState = {
  user: {},
  users: [],
  token: null
}

export default function shopCartReducer (state = initialState, { type, payload }) {
  switch (type) {
    case GET_USER:
      return { ...state, user: payload }
    case GET_ALL_USERS:
      return { ...state, users: payload }
    case CREATE_USER:
      return { ...state, token: payload }
    case MODIFY_USER:
      return { ...state, user: payload }
    case DELETE_USER:
      const usersUpdated = state.users.filter(user => user.id !== payload)
      return { ...state, users: usersUpdated }
    default:
      return state
  }
}
