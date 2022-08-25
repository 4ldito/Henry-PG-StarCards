import axios from "axios";
export const PUT_OPINIONS = "PUT_OPINIONS";

export function putOpinions(opinion) {
  return async function (dispatch) {
    await axios.patch("opinion", opinion);

    const response = await axios.get("opinion/all");
    const cardOpinions = response.data.filter(
      (c) => c.CardId === opinion.cardId
    );

    dispatch({ type: PUT_OPINIONS, payload: cardOpinions });
  };
}
