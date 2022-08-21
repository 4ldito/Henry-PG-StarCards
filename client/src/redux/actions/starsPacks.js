import axios from 'axios'
export const GET_ALL_STARS_PACKS = 'GET_ALL_STARS_PACKS';

export function getStarsPacks () {
  return async function (dispatch) {
    const response = await axios.get('http://localhost:3001/stars-pack/all')
    dispatch({ type: GET_ALL_STARS_PACKS, payload: response.data })
  }
}
