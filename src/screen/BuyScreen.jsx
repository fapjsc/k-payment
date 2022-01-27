import React, { useEffect, useState } from 'react';

// Router props
import { useHistory } from 'react-router-dom';

// Media Query
import { useMediaQuery } from 'react-responsive';

// Antd
import {
  Row,
  Col,
  Divider,
  Skeleton,
  // eslint-disable-next-line
  Spin,
  message,
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

// websocket
import { buyConnectWs } from '../utils/webSocket';
import { chatConnectWs } from '../utils/chatSocket';

// Components
import BuyHeader from '../components/Buy/BuyHeader';
import BuyInfo from '../components/Buy/BuyInfo';
import BuyAction from '../components/Buy/BuyAction';
import Note from '../components/Note';
import ConfirmModal from '../components/ConfirmModal';
import WaitConfirm from '../components/WaitConfirm';
import Chat from '../components/chat/Chat';

const statusArr = [31, 33, 34];

const BuyScreen = () => {
  const id = localStorage.getItem('id');
  const orderToken = localStorage.getItem('orderToken');

  // Init State
  const [modalShow, setModalShow] = useState({ show: false });

  // Router props
  const history = useHistory();

  // Media query
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  // Redux
  const dispatch = useDispatch();
  const { orderInfo } = useSelector((state) => state.openOrder);
  const { rateInfo } = useSelector((state) => state.exRate);

  const {
    // eslint-disable-next-line
    loading: cancelLoading,
    error: cancelError,
    data: cancelData,
  } = useSelector((state) => state.cancelOrder);
  const { sessions } = useSelector((state) => state.diOrderSession);
  const { data } = sessions || {};
  const { Order_StatusID: paymentStatus } = data || {};

  useEffect(() => {
    const resultArr = [1, 99, 98];
    if (resultArr.includes(paymentStatus)) {
      history.replace('/auth/result');
    }
  }, [paymentStatus, history]);

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
    history.replace('/auth/result');
  }, [cancelData, history]);

  const confirmBuyHandler = () => {
    dispatch(confirmBuy(id, orderToken));
  };

  const cancelOrderHandler = () => {
    dispatch(cancelOrder(id, orderToken));
  };

  return (
    <Row
      align="start"
      justify="center"
      style={{ maxWidth: '1140px', margin: 'auto' }}
    >
      <ConfirmModal
        title={modalShow.title}
        text={modalShow.text}
        visible={modalShow.show}
        setModalShow={setModalShow}
        actionCall={
          modalShow.type === 'payment' ? confirmBuyHandler : cancelOrderHandler
        }
      />

      <Col
        md={{ span: 15 }}
        span={22}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{}}>
          {!isMobile && <BuyHeader />}
          <Divider />
        </div>

        <Skeleton
          paragraph={{ rows: 6 }}
          loading={!statusArr.includes(paymentStatus)}
          style={{ minHeight: '40rem', padding: 0 }}
        >

          {(paymentStatus === 31 || paymentStatus === 33) && (
            <>
              <BuyInfo />
              <BuyAction setModalShow={setModalShow} />
            </>
          )}

          {paymentStatus === 34 && <WaitConfirm setModalShow={setModalShow} />}
        </Skeleton>

        <div style={{}}>
          {!isMobile && (
            <>
              <Divider />
              <Note />
            </>
          )}
        </div>
      </Col>

      <Col md={{ span: 8, offset: 1 }} span={22}>
        <Chat />
      </Col>
    </Row>
  );
};

export default BuyScreen;
