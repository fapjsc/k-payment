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

    case orderActionTypes.OPEN_ORDER_STATUS_CLEAR:
      return openOrderInitialState;
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

    case orderActionTypes.EX_RATE_STATUS_CLEAR:
      return exRateInitialState;
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

    case orderActionTypes.SET_ORDER_TOKEN:
      return {
        ...state,
        orderToken: action.payload,
      };
    default:
      return state;
  }
};

export const diOrderSessionReducer = (state = { sessions: {} }, action) => {
  switch (action.type) {
    case orderActionTypes.DI_ORDER_SESSION:
      return {
        ...state,
        sessions: action.payload,
      };
    default:
      return state;
  }
};

export const confirmBuyReducer = (state = {}, action) => {
  switch (action.type) {
    case orderActionTypes.CONFIRM_BUY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case orderActionTypes.CONFIRM_BUY_SUCCESS:
      return {
        loading: false,
        rateInfo: action.payload,
        error: '',
      };

    case orderActionTypes.CONFIRM_BUY_FAIL:
      return {
        loading: false,
        rateInfo: null,
        error: action.payload,
      };

    case orderActionTypes.CONFIRM_BUY_STATUS_CLEAR:
      return {};

    default:
      return state;
  }
};

const appealInitialState = {
  loading: false,
  orderToken: null,
  error: '',
};

export const appealReducer = (state = appealInitialState, action) => {
  switch (action.type) {
    case orderActionTypes.APPEAL_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case orderActionTypes.APPEAL_SUCCESS:
      return {
        loading: false,
        data: action.payload.appealData,
        error: '',
      };

    case orderActionTypes.APPEAL_FAIL:
      return {
        loading: false,
        data: null,
        error: action.payload.error,
      };

    case orderActionTypes.APPEAL_STATUS_CLEAR:
      return appealInitialState;

    default:
      return state;
  }
};

const orderDetailInitialState = {
  loading: false,
  orderDetail: null,
  error: '',
};

export const orderDetailReducer = (state = orderDetailInitialState, action) => {
  switch (action.type) {
    case orderActionTypes.ORDER_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case orderActionTypes.ORDER_DETAIL_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: '',
      };

    case orderActionTypes.ORDER_DETAIL_FAIL:
      return {
        loading: false,
        data: null,
        error: action.payload,
      };

    case orderActionTypes.CLEAR_ORDER_DETAIL_STATUS:
      return orderDetailInitialState;

    default:
      return state;
  }
};
