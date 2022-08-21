import axios from 'axios'
export const ADD_TO_SHOPCART = 'ADD_TO_SHOPCART';
export const REMOVE_FROM_SHOPCART = 'REMOVE_FROM_SHOPCART';
export const GET_PREFERENCE_ID = 'GET_PREFERENCE_ID';
export const SHOPCART_BUY_CARDSPACKS = 'SHOPCART_BUY_CARDSPACKS';
export const GET_PURCHASE_INFO = 'GET_PURCHASE_INFO';
export const SHOPCART_CLEAN_MSG_INFO = 'SHOPCART_CLEAN_MSG_INFO';
export const CLEAN_PREFERENCE_ID = 'CLEAN_PREFERENCE_ID';
export const SHOPCART_CLEAN_PURCHASE_INFO = 'SHOPCART_CLEAN_PURCHASE_INFO';

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
    const response = await axios.patch('http://localhost:3001/packs/buy', info)
    dispatch({ type: SHOPCART_BUY_CARDSPACKS, payload: response.data })
  }
}

export function getPreferenceId(shopcart, userId) {
  return async function (dispatch) {
    try {
      const response = await axios.post(`http://localhost:3001/mercadopago/checkout/${userId}`, shopcart);
      dispatch({ type: GET_PREFERENCE_ID, payload: response.data })
    } catch (error) {
      console.error('STARCARDS_ERROR', error)
    }
  }
}

export function shopCartCleanMsgInfo() {
  return { type: SHOPCART_CLEAN_MSG_INFO }
}

export function cleanPreferenceId() {
  return { type: CLEAN_PREFERENCE_ID }
}

export function getPurchaseInfo(id) {
  if (id) {
    return async function (dispatch) {
      const response = await axios(`https://api.mercadopago.com/v1/payments/${id}`, { "headers": { "Authorization": "Bearer APP_USR-6913287203050942-081213-9ae4b41c5f23db785ed7c59bdbb34d5e-1178359030" } })
      dispatch({ type: GET_PURCHASE_INFO, payload: response.data })
    }
  } else return { type: GET_PURCHASE_INFO }

}

export function cleanPurchaseInfo() {
  return { type: SHOPCART_CLEAN_PURCHASE_INFO }
}