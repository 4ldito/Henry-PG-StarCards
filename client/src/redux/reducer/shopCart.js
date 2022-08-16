/* eslint-disable no-case-declarations */
import { ADD_TO_SHOPCART, BUY_SHOPCART } from './../actions/actionTypes'

const initialState = {
  shopCart: [],
  loaded: false,
  bought: false
}

export default function shopCartReducer (state = initialState, { type, payload }) {
  switch (type) {
    case ADD_TO_SHOPCART:
      // console.log(payload)
      // console.log(state.shopCart)
      const alreadyInCart = state.shopCart.findIndex(item => item.id === payload.id)

      if (alreadyInCart !== -1) {
        const allItems = state.shopCart
        allItems[alreadyInCart].quantity++
        return { ...state, shopCart: [...allItems] }
      }
      return { ...state, shopCart: [...state.shopCart, payload], loaded: true }
    case BUY_SHOPCART:
      return { ...state, bought: true }
    default:
      return state
  }
}
