import { combineReducers } from 'redux';
import starsPackReducer from './starsPack';
import shopCartReducer from './shopCart';
import userReducer from './user';
import cardsPacksReducer from './cardsPack';
import detailReducer from './detail';
import sendMailReducer from './sendMail';
import album from './album';
import marketCardsReducer from './marketCards';
import transactionsReducer from './transaction';
import admin from './admin';

import { RESET_REDUX_STATE } from "../actions"

// const rootReducer = combineReducers({ testReducer, activities });
const appReducer = combineReducers(
  {
    starsPackReducer,
    shopCartReducer,
    userReducer,
    album,
    cardsPacksReducer,
    detailReducer,
    sendMailReducer,
    marketCardsReducer,
    transactionsReducer,
    admin
  })

export function rootReducer(state, action) {
  switch (action.type) {
    case RESET_REDUX_STATE:
      return appReducer(undefined, action);
    default:
      return appReducer(state, action);
  }
}


export default rootReducer
