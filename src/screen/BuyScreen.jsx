import React, {

  useEffect, useState, useCallback,
} from 'react';

// Router props
import { useHistory } from 'react-router-dom';

// eslint-disable-next-line
import { gsap } from 'gsap';

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
// eslint-disable-next-line
import BuyHeader from '../components/Buy/BuyHeader';
// eslint-disable-next-line
import BuyInfo from '../components/Buy/BuyInfo';
// eslint-disable-next-line
import BuyAction from '../components/Buy/BuyAction';
import Note from '../components/Note';
import ConfirmModal from '../components/ConfirmModal';
import WaitConfirm from '../components/WaitConfirm';
// eslint-disable-next-line
import Chat from '../components/chat/Chat';

// Hooks
import useQuery from '../hooks/useQuery';

// Helpers
import { _decrypt } from '../utils/helpers';

// Styles
// eslint-disable-next-line
import variable from '../sass/variable.module.scss';

//Image
import backImg from '../asset/back.png';

const statusArr = [31, 33, 34, 35];
const resultArr = [1, 99, 98];

const BuyScreen = () => {
  const query = useQuery();
  const sessionStr = query.get('session');

  const { orderToken, id } = JSON.parse(_decrypt(sessionStr));

  // Hooks
  const { isMobile } = useRwd();

  // const infoRef = useRef();

  // Init State
  const [modalShow, setModalShow] = useState({ show: false });
  const [refHeight] = useState(window.innerHeight - 140);

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

  const fullScreenHandler = (value) => {
    if (!isMobile) return;
    dispatch(setChatFullscreen(value));
  };

  const [height, setHeight] = useState(0);

  const measuredRef = useCallback((node) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);

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
        align={isMobile ? 'bottom' : 'center'}
        style={{
          maxWidth: '1140px',
          margin: 'auto',
          height: window.innerHeight - 140,
          // height: isMobile && refHeight,
          // backgroundColor: 'green',
          // height: isMobile && window.innerHeight - 150,
          // backgroundColor: 'green',
        }}
      >
        <Col
          ref={measuredRef}
          md={{ span: 15 }}
          span={24}
          style={{
            display: fullScreen ? 'none' : 'flex',
            flexDirection: 'column',
            maxHeight: '233px',
            // transform: fullScreen ? 'translateY(0)' : 'translateY(-1000)',
            // height: isMobile && window.innerHeight - 140,
            // justifyContent: isMobile ? 'space-between' : 'flex-start',
            // backgroundColor: 'grey',
            // height: isMobile && refHeight / 2,
            // marginTop: isMobile && '1rem',
          }}
        >
          <div style={{}}>
            {!isMobile && (
            <>
              <BuyHeader />
              <Divider />
            </>
            )}
          </div>

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
            <WaitConfirm setModalShow={setModalShow} paymentStatus={paymentStatus} />
            )}

          </Skeleton>

          <div>
            {!isMobile && (
            <>
              <Divider />
              <Note />
            </>
            )}
          </div>
        </Col>

        <Col
          md={{ span: 8, offset: 1 }}
          span={24}
          // onClick={() => { fullScreenHandler(false); }}
          style={{
            transform: !isMobile && 'translateY(-1.6rem)',
            marginTop: fullScreen && isMobile && '1rem',
            height: fullScreen && isMobile && window.innerHeight - 15,
            // backgroundColor: 'grey',
          }}
        >
          {
            isMobile && !fullScreen && (
            <Divider style={{ margin: '2px' }} />
            )
          }

          <div
            onClick={() => { fullScreenHandler(false); }}
            onKeyDown={() => { console.log('keydown'); }}
            role="presentation"
            style={{
              height: '50px',
              borderBottom: `1px solid ${variable['color-light-grey']}`,
              display: fullScreen && isMobile ? 'flex' : 'none',
              alignItems: 'center',
              paddingBottom: '.5rem',
              // backgroundColor: 'blue',
              gap: '1rem',
              // maxWidth: '30rem',
            }}
          >
            <img src={backImg} alt="back" style={{ width: '1.5rem', height: '2rem' }} />

            <span
              style={{
                fontSize: '2rem',
                color: variable['color-dark-blue'],
                marginLeft: '1rem',
                // marginTop: '5px',
              }}
            >
              返回
            </span>
          </div>

          <Chat
            refHeight={refHeight - height}
            fullScreen={fullScreen}
            fullScreenHandler={fullScreenHandler}
          />
        </Col>
      </Row>
    </>
  );
};

export default BuyScreen;
