/* eslint-disable no-case-declarations */
import { ADD_TO_SHOPCART, CLEAN_PREFERENCE_ID, GET_PREFERENCE_ID, REMOVE_FROM_SHOPCART, SHOPCART_BUY_CARDSPACKS, SHOPCART_CLEAN_MSG_INFO } from './../actions/actionTypes'

const initialState = {
  shopCart: { starsPack: [], cardsPack: [] },
  loaded: false,
  msg: { type: '', info: '', title: '' },
  preferenceId: -1
}

export default function shopCartReducer(state = initialState, { type, payload }) {
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
    case SHOPCART_BUY_CARDSPACKS:
      const { msg, error, updatedInfo } = payload;
      if (error) return { ...state, msg: { type: 'error', info: error, title: 'Error!' } }
      return { ...state, shopCart: { ...state.shopCart, cardsPack: [] }, msg: { type: 'success', info: msg, title: 'Compra finalizada' } }
    case SHOPCART_CLEAN_MSG_INFO:
      return { ...state, msg: { type: '', info: '', title: '' } }
    case CLEAN_PREFERENCE_ID:
      return { ...state, preferenceId: -1 }
    default:
      return state
  }
}
