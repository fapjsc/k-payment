import React, {
  useRef,
  Fragment,
  useState,
  useCallback,
  useEffect,
} from 'react';

// Moment
import moment from 'moment';

import { ExclamationCircleOutlined } from '@ant-design/icons';

import { Controlled as ControlledZoom } from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Antd
import { Space } from 'antd';

// Chat kit
// eslint-disable-next-line
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

//Image
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationHeader,
  MessageSeparator,
  Loader,
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

const Chat = ({
  // eslint-disable-next-line
  refHeight,
  // eslint-disable-next-line
  fullScreenHandler,
  // eslint-disable-next-line
  status,
  // eslint-disable-next-line
  fullScreen,
}) => {
  // InitState
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomIndex, setZoomIndex] = useState(null);

  // Hooks
  const { isTablets } = useRwd();

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
  const onChange = (e) => {
    // console.log(e);
    // e.preventDefault();
    // fullScreenHandler(true);
  };

  useEffect(() => {
    const paste = (e) => {
      e.preventDefault();
      const text = e.clipboardData.getData('text/plain');
      document.execCommand('insertText', false, text);
    };

    document.addEventListener('paste', paste);

    return () => {
      document.removeEventListener('paste', paste);
    };
  }, []);

  if (isTablets) {
    return (
      <div
        role="presentation"
        style={{
          height: fullScreen ? 'calc(100% - 5rem)' : '100%',
        }}
      >
        <MainContainer>
          <ChatContainer>
            <MessageList autoScrollToBottomOnMount>
              <MessageSeparator content={`??????${moment().format('HH:mm')}`} />
              <MessageSeparator
                content={(
                  <Space size={2}>
                    <ExclamationCircleOutlined style={{ fontSize: '1.3rem', color: '#ff4d4f' }} />
                    <span style={{ color: '#ff4d4f' }}>
                      ?????????????????????????????????????????????
                    </span>
                  </Space>
              )}

              />
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
                    {role === 2 && (
                      <span style={{ marginLeft: '2px', color: '#242e47' }}>
                        K100U-????????????
                      </span>
                    )}

                    {role === 3 && (
                      <span style={{ marginLeft: '2px', color: '#242e47' }}>
                        K100U-??????
                      </span>
                    )}

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
                        onKeyDown={() => {}}
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
              {loading && <Loader>Loading...</Loader>}

              {(status === 1 || status === 99) && (
                <MessageSeparator content="???????????????" />
              )}
            </MessageList>

            <MessageInput
              onClick={onChange}
              onAttachClick={onAttachClickHandler}
              placeholder="??????..."
              onSend={onSend}
              disabled={status === 1 || status === 99}
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
  }

  return (
    <div
      // onClick={() => {
      //   fullScreenHandler(true);
      // }}
      onKeyDown={() => {}}
      role="presentation"
      style={{ height: refHeight && refHeight }}
    >
      <MainContainer
        style={{
          height: !refHeight && (window.innerHeight - 140) / 2,
        }}
      >
        <ChatContainer>
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
                  ????????????
                </span>
              </Space>
            </ConversationHeader.Content>
          </ConversationHeader>

          <MessageList autoScrollToBottomOnMount>
            <MessageSeparator content={`??????${moment().format('HH:mm')}`} />
            <MessageSeparator
              content={(
                <Space size={2}>
                  <ExclamationCircleOutlined style={{ fontSize: '1.3rem', color: '#ff4d4f' }} />
                  <span style={{ color: '#ff4d4f' }}>
                    ?????????????????????????????????????????????
                  </span>
                </Space>
              )}
            />

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
                  {role === 2 && (
                    <span style={{ marginLeft: '2px', color: '#242e47' }}>
                      K100U-????????????
                    </span>
                  )}

                  {role === 3 && (
                    <span style={{ marginLeft: '2px', color: '#242e47' }}>
                      K100U-??????
                    </span>
                  )}

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
                      onKeyDown={() => {}}
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
              <MessageSeparator content="???????????????" />
            )}
          </MessageList>

          <MessageInput
            onClick={onChange}
            onAttachClick={onAttachClickHandler}
            placeholder="??????..."
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
