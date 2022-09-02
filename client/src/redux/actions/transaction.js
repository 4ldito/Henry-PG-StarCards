import axios from 'axios'
export const GET_ALL_TRANSACTIONS = 'GET_ALL_TRANSACTIONS';
export const FILTER_TRANSACTIONS = 'FILTER_TRANSACTIONS';

export function getAllTransactions() {
  return async function (dispatch) {
    const response = await axios.get('transaction/')

    dispatch({ type: GET_ALL_TRANSACTIONS, payload: response.data })
  }
}

export function filterTransactions(filters) {
  return { type: FILTER_TRANSACTIONS, payload: { filters } }
}