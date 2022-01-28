import React, { useEffect } from 'react';

// Redux
import { useSelector } from 'react-redux';

// Antd
import {
  // eslint-disable-next-line
  Result,
  // eslint-disable-next-line
  Typography,
  Space,
  Divider,
  Row,
  Col,
  // eslint-disable-next-line
  Spin,
  // eslint-disable-next-line
  Skeleton,
} from 'antd';

// Components
import Note from '../Note';
import LoadingScreen from '../../screen/LoadingScreen';

// Hooks
import useQuery from '../../hooks/useQuery';

// Helper
import { _decrypt } from '../../utils/helpers';

// Image
import successImage from '../../asset/success.png';
import cancelImage from '../../asset/cancel.png';

// Websocket
import { buyConnectWs } from '../../utils/webSocket';

// Styles
import variable from '../../sass/variable.module.scss';

const spanLayout = {
  span: 12,
  offset: 6,
};

let type;

const BuyResult = () => {
  const query = useQuery();
  const queryStr = query.get('session') || query.get('id');

  const { id, orderToken } = JSON.parse(_decrypt(queryStr)) || {};

  // Redux
  const {
    sessions: { data },
  } = useSelector((state) => state.diOrderSession);

  const {
    Order_StatusID: status,
    // eslint-disable-next-line
    Tx_HASH: hash,
    UsdtAmt: usdt,
    D2: cny,
    D1: rate,
  } = data || {};

  if (status === 1) type = 'success';
  if (status === 99 || status === 98) type = 'cancel';
  // if (type !== 'success') type = 'cancel';

  useEffect(() => {
    if (status) return;

    if (id && orderToken) {
      buyConnectWs(id, orderToken);
    }
  }, [status, id, orderToken]);

  if (!data) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Row>
        <Col md={{ ...spanLayout }}>
          <Row justify="start" gutter={[40, 16]}>
            <Col>
              <Space>
                <span style={{ color: variable['color-dark-blue'] }}>
                  匯率:
                </span>
                <span style={{ color: variable['color-primary'] }}>{rate}</span>
              </Space>
            </Col>
            <Col>
              <Space>
                <span style={{ color: variable['color-dark-blue'] }}>
                  購買數量:
                </span>
                <span style={{ color: variable['color-primary'] }}>
                  {`${usdt}  USDT`}
                </span>
              </Space>
            </Col>
            <Col>
              <Space>
                <span style={{ color: variable['color-dark-blue'] }}>
                  支付金額:
                </span>
                <span style={{ color: variable['color-primary'] }}>
                  {`${cny}CNY`}
                </span>
              </Space>
            </Col>
          </Row>
          <Divider />
        </Col>
      </Row>

      <Result
        title={
          data && (
            <h4 style={{ fontSize: '2rem', color: variable['color-primary'] }}>
              {type === 'cancel' ? '交易取消' : '交易完成'}
            </h4>
          )
        }
        icon={
          data && (
            <img
              style={{ width: '20rem' }}
              src={type === 'cancel' ? cancelImage : successImage}
              alt="success"
            />
          )
        }
      />

      <Row>
        <Col md={{ ...spanLayout }}>
          <Divider />
        </Col>
        <Col md={{ ...spanLayout }}>
          <Note />
        </Col>
      </Row>
    </>
  );
};

export default BuyResult;
