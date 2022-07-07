import ReconnectingWebSocket from 'reconnecting-websocket';
// import { w3cwebsocket as W3CWebsocket } from 'websocket';

import { store } from '../store';
import { setDiOrder } from '../store/actions/orderActions';

let client;

export const buyConnectWs = (id, orderToken) => {
  if (!id || !orderToken) return;

  let uri;

  if (window.location.host.includes('k100u')) {
    uri = `wss://${window.location.host}/j/ws_orderstatus.ashx?di_order=${id}&order_token=${orderToken}`;
  } else {
    alert('connect to demo');
    uri = `wss://demo.k100u.com/j/ws_orderstatus.ashx?di_order=${id}&order_token=${orderToken}`;
  }

  client = new ReconnectingWebSocket(uri);

  // 1.建立連接
  client.onopen = () => {
    console.log('order websocket connected success');
  };

  // 2.收到server回復
  client.onmessage = (message) => {
    if (!message?.data) return;
    const dataFromServer = JSON.parse(message.data);
    console.log('got reply!', dataFromServer);

    store.dispatch(setDiOrder(dataFromServer));
  };

  // 3. 連線關閉
  // eslint-disable-next-line
  client.onclose = (message) => {
    console.log('order 關閉連線');
  };

  client.onerror = (error) => {
    console.log('Error', error);
  };
};

export const temp = () => {};
