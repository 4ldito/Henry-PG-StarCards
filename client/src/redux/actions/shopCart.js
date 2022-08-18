import axios from 'axios'
import { ADD_TO_SHOPCART_STARSPACK, REMOVE_FROM_SHOPCART_STARPACK, GET_PREFERENCE_ID } from './actionTypes'

export function addToShopCartStarPack (product, quantity, packTypes) {
  quantity = Number(quantity)
  return {
    type: ADD_TO_SHOPCART_STARSPACK,
    payload: { product, quantity, packTypes }
  }
}

export function removeFromShopCartStarPack (product) {
  return {
    type: REMOVE_FROM_SHOPCART_STARPACK,
    payload: { product }
  }
}

export function getPreferenceId (shopcart) {
  return async function (dispatch) {
    const response = await axios.post('http://localhost:3001/mercadopago/checkout', shopcart)
    dispatch({ type: GET_PREFERENCE_ID, payload: response.data })
  }
}
