import axios from 'axios'
import { GET_ALL_STARS_PACKS } from './actionTypes'

export function getStarsPacks () {
  return async function (dispatch) {
    const response = await axios.get('http://localhost:3001/stars-pack/all')
    dispatch({ type: GET_ALL_STARS_PACKS, payload: response.data })
  }
}
