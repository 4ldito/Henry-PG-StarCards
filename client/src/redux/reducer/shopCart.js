import { ADD_TO_SHOPCART } from './../actions/actionTypes'

const initialState = {
  shopCart: [],
  loaded: false
}

export default function shopCartReducer (state = initialState, { type, payload }) {
  switch (type) {
    case ADD_TO_SHOPCART:
      return { ...state, shopCart: [...state.shopCart, payload], loaded: true }
    default:
      return state
  }
}
