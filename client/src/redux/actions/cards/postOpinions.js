import axios from "axios";

export function postOpinions(opinion) {
    return async function (dispatch) {
      const response = await axios.post("http://localhost:3001/opinion", opinion)
    };
  }