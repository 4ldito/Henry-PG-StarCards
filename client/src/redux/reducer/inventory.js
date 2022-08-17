import { GET_ALL_CARDS, FILTER_CARDS } from '../actions/actionTypes'

const initialState = {
  cards: [],
  filteredCards: []
}

export default function inventory (state = initialState, { type, payload }) {
  switch (type) {
    case GET_ALL_CARDS:
      return { ...state, cards: payload, filteredCards: payload }
    case FILTER_CARDS:
      return { ...state, filteredCards: payload }
    default:
      return state
  }
}
