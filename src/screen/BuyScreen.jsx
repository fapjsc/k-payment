import React, { useEffect, useState, useRef } from 'react';

// Router props
import { useHistory } from 'react-router-dom';

// Antd
import {
  Row, Col, Divider, Skeleton, Space, message,
} from 'antd';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Actions
import {
  getExRate,
  openOrder,
  confirmBuy,
} from '../store/actions/orderActions';

import {
  cancelOrder,
  cancelOrderStatusClear,
} from '../store/actions/cancelActions';

import { setChatFullscreen } from '../store/actions/chatActions';

// websocket
import { buyConnectWs } from '../utils/webSocket';
import { chatConnectWs } from '../utils/chatSocket';

// Hooks
import useRwd from '../hooks/useRwd';

// Components
import BuyHeader from '../components/Buy/BuyHeader';
import BuyInfo from '../components/Buy/BuyInfo';
import BuyAction from '../components/Buy/BuyAction';
import Note from '../components/Note';
import ConfirmModal from '../components/ConfirmModal';
import WaitConfirm from '../components/WaitConfirm';
import Chat from '../components/chat/Chat';

// Hooks
import useQuery from '../hooks/useQuery';

// Helpers
// eslint-disable-next-line
import { _decrypt, _iosWhite, _isIOS15 } from '../utils/helpers';

// Styles
import variable from '../sass/variable.module.scss';

//Image
import backImg from '../asset/back.png';

const statusArr = [31, 33, 34, 35];
const resultArr = [1, 99, 98];

// eslint-disable-next-line
// let flag = false;

