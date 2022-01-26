import React from 'react';

// Redux
import { useSelector } from 'react-redux';

// Media Query
import { useMediaQuery } from 'react-responsive';

// Antd
// eslint-disable-next-line
import { Space, Typography, Row, Col, Avatar } from 'antd';

// Image
// eslint-disable-next-line
import usdtImage from '../../asset/USDT_icon.png';

// Helpers
import { thousandsFormat } from '../../utils/helpers';

// Styles
import variable from '../../sass/variable.module.scss';

const BuyHeader = () => {
  // Media query
  // eslint-disable-next-line
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  // eslint-disable-next-line
  const isSmallScreen = useMediaQuery({ query: '(max-width: 367px)' });

  // Redux
  const { sessions } = useSelector((state) => state.diOrderSession);
  const { data } = sessions || {};
  const {
    // eslint-disable-next-line
    Tx_HASH: hash,
    // eslint-disable-next-line
    D2: cny,
    // eslint-disable-next-line
    D1: exRate,
    // eslint-disable-next-line
    UsdtAmt: usdt,
  } = data || {};

  const mobileStyle = {
    backgroundColor: '#fff',
    fontSize: '12px',
    height: isSmallScreen ? '3.7rem' : '3.7rem',
    position: 'absolute',
    top: 65,
    left: isSmallScreen ? 0 : 12,
    right: isSmallScreen ? 0 : 12,
  };

  const colStyle = {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  };
  return (
    <Row style={isMobile && mobileStyle} justify="space-between">
      <Col style={colStyle}>
        <Space>
          <span style={{ color: variable['color-dark-blue'] }}>匯率</span>
          <span style={{ color: variable['color-primary'] }}>{exRate}</span>
        </Space>
      </Col>

      <Col style={colStyle}>
        <Space size={4}>
          <span style={{ color: variable['color-dark-blue'] }}>購買數量</span>
          <img width="12px" src={usdtImage} alt="usdt" />
          {/* <Avatar size={14} icon={<usdtImage />} /> */}
          <span style={{ color: variable['color-primary'] }}>{thousandsFormat(usdt)}</span>
        </Space>
      </Col>

      <Col style={colStyle}>
        <Space>
          <span style={{ color: variable['color-dark-blue'] }}>支付金額</span>
          <span style={{ color: variable['color-primary'] }}>{`${thousandsFormat(cny)}CNY`}</span>
        </Space>
      </Col>
    </Row>
  );
};

export default BuyHeader;
