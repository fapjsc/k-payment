import orderActionTypes from '../types/orderTypes';

const openOrderInitialState = {
  loading: false,
  orderInfo: null,
  error: '',
};

const exRateInitialState = {
  loading: false,
  rateInfo: null,
  error: '',
};

const getOrderInitialState = {
  loading: false,
  orderToken: null,
  error: '',
};

export const orderReducer = (state = openOrderInitialState, action) => {
  switch (action.type) {
    case orderActionTypes.OPEN_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case orderActionTypes.OPEN_ORDER_SUCCESS:
      return {
        loading: false,
        orderInfo: action.payload,
        error: '',
      };

    case orderActionTypes.OPEN_ORDER_FAIL:
      return {
        loading: false,
        orderInfo: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const exRateReducer = (state = exRateInitialState, action) => {
  switch (action.type) {
    case orderActionTypes.EX_RATE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case orderActionTypes.EX_RATE_SUCCESS:
      return {
        loading: false,
        rateInfo: action.payload,
        error: '',
      };

    case orderActionTypes.EX_RATE_FAIL:
      return {
        loading: false,
        rateInfo: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderTokenReducer = (state = getOrderInitialState, action) => {
  switch (action.type) {
    case orderActionTypes.ORDER_TOKEN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case orderActionTypes.ORDER_TOKEN_SUCCESS:
      return {
        loading: false,
        orderToken: action.payload,
        error: '',
      };

    case orderActionTypes.ORDER_TOKEN_FAIL:
      return {
        loading: false,
        orderToken: null,
        error: action.payload,
      };
    default:
      return state;
  }
};
