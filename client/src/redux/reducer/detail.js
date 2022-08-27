import { CARD_DETAIL } from "../actions/cards/detailCard";
import {
  PUT_OPINIONS,
  GET_OPINIONS,
  POST_OPINIONS,
} from "../actions/cards/opinion";

const initialState = {
  card: {},
  opinion: [],
};

export default function detailReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CARD_DETAIL:
      return { ...state, card: payload };
    case GET_OPINIONS:
      return { ...state, opinion: payload };
    case POST_OPINIONS:
      return { ...state, opinion: payload };
    case PUT_OPINIONS:
      return { ...state, opinion: payload };
    default:
      return state;
  }
}
