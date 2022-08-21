import { CREATE_USER, DELETE_USER, GET_ALL_USERS, GET_USER, IS_VALID_TOKEN, LOG_OUT, MODIFY_USER, SET_TOKEN, SIGN_IN } from "../actions/user"

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
      return { ...state, user: payload }
    case GET_ALL_USERS:
      return { ...state, users: payload }
    case CREATE_USER:
      return { ...state, id: payload.id, token: payload.token, rol: payload.rol }
    case SIGN_IN:
      // falta agregar validToken aca 
      return { ...state, id: payload.id, token: payload.token, rol: payload.rol }
    case MODIFY_USER:
      return { ...state, user: payload }
    case DELETE_USER:
      const usersUpdated = state.users.filter(user => user.id !== payload)
      return { ...state, users: usersUpdated, user: {} }
    case SET_TOKEN:
      return { ...state, token: payload.token, rol: payload.rol }
    case IS_VALID_TOKEN:
      return { ...state, validToken: payload }
    case LOG_OUT:
      return { ...state, token: null, rol: null }
    default:
      return state
  }
}
