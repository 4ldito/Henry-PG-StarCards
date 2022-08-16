/* eslint-disable no-case-declarations */
import { ADD_TO_SHOPCART, BUY_SHOPCART, REMOVE_FROM_SHOPCART } from './../actions/actionTypes'

const initialState = {
  shopCart: [],
  loaded: false,
  bought: false
}

export default function shopCartReducer (state = initialState, { type, payload }) {
  switch (type) {
    case ADD_TO_SHOPCART:
      const { product, quantity } = payload
      // console.log(payload)
      // console.log(state.shopCart)
      const alreadyInCart = state.shopCart.findIndex(item => item.id === product.id)
      if (alreadyInCart !== -1) {
        const allItems = state.shopCart
        allItems[alreadyInCart].quantity = allItems[alreadyInCart].quantity + quantity
        return { ...state, shopCart: [...allItems] }
      }
      product.quantity = product.quantity + quantity
      return { ...state, shopCart: [...state.shopCart, product], loaded: true }
    case REMOVE_FROM_SHOPCART:
      const newCart = state.shopCart.filter(item => item.id !== payload.product)
      return { ...state, shopCart: [...newCart] }
    case BUY_SHOPCART:
      return { ...state, bought: true }
    default:
      return state
  }
}
