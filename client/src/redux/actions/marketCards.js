import axios from 'axios'
export const GET_ALL_CARDS_IN_SALE = 'GET_ALL_CARDS_IN_SALE';

export function getStarsPacks() {
    return async function (dispatch) {
        const response = await axios.get('userCards?statusId=onSale');
        console.log(response)
        dispatch({ type: GET_ALL_CARDS_IN_SALE, payload: response.data });
    }
}
