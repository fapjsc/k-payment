import React from 'react';
import { Space } from 'antd';

import variable from '../sass/variable.module.scss';

// eslint-disable-next-line
const Timer = ({size}) => (
  <Space>
    <span className="i-clock" />
    <span className="txt-12" style={{ fontSize: size && size, color: variable['color-dark-blue'] }}>
      剩餘交易時間:
    </span>
    <span className="txt-12" style={{ fontSize: size && size, color: variable['color-gold'] }}>
      14分29秒
    </span>
  </Space>
);

export default Timer;
