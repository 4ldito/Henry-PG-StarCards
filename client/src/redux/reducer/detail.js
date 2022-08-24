import { PUT_OPINIONS, GET_OPINIONS, POST_OPINIONS } from '../actions/cards/opinion';
import { CARD_DETAIL } from './../actions/cards/detailCard';

const initialState = {
  card: {},
  opinion: []
}

export default function detailReducer (state = initialState, action) {
  switch (action.type) {
    case CARD_DETAIL:
      return { ...state, card: action.payload }
    case GET_OPINIONS:
      return { ...state, opinion: action.payload }
    case POST_OPINIONS:
      return { ...state, opinion: action.payload }
    case PUT_OPINIONS:
      return { ...state, opinion: action.payload }
    default:
      return state
  }
}
