import { GET_ALL_CARDS_PACKS, BUY_CARD_PACK } from './../actions/actionTypes'

const initialState = {
  cardsPacks: [],
  loaded: false
}

export default function cardsPacksReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ALL_CARDS_PACKS:
      return { ...state, cardsPacks: payload, loaded: true }
    case BUY_CARD_PACK:
      console.log(payload)
      return { ...state }
    default:
      return state
  }
}
