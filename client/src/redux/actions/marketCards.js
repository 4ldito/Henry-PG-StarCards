import axios from 'axios';
import { USER_MODIFY_STARS } from './user';
export const GET_ALL_CARDS_IN_SALE = 'GET_ALL_CARDS_IN_SALE';
export const CLEAR_FOR_SALE_CARDS = 'CLEAR_FOR_SALE_CARDS';
export const UPDATE_FOR_SALE_CARDS = 'UPDATE_FOR_SALE_CARDS';
export const CLEAR_MSG_MARKET_CARDS = 'CLEAR_MSG_MARKET_CARDS';
export const REMOVE_FOR_SALE = 'REMOVE_FOR_SALE';

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

export function removeForSale(values) {
    return async function (dispatch) {
      const response = await axios.patch("/userCards", values);
      dispatch({ type: REMOVE_FOR_SALE, payload: response.data })
    };
  }
  

export function clearForSaleCards() {
    return { type: CLEAR_FOR_SALE_CARDS }
}

export function clearMsgMarketCards() {
    return { type: CLEAR_MSG_MARKET_CARDS }
}
