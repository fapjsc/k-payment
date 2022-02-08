import React, { useEffect } from 'react';

// Router
import { useHistory } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

// Antd
import {
  Result,
  Space,
  Divider,
  Row,
  Col,
} from 'antd';

// Components
import Note from '../Note';
import LoadingScreen from '../../screen/LoadingScreen';
// import BuyHeader from '../Buy/BuyHeader';

// Hooks
import useQuery from '../../hooks/useQuery';

// Helper
import { _decrypt, thousandsFormat } from '../../utils/helpers';

// Image
import successImage from '../../asset/success.png';
import cancelImage from '../../asset/cancel.png';

// Websocket
import { buyConnectWs } from '../../utils/webSocket';

// Hooks
import useRwd from '../../hooks/useRwd';

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

  const { isMobile } = useRwd();

  const history = useHistory();

  let id;
  let orderToken;

  try {
    const { id: idStr, orderToken: token } = JSON.parse(_decrypt(queryStr));
    id = idStr;
    orderToken = token;
  } catch (error) {
    history.replace('/not-found');
  }

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
      {!isMobile && (
        <Row>
          <Col md={{ ...spanLayout }}>
            <Row justify="start" gutter={[40, 16]}>
              <Col>
                <Space>
                  <span style={{ color: variable['color-dark-blue'] }}>
                    匯率:
                  </span>
                  <span style={{ color: variable['color-primary'] }}>
                    {rate}
                  </span>
                </Space>
              </Col>
              <Col>
                <Space>
                  <span style={{ color: variable['color-dark-blue'] }}>
                    購買數量:
                  </span>
                  <span style={{ color: variable['color-primary'] }}>
                    {`${thousandsFormat(usdt)}  USDT`}
                  </span>
                </Space>
              </Col>
              <Col>
                <Space>
                  <span style={{ color: variable['color-dark-blue'] }}>
                    支付金額:
                  </span>
                  <span style={{ color: variable['color-primary'] }}>
                    {`${thousandsFormat(cny)}  CNY`}
                  </span>
                </Space>
              </Col>
            </Row>
            <Divider />
          </Col>
        </Row>
      )}

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

      {!isMobile && (
        <Row>
          <Col md={{ ...spanLayout }}>
            <Divider />
          </Col>
          <Col md={{ ...spanLayout }}>
            <Note />
          </Col>
        </Row>
      )}
    </>
  );
};

export default BuyResult;
