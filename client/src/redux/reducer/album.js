import { GET_ALL_CARDS } from './../actions/cards/getAllCards';
import { FILTER_CARDS } from './../actions/cards/filterCards';
import { SORT_CARDS } from './../actions/cards/sortCards';
import { SEARCH_CARD } from './../actions/cards/searchCard';
import { GET_USER_CARDS, FILTER_USER_CARDS, SORT_USER_CARDS, SEARCH_USER_CARD } from '../actions/cards/userCards';


const initialState = {
  cards: [],
  filteredCards: [],
  userCards: [],
  filteredUserCards: []
}

export default function inventory(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ALL_CARDS:
      return { ...state, cards: payload, filteredCards: payload }
    case FILTER_CARDS:
      return { ...state, filteredCards: payload }
    case SORT_CARDS:
      return { ...state, filteredCards: payload }
    case SEARCH_CARD:
      return { ...state, filteredCards: payload }
    case GET_USER_CARDS:
      return { ...state, userCards: payload.userCardsInventory, userCardsNotRepeated: payload.notRepeated }
    case FILTER_USER_CARDS:

      return { ...state, filteredUserCards: payload }
    case SORT_USER_CARDS:
      return { ...state, filteredUserCards: payload }
    case SEARCH_USER_CARD:
      console.log(payload);
      return { ...state, filteredUserCards: payload }
    default:
      return state
  }
}
