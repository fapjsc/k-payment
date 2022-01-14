import React, { useEffect, useState, useRef } from 'react';

import { isWidgetOpened, Widget } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';

const ChatWidget = () => {
  const [show, setShow] = useState(false);

  const btnRef = useRef(null);
  const sendMessageIconRef = useRef(null);
  const sendImagIconRef = useRef(null);

  useEffect(() => {
    btnRef.current = document.querySelector('.rcw-launcher');
    btnRef.current.addEventListener('click', () => {
      const isOpen = !isWidgetOpened();
      setShow(isOpen);
    });
  }, []);

  useEffect(() => {
    if (!show) return;

    setTimeout(() => {
      sendMessageIconRef.current = document.querySelector('.rcw-send');
      sendMessageIconRef.current.insertAdjacentHTML(
        'afterend',
        '<div class="sendImgIcon" />',
      );

      sendImagIconRef.current = document.querySelector('.sendImgIcon');
      sendImagIconRef.current.addEventListener('click', () => {
        document.getElementById('file1').click();
      });
    }, 0);
  }, [show]);

  return (
    <div>
      <Widget title="Chat" />
      <input
        onChange={(e) => console.log(e)}
        id="file1"
        type="file"
        style={{ display: 'none' }}
      />
    </div>
  );
};
export default ChatWidget;
