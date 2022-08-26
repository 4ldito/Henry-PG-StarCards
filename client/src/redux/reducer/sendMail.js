import { CLEAN_TOKEN,CLEAN_RECIVED_TOKEN, MODAL,VERIFY_TOKEN, SUCCESS_ACTION,CHANGE_RENDER} from "../actions/sendMail"

const initialState = {
    token: false,
    recivedToken: false,
    modal: false,
    successAction: false,
    render: true
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
    case CHANGE_RENDER:
      return { ...state,  render: !state.render}
    case SUCCESS_ACTION:
      return { ...state, successAction: !state.successAction }
    default:
      return state
  }
}
