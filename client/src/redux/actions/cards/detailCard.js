import axios from "axios";
export const CARD_DETAIL = 'CARD_DETAIL'

export function detailCard(id) {
  return async function (dispatch) {
    const cards = await axios.get("http://localhost:3001/cards/all");
    const card = cards.data.find(c => c.id === id);
    return dispatch({
      type: CARD_DETAIL,
      payload: card,
    });
  };
}