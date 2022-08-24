import axios from 'axios'
import { USER_MODIFY_STARS } from './user';
export const ADD_TO_SHOPCART = 'ADD_TO_SHOPCART';
export const REMOVE_FROM_SHOPCART = 'REMOVE_FROM_SHOPCART';
export const GET_PREFERENCE_ID = 'GET_PREFERENCE_ID';
export const SHOPCART_BUY_CARDSPACKS = 'SHOPCART_BUY_CARDSPACKS';
export const GET_PURCHASE_INFO = 'GET_PURCHASE_INFO';
export const SHOPCART_CLEAN_MSG_INFO = 'SHOPCART_CLEAN_MSG_INFO';
export const CLEAN_PREFERENCE_ID = 'CLEAN_PREFERENCE_ID';
export const SHOPCART_CLEAN_PURCHASE_INFO = 'SHOPCART_CLEAN_PURCHASE_INFO';
export const MODIFY_QUANTITY = 'MODIFY_QUANTITY';
export const GET_USER_SHOPCART = 'GET_USER_SHOPCART';
// export function addToShopCart(product, quantity, packTypes) {
//   quantity = Number(quantity)
//   return { type: ADD_TO_SHOPCART, payload: { product, quantity, packTypes } }
// }

export const getUserShopCart = (userId) => {
  return async function (dispatch) {
    const { data } = await axios.get(`shopcart/${userId}`);
    dispatch({ type: GET_USER_SHOPCART, payload: data })
  }
}

export const addToShopCart = (product, quantity, packTypes, userId) => {
  return async function (dispatch) {
    quantity = Number(quantity);
    // console.log(userId)
    if (userId) await axios.post(`shopcart/add/${userId}`, { info: { product, quantity, packTypes } });
    dispatch({ type: ADD_TO_SHOPCART, payload: { product, quantity, packTypes } })
  }
}

export function removeFromShopCart(product, packTypes, userId) {
  return async function (dispatch) {
    // console.log(product, packTypes)
    // No se le puede pasar por body a una ruta .delete ??????????
    // if (userId) await axios.delete(`shopcart/remove/${userId}`, { info: { product, packTypes } });
    if (userId) await axios.patch(`shopcart/disable/${userId}`, { info: { product, packTypes } });
    dispatch({ type: REMOVE_FROM_SHOPCART, payload: { product, packTypes } })
  }
}

export const shopcartBuyCardsPacks = (info, userId) => {
  return async function (dispatch) {
    // console.log(userId)
    const response = await axios.patch('packs/buy', { ...info, userId })
    // console.log(response.data)
    dispatch({ type: USER_MODIFY_STARS, payload: response.data })
    dispatch({ type: SHOPCART_BUY_CARDSPACKS, payload: response.data })
  }
}

export function getPreferenceId(shopcart, userId) {
  return async function (dispatch) {
    try {
      const response = await axios.post(`mercadopago/checkout/${userId}`, shopcart);
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
      try {
        const response = await axios(`https://api.mercadopago.com/v1/payments/${id}`, { "headers": { "Authorization": "Bearer APP_USR-6913287203050942-081213-9ae4b41c5f23db785ed7c59bdbb34d5e-1178359030" } })
        dispatch({ type: GET_PURCHASE_INFO, payload: response.data })
      } catch (error) {
        dispatch({ type: GET_PURCHASE_INFO, payload: error.response.data })
      }
    }
  } else return { type: GET_PURCHASE_INFO }

}

export function cleanPurchaseInfo() {
  return { type: SHOPCART_CLEAN_PURCHASE_INFO }
}

export function modifiyQuantity(payload) {
  return { type: MODIFY_QUANTITY, payload }
}