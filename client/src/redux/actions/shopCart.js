import axios from 'axios'
import { ADD_TO_SHOPCART, REMOVE_FROM_SHOPCART, GET_PREFERENCE_ID, SHOPCART_BUY_CARDSPACKS, SHOPCART_CLEAN_MSG_INFO } from './actionTypes'

export function addToShopCart(product, quantity, packTypes) {
  quantity = Number(quantity)
  return {
    type: ADD_TO_SHOPCART,
    payload: { product, quantity, packTypes }
  }
}

export function removeFromShopCart(product, packTypes) {
  return {
    type: REMOVE_FROM_SHOPCART,
    payload: { product, packTypes }
  }
}

export const shopcartBuyCardsPacks = (info) => {
  return async function (dispatch) {
    const response = await axios.post('http://localhost:3001/packs/buy', info)
    dispatch({ type: SHOPCART_BUY_CARDSPACKS, payload: response.data })
  }
}

export function getPreferenceId(shopcart) {
  return async function (dispatch) {
    const response = await axios.post('http://localhost:3001/mercadopago/checkout', shopcart)
    dispatch({ type: GET_PREFERENCE_ID, payload: response.data })
  }
}

export function shopCartCleanMsgInfo() {
  return { type: SHOPCART_CLEAN_MSG_INFO }
}