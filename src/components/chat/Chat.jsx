import React, {
  useRef,
  Fragment,
  useState,
  useCallback,
  useEffect,
} from 'react';

// Moment
import moment from 'moment';

import { Controlled as ControlledZoom } from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Antd
import { Space } from 'antd';

// Chat kit
// eslint-disable-next-line
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationHeader,
  MessageSeparator,
  Loader,
  //   Avatar,
} from '@chatscope/chat-ui-kit-react';

// Actions
import { setLoading } from '../../store/actions/chatActions';

// Images
import chatImage from '../../asset/chat_icon.png';

// Websocket
import { sendMessage, sendImg } from '../../utils/chatSocket';

// Hooks
import useRwd from '../../hooks/useRwd';

// Styles
import variable from '../../sass/variable.module.scss';
import './Chat.scss';

// console.log(styles);

const Chat = ({
  // eslint-disable-next-line
  refHeight,
  // eslint-disable-next-line
  fullScreenHandler,
  // eslint-disable-next-line
  fullScreen,
  // eslint-disable-next-line
  status,
}) => {
  // InitState
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomIndex, setZoomIndex] = useState(null);
  // const [messageText, setMessageText] = useState('');
  console.log(refHeight);
  // Hooks
  const { isMobile } = useRwd();

  // Redux
  const dispatch = useDispatch();
  const { chatSessions, loading } = useSelector((state) => state.chat);

  const handleZoomChange = useCallback((shouldZoom) => {
    setIsZoomed(shouldZoom);
  }, []);

  // Ref
  const imgInput = useRef();

  const onSend = (values) => {
    if (!values) return;

    sendMessage(values);
  };

  const onAttachClickHandler = (value) => {
    imgInput.current.click();
  };

  const imgOnChange = (e) => {
    dispatch(setLoading());
    sendImg(e);
  };

  const setZoomIndexHandler = (index) => {
    setZoomIndex(index);
  };

  const onChange = () => {
    // console.log(e);
    // fullScreenHandler(true);
  };

  useEffect(() => {
    document.addEventListener('paste', (e) => {
      e.preventDefault();
      const text = e.clipboardData.getData('text/plain');
      document.execCommand('insertText', false, text);
    });

    return () => {
      document.removeEventListener('paste');
    };
  }, []);

  return (
    <div
      onClick={() => { fullScreenHandler(true); }}
      onKeyDown={() => { console.log('keydonw'); }}
      role="presentation"
      style={{
        position: 'relative',
        height:
          // eslint-disable-next-line
          fullScreen && isMobile
            ? window.innerHeight - 50 - 10
            : isMobile
              ? refHeight || window.innerHeight - 140 - 50 - 5
              : '75rem',
      }}
    >
      <MainContainer>
        <ChatContainer>
          {!isMobile && (
            <ConversationHeader style={{ height: '6.3rem' }}>
              <ConversationHeader.Content>
                <Space>
                  <img style={{ width: '4.2rem' }} src={chatImage} alt="chat" />
                  <span
                    style={{
                      fontSize: '1.6rem',
                      color: variable['color-primary'],
                    }}
                  >
                    對話紀錄
                  </span>
                </Space>
              </ConversationHeader.Content>
            </ConversationHeader>
          )}

          <MessageList autoScrollToBottomOnMount>
            <MessageSeparator content={`今天${moment().format('HH:mm')}`} />

            {chatSessions?.map((chat, index) => {
              const {
                Message_Role: role,
                // eslint-disable-next-line
                Sysdate: time,
                Message_Type: type,
                Message: message,
              } = chat || {};

              return (
                <Fragment
                  // eslint-disable-next-line
                  key={index}
                >
                  {type === 1 && (
                    <Message
                      className="text-message"
                      style={{ width: '70%' }}
                      model={{
                        message: message,
                        direction: role === 1 ? 'outgoing' : 'incoming',
                      }}
                    />
                  )}

                  {type === 2 && (
                    <div
                      onClick={() => setZoomIndexHandler(index)}
                      onKeyDown={() => console.log('keydown')}
                      role="presentation"
                    >
                      <ControlledZoom
                        isZoomed={isZoomed && zoomIndex === index}
                        onZoomChange={handleZoomChange}
                      >
                        <Message
                          style={{ width: isZoomed ? '100%' : '70%' }}
                          model={{
                            direction: role === 1 ? 'outgoing' : 'incoming',
                          }}
                        >
                          <Message.ImageContent
                            width="100%"
                            src={message}
                            alt="avatar"
                          />
                        </Message>
                      </ControlledZoom>
                    </div>
                  )}

                  <p
                    style={{
                      color: variable['color-secondary'],
                      textAlign: chat.Message_Role === 1 ? 'right' : 'left',
                    }}
                  >
                    {time.split(' ')[1].split(':')[0]}
                    :
                    {time.split(' ')[1].split(':')[1]}
                  </p>
                </Fragment>
              );
            })}
            {loading && <Loader>Loading</Loader>}
            {(status === 1 || status > 90) && (
              <MessageSeparator content="對話結束" />
            )}
          </MessageList>

          <MessageInput
            onClick={onChange}
            onAttachClick={onAttachClickHandler}
            placeholder="對話..."
            onSend={onSend}
            disabled={status === 1 || status > 90}
          />
        </ChatContainer>
      </MainContainer>

      <input
        ref={imgInput}
        id="upload_img"
        style={{ display: 'none' }}
        type="file"
        onChange={imgOnChange}
      />
    </div>
  );
};

export default Chat;
