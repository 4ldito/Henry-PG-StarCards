import axios from 'axios'
import { USER_MODIFY_STARS } from './user';
export const GET_ALL_CARDS_IN_SALE = 'GET_ALL_CARDS_IN_SALE';
export const CLEAR_FOR_SALE_CARDS = 'CLEAR_FOR_SALE_CARDS';
export const BUY_CARD = 'BUY_CARD';
export const UPDATE_FOR_SALE_CARDS = 'UPDATE_FOR_SALE_CARDS';
export const CLEAR_MSG_MARKET_CARDS = 'CLEAR_MSG_MARKET_CARDS';

export function getForSaleCards() {
    return async function (dispatch) {
        const response = await axios.get('userCards?statusId=onSale');
        dispatch({ type: GET_ALL_CARDS_IN_SALE, payload: response.data });
    }
}

export function buyCard(userCardId, buyerUserId) {
    // console.log(userCardId);
    return async function (dispatch) {
        const response = await axios.patch(`userCards/buy/${userCardId}`, { buyerUserId });

        dispatch({ type: UPDATE_FOR_SALE_CARDS, payload: { userCard: response.data.userCard, sellerUser: response.data.sellerUser } });
        dispatch({ type: USER_MODIFY_STARS, payload: { updatedUser: response.data.buyerUser } });
    }
}

export function removeForSale(userCardId) {
    // console.log(userCardId);
    return async function (dispatch) {
        const response = await axios.patch(`userCards/buy/${userCardId}`, { buyerUserId });

        dispatch({ type: UPDATE_FOR_SALE_CARDS, payload: response.data.userCard });
        // dispatch({ type: USER_MODIFY_STARS, payload: { updatedUser: response.data.buyerUser } });
    }
}

export function clearForSaleCards() {
    return { type: CLEAR_FOR_SALE_CARDS }
}

export function clearMsgMarketCards() {
    return { type: CLEAR_MSG_MARKET_CARDS }
}
