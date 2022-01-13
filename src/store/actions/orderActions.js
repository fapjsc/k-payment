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
    if (!response.ok) {
      throw new Error(data.msg || 'Could not fetch open order api');
    }
    if (data.code !== 200) {
      throw new Error(data.msg || 'Fetch open order fail.');
    }

    dispatch({
      type: orderActionTypes.OPEN_ORDER_SUCCESS,
      payload: data.data[0],
    });
  } catch (error) {
    dispatch({
      type: orderActionTypes.OPEN_ORDER_FAIL,
      payload: error.message || 'Something went wrong.',
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
    if (!response.ok) {
      throw new Error(data.msg || 'Could not fetch exRage');
    }
    if (data.code !== 200) {
      throw new Error(data.msg || 'Fetch exRate fail.');
    }

    dispatch({
      type: orderActionTypes.EX_RATE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: orderActionTypes.EX_RATE_FAIL,
      payload: error.message || 'Something went wrong.',
    });
  }
};

export const getOrderToken = (id, orderData) => async (dispatch) => {
  dispatch({ type: orderActionTypes.ORDER_TOKEN_REQUEST });
  try {
    const { name, amount } = orderData || {};
    const headers = getHeaders(id);
    const url = '/j/DI_Buy1.aspx';
    const body = JSON.stringify({
      ClientName: name,
      UsdtAmt: amount,
    });

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.msg || 'Could not fetch exRage');
    }
    if (data.code !== 200) {
      throw new Error(data.msg || 'Fetch exRate fail.');
    }

    dispatch({
      type: orderActionTypes.ORDER_TOKEN_SUCCESS,
      payload: data.data.order_token,
    });
  } catch (error) {
    dispatch({
      type: orderActionTypes.ORDER_TOKEN_FAIL,
      payload: error.message || 'Something went wrong.',
    });
  }
};