// import ReconnectingWebSocket from 'reconnecting-websocket';
import { w3cwebsocket as W3CWebsocket } from 'websocket';

// import store from '../store';

let client;

export const buyConnectWs = (id, orderToken) => {
  if (!id || !orderToken) return;

  const uri = `wss://www.k100u.com/j/ws_orderstatus.ashx?login_session=${id}&order_token=${orderToken}`;
  console.log(uri);

  client = new W3CWebsocket(uri);

  // 1.建立連接
  client.onopen = () => {
    console.log('websocket client connected success');
  };

  // 2.收到server回復
  client.onmessage = (message) => {
    console.log('message from server');
    console.log(message);
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
