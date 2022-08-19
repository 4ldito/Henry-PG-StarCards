import axios from "axios";
import { POST_OPINIONS } from "../actionTypes";

export function postOpinions(opinion) {
  return async function (dispatch) {
    await axios.post("http://localhost:3001/opinion", opinion);
    const response = await axios.get("http://localhost:3001/opinion/all");
    const cardOpinions = response.data.filter((c) => c.CardId === opinion.cardId);
    dispatch({ type: POST_OPINIONS, payload: cardOpinions });
  };
}
