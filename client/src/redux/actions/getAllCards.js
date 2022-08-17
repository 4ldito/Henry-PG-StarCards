import axios from 'axios'
import { GET_ALL_CARDS } from './actionTypes'

export default function getAllCards () {
  return async function (dispatch) {
    const response = await axios.get('http://localhost:3001/cards')
    dispatch({ type: GET_ALL_CARDS, payload: response.data })
  }
}
