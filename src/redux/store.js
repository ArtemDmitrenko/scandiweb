// import { combineReducers } from 'redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import { composeWithDevTools } from 'redux-devtools-extension';
import currencyReducer from './currency/currencyReducer';
import cartProductsReducer from './cartProducts/cartProductsReducer';

const rootReducer = combineReducers({
  currencyReducer,
  cartProductsReducer
});

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore(rootReducer, composeWithDevTools());
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export const persistor = persistStore(store);
export default store;
