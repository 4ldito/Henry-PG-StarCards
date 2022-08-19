import { GET_ALL_CARDS_PACKS, BUY_CARD_PACK, CLEAN_MSG_INFO } from './../actions/actionTypes'

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
      const { msg, error, updatedInfo } = payload;
      // En la posicion 0 se encuentra el user
      if (updatedInfo) updatedInfo.shift();
      if (error) return { ...state, msg: { type: 'error', info: error, title: 'Error!' } }

      const data = state.cardsPacks.map(pack => {
        updatedInfo.forEach(updatedPack => {
          if (pack.id === updatedPack.id) {
            pack = { ...updatedPack }
          }
        });
        return pack;
      })

      return { ...state, cardsPacks: [...data], msg: { type: 'success', info: msg, title: 'Compra finalizada' } }
    case CLEAN_MSG_INFO:
      return { ...state, msg: { type: '', info: '', title: '' } }
    default:
      return state
  }
}
