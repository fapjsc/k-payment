import ReconnectingWebSocket from 'reconnecting-websocket';
// import { w3cwebsocket as W3CWebsocket } from 'websocket';

import Resizer from 'react-image-file-resizer'; // 圖片壓縮

// Redux
import { store } from '../store';

// actions
import { setChatSession } from '../store/actions/chatActions';

let client;

export const chatConnectWs = (id, orderToken) => {
  if (client) return;
  //   console.log(orderToken, 'token');
  if (!id || !orderToken) return;

  //   const uri = `wss://chat.k100u.com/WS_ChatOrder.ashx?di_order=${id}&order_token=${orderToken}`;
  const uri = `wss://chat.k100u.com/WS_ChatOrder.ashx?order_token=${orderToken}`;

  client = new ReconnectingWebSocket(uri);

  // 1.建立連接
  client.onopen = () => {
    console.log('chat websocket connected success');
  };

  // 2.收到server回復
  client.onmessage = (message) => {
    const dataFromServer = JSON.parse(message.data);
    store.dispatch(setChatSession(dataFromServer));
  };

  // 3. 連線關閉
  // eslint-disable-next-line
  client.onclose = (message) => {
    console.log('chat 關閉連線');
  };

  client.onerror = (error) => {
    console.log('chat Error', error);
  };
};

const resizeFile = (file) => new Promise((resolve) => {
  Resizer.imageFileResizer(
    file,
    1024,
    1024,
    'JPEG',
    100,
    0,
    (uri) => {
      resolve(uri);
    },
    'base64',
  );
});

//** Send Image */
// eslint-disable-next-line
export const sendImg = async (e, token) => {
  try {
    const file = e.target.files[0]; // get image
    if (!file) return;

    const image = await resizeFile(file);

    if (client) {
      client.send(
        JSON.stringify({
          Message_Type: 2,
          Message: image,
        }),
      );
    }

    return {
      ok: true,
      message: 'success',
    };
  } catch (error) {
    return {
      ok: false,
      message: error.message || 'Something went wrong!',
    };
  }
};

// export const closeChatWebsocket = () => {
//   if (client) {
//     client.close();
//   }
// };

export const sendMessage = (message) => {
  if (!client) return;

  client.send(
    JSON.stringify({
      Message_Type: 1,
      Message: message.toString().trim(),
    }),
  );
};
