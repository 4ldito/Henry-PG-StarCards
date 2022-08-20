import { combineReducers } from 'redux'
import starsPackReducer from './starsPack'
import shopCartReducer from './shopCart'
import userReducer from './user'
import cardsPacksReducer from './cardsPack'
import detailReducer from './detail'
import album from './album'

// const rootReducer = combineReducers({ testReducer, activities });
const rootReducer = combineReducers(
  {
    starsPackReducer,
    shopCartReducer,
    userReducer,
    album,
    cardsPacksReducer,
    detailReducer
  })

export default rootReducer
