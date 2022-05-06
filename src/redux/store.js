import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import currencyReducer from './currency/currencyReducer';
import cartProductsReducer from './cartProducts/cartProductsReducer';

const rootReducer = combineReducers({
  currencyReducer,
  cartProductsReducer
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
