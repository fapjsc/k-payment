import cancelActionTypes from '../types/cancelTypes';

const initialState = {
  loading: false,
  data: null,
  error: '',
};

export const temp = () => {};

export const cancelOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case cancelActionTypes.CANCEL_ORDER_REQUEST:
      return {
        data: null,
        error: '',
        loading: true,
      };

    case cancelActionTypes.CANCEL_ORDER_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: '',
      };

    case cancelActionTypes.CANCEL_ORDER_FAIL:
      return {
        loading: false,
        orderInfo: null,
        error: action.payload,
      };

    case cancelActionTypes.CANCEL_ORDER_STATUS_CLEAR:
      return initialState;
    default:
      return state;
  }
};
