import { combineReducers } from 'redux'
import starsPackReducer from './starsPack'
import shopCartReducer from './shopCart'
import getAllCards from './getAllCards'

// const rootReducer = combineReducers({ testReducer, activities });
const rootReducer = combineReducers(
  {
    starsPackReducer,
    shopCartReducer,
    getAllCards
  })

export default rootReducer
