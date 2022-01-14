const orderActionTypes = {
  OPEN_ORDER_REQUEST: 'OPEN_ORDER_REQUEST',
  OPEN_ORDER_SUCCESS: 'OPEN_ORDER_SUCCESS',
  OPEN_ORDER_FAIL: 'OPEN_ORDER_FAIL',

  EX_RATE_REQUEST: 'EX_RATE_REQUEST',
  EX_RATE_SUCCESS: 'EX_RATE_SUCCESS',
  EX_RATE_FAIL: 'EX_RATE_FAIL',

  ORDER_TOKEN_REQUEST: 'ORDER_TOKEN_REQUEST',
  ORDER_TOKEN_SUCCESS: 'ORDER_TOKEN_SUCCESS',
  ORDER_TOKEN_FAIL: 'ORDER_TOKEN_FAIL',
  ORDER_TOKEN_CANCEL: 'ORDER_TOKEN_CANCEL',

  DI_ORDER_SESSION: 'DI_ORDER_SESSION',

  CONFIRM_BUY_REQUEST: 'CONFIRM_BUY_REQUEST',
  CONFIRM_BUY_SUCCESS: 'CONFIRM_BUY_SUCCESS',
  CONFIRM_BUY_FAIL: 'CONFIRM_BUY_FAIL',
};

export default orderActionTypes;
