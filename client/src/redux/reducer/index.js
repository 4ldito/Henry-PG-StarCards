import { combineReducers } from 'redux'
import starsPackReducer from './starsPack'
import shopCartReducer from './shopCart'
import userReducer from './user'
import cardsPacksReducer from './cardsPack'
import detailReducer from './detail'
import album from './album'

import { RESET_REDUX_STATE } from "../actions"

// const rootReducer = combineReducers({ testReducer, activities });
const appReducer = combineReducers(
  {
    starsPackReducer,
    shopCartReducer,
    userReducer,
    album,
    cardsPacksReducer,
    detailReducer
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
