import axios from 'axios'
import { GET_ALL_CARDS_PACKS, BUY_CARD_PACK } from './actionTypes'

export function getCardsPacks() {
  return async function (dispatch) {
    const response = await axios.get('http://localhost:3001/packs/all')
    dispatch({ type: GET_ALL_CARDS_PACKS, payload: response.data })
  }
}

export const buyCardPack = (info) => {
  return async function (dispatch) {
    const response = await axios.post('http://localhost:3001/packs/buy', info)
    dispatch({ type: BUY_CARD_PACK, payload: response.data })
  }
}
