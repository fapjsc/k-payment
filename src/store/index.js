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

import { cancelOrderReducer } from './reducers/cancelOrderReducer';

import { chatReducers } from './reducers/chatReducers';

const reducer = combineReducers({
  openOrder: orderReducer,
  exRate: exRateReducer,
  orderToken: orderTokenReducer,
  cancelOrder: cancelOrderReducer,
  diOrderSession: diOrderSessionReducer,
  confirmBuy: confirmBuyReducer,
  chat: chatReducers,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
