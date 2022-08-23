import axios from "axios";
export const GET_OPINIONS = 'GET_OPINIONS'

export function getOpinions(idCard) {
  return async function (dispatch) {
    const response = await axios.get("opinion/all");
    const cardOpinions = response.data.filter(c => c.CardId === idCard)
    dispatch({ type: GET_OPINIONS, payload: cardOpinions });
  };
}