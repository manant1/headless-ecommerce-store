import { applyMiddleware, combineReducers, createStore, compose } from "redux"
import { persistStore, persistReducer } from 'redux-persist';
import cartReducer, { CartState } from "./reducers/cart"
import AsyncStorage from '@react-native-community/async-storage';
import thunk from 'redux-thunk';
import { UserState } from "./reducers/user"

export interface AppState {
  cart: CartState,
  user: UserState
}

const rootReducer = combineReducers({
  cart: cartReducer
})

const persistConfig: any = {
  key: 'root',
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const composeEnhancers = typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default (preloadedState = {}) => {
  const store = createStore(
    persistedReducer,
    preloadedState, // initial state
    composeEnhancers(applyMiddleware(thunk))
  );
  const persistor = persistStore(store);
  return { store, persistor };
}