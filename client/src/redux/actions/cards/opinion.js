import axios from "axios";
export const GET_OPINIONS = "GET_OPINIONS";
export const POST_OPINIONS = "POST_OPINIONS";
export const PUT_OPINIONS = "PUT_OPINIONS";

export function getOpinions(cardId) {
  if (cardId === null) {
    return {
      type: GET_OPINIONS,
      payload: [],
    };
  }

  return async function (dispatch) {
    const response = await axios.get(`opinion/${cardId}`);
    dispatch({ type: GET_OPINIONS, payload: response.data });
  };
}

export function postOpinions(opinion) {
  try {
    return async function (dispatch) {
      await axios.post("/opinion", opinion);
      const response = await axios.get(`opinion/${opinion.cardId}`);
      const cardOpinions = response.data.filter(
        (c) => c.CardId === opinion.cardId
      );
      dispatch({ type: POST_OPINIONS, payload: cardOpinions });
    };
  } catch (error) {
    console.log({ mesg: error.message });
  }
}

export function putOpinions(opinion) {
  return async function (dispatch) {
    await axios.patch("opinion", opinion);

    const response = await axios.get(`opinion/${opinion.cardId}`);
    const cardOpinions = response.data.filter(
      (c) => c.CardId === opinion.cardId
    );

    dispatch({ type: PUT_OPINIONS, payload: cardOpinions });
  };
}
