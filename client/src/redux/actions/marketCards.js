import axios from 'axios'
export const GET_ALL_CARDS_IN_SALE = 'GET_ALL_CARDS_IN_SALE';
export const CLEAR_FOR_SALE_CARDS = 'CLEAR_FOR_SALE_CARDS';

export function getForSaleCards() {
    return async function (dispatch) {
        const response = await axios.get('userCards?statusId=onSale');
        dispatch({ type: GET_ALL_CARDS_IN_SALE, payload: response.data });
    }
}

export function clearForSaleCards() {
    return { type: CLEAR_FOR_SALE_CARDS }
}
