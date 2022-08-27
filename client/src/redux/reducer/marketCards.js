import { CLEAR_FOR_SALE_CARDS, GET_ALL_CARDS_IN_SALE } from "../actions/marketCards"

const initialState = {
    cardsInSale: [],
    loaded: false
}

export default function marketCardsReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_ALL_CARDS_IN_SALE:
            return { ...state, cardsInSale: payload, loaded: true }
        case CLEAR_FOR_SALE_CARDS:
            return { ...state, cardsInSale: [], loaded: false }
        default:
            return state
    }
}