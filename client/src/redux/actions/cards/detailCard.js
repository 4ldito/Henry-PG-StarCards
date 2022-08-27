import axios from "axios";
export const CARD_DETAIL = "CARD_DETAIL";

export function detailCard(id) {
  if (id === null) {
    return {
      type: CARD_DETAIL,
      payload: {},
    };
  }
  return async function (dispatch) {
    const card = await axios.get(`cards/${id}`);
    return dispatch({
      type: CARD_DETAIL,
      payload: card.data,
    });
  };
}