const BuyScreen = () => {
  const { innerHeight } = window;

  const query = useQuery();
  const sessionStr = query.get('session');

  const { orderToken, id } = JSON.parse(_decrypt(sessionStr));

  // Ref
  const mobileChatHightRef = useRef();

  // Hooks
  const { isMobile, isTablets } = useRwd();

  // Init State
  const [modalShow, setModalShow] = useState({ show: false });
  const [height, setHeight] = useState();
  const [viewPortHeight, setViewPortHeight] = useState();
  const [isIOS15Issue, setIsIOS15ISsue] = useState(false);

  // Router props
  const history = useHistory();

  // Redux
  const dispatch = useDispatch();
  const { orderInfo } = useSelector((state) => state.openOrder);
  const { rateInfo } = useSelector((state) => state.exRate);
  const { fullScreen } = useSelector((state) => state.chatFullScreen);

  const { error: cancelError, data: cancelData } = useSelector(
    (state) => state.cancelOrder,
  );

  const { sessions } = useSelector((state) => state.diOrderSession);
  const { data } = sessions || {};
  const { Order_StatusID: paymentStatus } = data || {};

  useEffect(() => {
    if (resultArr.includes(paymentStatus)) {
      console.log(sessionStr);
      console.log(paymentStatus);
      history.replace(`/auth/result?session=${sessionStr}`);
    }
  }, [paymentStatus, history, sessionStr]);

  useEffect(() => {
    if (!orderInfo) {
      dispatch(openOrder(id));
    }

    if (!rateInfo) {
      dispatch(getExRate(id));
    }
  }, [orderInfo, rateInfo, dispatch, id]);

  useEffect(() => {
    chatConnectWs(id, orderToken);
    if (!data) {
      buyConnectWs(id, orderToken);
    }
  }, [data, orderToken, id]);

  useEffect(() => {
    if (!cancelError) return;
    message.error('訂單取消失敗');
    dispatch(cancelOrderStatusClear());
  }, [cancelError, dispatch]);

  useEffect(() => {
    if (!cancelData) return;
    history.replace(`/auth/result?session=${sessionStr}`);
  }, [cancelData, history, sessionStr]);

  const confirmBuyHandler = () => {
    dispatch(confirmBuy(id, orderToken));
  };

  const cancelOrderHandler = () => {
    dispatch(cancelOrder(id, orderToken));
  };

  const getChatHight = () => {
    if (mobileChatHightRef.current) {
      const refHeight = mobileChatHightRef.current.clientHeight + 140;
      const chatHight = window.innerHeight - refHeight;
      setHeight(chatHight);
    }
  };

  const fullScreenHandler = (value) => {
    if (!isMobile) return;
    dispatch(setChatFullscreen(value));
  };

  useEffect(() => {
    getChatHight();
  }, [mobileChatHightRef]);

  useEffect(() => {
    window.addEventListener('resize', getChatHight);
  }, [fullScreen]);

  useEffect(() => {
    if (innerHeight) {
      setViewPortHeight(innerHeight);
    }
  }, [innerHeight]);

  useEffect(() => {
    _iosWhite();
  }, []);

  useEffect(() => {
    const isIOS15 = _isIOS15();
    setIsIOS15ISsue(isIOS15);
  }, []);

  if (isTablets) {
    return (
      <>
        <ConfirmModal
          title={modalShow.title}
          text={modalShow.text}
          visible={modalShow.show}
          setModalShow={setModalShow}
          actionCall={
            modalShow.type === 'payment'
              ? confirmBuyHandler
              : cancelOrderHandler
          }
        />

        <div
          ref={mobileChatHightRef}
          style={{
            height: fullScreen ? 0 : (window.innerHeight - 140) / 2,
            display: fullScreen && 'none',
          }}
        >
          <Skeleton
            paragraph={{ rows: 6 }}
            loading={!statusArr.includes(paymentStatus)}
            style={{ minHeight: (window.innerHeight - 140) / 2, padding: 0 }}
          >
            {(paymentStatus === 31 || paymentStatus === 33) && (
              <Space direction="vertical" style={{ width: '100%' }}>
                <BuyInfo />
                <BuyAction
                  setModalShow={setModalShow}
                  id={id}
                  orderToken={orderToken}
                />
              </Space>
            )}

            {(paymentStatus === 34 || paymentStatus === 35) && (
              <WaitConfirm
                setModalShow={setModalShow}
                paymentStatus={paymentStatus}
              />
            )}
          </Skeleton>

          <Divider style={{ margin: '5px' }} />
        </div>

        <div
          style={{
            height:
              // eslint-disable-next-line
              fullScreen && isIOS15Issue
                ? viewPortHeight - 100
                : fullScreen
                  ? viewPortHeight - 50
                  : height,
          }}
        >
          {fullScreen && (
            <div
              onClick={() => {
                fullScreenHandler(false);
              }}
              onKeyDown={() => {}}
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
                alt="1234"
                style={{
                  width: '2rem',
                  height: '2.5rem',
                  transform: 'rotate(-90deg)',
                }}
              />
              <span style={{ color: '#242e47' }}>查看匯款資料</span>
            </div>
          )}

          <Chat fullScreen={fullScreen} fullScreenHandler={fullScreenHandler} />
        </div>
      </>
    );
  }

  return (
    <>
      <ConfirmModal
        title={modalShow.title}
        text={modalShow.text}
        visible={modalShow.show}
        setModalShow={setModalShow}
        actionCall={
          modalShow.type === 'payment' ? confirmBuyHandler : cancelOrderHandler
        }
      />

      <Row
        style={{
          maxWidth: '1140px',
          margin: 'auto',
          height: '80vh',
        }}
      >
        <Col
          md={{ span: 15 }}
          span={24}
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <BuyHeader />
          <Divider />

          <Skeleton
            paragraph={{ rows: 6 }}
            loading={!statusArr.includes(paymentStatus)}
            style={{ minHeight: '40rem', padding: 0 }}
          >
            {(paymentStatus === 31 || paymentStatus === 33) && (
              <Space direction="vertical" style={{}}>
                <BuyInfo />
                <BuyAction
                  setModalShow={setModalShow}
                  id={id}
                  orderToken={orderToken}
                />
              </Space>
            )}

            {(paymentStatus === 34 || paymentStatus === 35) && (
              <WaitConfirm
                setModalShow={setModalShow}
                paymentStatus={paymentStatus}
              />
            )}
          </Skeleton>

          <div>
            <Divider />
            <Note />
          </div>
        </Col>

        <Col
          md={{ span: 8, offset: 1 }}
          span={24}
          style={{
            transform: !isMobile && 'translateY(-1.6rem)',
            marginTop: fullScreen && isMobile && '1rem',
            height: '100%',
          }}
        >
          <div style={{ height: '100%' }}>
            <Chat
              refHeight="80vh"
              fullScreen={fullScreen}
              fullScreenHandler={fullScreenHandler}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default BuyScreen;
