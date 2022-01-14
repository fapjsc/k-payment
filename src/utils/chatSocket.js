import ReconnectingWebSocket from 'reconnecting-websocket';
// import { w3cwebsocket as W3CWebsocket } from 'websocket';

// import store from '../store';

let client;

export const chatConnectWs = (id, orderToken) => {
  console.log('call');
  //   console.log(orderToken, 'token');
  if (!id || !orderToken) return;

  const uri = `wss://chat.k100u.com/WS_ChatOrder.ashx?di_order=${id}&order_token=${orderToken}`;

  console.log(uri);

  client = new ReconnectingWebSocket(uri);

  // 1.建立連接
  client.onopen = () => {
    console.log('chat websocket connected success');
  };

  // 2.收到server回復
  client.onmessage = (message) => {
    console.log('chat message from server');
    console.log(message);
  };

  // 3. 連線關閉
  client.onclose = (message) => {
    console.log('chat 關閉連線', message);
  };

  client.onerror = (error) => {
    console.log('chat Error', error);
  };
};

//** Send Image */
export const sendImg = async (e, token) => {
  console.log(token);
  try {
    const file = e.target.files[0]; // get image

    if (!file) {
      return;
    }

    //   const image = await resizeFile(file);

    // client.send(
    //   JSON.stringify({
    //     Message_Type: 2,
    //     Message: image,
    //     token,
    //   }),
    // );
  } catch (error) {
    alert(error);
  }
};
