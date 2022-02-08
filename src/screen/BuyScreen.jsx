import React, { useEffect, useState } from 'react';

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
// eslint-disable-next-line
import BuyHeader from '../components/Buy/BuyHeader';
// eslint-disable-next-line
import BuyInfo from '../components/Buy/BuyInfo';
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
import variable from '../sass/variable.module.scss';

const statusArr = [31, 33, 34];
const resultArr = [1, 99, 98];

const BuyScreen = () => {
  const query = useQuery();
  const sessionStr = query.get('session');

  const { orderToken, id } = JSON.parse(_decrypt(sessionStr));

  // Hooks
  const { isMobile } = useRwd();

  // Init State
  const [modalShow, setModalShow] = useState({ show: false });
  // eslint-disable-next-line
  const [refHeight] = useState(window.innerHeight - 95);
  // eslint-disable-next-line
  const [chatFullScreen, setChatFullScreen] = useState(false);

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
    dispatch(setChatFullscreen(value));
  };

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
          height: isMobile && refHeight,
          // backgroundColor: 'green',
        }}
      >
        {
  isMobile && fullScreen ? null : (
    <Col
      md={{ span: 15 }}
      span={24}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: isMobile ? 'space-between' : 'flex-start',
        // backgroundColor: 'red',
        height: isMobile && refHeight / 2 + 10,
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

        {paymentStatus === 34 && (
        <WaitConfirm setModalShow={setModalShow} />
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

  )
}

        <Col
          md={{ span: 8, offset: 1 }}
          span={24}
          style={{
            transform: !isMobile && 'translateY(-1.6rem)',
            // backgroundColor: 'blue',
            height: isMobile && refHeight / 2,
          }}
        >
          {(fullScreen && isMobile) && (
            <div
              style={{
                height: '50px',
                borderBottom: `1px solid ${variable['color-light-grey']}`,
                display: 'flex',
                alignItems: 'flex-end',
                paddingBottom: '.5rem',
              }}
            >
              <span
                onClick={() => fullScreenHandler(false)}
                onKeyDown={() => fullScreenHandler(false)}
                role="presentation"
                style={{ fontSize: '3rem', marginRight: '1rem' }}
              >
                V
              </span>
              <span style={{ fontSize: '2rem', color: variable['color-dark-blue'] }}>查看匯款資料</span>
            </div>
          )}

          <Chat
            refHeight={refHeight}
            fullScreen={fullScreen}
            fullScreenHandler={fullScreenHandler}
          />
        </Col>
      </Row>
    </>
  );
};

export default BuyScreen;
