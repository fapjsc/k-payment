import React, { useEffect, useState } from 'react';

// Router props
import { useHistory } from 'react-router-dom';

// Antd
import {
  Row,
  Col,
  Divider,
  Skeleton,
  Space,
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

// Hooks
import useRwd from '../hooks/useRwd';

// Components
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
  const [refHeight] = useState(window.innerHeight - 150 - 18 - 30);

  // Router props
  const history = useHistory();

  // Redux
  const dispatch = useDispatch();
  const { orderInfo } = useSelector((state) => state.openOrder);
  const { rateInfo } = useSelector((state) => state.exRate);

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

  return (
    <Row
      align="start"
      justify="center"
      style={{
        maxWidth: '1140px',
        margin: 'auto',
        height: isMobile && refHeight,
        // backgroundColor: 'black',
      }}
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
        span={24}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: isMobile ? 'space-between' : 'flex-start',
          // height: isMobile && '50%',
          // backgroundColor: 'blue',
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

          {paymentStatus === 34 && <WaitConfirm setModalShow={setModalShow} />}
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
        style={
          {
            // height: isMobile && '50%',
            // backgroundColor: 'red',
          }
        }
      >
        {/* <Chat refHeight={refHeight} /> */}
      </Col>
    </Row>
  );
};

export default BuyScreen;
