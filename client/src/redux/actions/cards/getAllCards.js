import axios from "axios";
export const GET_ALL_CARDS = 'GET_ALL_CARDS'

export default function getAllCards() {
  return async function (dispatch) {
    const response = await axios.get("cards/all");
    dispatch({ type: GET_ALL_CARDS, payload: response.data });
  };
}
