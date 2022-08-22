import axios from "axios";
<<<<<<< HEAD

export function postOpinions(opinion) {
    return async function (dispatch) {
      const response = await axios.post("http://localhost:3001/opinion", opinion)
    };
  }
=======
export const POST_OPINIONS = 'POST_OPINIONS'

export function postOpinions(opinion) {
  return async function (dispatch) {
    await axios.post("http://localhost:3001/opinion", opinion);
    const response = await axios.get("http://localhost:3001/opinion/all");
    const cardOpinions = response.data.filter((c) => c.CardId === opinion.cardId);
    dispatch({ type: POST_OPINIONS, payload: cardOpinions });
  };
}
>>>>>>> a8f479057ff220db850f9d2ba68bdbebb68c5554
