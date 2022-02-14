import React, {
  useEffect, useState, useRef, Fragment,
} from 'react';

import { gsap } from 'gsap';

// Router
import { useHistory } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

// Antd
import {
  // eslint-disable-next-line
  Result,
  Space,
  Divider,
  Row,
  Col,
} from 'antd';

// Components
import Note from '../Note';
import LoadingScreen from '../../screen/LoadingScreen';
// eslint-disable-next-line
import Chat from '../chat/Chat';
// import BuyHeader from '../Buy/BuyHeader';

// Hooks
import useQuery from '../../hooks/useQuery';

// Helper
import { _decrypt, thousandsFormat } from '../../utils/helpers';

// Image
import successImage from '../../asset/success.png';
import cancelImage from '../../asset/cancel.png';

// Websocket
import { buyConnectWs } from '../../utils/webSocket';
import { chatConnectWs } from '../../utils/chatSocket';

// Hooks
import useRwd from '../../hooks/useRwd';

// Styles
import variable from '../../sass/variable.module.scss';

// eslint-disable-next-line
const spanLayout = {
  span: 12,
  offset: 6,
};

let type;

const BuyResult = () => {
  // Ref
  const chatColRef = useRef();
  const chat1ColRef = useRef();
  const resultRef = useRef();

  // Init state
  const [showChat, setShowChat] = useState(false);

  // Hooks
  const query = useQuery();
  const { isMobile } = useRwd();
  const history = useHistory();

  const queryStr = query.get('session') || query.get('id');

  let id;
  let orderToken;

  try {
    const { id: idStr, orderToken: token } = JSON.parse(_decrypt(queryStr));
    id = idStr;
    orderToken = token;
  } catch (error) {
    history.replace('/not-found');
  }

  // Redux
  const {
    sessions: { data },
  } = useSelector((state) => state.diOrderSession);

  const {
    Order_StatusID: status,
    Tx_HASH: hash,
    UsdtAmt: usdt,
    D2: cny,
    D1: rate,
  } = data || {};

  if (status === 1) type = 'success';
  if (status === 99 || status === 98) type = 'cancel';
  // if (type !== 'success') type = 'cancel';

  useEffect(() => {
    if (status) return;

    if (id && orderToken) {
      buyConnectWs(id, orderToken);
      chatConnectWs(id, orderToken);
    }
  }, [status, id, orderToken]);

  useEffect(() => {
    if (!isMobile) return;
    const tl = gsap.timeline();

    //headerRef

    if (showChat) {
      tl.from([chatColRef.current, chat1ColRef.current], {
        x: 1000,
        duration: 0.5,
        ease: 'ease.out',
      }).to([chatColRef.current, chat1ColRef.current], {
        x: 0,
        duration: 0.5,
        ease: 'ease.out',
      });

      // tl.from(chat1ColRef.current, {
      //   x: 1000,
      //   duration: 0.1,
      //   ease: 'ease.out',
      // }).to(chat1ColRef.current, {
      //   x: 0,
      //   duration: 0.1,
      //   ease: 'ease.out',
      // });
    }

    if (!showChat) {
      tl.from(resultRef.current, {
        x: -1000,
        duration: 0.5,
        ease: 'ease.out',
      }).to(resultRef.current, {
        x: 0,
        duration: 0.5,
        ease: 'ease.out',
      });
    }
  }, [showChat, isMobile]);

  if (!data) {
    return <LoadingScreen />;
  }

  return (
    <Row
      style={{
        margin: 'auto',
        maxWidth: '1140px',
        display: 'flex',
        gap: '3rem',
      }}
    >
      <Col sm={10} md={24} lg={15} style={{ margin: isMobile && 'auto' }}>
        {!isMobile && (
          <Space
            size="large"
            style={{
              height: '6.3rem',
              width: '100%',
              borderBottom: '1px solid #D7E2F3',
              paddingLeft: '20px',
            }}
          >
            <Space>
              <span style={{ color: variable['color-dark-blue'] }}>匯率:</span>
              <span style={{ color: variable['color-primary'] }}>{rate}</span>
            </Space>

            <Space>
              <span style={{ color: variable['color-dark-blue'] }}>
                購買數量:
              </span>
              <span style={{ color: variable['color-primary'] }}>
                {`${thousandsFormat(usdt)}  USDT`}
              </span>
            </Space>

            <Space>
              <span style={{ color: variable['color-dark-blue'] }}>
                支付金額:
              </span>
              <span style={{ color: variable['color-primary'] }}>
                {`${thousandsFormat(cny)}  CNY`}
              </span>
            </Space>
          </Space>
        )}

        {!showChat && (
          <div
            ref={resultRef}
            style={{
              display: isMobile && showChat && 'none',
              transform: isMobile && showChat && 'translateX(1000)',
            }}
          >
            <Result
              style={{ padding: isMobile && '1rem 0' }}
              title={
                data && (
                  <h4
                    style={{
                      fontSize: '2rem',
                      color: variable['color-primary'],
                    }}
                  >
                    {type === 'cancel' ? '交易取消' : '交易完成'}
                  </h4>
                )
              }
              icon={
                data && (
                  <img
                    style={{ width: isMobile ? '10rem' : '20rem' }}
                    src={type === 'cancel' ? cancelImage : successImage}
                    alt="success"
                  />
                )
              }
              subTitle={(
                <p style={{ fontSize: '1.2rem' }}>
                  交易回執 :
                  {' '}
                  {hash}
                </p>
              )}
            />
          </div>
        )}

        {!isMobile && (
          <>
            <Divider />
            <div style={{ padding: 20 }}>
              <Note />
            </div>
          </>
        )}
      </Col>

      {showChat && isMobile && (
        <Col
          onClick={() => setShowChat(false)}
          ref={chatColRef}
          style={{
            width: '100%',
            marginTop: '1rem',
            borderBottom: '1px solid #D7E2F3',
            paddingBottom: '5px',
          }}
        >
          <Space
            style={{
              width: showChat && isMobile && '100%',
              display: isMobile && !showChat && 'none',
            }}
          >
            <div
              role="presentation"
              onClick={() => setShowChat(false)}
              onKeyDown={() => setShowChat(false)}
              className="chat-back"
            />
            <span className="txt-20-blue">返回</span>
          </Space>
        </Col>
      )}

      <Col ref={chat1ColRef} flex={1} style={{}}>
        <div
          style={{
            display: isMobile && !showChat && 'none',
            width: showChat && isMobile && '100%',
            // backgroundColor: 'blue',
          }}
        >
          <Chat status={status} showChat={showChat} />
        </div>
      </Col>

      {isMobile && !showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="fixed-btn"
          type="button"
        >
          對話紀錄
        </button>
      )}
    </Row>
  );
};

export default BuyResult;
