import React, {
  useEffect, useState, useRef, Fragment,
} from 'react';

import { gsap } from 'gsap';

// Router
import { useHistory } from 'react-router-dom';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Antd
import {
  Result, Space, Divider, Row, Col, Button, message,
} from 'antd';

// Components
import Note from '../Note';
import LoadingScreen from '../../screen/LoadingScreen';
import Chat from '../chat/Chat';

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

// Actions
import { orderAppeal } from '../../store/actions/orderActions';

// Styles
import variable from '../../sass/variable.module.scss';

import backImg from '../../asset/back.png';

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
  const { isMobile, isTablets } = useRwd();
  const history = useHistory();

  const sessionStr = query.get('session');

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
  const dispatch = useDispatch();

  const {
    sessions: { data },
  } = useSelector((state) => state.diOrderSession);

  const { loading: appealLoading, error: appealError } = useSelector((state) => state.appeal);

  const {
    Order_StatusID: status,
    Tx_HASH: hash,
    UsdtAmt: usdt,
    D2: cny,
    // D1: rate,
  } = data || {};

  if (status === 1) type = 'success';
  if (status === 99) type = 'cancel';
  if (status === 98) type = 'overTime';

  const appealHandler = () => {
    if (!orderToken || !orderToken) {
      message.error('沒有session id 或 order token');
      return;
    }

    dispatch(orderAppeal({ id, orderToken }));
  };

  useEffect(() => {
    if (status === 35) {
      history.replace(`/auth/payment?session=${sessionStr}`);
    }
  }, [status, history, sessionStr]);

  useEffect(() => {
    if (!appealError) return;
    message.error('訂單取消失敗');
  }, [appealError]);

  useEffect(() => {
    if (status) return;

    if (!id || !orderToken) return;

    buyConnectWs(id, orderToken);
    chatConnectWs(id, orderToken);
  }, [status, id, orderToken]);

  useEffect(() => {
    if (!isTablets) return;

    const tl = gsap.timeline();

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
  }, [showChat, isTablets]);

  if (!data) {
    return <LoadingScreen />;
  }

  const title = (
    <h4 style={{ fontSize: '2rem', color: variable['color-primary'] }}>
      {type === 'success' && '交易完成'}
      {type === 'cancel' && '交易取消'}
      {type === 'overTime' && '交易超時'}
    </h4>
  );

  const icon = (
    <img
      style={{ width: isMobile ? '10rem' : '20rem' }}
      src={type === 'success' ? successImage : cancelImage}
      alt="success"
    />
  );

  const subTitle = (
    <p style={{ fontSize: '1.2rem' }}>
      交易回執 :
      {' '}
      {hash}
    </p>
  );

  if (isTablets) {
    return (
      <>
        <div
          ref={resultRef}
          style={{
            display: showChat && 'none',
            transform: showChat && 'translateX(1000)',
          }}
        >
          <Result
            style={{ padding: '1rem 0' }}
            title={title}
            icon={icon}
            subTitle={subTitle}
            extra={type === 'overTime' && (
              <Button style={{ width: '80%' }} loading={appealLoading} type="primary" key="console" onClick={appealHandler}>
                申訴
              </Button>
            )}
          />
        </div>

        <button
          onClick={() => setShowChat(true)}
          className="fixed-btn"
          type="button"
        >
          對話紀錄
        </button>

        <div
          ref={chatColRef}
          style={{
            display: !showChat && 'none',
            width: showChat && '100%',
            height: window.innerHeight - 140 - 50,
          }}
        >
          <div
            onClick={() => {
              setShowChat(false);
            }}
            role="presentation"
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              gap: '1rem',
              padding: '5px 0',
              fontSize: '2rem',
              height: '5rem',
              borderBottom: `1px solid ${variable['color-light-grey']}`,
            }}
          >
            <img
              src={backImg}
              alt="返回"
              style={{ width: '2rem', height: '2.5rem' }}
            />
            <span>返回</span>
          </div>
          <Chat status={status} showChat={showChat} />
        </div>
      </>
    );
  }

  return (
    <Row
      gutter={[32, 0]}
      style={{
        margin: 'auto',
        maxWidth: '1140px',
        display: 'flex',
        // gap: '3rem',
      }}
    >
      <Col xs={24} sm={24} md={24} lg={15} style={{ marginTop: 0 }}>
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

        <Result
          style={{ padding: isMobile && '1rem 0' }}
          title={title}
          icon={icon}
          subTitle={subTitle}
          extra={type === 'overTime' && (
          <Button style={{ width: '50%' }} loading={appealLoading} type="primary" key="console" onClick={appealHandler}>
            申訴
          </Button>
          )}
        />

        <Divider />
        <div style={{ padding: 20 }}>
          <Note />
        </div>
      </Col>

      <Col ref={chat1ColRef} flex={1} style={{}}>
        <Chat status={status} showChat={showChat} refHeight="85vh" />
      </Col>
    </Row>
  );
};

export default BuyResult;
