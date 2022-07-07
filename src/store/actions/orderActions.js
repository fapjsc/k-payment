// import axios from 'axios';
import { getHeaders } from '../../utils/api';
import orderActionTypes from '../types/orderTypes';

export const openOrder = (id) => async (dispatch) => {
  dispatch({ type: orderActionTypes.OPEN_ORDER_REQUEST });
  try {
    const headers = getHeaders(id);
    const url = '/j/DI_OpenOrder.aspx';
    const response = await fetch(url, { headers });
    const data = await response.json();

    if (data.code !== 200) {
      throw new Error(data.code);
    }

    if (!response.ok) {
      throw new Error(data.code);
    }

    dispatch({
      type: orderActionTypes.OPEN_ORDER_SUCCESS,
      payload: data.data[0],
    });
  } catch (error) {
    dispatch({
      type: orderActionTypes.OPEN_ORDER_FAIL,
      payload: error.message,
    });
  }
};

export const getOrderDetail = ({ token, id }) => async (dispatch) => {
  dispatch({ type: orderActionTypes.ORDER_DETAIL_REQUEST });
  try {
    const headers = getHeaders(id);
    const url = '/j/DI_TxDetail.aspx';

    const body = JSON.stringify({
      Token: token,
    });

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
    });

    const data = await response.json();

    if (data.code !== 200) {
      throw new Error(data.code);
    }

    if (!response.ok) {
      throw new Error(data.code);
    }

    dispatch({
      type: orderActionTypes.ORDER_DETAIL_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: orderActionTypes.ORDER_DETAIL_FAIL,
      payload: error.message,
    });
  }
};

export const getExRate = (id) => async (dispatch) => {
  dispatch({ type: orderActionTypes.EX_RATE_REQUEST });
  try {
    const headers = getHeaders(id);
    const url = '/j/DI_exrate.aspx';
    const response = await fetch(url, { headers });

    const data = await response.json();

    if (data.code !== 200) {
      throw new Error(data.code);
    }

    if (!response.ok) {
      throw new Error(0);
    }

    dispatch({
      type: orderActionTypes.EX_RATE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: orderActionTypes.EX_RATE_FAIL,
      payload: error.message,
    });
  }
};

export const getOrderToken = (id, orderData) => async (dispatch) => {
  dispatch({ type: orderActionTypes.ORDER_TOKEN_REQUEST });
  try {
    const { clientName, buyAmount } = orderData || {};
    const headers = getHeaders(id);
    const url = '/j/DI_Buy1.aspx';
    const body = JSON.stringify({
      ClientName: clientName,
      UsdtAmt: buyAmount,
    });

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
    });

    const data = await response.json();

    if (data.code !== 200) {
      throw new Error(data.code);
    }

    if (!response.ok) {
      throw new Error(data.code);
    }

    dispatch({
      type: orderActionTypes.ORDER_TOKEN_SUCCESS,
      payload: data.data.order_token,
    });
  } catch (error) {
    dispatch({
      type: orderActionTypes.ORDER_TOKEN_FAIL,
      payload: error.message,
    });
  }
};

export const orderAppeal = ({ id, orderToken }) => async (dispatch) => {
  dispatch({ type: orderActionTypes.APPEAL_REQUEST });

  const headers = getHeaders(id);
  const appealUrl = '/j/DI_Appeal.aspx';

  try {
    const response = await fetch(appealUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        Token: orderToken,
      }),
    });

    const data = await response.json();

    if (data.code !== 200) {
      throw new Error(data.code);
    }

    if (!response.ok) {
      throw new Error(0);
    }

    dispatch({
      type: orderActionTypes.APPEAL_SUCCESS,
      payload: { appealData: data.data },
    });
  } catch (error) {
    dispatch({
      type: orderActionTypes.APPEAL_FAIL,
      payload: error.message,
    });
  }
};

export const setDiOrder = (sessions) => ({
  type: orderActionTypes.DI_ORDER_SESSION,
  payload: sessions,
});

export const confirmBuy = (id, orderToken) => async (dispatch) => {
  dispatch({ type: orderActionTypes.CONFIRM_BUY_REQUEST });
  try {
    const headers = getHeaders(id);
    const url = '/j/DI_Buy2.aspx';

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        Token: orderToken,
      }),
    });

    const data = await response.json();

    if (data.code !== 200) {
      throw new Error(data.code);
    }

    if (!response.ok) {
      throw new Error(0);
    }

    dispatch({
      type: orderActionTypes.CONFIRM_BUY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: orderActionTypes.CONFIRM_BUY_FAIL,
      payload: error.message,
    });
  }
};

export const confirmBuyStatusClear = () => ({
  type: orderActionTypes.CONFIRM_BUY_STATUS_CLEAR,
});

export const openOrderClear = () => ({
  type: orderActionTypes.OPEN_ORDER_STATUS_CLEAR,
});

export const exRateClear = () => ({
  type: orderActionTypes.EX_RATE_STATUS_CLEAR,
});

export const setOrderToken = (token) => ({
  type: orderActionTypes.SET_ORDER_TOKEN,
  payload: token,
});
