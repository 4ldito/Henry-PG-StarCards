import { CARD_DETAIL, GET_OPINIONS, POST_OPINIONS } from '../actions/actionTypes'

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
    default:
      return state
  }
}


