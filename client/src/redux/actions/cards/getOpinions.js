import axios from "axios";
export const GET_OPINIONS = "GET_OPINIONS";

// export function getOpinions(idCard) {
//   if (idCard === null) {
//     return {
//       type: GET_OPINIONS,
//       payload: [],
//     };
//   }
//   return async function (dispatch) {
//     const response = await axios.get("opinion/all");
//     const cardOpinions = response.data.filter(c => c.CardId === idCard)
//     dispatch({ type: GET_OPINIONS, payload: cardOpinions });
//   };
// }

export function getOpinions(cardId) {
  if (cardId === null) {
    return {
      type: GET_OPINIONS,
      payload: [],
    };
  }
  return async function (dispatch) {
    const response = await axios.get(`opinion/${cardId}`);
    // const cardOpinions = response.data.filter(c => c.CardId === idCard)
    dispatch({ type: GET_OPINIONS, payload: response.data });
  };
}
