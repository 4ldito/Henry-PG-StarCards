import axios from 'axios'
export const GET_ALL_STARS_PACKS = 'GET_ALL_STARS_PACKS';
export const MODIFY_STARS = 'MODIFY_STARS';

export function getStarsPacks() {
  return async function (dispatch) {
    const response = await axios.get('stars-pack/active')
    dispatch({ type: GET_ALL_STARS_PACKS, payload: response.data })
  }
}

export const modifyStarsPack = (id, payload) => {
  return async function (dispatch) {
    const response = await axios.patch(`stars-pack/${id}`, payload)
    dispatch({ type: MODIFY_STARS, payload: response.data })
  }
}