import axios from 'axios'
export const ADD_TRANSACTION = 'ADD_TRANSACTION';

export function getStarsPacks () {
  return async function (dispatch) {
    const response = await axios.post('transaction/')

    dispatch({ type: ADD_TRANSACTION, payload: response.data })
  }
}
