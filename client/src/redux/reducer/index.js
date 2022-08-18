import { combineReducers } from 'redux'
import starsPackReducer from './starsPack'
import shopCartReducer from './shopCart'
import inventory from './inventory'
import cardsPacksReducer from './cardsPack'

// const rootReducer = combineReducers({ testReducer, activities });
const rootReducer = combineReducers(
  {
    starsPackReducer,
    shopCartReducer,
    cardsPacksReducer,
    inventory
  })

export default rootReducer
