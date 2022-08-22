import { CREATE_USER, DELETE_USER, GET_ALL_USERS, GET_USER, IS_VALID_TOKEN, LOG_OUT, MODIFY_USER, SET_TOKEN, SIGN_IN, USER_CLEAN_MSG_INFO } from "../actions/user"

const initialState = {
  user: {},
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
    case GET_USER:
      return { ...state, user: payload }

    case GET_ALL_USERS:
      return { ...state, users: payload }

    case CREATE_USER:
      if (payload.error) return { ...state, user: {}, token: null, id: null, rol: null, validToken: false, msg: { type: 'error', text: payload.error, title: 'Error!' } }

      return { ...state, id: payload.id, token: payload.token, rol: payload.rol, validToken: true, user: payload.user, msg: { type: 'success', text: 'Logeado correctamente', title: ':D!' } }

    case SIGN_IN:
      if (payload.error) return { ...state, user: {}, token: null, id: null, rol: null, validToken: false, msg: { type: 'error', text: payload.error, title: 'Error!' } }

      return { ...state, id: payload.id, token: payload.token, rol: payload.rol, validToken: true, user: payload.user, msg: { type: 'success', text: 'Logeado correctamente', title: ':D!' } }

    case MODIFY_USER:
      console.log(payload)
      if(payload === 'Incorrect') return {...state, validPassword: payload}
      return { ...state, user: payload }

    case DELETE_USER:
      const usersUpdated = state.users.filter(user => user.id !== payload)
      return { ...state, users: usersUpdated, user: {} }

    case SET_TOKEN:
      return { ...state, token: payload.token, rol: payload.rol, }

    case IS_VALID_TOKEN:
      if (!payload) return { ...state, validToken: payload, user: {}, token: null, rol: null }
      return { ...state, validToken: payload }

    case LOG_OUT:
      return { ...state, token: null, rol: null, validToken: false, id: null, user: null }

    case USER_CLEAN_MSG_INFO:
      return { ...state, msg: {} }

    default:
      return state
  }
}
