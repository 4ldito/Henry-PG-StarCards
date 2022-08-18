import { GET_ALL_CARDS_PACKS, BUY_CARD_PACK } from './../actions/actionTypes'

const initialState = {
  cardsPacks: [],
  msg: { type: '', info: '', title: '' },
  loaded: false
}

export default function cardsPacksReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ALL_CARDS_PACKS:
      return { ...state, cardsPacks: payload, loaded: true }
    case BUY_CARD_PACK:
      const { msg, pack, error } = payload;

      if (error) return { ...state, msg: { type: 'error', info: error, title: 'Error!' } }
      const selectedPack = state.cardsPacks.find(p => p.id === pack.id)
      selectedPack.stock = pack.stock;
      return { ...state, cardsPacks: [...state.cardsPacks], msg: { type: 'success', info: msg, title: 'Compra finalizada' } }
    default:
      return state
  }
}
