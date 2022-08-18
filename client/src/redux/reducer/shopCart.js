/* eslint-disable no-case-declarations */
import { ADD_TO_SHOPCART_STARSPACK, GET_PREFERENCE_ID, REMOVE_FROM_SHOPCART_STARPACK } from './../actions/actionTypes'

const initialState = {
  shopCart: { starsPack: [], cardsPack: [] },
  loaded: false,
  preferenceId: -1
}

export default function shopCartReducer (state = initialState, { type, payload }) {
  switch (type) {
    case ADD_TO_SHOPCART_STARSPACK:
      const { product, quantity, packTypes } = payload
      console.log(state.shopCart[packTypes])
      const alreadyInCart = state.shopCart[packTypes].findIndex(item => item.id === product.id)
      if (alreadyInCart !== -1) {
        const allItems = state.shopCart[packTypes]
        allItems[alreadyInCart].quantity = allItems[alreadyInCart].quantity + quantity
        return { ...state, shopCart: { ...state.shopCart, [packTypes]: [...allItems] } }
      }
      product.quantity = product.quantity + quantity
      return { ...state, shopCart: { ...state.shopCart, [packTypes]: [...state.shopCart[packTypes], product] }, loaded: true }
    case REMOVE_FROM_SHOPCART_STARPACK:
      /// Esto es la solucion que se me ocurrio d una, pero si no esta esto cuando eliminas un producto del carrito y dsps lo volves a seleccionar,
      /// aparece con la quantity anterior xdlol
      const actualItem = state.shopCart.starsPack.find(item => item.id === payload.product)
      actualItem.quantity = 0
      /// //
      const newCart = state.shopCart.starsPack.filter(item => item.id !== payload.product)
      return { ...state, shopCart: { ...state.shopCart, starsPack: [...newCart] } }
    case GET_PREFERENCE_ID:
      return { ...state, preferenceId: payload }
    default:
      return state
  }
}
