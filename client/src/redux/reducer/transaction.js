import { FILTER_TRANSACTIONS, GET_ALL_TRANSACTIONS } from "../actions/transaction"

const initialState = {
    transactions: [],
    filteredTransactions: []
}

export default function transactionsReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_ALL_TRANSACTIONS:
            return { ...state, transactions: payload, filteredTransactions: payload }
        case FILTER_TRANSACTIONS:
            const { filters } = payload;
            const newFilteredTransactions = state.transactions;

            if (filters.order !== 'none') {
                switch (order) {
                    case 'ASC_ALPHABETICALLY':
                        filterByName = filterByName.sort((a, b) => a.name.localeCompare(b.name));
                        break;
                    case 'DES_ALPHABETICALLY':
                        filterByName = filterByName.sort((a, b) => b.name.localeCompare(a.name));
                        break;
                    case 'ASC_POPULATION':
                        filterByName = filterByName.sort((a, b) => a.population - b.population);
                        break;
                    case 'DES_POPULATION':
                        filterByName = filterByName.sort((a, b) => b.population - a.population);
                        break;
                    default:
                        break;
                }
            }

            return { ...state }
        default:
            return state
    }
}
