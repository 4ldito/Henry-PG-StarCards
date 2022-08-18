import axios from 'axios'
import { ADD_TO_SHOPCART, REMOVE_FROM_SHOPCART, GET_PREFERENCE_ID } from './actionTypes'

export function addToShopCart (product, quantity, packTypes) {
  quantity = Number(quantity)
  return {
    type: ADD_TO_SHOPCART,
    payload: { product, quantity, packTypes }
  }
}

export function removeFromShopCart (product, packTypes) {
  return {
    type: REMOVE_FROM_SHOPCART,
    payload: { product, packTypes }
  }
}

export function getPreferenceId (shopcart) {
  return async function (dispatch) {
    const response = await axios.post('http://localhost:3001/mercadopago/checkout', shopcart)
    dispatch({ type: GET_PREFERENCE_ID, payload: response.data })
  }
}
