import { CLEAN_TOKEN, MODAL,VERIFY_TOKEN, SUCCESS_ACTION} from "../actions/sendMail"

const initialState = {
    token: '',
    verifyToken: false,
    modal: false,
    successAction: false,
}

export default function starsPacksReducer (state = initialState, { type, payload }) {
  switch (type) {
    case VERIFY_TOKEN:
      console.log('payload que llega',payload)
      return { ...state, token: payload, verifyToken: true}
    case MODAL:
      return { ...state, modal: payload }
    case CLEAN_TOKEN:
      return { ...state, verifyToken: false, token: ''}
    case SUCCESS_ACTION:
      return { ...state, successAction: !state.successAction }
    default:
      return state
  }
}
