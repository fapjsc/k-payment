import React, { useEffect } from 'react';

// Redux
import { useSelector } from 'react-redux';

// Antd
import {
  Result, Typography, Space, Divider, Row, Col,
} from 'antd';

// Components
import Note from '../Note';

// Image
import successImage from '../../asset/success.png';
import cancelImage from '../../asset/cancel.png';

// Styles
import variable from '../../sass/variable.module.scss';

const spanLayout = {
  span: 12,
  offset: 6,
};

let type;

const BuyResult = () => {
  // Redux
  const {
    sessions: { data },
  } = useSelector((state) => state.diOrderSession);

  const {
    Order_StatusID: status,
    Tx_HASH: hash,
    UsdtAmt: usdt,
    D2: cny,
    D1: rate,
  } = data || {};

  if (status === 1) type = 'success';
  // if (status === 99 || status === 98) type = 'cancel';
  if (type !== 'success') type = 'cancel';

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div>
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
        title={(
          <h4 style={{ fontSize: '2rem', color: variable['color-primary'] }}>
            {type === 'cancel' ? '交易取消' : '交易完成'}
          </h4>
        )}
        icon={(
          <img
            style={{ width: '20rem' }}
            src={type === 'cancel' ? cancelImage : successImage}
            alt="success"
          />
        )}
        extra={(
          <Space>
            <span style={{ color: variable['color-secondary'] }}>
              交易回執：
            </span>
            <Typography.Text
              copyable
              style={{ fontSize: '1.4rem', color: variable['color-dark-grey'] }}
            >
              {hash}
            </Typography.Text>
          </Space>
        )}
      />
      <Row>
        <Col md={{ ...spanLayout }}>
          <Divider />
        </Col>
        <Col md={{ ...spanLayout }}>
          <Note />
        </Col>
      </Row>
    </div>
  );
};

export default BuyResult;
