import React, { useEffect, useState } from 'react';

// Chat Socket
// import { useSelector, useDispatch } from 'react-redux';
import { isWidgetOpened, Widget } from 'react-chat-widget';
// import { sendMessage, sendImg } from '../../lib/chatSocket';

// Redux

// Actions
// import { removeUnreadMessageCount } from '../../store/actions/messageActions';

import 'react-chat-widget/lib/styles.css';

// import buyerLogo from '../../asset/buyer.png';
// import csLogo from '../../asset/cs.png';
// import sellLogo from '../../asset/seller.png';

const ChatWidget = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const btnEl = document.querySelector('.rcw-launcher');
    btnEl.addEventListener('click', () => {
      const isOpen = !isWidgetOpened();
      setShow(isOpen);
    });
  }, []);

  useEffect(() => {
    if (!show) return;

    const sendImgIconEl = document.querySelector('.sendImgIcon');

    if (sendImgIconEl) return;

    setTimeout(() => {
      const sendMessageBtn = document.querySelector('.rcw-send');
      sendMessageBtn.insertAdjacentHTML(
        'afterend',
        '<div class="sendImgIcon" />',
      );
    }, 0);
  }, [show]);

  return (
    <div>
      <Widget title="Chat" />
      <input
        // onChange={(e) => sendImg(e, selectToken)}
        id="file1"
        type="file"
        style={{ display: 'none' }}
      />
    </div>
  );
};
export default ChatWidget;
