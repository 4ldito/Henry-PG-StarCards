import { CLEAN_TOKEN,CLEAN_RECIVED_TOKEN, MODAL,VERIFY_TOKEN, SUCCESS_ACTION} from "../actions/sendMail"

const initialState = {
    token: false,
    recivedToken: false,
    modal: false,
    successAction: false,
}

export default function starsPacksReducer (state = initialState, { type, payload }) {
  switch (type) {
    case VERIFY_TOKEN:
      // console.log('payload que vuelve del back',payload,'recivedToken',state.recivedToken)
      return { ...state, token: payload, recivedToken: true}
    case MODAL:
      return { ...state, modal: payload }
    case CLEAN_TOKEN:
      return { ...state, recivedToken: false, token: false}
    case CLEAN_RECIVED_TOKEN:
      return { ...state,  recivedToken: false}
    case SUCCESS_ACTION:
      return { ...state, successAction: !state.successAction }
    default:
      return state
  }
}
