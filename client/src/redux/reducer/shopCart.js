import { ADD_TO_SHOPCART, BUY_SHOPCART } from './../actions/actionTypes'

const initialState = {
  shopCart: [],
  loaded: false,
  bought: false
}

export default function shopCartReducer (state = initialState, { type, payload }) {
  switch (type) {
    case ADD_TO_SHOPCART:
      return { ...state, shopCart: [...state.shopCart, payload], loaded: true }
    case BUY_SHOPCART:
      return { ...state, bought: true }
    default:
      return state
  }
}
