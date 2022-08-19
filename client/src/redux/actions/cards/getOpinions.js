import axios from "axios";
import { GET_OPINIONS } from "../actionTypes";

export function getOpinions(idCard) {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/opinion/all");
    const cardOpinions = response.data.filter(c => c.CardId === idCard)
    console.log('idCard', idCard)
    console.log('cardOpinions', cardOpinions)
    dispatch({ type: GET_OPINIONS, payload: cardOpinions });
  };
}