import React, { useEffect, useState } from 'react';

// Router
import { useHistory } from 'react-router-dom';

// Antd
import {
  Row, Col, Divider, message,
} from 'antd';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Actions
import { getExRate, openOrder } from '../store/actions/orderActions';
import { cancelOrder } from '../store/actions/cancelActions';

// websocket
import { buyConnectWs } from '../utils/webSocket';
// import { chatConnectWs } from '../utils/chatSocket';

// Components
import Payment from '../components/payment/Payment';
// eslint-disable-next-line
import Note from '../components/Note';
import PairModal from '../components/PairModal';

import {
  mobileWrapLayout,
  dividerLayout,
  noteLayout,
} from '../layout/layout-span';

const HomeScreen = () => {
  const id = localStorage.getItem('id');
  console.log(id, 'home');

  // Router
  const history = useHistory();

  // Redux
  const dispatch = useDispatch();
  const { orderInfo, error: orderInfoError } = useSelector(
    (state) => state.openOrder,
  );

  const { data: cancelData, error: cancelError } = useSelector((state) => state.cancelOrder);

  const { rateInfo } = useSelector((state) => state.exRate);
  const { orderToken } = useSelector((state) => state.orderToken);
  const { sessions } = useSelector((state) => state.diOrderSession);
  const { data } = sessions || {};

  // Init State
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!orderInfo) {
      dispatch(openOrder(id));
    }

    if (!rateInfo) {
      dispatch(getExRate(id));
    }
  }, [dispatch, id, orderInfo, rateInfo]);

  useEffect(() => {
    if (!orderInfoError) return;
    history.replace('/not-found');
  }, [orderInfoError, history]);

  //**  Di Order */
  useEffect(() => {
    if (orderToken) {
      setShowModal(true);
      localStorage.setItem('orderToken', orderToken);
    }
  }, [orderToken]);

  // 拿到token後連接websocket
  useEffect(() => {
    if (!orderToken || !id) return;

    buyConnectWs(id, orderToken);
    // chatConnectWs(id, orderToken);
  }, [orderToken, id]);

  useEffect(() => {
    if (!data) return;
    const { Order_StatusID: orderStatus } = data || {};
    if (orderStatus === 33) {
      history.replace('/auth/payment');
    }
  }, [data, history]);

  useEffect(() => {
    if (cancelError) {
      message.error('訂單取消失敗');
      return;
    }

    if (cancelData) {
      history.replace('/auth/result');
    }
  }, [cancelData, cancelError, history]);

  const cancelHandler = () => {
    dispatch(cancelOrder(id, orderToken));
    setShowModal(false);
  };

  return (
    <Row>
      <PairModal isModalVisible={showModal} cancelHandler={cancelHandler} />
      <Payment id={id} />

      <Col
        span={dividerLayout.span}
        offset={dividerLayout.offset}
        style={{ marginTop: '1rem' }}
      >
        <Divider />
      </Col>

      <Col
        style={{}}
        span={noteLayout.span}
        offset={noteLayout.offset}
        md={{ ...noteLayout }}
        sm={{ ...mobileWrapLayout }}
        xs={{ ...mobileWrapLayout }}
      >
        <Note />
      </Col>
    </Row>
  );
};

export default HomeScreen;
