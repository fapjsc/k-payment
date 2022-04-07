import { createStore, combineReducers, applyMiddleware } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';

// 持久化存储 state
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Reducer
import {
  orderReducer,
  exRateReducer,
  orderTokenReducer,
  diOrderSessionReducer,
  confirmBuyReducer,
  appealReducer,
  orderDetailReducer,
} from './reducers/orderReducers';

import { cancelOrderReducer } from './reducers/cancelOrderReducer';

import { chatReducers, chatFullScreenReducers } from './reducers/chatReducers';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [], // only member will be persisted
};

const reducer = combineReducers({
  openOrder: orderReducer,
  exRate: exRateReducer,
  orderToken: orderTokenReducer,
  cancelOrder: cancelOrderReducer,
  diOrderSession: diOrderSessionReducer,
  confirmBuy: confirmBuyReducer,
  chat: chatReducers,
  chatFullScreen: chatFullScreenReducers,
  appeal: appealReducer,
  orderDetail: orderDetailReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET_STORE') {
    storage.removeItem('persist:root');
    return reducer(undefined, action);
  }

  return reducer(state, action);
};

const middleware = [thunk];

// 持久化根reducers
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export const persisStore = persistStore(store);
