import axios from 'axios'
import { ADD_TO_SHOPCART, REMOVE_FROM_SHOPCART, GET_PREFERENCE_ID, SHOPCART_BUY_CARDSPACKS, SHOPCART_CLEAN_MSG_INFO, CLEAN_PREFERENCE_ID } from './actionTypes'

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
    const response = await axios.post('http://localhost:3001/mercadopago/checkout', shopcart);
    console.log(response.data);
    dispatch({ type: GET_PREFERENCE_ID, payload: response.data })
  }
}

export function shopCartCleanMsgInfo() {
  return { type: SHOPCART_CLEAN_MSG_INFO }
}

export function cleanPreferenceId() {
  return { type: CLEAN_PREFERENCE_ID }
}

export function getPurchaseInfo(id) {
  return async function (dispatch) {
    const response = await axios(`https://api.mercadopago.com/v1/payments/${id}`, { "headers": { "Authorization": "Bearer APP_USR-6913287203050942-081213-9ae4b41c5f23db785ed7c59bdbb34d5e-1178359030" } })
    console.log(response.data);
    // dispatch({ type: GET_PREFERENCE_ID, payload: response.data })
  }
}
