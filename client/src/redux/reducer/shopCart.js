import { ADD_TO_SHOPCART, CLEAN_PREFERENCE_ID, GET_PREFERENCE_ID, GET_PURCHASE_INFO, GET_USER_SHOPCART, MODIFY_QUANTITY, REMOVE_FROM_SHOPCART, SHOPCART_BUY_CARDSPACKS, SHOPCART_CLEAN_MSG_INFO, SHOPCART_CLEAN_PURCHASE_INFO, SHOW_PACK_DETAIL } from "../actions/shopCart"

const initialState = {
  shopCart: { starsPack: [], cardsPack: [] },
  purchaseInfo: {},
  loaded: false,
  msg: { type: '', info: '', title: '' },
  preferenceId: -1,
  showDetail: false
}

export default function shopCartReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_USER_SHOPCART:
      // console.log(payload.shopCart);
      return { ...state, shopCart: { starsPack: payload.shopCart.starsPacks, cardsPack: payload.shopCart.cardsPacks } }
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

    case GET_PURCHASE_INFO:
      if (payload?.message) return { ...state, msg: { type: 'error', info: payload.message, title: 'Error!' } }
      const purchaseInfo = { userId: payload?.additional_info.payer.first_name, items: payload?.additional_info.items }
      return { ...state, shopCart: { ...state.shopCart, starsPack: [] }, purchaseInfo }

    case SHOPCART_CLEAN_MSG_INFO:
      return { ...state, msg: { type: '', info: '', title: '' } }

    case CLEAN_PREFERENCE_ID:
      return { ...state, preferenceId: -1 }

    case SHOPCART_CLEAN_PURCHASE_INFO:
      return { ...state, purchaseInfo: {} }

    case MODIFY_QUANTITY:
      const item = state.shopCart[payload.type].find(i => i.id === payload.id);
      if (payload.modifyType === 'increment') item.quantity++
      else item.quantity--;
      return { ...state, shopCart: { ...state.shopCart, [payload.packType]: [...state.shopCart[payload.type]] } }
    
    case SHOW_PACK_DETAIL:
      return { ...state, showDetail: true }
    default:
      return state
  }
}
