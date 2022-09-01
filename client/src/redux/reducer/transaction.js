import { GET_ALL_TRANSACTIONS } from "../actions/transaction"

const initialState = {
    transactions: []
}

export default function transactionsReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_ALL_TRANSACTIONS:
            return { ...state, transactions: payload }
        default:
            return state
    }
}
