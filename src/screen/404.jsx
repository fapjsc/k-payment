import React, { useEffect } from 'react';

// Redux
import { useDispatch } from 'react-redux';

// Antd
import { Result } from 'antd';

// Actions
import { openOrderClear, exRateClear } from '../store/actions/orderActions';

// styles
import variable from '../sass/variable.module.scss';

// Image
import notFoundImage from '../asset/notfound.png';

const NotfoundImg = () => (
  <img src={notFoundImage} alt="not found" />
);

const NoFoundPage = () => {
  // Redux
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.clear();
    dispatch(openOrderClear());
    dispatch(exRateClear());
  }, [dispatch]);
  return (
    <Result
      title={<h4 style={{ fontSize: '20px', color: variable['color-primary'] }}>找不到訂單</h4>}
      icon={<NotfoundImg />}
    />
  );
};

export default NoFoundPage;
