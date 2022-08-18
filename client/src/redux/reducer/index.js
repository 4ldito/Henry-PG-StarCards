import { combineReducers } from 'redux'
import starsPackReducer from './starsPack'
import shopCartReducer from './shopCart'
<<<<<<< HEAD
import userReducer from './user'
=======
import inventory from './inventory'
>>>>>>> f9ba02673e1ce9845d1b9758912b15999bce473d

// const rootReducer = combineReducers({ testReducer, activities });
const rootReducer = combineReducers(
  {
    starsPackReducer,
    shopCartReducer,
<<<<<<< HEAD
    userReducer
=======
    inventory
>>>>>>> f9ba02673e1ce9845d1b9758912b15999bce473d
  })

export default rootReducer
