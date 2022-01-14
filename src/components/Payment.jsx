import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

// Router
import { withRouter } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Antd
// eslint-disable-next-line
import { Card, Spin, Button } from 'antd';
import ProForm, { ProFormText, ProFormMoney } from '@ant-design/pro-form';
import ProDescriptions from '@ant-design/pro-descriptions';
// eslint-disable-next-line
import { TrademarkCircleFilled, LoadingOutlined } from '@ant-design/icons';

// Actions
import {
  getExRate,
  openOrder,
  getOrderToken,
} from '../store/actions/orderActions';

// Websocket
// import { buyConnectWs } from '../utils/webSocket';

// Styles
import styles from './Payment.module.scss';

const Payment = ({ match }) => {
  const {
    params: { id },
  } = match;

  // Redux
  const dispatch = useDispatch();

  const {
    orderInfo,
    error: orderInfoError,
    loading: orderInfoLoading,
  } = useSelector((state) => state.openOrder);

  const {
    rateInfo,
    error: rateError,
    loading: rateLoading,
  } = useSelector((state) => state.exRate);

  // eslint-disable-next-line
  const { loading: orderTokenLoading } = useSelector(
    (state) => state.orderToken,
  );

  const { Client_CName: clientName, RequestedAmt } = orderInfo || {};
  const { RMB_BUY: rmbBuy } = rateInfo || {};

  // Init State
  const [name, setName] = useState(clientName);
  const [amount, setAmount] = useState(RequestedAmt);

  // 獲取匯率
  useEffect(() => {
    dispatch(getExRate(id));
  }, [id, dispatch]);

  // 如果沒有orderInfo, 再call一次
  useEffect(() => {
    if (!orderInfo && id) {
      dispatch(openOrder(id));
    }
  }, [dispatch, orderInfo, id]);

  // Form handle
  useEffect(() => {
    if (clientName) setName(clientName);
  }, [clientName]);

  useEffect(() => {
    if (RequestedAmt) setAmount(RequestedAmt);
  }, [RequestedAmt]);

  const onFinishHandler = () => {
    if (name && amount && id) {
      const orderData = { name, amount };
      dispatch(getOrderToken(id, orderData));
    }
  };

  const rateErrorMessage = () => {
    if (!rateError) return null;
    return <span style={{ color: '#ff4d4f' }}>{rateError}</span>;
  };

  const labelRender = (
    <div className={styles['label-container']}>
      <TrademarkCircleFilled className={styles.icon} />
      <span className={styles['label-title']}>Rate</span>
    </div>
  );

  const rateText = () => {
    if (rateError || !rmbBuy) return null;
    return <span className={styles['rmb-text']}>{rmbBuy}</span>;
  };

  const orderErrText = () => {
    if (orderInfoError) {
      return <span style={{ color: '#ff4d4f' }}>{`*${orderInfoError}`}</span>;
    }
    return <span />;
  };

  return (
    <Card className={styles.card}>
      {orderInfoLoading || rateLoading ? (
        <div className={styles['spin-box']}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          <ProDescriptions>
            <ProDescriptions.Item
              labelStyle={{ color: '#4b70e2' }}
              label={labelRender}
              valueType="string"
            >
              {rateErrorMessage() || rateText()}
            </ProDescriptions.Item>
          </ProDescriptions>
          <br />
          <ProForm
            onFinish={onFinishHandler}
            className={styles['insert-shadow']}
            submitter={{
              // eslint-disable-next-line
              render: (props, doms) => {
                return [
                  <div className={styles['button-box']}>
                    <button
                      loading={orderTokenLoading}
                      type="submit"
                      key="submit"
                      className={styles.button}
                      // eslint-disable-next-line
                      onClick={() => props.form?.submit?.()}
                    >
                      {orderTokenLoading && <LoadingOutlined />}
                      確認
                    </button>
                  </div>,
                ];
              },
            }}
          >
            <ProFormText
              name="name"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled
            />
            <ProFormMoney
              name="amount"
              label="Amount"
              locale="zh-TW"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled
              extra={orderErrText()}
            />
          </ProForm>
        </>
      )}
    </Card>
  );
};

Payment.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
};

Payment.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: '',
    }),
  }),
};

export default withRouter(Payment);
