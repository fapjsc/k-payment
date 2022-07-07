import React, { useEffect, useState } from 'react';

// Router
import { useHistory } from 'react-router-dom';

// Antd
import {
  Row, Col, Divider, Modal,
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

import { errorCode } from '../error-code';

// Components
import Payment from '../components/payment/Payment';
import Note from '../components/Note';
import PairModal from '../components/PairModal';

// Hooks
import useQuery from '../hooks/useQuery';

import {
  mobileWrapLayout,
  dividerLayout,
  noteLayout,
} from '../layout/layout-span';

const HomeScreen = () => {
  const query = useQuery();
  const id = query.get('id');

  // Router
  const history = useHistory();

  // Redux
  const dispatch = useDispatch();

  const { orderInfo, error: orderInfoError } = useSelector(
    (state) => state.openOrder,
  );
  const { order_token: openToken } = orderInfo || {};

  const { data: cancelData, error: cancelError } = useSelector(
    (state) => state.cancelOrder,
  );

  const { rateInfo, error: rateError } = useSelector((state) => state.exRate);
  const { orderToken } = useSelector((state) => state.orderToken);
  const { sessions } = useSelector((state) => state.diOrderSession);
  const { data } = sessions || {};

  // Init State
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!rateInfo) {
      dispatch(getExRate(id));
    }
  }, [dispatch, id, rateInfo]);

  useEffect(() => {
    if (!orderInfo) {
      dispatch(openOrder(id));
    }
  }, [dispatch, id, orderInfo]);

  useEffect(() => {
    if (!orderInfoError) return;
    Modal.error({
      title: `開啟訂單失敗： ${orderInfoError}`,
      content: `${errorCode[orderInfoError] || errorCode[0]}: ${id}`,
      onOk: () => { dispatch(openOrder(id)); },
    });
  }, [orderInfoError, history, dispatch, id]);

  useEffect(() => {
    if (!rateError) return;
    Modal.error({
      title: `無法獲取匯率：${rateError}`,
      content: errorCode[rateError] || errorCode[0],
    });
  }, [rateError]);

  useEffect(() => {
    if (!cancelError) return;
    Modal.error({
      title: `取消訂單失敗：${cancelError}`,
      content: `${errorCode[cancelError] || errorCode[0]}: ${orderToken}`,
    });
  }, [cancelError, dispatch, orderToken]);

  useEffect(() => {
    if (!openToken) return;
    dispatch(setOrderToken(openToken));
  }, [openToken, dispatch]);

  //**  Di Order */
  useEffect(() => {
    if ((openToken && id) || (orderToken && id)) {
      setShowModal(true);
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
    if (!data || !orderToken) return;
    const { Order_StatusID: orderStatus } = data || {};
    if (orderStatus >= 1 && orderStatus !== 31) {
      history.replace(`/auth/payment?id=${id}&orderToken=${orderToken}`);
    }
  }, [data, history, id, orderToken]);

  // 取消訂單
  useEffect(() => {
    if (cancelData) {
      history.replace(`/auth/result?id=${id}&orderToken=${orderToken}`);
    }
  }, [cancelData, history, id, orderToken]);

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
