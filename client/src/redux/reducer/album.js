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
} from "../actions/cards/userCards";

const initialState = {
  cards: [],
  filteredCards: [],
  userCards: [],
  filteredUserCards: []
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
        userCards: payload.userCardsInventory,
        // userCardsNotRepeated: payload.notRepeated,
      };
    case FILTER_USER_CARDS:
      return { ...state, filteredUserCards: payload };
    case SORT_USER_CARDS:
      return { ...state, filteredUserCards: payload };
    case SEARCH_USER_CARD:
      return { ...state, filteredUserCards: payload };
    case SALE_CARD:
      // x ahora lo dejo asi hasta :D
      console.log(payload);
      console.log(state.filteredUserCards);
      // payload.forEach(userCard => {
      //   const actualUserCard = state.filteredUserCards.find((c) => c.id === userCard.Card.id);
      //   actualUserCard.userCard.statusId = userCard.StatusId;
      // });
      // const newFilteredCards = [];
      // state.filteredUserCards.forEach((card) => {
      //   console.log(card.repeat);
      //   payload.forEach(userCard => {
      //     if (userCard.CardId === card.id) {
      //       --card.repeat;
      //     }
      //   });
      //   newFilteredCards.push(card);
      // });
      const newFilteredUserCards = [];

      state.filteredUserCards.forEach((card) => {
        const actualUserCard = payload.find(forSaleUserCard => forSaleUserCard.id === card.userCard.id);
        if (!actualUserCard) newFilteredUserCards.push(card);
        console.log(actualUserCard);
      });

      console.log(newFilteredUserCards);

      return { ...state, filteredUserCards: newFilteredUserCards };
    default:
      return state;
  }
}
