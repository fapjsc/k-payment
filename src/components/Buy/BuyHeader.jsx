import React from 'react';

// Redux
import { useSelector } from 'react-redux';

// Antd
import { Space, Row, Col } from 'antd';

// Image
// eslint-disable-next-line
import usdtImage from '../../asset/USDT_icon.png';

// Helpers
import { thousandsFormat } from '../../utils/helpers';

// Styles
import variable from '../../sass/variable.module.scss';

// Hooks
import useRwd from '../../hooks/useRwd';

const BuyHeader = () => {
  // Hooks
  const {
    isMobile, isTinyScreen, isTablets, isSmallScreen,
  } = useRwd();

  // Redux
  const { sessions } = useSelector((state) => state.diOrderSession);
  const { data } = sessions || {};

  const { rateInfo } = useSelector((state) => state.exRate);
  const { RMB_BUY: rate } = rateInfo || {};

  const { orderInfo } = useSelector((state) => state.openOrder);
  const { RequestedAmt: amount } = orderInfo || {};

  const { D2: cny, D1: exRate, UsdtAmt: usdt } = data || {};

  const colStyle = {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  };

  if (isMobile) {
    return (
      <Space
        direction={isTinyScreen && 'vertical'}
        style={{ fontSize: '1.2rem' }}
        size={isSmallScreen ? 'small' : 'middle'}
      >
        <Space size={2}>
          <span style={{ color: variable['color-dark-blue'] }}>匯率</span>
          <span style={{ color: variable['color-primary'] }}>
            {exRate || rate}
          </span>
        </Space>
        <Space size={2}>
          <span style={{ color: variable['color-dark-blue'] }}>購買數量</span>
          <img width="12px" src={usdtImage} alt="usdt" />
          {/* <Avatar size={14} icon={<usdtImage />} /> */}
          <span style={{ color: variable['color-primary'] }}>
            {thousandsFormat(usdt) || thousandsFormat(amount)}
          </span>
        </Space>
        <Space size={2}>
          <span style={{ color: variable['color-dark-blue'] }}>
            支付金額(CNY)
          </span>
          <span style={{ color: variable['color-primary'] }}>
            {thousandsFormat(cny) || thousandsFormat(rate * amount)}
          </span>
        </Space>
      </Space>
    );
  }

  return (
    <Row justify="start" gutter={isTablets ? [20] : [40]} style={{}}>
      <Col style={{ ...colStyle, marginLeft: '1rem' }}>
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
          <span style={{ color: variable['color-primary'] }}>
            {thousandsFormat(usdt) || thousandsFormat(amount)}
          </span>
        </Space>
      </Col>

      <Col style={colStyle}>
        <Space>
          <span style={{ color: variable['color-dark-blue'] }}>
            支付金額(CNY)
          </span>
          <span style={{ color: variable['color-primary'] }}>
            {thousandsFormat(cny) || thousandsFormat(rate * amount)}
          </span>
        </Space>
      </Col>
    </Row>
  );
};

export default BuyHeader;
