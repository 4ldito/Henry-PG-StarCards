import { formatDate } from "../../utils";
import { FILTER_TRANSACTIONS, GET_ALL_TRANSACTIONS, GET_TRANSACTIONS_BY_USER } from "../actions/transaction"

const initialState = {
    transactions: [],
    filteredTransactions: [],
    transactionsUser: []
}

export default function transactionsReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_ALL_TRANSACTIONS:
            return { ...state, transactions: payload, filteredTransactions: payload }
        case GET_TRANSACTIONS_BY_USER:
            return { ...state, transactionsUser: payload }
        case FILTER_TRANSACTIONS:
            const { filters } = payload;
            let newFilteredTransactions = state.transactions;
            if (filters.userId) newFilteredTransactions = newFilteredTransactions.filter(t => t.UserId.toLowerCase().includes(filters.userId.toLowerCase().trim()));

            if (filters.type !== 'none') newFilteredTransactions = newFilteredTransactions.filter(transaction => transaction.type === filters.type);

            if (filters.order !== 'none') {
                switch (filters.order) {
                    case 'priceStarsASC':
                        newFilteredTransactions = newFilteredTransactions.sort((a, b) => a.priceStars - b.priceStars);
                        break;
                    case 'priceStarsDES':
                        newFilteredTransactions = newFilteredTransactions.sort((a, b) => b.priceStars - a.priceStars);
                        break;
                    case 'priceMoneyASC':
                        newFilteredTransactions = newFilteredTransactions.sort((a, b) => a.priceMoney - b.priceMoney);
                        break;
                    case 'priceMoneyDES':
                        newFilteredTransactions = newFilteredTransactions.sort((a, b) => b.priceMoney - a.priceMoney);
                        break;
                    case 'transactionIdASC':
                        newFilteredTransactions = newFilteredTransactions.sort((a, b) => a.id - b.id);
                        break;
                    case 'transactionIdDES':
                        newFilteredTransactions = newFilteredTransactions.sort((a, b) => b.id - a.id);
                        break;
                    default:
                        break;
                }
            }
            if (filters.onlyToday) {
                const today = new Date().toISOString().slice(0, 10);
                newFilteredTransactions = newFilteredTransactions.filter(transaction => formatDate(transaction.createdAt) === today);
                console.log(newFilteredTransactions);
            }
            // console.log('devuelve', newFilteredTransactions);
            return { ...state, filteredTransactions: [...newFilteredTransactions] }
        default:
            return state
    }
}
