import React, {
  useRef, Fragment, useState, useCallback,
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

console.log(styles);

// eslint-disable-next-line
const Chat = ({refHeight}) => {
  // InitState
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomIndex, setZoomIndex] = useState(null);

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

  // eslint-disable-next-line
  const mobileH = `${((window.innerHeight / 10 - 15) - (refHeight / 10) )}rem`;
  console.log(mobileH, 'chat');

  return (
    <div style={{
      position: 'relative',
      height: isMobile ? mobileH : '83.25rem',
      border: `1px solid ${variable['color-light-grey']}`,
      marginTop: 'auto',
    }}
    >
      <MainContainer>
        <ChatContainer>
          {
            !isMobile && (
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
            )
          }

          <MessageList
            autoScrollToBottomOnMount
          >
            <MessageSeparator content={`今天${moment().format('HH:mm')}`} />

            {chatSessions?.map((chat, index) => {
              const {
                Message_Role: role,
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
                        direction: role === 1 ? 'incoming' : 'outgoing',
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
                            direction: role === 1 ? 'incoming' : 'outgoing',
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
                      textAlign: chat.Message_Role === 1 ? 'left' : 'right',
                    }}
                  >
                    {moment(time).format('HH:mm')}
                  </p>
                </Fragment>
              );
            })}
            {loading && <Loader>Loading</Loader>}
          </MessageList>

          <MessageInput
            onAttachClick={onAttachClickHandler}
            placeholder="對話..."
            onSend={onSend}
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
