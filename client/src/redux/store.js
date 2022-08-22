import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducer/index'
import thunkMiddleware from 'redux-thunk'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
)

const persistor = persistStore(store);
