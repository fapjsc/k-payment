import cancelActionTypes from '../types/cancelTypes';

import { getHeaders } from '../../utils/api';

export const cancelOrder = (id, orderToken) => async (dispatch) => {
  dispatch({ type: cancelActionTypes.CANCEL_ORDER_REQUEST });
  try {
    const headers = getHeaders(id);
    const url = '/j/DI_CancelOrder.aspx';

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        Token: orderToken,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.msg || 'Could not fetch cancel api');
    }

    if (data.code !== 200) {
      throw new Error(data.msg || 'cancel order fail.');
    }

    dispatch({
      type: cancelActionTypes.CANCEL_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: cancelActionTypes.CANCEL_ORDER_FAIL,
      payload: error.message || 'Something went wrong.',
    });
  }
};

export const cancelOrderStatusClear = () => ({
  type: cancelActionTypes.CANCEL_ORDER_STATUS_CLEAR,
});
