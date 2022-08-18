import { combineReducers } from 'redux'
import starsPackReducer from './starsPack'
import shopCartReducer from './shopCart'
import userReducer from './user'
import inventory from './inventory'

// const rootReducer = combineReducers({ testReducer, activities });
const rootReducer = combineReducers(
  {
    starsPackReducer,
    shopCartReducer,
    userReducer,
    inventory
  })

export default rootReducer
