import { GET_ALL_CARDS } from "./../actions/cards/getAllCards";
import { FILTER_CARDS } from "./../actions/cards/filterCards";
import { SORT_CARDS } from "./../actions/cards/sortCards";
import { SEARCH_CARD } from "./../actions/cards/searchCard";
import {
  GET_USER_CARDS,
  FILTER_USER_CARDS,
  SORT_USER_CARDS,
  SEARCH_USER_CARD,
  SALE_CARD,
  CLEAN_MSG_USER_CARDS,
} from "../actions/cards/userCards";
import { ADD_CARD_TO_DECK, REMOVE_DECK_CARD } from "../actions/user";

const initialState = {
  cards: [],
  filteredCards: [],
  userCards: [],
  filteredUserCards: [],
  userCardsForSale: [],
  msg: { type: '', info: '', title: '' },
};

export default function inventory(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ALL_CARDS:
      return { ...state, cards: payload, filteredCards: payload };
    case FILTER_CARDS:
      return { ...state, filteredCards: payload };
    case SORT_CARDS:
      return { ...state, filteredCards: payload };
    case SEARCH_CARD:
      return { ...state, filteredCards: payload };
    case GET_USER_CARDS:
      return {
        ...state,
        userCards: payload.userCards,
        // filteredUserCards: payload.userCards,
        userCardsForSale: payload.forSaleCards,
        // userCardsNotRepeated: payload.notRepeated,
      };
    case FILTER_USER_CARDS:
      return { ...state, filteredUserCards: payload };
    case SORT_USER_CARDS:
      return { ...state, filteredUserCards: payload };
    case SEARCH_USER_CARD:
      return { ...state, filteredUserCards: payload };
    case SALE_CARD:
      const actualCard = state.filteredUserCards.find(card => card.id === payload[0].CardId);
      // console.log(payload);
      const msg = { type: 'success', info: `Pusiste a la venta ${payload.length} ${payload[0].Card.name} por ${payload[0].price}`, title: 'Exito!' }
      if (actualCard.repeat - payload.length === 0) {
        const newFilteredUserCards = state.filteredUserCards.filter(card => card.id !== payload[0].CardId);

        return {
          ...state,
          filteredUserCards: newFilteredUserCards,
          msg
        }
      }
      actualCard.repeat = actualCard.repeat - payload.length;
      return { ...state, filteredUserCards: [...state.filteredUserCards], msg }
    case ADD_CARD_TO_DECK:
      const card = state.filteredUserCards.find(e => e.id === payload);
      console.log(card);
      if (card.repeat > 1) card.repeat = card.repeat - 1;
      else {
        let newFilteredUserCards = state.filteredUserCards.filter(e => e.id !== card.id)
        return { ...state, filteredUserCards: newFilteredUserCards }
      }
    case REMOVE_DECK_CARD:
      let cardBack = state.userCards.find(e => e.id === payload);
      if (state.filteredUserCards.find(e => e.id === payload)) {
        cardBack.repeat++;
      } else {
        return { ...state, filteredCards: [...state.filteredUserCards, cardBack] }
      }
    case CLEAN_MSG_USER_CARDS:
      return { ...state, msg: { type: '', info: '', title: '' } }
    default:
      return state;
  }
}
