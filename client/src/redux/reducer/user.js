import { GET_BY_EMAIL, USER_CLEAN, GET_USER_BY_EMAIL, CREATE_USER, DELETE_USER, GET_ALL_USERS, GET_USER, IS_VALID_TOKEN, LOG_OUT, MODIFY_USER, SET_TOKEN, SIGN_IN, USER_CLEAN_MSG_INFO, USER_MODIFY_STARS } from "../actions/user"

const initialState = {
  user: {},
  validUser: false,
  validPassword: '',
  users: [],
  msg: {},
  actualUser: {},
  validToken: false,
  token: null,
  id: null,
  rol: null
}

export default function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_USER: console.log(' ',payload)
      return { ...state, user: payload }

    case GET_ALL_USERS:
      return { ...state, users: payload }

    case GET_USER_BY_EMAIL:
      return { ...state, user: payload, validUser: true }

    case GET_BY_EMAIL:
      return { ...state, actualUser: payload}

    case CREATE_USER:
      if (payload.error) return { ...state, user: {}, token: null, id: null, rol: null, validToken: false, msg: { type: 'error', text: payload.error, title: 'Error!' } }

      return { ...state, id: payload.id, token: payload.token, rol: payload.rol, validToken: true, user: payload.user, msg: { type: 'success', text: 'Logeado correctamente', title: ':D!' } }

    case SIGN_IN:
      if (payload.error) return { ...state, user: {}, token: null, id: null, rol: null, validToken: false, msg: { type: 'error', text: payload.error, title: 'Error!' } }

      return { ...state, id: payload.id, token: payload.token, rol: payload.rol, validToken: true, user: payload.user, msg: { type: 'success', text: 'Logeado correctamente', title: ':D!' } }

    case MODIFY_USER:

      if(payload === 'Incorrect') return {...state, msg: payload}
      return { ...state, user: payload, msg: 'Correct' }

    case DELETE_USER:
      const usersUpdated = state.users.filter(user => user.id !== payload)
      return { ...state, users: usersUpdated, user: {} }

    case SET_TOKEN:
      return { ...state, token: payload.token, rol: payload.rol, }

    case IS_VALID_TOKEN:
      if (!payload) return { ...state, validToken: payload, user: {}, token: null, rol: null }
      return { ...state, validToken: payload }

    case LOG_OUT:
      return { ...state, token: null, rol: null, validToken: false, id: null, user: {} }

    case USER_CLEAN_MSG_INFO:
      return { ...state, msg: {} }

    case USER_CLEAN:
      return { ...state, validUser: false, user: {} }
      
    case USER_MODIFY_STARS:
      const { updatedUser, error } = payload;
      if (updatedUser && !error) return { ...state, user: updatedUser }
      return { ...state }
      
    default:
      return state
  }
}
