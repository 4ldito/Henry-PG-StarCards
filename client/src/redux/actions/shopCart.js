import axios from 'axios'
import { ADD_TO_SHOPCART, BUY_SHOPCART } from './actionTypes'

export function addToShopCart (product) {
  return {
    type: ADD_TO_SHOPCART,
    payload: product
  }
}

export function buyShopCart (shopcart) {
  return async function (dispatch) {
    const response = await axios.post('http://localhost:3001/mercadopago/checkout', shopcart)
    console.log(response)
    dispatch({ type: BUY_SHOPCART, payload: response.data })
  }
}
