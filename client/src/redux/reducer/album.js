import { GET_ALL_CARDS } from './../actions/cards/getAllCards';
import { FILTER_CARDS } from './../actions/cards/filterCards';
import { SORT_CARDS } from './../actions/cards/sortCards';
import { SEARCH_CARD } from './../actions/cards/searchCard';

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
    case SORT_CARDS:
      return { ...state, filteredCards: payload }
    case SEARCH_CARD:
      return { ...state, filteredCards: payload }
    default:
      return state
  }
}