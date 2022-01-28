import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';

// Antd
import { Result } from 'antd';

// Actions
import { openOrderClear, exRateClear } from '../store/actions/orderActions';

// Image
import notFoundImage from '../asset/notfound.png';

// styles
import variable from '../sass/variable.module.scss';

const NotfoundImg = () => <img src={notFoundImage} alt="not found" />;

const NoFoundPage = () => {
  // Redux
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.clear();
    dispatch(openOrderClear());
    dispatch(exRateClear());
  }, [dispatch]);
  return (
    <>
      <Result
        title={(
          <h4 style={{ fontSize: '20px', color: variable['color-primary'] }}>
            找不到訂單
          </h4>
        )}
        icon={<NotfoundImg />}
        extra={
          <Link to="/t308V%2bOFafSZj0eTXZZiXWpgufwq8Hg1StfpAvn5cMmyQzwNVWpDf6wQMiY3Dbb4O0XuENyA1RSWnYSP8kH99xnXYFUetonCPQXwWMS8%2bhY%3d">Test</Link>
        }
      />
    </>
  );
};

export default NoFoundPage;
