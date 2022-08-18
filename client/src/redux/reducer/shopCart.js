/* eslint-disable no-case-declarations */
import { ADD_TO_SHOPCART, GET_PREFERENCE_ID, REMOVE_FROM_SHOPCART } from './../actions/actionTypes'

const initialState = {
  shopCart: { starsPack: [], cardsPack: [] },
  loaded: false,
  preferenceId: -1
}

export default function shopCartReducer (state = initialState, { type, payload }) {
  switch (type) {
    case ADD_TO_SHOPCART:
      const { product, quantity, packTypes } = payload
      const alreadyInCart = state.shopCart[packTypes].findIndex(item => item.id === product.id)
      if (alreadyInCart !== -1) {
        const allItems = state.shopCart[packTypes]
        allItems[alreadyInCart].quantity = allItems[alreadyInCart].quantity + quantity
        return { ...state, shopCart: { ...state.shopCart, [packTypes]: [...allItems] } }
      }
      product.quantity = product.quantity + quantity
      // const test = { ...state, shopCart: { ...state.shopCart, [packTypes]: [...state.shopCart[packTypes], product] } }
      return { ...state, shopCart: { ...state.shopCart, [packTypes]: [...state.shopCart[packTypes], product] }, loaded: true }
      // console.log(test.shopCart.cardsPack)
      // return { ...test, loaded: true }
    case REMOVE_FROM_SHOPCART:
      /// Esto es la solucion que se me ocurrio d una, pero si no esta esto cuando eliminas un producto del carrito y dsps lo volves a seleccionar,
      /// aparece con la quantity anterior xdlol
      
      const actualItem = state.shopCart[payload.packTypes].find(item => item.id === payload.product)
      actualItem.quantity = 0
      /// //
      const newCart = state.shopCart[payload.packTypes].filter(item => item.id !== payload.product)
      return { ...state, shopCart: { ...state.shopCart, [payload.packTypes]: [...newCart] } }
    case GET_PREFERENCE_ID:
      return { ...state, preferenceId: payload }
    default:
      return state
  }
}
