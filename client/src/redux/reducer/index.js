import { combineReducers } from 'redux'
import starsPackReducer from './starsPack'
import shopCartReducer from './shopCart'
import inventory from './inventory'

// const rootReducer = combineReducers({ testReducer, activities });
const rootReducer = combineReducers(
  {
    starsPackReducer,
    shopCartReducer,
    inventory
  })

export default rootReducer
