import axios from "axios";
import { POST_OPINIONS } from "../actionTypes";

export function postOpinions(opinion) {
    return async function (dispatch) {
      const response = await axios.post("http://localhost:3001/opinion", opinion);
      dispatch({ type: POST_OPINIONS, payload: response.data });
    };
  }