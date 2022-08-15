// import axios from 'axios'
import { ADD_TO_SHOPCART } from './actionTypes'

export function addToShopCart (product) {
  return {
    type: ADD_TO_SHOPCART,
    payload: product
  }
}
