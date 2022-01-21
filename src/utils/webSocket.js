import ReconnectingWebSocket from 'reconnecting-websocket';
// import { w3cwebsocket as W3CWebsocket } from 'websocket';

import store from '../store';
import { setDiOrder } from '../store/actions/orderActions';

let client;

export const buyConnectWs = (id, orderToken) => {
  if (!id || !orderToken) return;

  const uri = `wss://www.k100u.com/j/ws_orderstatus.ashx?di_order=${id}&order_token=${orderToken}`;

  client = new ReconnectingWebSocket(uri);

  // 1.建立連接
  client.onopen = () => {
    console.log('order websocket connected success');
  };

  // 2.收到server回復
  client.onmessage = (message) => {
    if (!message.data) return;
    const dataFromServer = JSON.parse(message.data);
    // console.log('got reply!', dataFromServer, 'buy');

    store.dispatch(setDiOrder(dataFromServer));
  };

  // 3. 連線關閉
  client.onclose = (message) => {
    console.log('關閉連線', message);
  };

  client.onerror = (error) => {
    console.log('Error', error);
  };
};

export const temp = () => {};
