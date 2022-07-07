import React, { useEffect, useState, useRef } from 'react';

// Router props
import { useHistory, useLocation } from 'react-router-dom';

// Antd
import {
  Row, Col, Divider, Skeleton, Space, Modal,
} from 'antd';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Actions
import {
  getExRate,
  openOrder,
  confirmBuy,
  getOrderDetail,
} from '../store/actions/orderActions';

import {
  cancelOrder,
} from '../store/actions/cancelActions';

import { setChatFullscreen } from '../store/actions/chatActions';

import { errorCode } from '../error-code';

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
import BuyScreenTablets from './BuyScreenTablets';
import LoadingScreen from './LoadingScreen';

// Helpers
import { _iosWhite, _isIOS15 } from '../utils/helpers';

const statusArr = [31, 33, 34, 35];
const resultArr = [1, 99, 98];
// const resultArr = [];

const BuyScreen = () => {
  const { innerHeight } = window;
  const location = useLocation();

  const id = location?.search?.split('&')[0]?.split('=')[1];
  const orderToken = location?.search?.split('&')[1]?.split('=')[1];

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
  const { orderInfo, error: orderInfoError } = useSelector((state) => state.openOrder);
  const { rateInfo, error: rateError } = useSelector((state) => state.exRate);
  const { fullScreen } = useSelector((state) => state.chatFullScreen);

  const { error: cancelError, data: cancelData } = useSelector(
    (state) => state.cancelOrder,
  );

  const { sessions } = useSelector((state) => state.diOrderSession);
  const { data } = sessions || {};
  const { Order_StatusID: paymentStatus } = data || {};

  const { data: orderData, error: orderDataError } = useSelector((state) => state.orderDetail);

  // useGetIdToken();

  useEffect(() => {
    if (!id || !orderToken) return;
    dispatch(getOrderDetail({ id, token: orderToken }));
  }, [dispatch, id, orderToken]);

  useEffect(() => {
    if (resultArr.includes(paymentStatus)) {
      history.replace(`/auth/result?id=${id}&orderToken=${orderToken}`);
    }
  }, [paymentStatus, history, id, orderToken]);

  useEffect(() => {
    if (!orderInfoError) return;
    Modal.error({
      title: `開啟訂單失敗： ${orderInfoError}`,
      content: `${errorCode[orderInfoError] || errorCode[0]}: ${id}`,
      onOk: () => { dispatch(openOrder(id)); },
    });
  }, [orderInfoError, history, dispatch, id]);

  useEffect(() => {
    if (rateError) {
      Modal.error({
        title: `無法獲取匯率：${rateError}`,
        content: errorCode[rateError] || errorCode[0],
      });
    }
  }, [rateError]);

  useEffect(() => {
    if (!orderDataError) return;

    Modal.error({
      title: `無法獲取訂單訊息： ${orderDataError}`,
      content: `${errorCode[orderDataError] || errorCode[0]}: ${orderToken}`,
      onOk: () => {
        Modal.destroyAll();
        dispatch(getOrderDetail({ id, token: orderToken }));
      },
    });
  }, [orderDataError, history, orderToken, dispatch, id]);

  useEffect(() => {
    if (!cancelError) return;
    Modal.error({
      title: `取消訂單失敗：${cancelError}`,
      content: `${errorCode[cancelError] || errorCode[0]}: ${orderToken}`,
    });
  }, [cancelError, dispatch, orderToken]);

  useEffect(() => {
    if (!orderInfo) {
      dispatch(openOrder(id));
    }
  }, [orderInfo, dispatch, id]);

  useEffect(() => {
    if (!rateInfo) {
      dispatch(getExRate(id));
    }
  }, [rateInfo, id, dispatch]);

  useEffect(() => {
    chatConnectWs(id, orderToken);
    if (!data) {
      buyConnectWs(id, orderToken);
    }
  }, [data, orderToken, id]);

  useEffect(() => {
    if (!cancelData) return;
    history.replace(`/auth/result?id=${id}&orderToken=${orderToken}`);
  }, [cancelData, history, id, orderToken]);

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

  if (!orderData) {
    return (
      <LoadingScreen />
    );
  }

  // 手機版
  if (isTablets) {
    return (
      <BuyScreenTablets
        fullScreen={fullScreen}
        modalShow={modalShow}
        setModalShow={setModalShow}
        paymentStatus={paymentStatus}
        confirmBuyHandler={confirmBuyHandler}
        cancelOrderHandler={cancelOrderHandler}
        mobileChatHightRef={mobileChatHightRef}
        statusArr={statusArr}
        orderToken={orderToken}
        id={id}
        fullScreenHandler={fullScreenHandler}
        viewPortHeight={viewPortHeight}
        height={height}
        isIOS15Issue={isIOS15Issue}
      />
    );
  }

  // 桌面版
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
            backgroundColor: 'red',
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
