import { createStore, combineReducers, applyMiddleware } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';

import {
  orderReducer,
  exRateReducer,
  orderTokenReducer,
  diOrderSessionReducer,
  confirmBuyReducer,
} from './reducers/orderReducers';

const reducer = combineReducers({
  openOrder: orderReducer,
  exRate: exRateReducer,
  orderToken: orderTokenReducer,
  diOrderSession: diOrderSessionReducer,
  confirmBuy: confirmBuyReducer,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
