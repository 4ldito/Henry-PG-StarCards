import { GET_ALL_CARDS_IN_SALE } from "../actions/marketCards"

const initialState = {
    cardsInSale: [],
    loaded: false
}

export default function marketCardsReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_ALL_CARDS_IN_SALE:
            console.log(payload)
            return { ...state }
        default:
            return state
    }
}
