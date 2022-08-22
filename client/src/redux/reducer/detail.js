
import { CARD_DETAIL } from './../actions/cards/detailCard';
import { GET_OPINIONS } from './../actions/cards/getOpinions';
import { POST_OPINIONS } from './../actions/cards/postOpinions';

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


