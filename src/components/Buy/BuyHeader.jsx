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
  const { isMobile, isSmallScreen, isTinyScreen } = useRwd();

  // Redux
  const { sessions } = useSelector((state) => state.diOrderSession);
  const { data } = sessions || {};

  const {
    D2: cny,
    D1: exRate,
    UsdtAmt: usdt,
  } = data || {};

  const colStyle = {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  };

  if (isMobile) {
    return (
      <Space direction={isTinyScreen && 'vertical'} style={{ fontSize: '1.2rem' }} size={isSmallScreen ? 'small' : 'middle'}>
        <Space size={2}>
          <span style={{ color: variable['color-dark-blue'] }}>匯率</span>
          <span style={{ color: variable['color-primary'] }}>{exRate}</span>
        </Space>
        <Space size={2}>
          <span style={{ color: variable['color-dark-blue'] }}>購買數量</span>
          <img width="12px" src={usdtImage} alt="usdt" />
          {/* <Avatar size={14} icon={<usdtImage />} /> */}
          <span style={{ color: variable['color-primary'] }}>
            {thousandsFormat(usdt)}
          </span>
        </Space>
        <Space size={2}>
          <span style={{ color: variable['color-dark-blue'] }}>
            支付金額(CNY)
          </span>
          <span style={{ color: variable['color-primary'] }}>
            {`¥${thousandsFormat(cny)}`}
          </span>
        </Space>
      </Space>
    );
  }

  return (
    <Row justify="start" gutter={[40, 8]}>
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
          <span style={{ color: variable['color-primary'] }}>
            {thousandsFormat(usdt)}
          </span>
        </Space>
      </Col>

      <Col style={colStyle}>
        <Space>
          <span style={{ color: variable['color-dark-blue'] }}>
            支付金額(CNY)
          </span>
          <span style={{ color: variable['color-primary'] }}>
            {`¥${thousandsFormat(cny)}`}
          </span>
        </Space>
      </Col>
    </Row>
  );
};

export default BuyHeader;