import { SEND_MAIL, MODAL, SUCCESS_ACTION} from "../actions/sendMail"

const initialState = {
    token: '',
    modal: false,
    successAction: false,
}

export default function starsPacksReducer (state = initialState, { type, payload }) {
  switch (type) {
    case SEND_MAIL:
      return { ...state, token: payload }
    case MODAL:
      return { ...state, modal: !state.modal }
    case SUCCESS_ACTION:
      return { ...state, successAction: !state.successAction }
    default:
      return state
  }
}
