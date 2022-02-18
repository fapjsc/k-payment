import React, { useState, useEffect } from 'react';

// Router props
// import { useHistory } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

// moment
// import moment from 'moment';

// Antd
import { Space, Statistic } from 'antd';

import variable from '../sass/variable.module.scss';

const { Countdown } = Statistic;

// eslint-disable-next-line
const Timer = ({ size }) => {
  // Router
  // const history = useHistory();

  // InitState
  const [deadline, setDeadline] = useState(0);

  // Redux
  const { sessions } = useSelector((state) => state.diOrderSession);

  const { data } = sessions || {};
  const { DeltaTime } = data || {};

  // const deadline = Date.now() + 1000 * 60 * 30 - DeltaTime * 1000; // Moment is also OK

  const onFinish = () => {
    console.log('finished!');
    // history.replace('/auth/result');
  };

  useEffect(() => {
    if (DeltaTime || DeltaTime === 0) {
      const timer = Date.now() + 1000 * 60 * 30 - DeltaTime * 1000; // Moment is also OK
      setDeadline(timer);
    }
  }, [DeltaTime]);

  return (
    <Space style={{}} align="baseline">
      <span className="i-clock" style={{}} />

      <span
        className="txt-12"
        style={{
          fontSize: size && size,
          color: variable['color-dark-blue'],
        }}
      >
        剩餘交易時間:
      </span>

      <Countdown
        format="mm:ss"
        valueStyle={{
          color: variable['color-gold'],
          fontSize: '1.2rem',
          letterSpacing: '1.5px',
        }}
        value={deadline}
        onFinish={onFinish}
      />
    </Space>
  );
};

export default Timer;
