import React from 'react';
import { Spin } from 'antd';

const LoadingScreen = () => (
  <Spin size="large" tip="載入中">
    <div style={{ width: '100vw', height: '100vh' }} />
  </Spin>
);

export default LoadingScreen;
