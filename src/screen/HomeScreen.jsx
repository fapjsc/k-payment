import React, { useEffect, useState, useRef } from 'react';

// Router
import { useHistory } from 'react-router-dom';

// Antd
import {
  Row, Col, message, Divider,
} from 'antd';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Actions
import {
  getExRate, openOrder, setOrderToken,
} from '../store/actions/orderActions';
import { cancelOrder } from '../store/actions/cancelActions';

// websocket
import { buyConnectWs } from '../utils/webSocket';
// import { chatConnectWs } from '../utils/chatSocket';

// Components
// eslint-disable-next-line
import Payment from '../components/payment/Payment';
import Note from '../components/Note';
import PairModal from '../components/PairModal';

// Hooks
import useQuery from '../hooks/useQuery';

// Helpers
import { _encrypt, _decrypt } from '../utils/helpers';

import {
  mobileWrapLayout,
  dividerLayout,
  noteLayout,
} from '../layout/layout-span';

const HomeScreen = () => {
  const query = useQuery();
  const queryStr = query.get('id');
  const id = _decrypt(queryStr);

  // Ref
  const tokenRef = useRef();

  // Router
  const history = useHistory();

  // Redux
  const dispatch = useDispatch();
  const { orderInfo, error: orderInfoError } = useSelector(
    (state) => state.openOrder,
  );

  const { data: cancelData, error: cancelError } = useSelector(
    (state) => state.cancelOrder,
  );

  const { orderInfo: openOrderInfo } = useSelector((state) => state.openOrder);
  const { order_token: openToken } = openOrderInfo || {};

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

  useEffect(() => {
    if (!openToken) return;
    dispatch(setOrderToken(openToken));
  }, [openToken, dispatch]);

  //**  Di Order */
  useEffect(() => {
    if ((openToken && id) || (orderToken && id)) {
      setShowModal(true);
      tokenRef.current = _encrypt(JSON.stringify({ orderToken, id }));
    }
  }, [orderToken, id, openToken]);

  // 拿到token後連接websocket
  useEffect(() => {
    if (!id || !orderToken) return;
    buyConnectWs(id, orderToken);
    // chatConnectWs(id, orderToken);
  }, [orderToken, id]);

  // 配對成功
  useEffect(() => {
    if (!data || !tokenRef.current) return;
    const { Order_StatusID: orderStatus } = data || {};
    if (orderStatus >= 1 && orderStatus !== 31) {
      history.replace(`/auth/payment?session=${tokenRef.current}`);
    }
  }, [data, history, tokenRef, id]);

  // 取消訂單
  useEffect(() => {
    if (cancelError) {
      message.error('訂單取消失敗');
      return;
    }

    if (cancelData) {
      history.replace(`/auth/result?session=${tokenRef.current}`);
    }
  }, [cancelData, cancelError, history, queryStr]);

  const cancelHandler = () => {
    dispatch(cancelOrder(id, orderToken));
    setShowModal(false);
  };

  return (
    <Row style={{ }}>
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
