import React, { useEffect } from 'react';

// Redux
import { useDispatch } from 'react-redux';

// Antd
import { Result } from 'antd';

// Actions
import { openOrderClear, exRateClear } from '../store/actions/orderActions';

// Image
import notFoundImage from '../asset/notfound.png';

// Hooks
import useRwd from '../hooks/useRwd';

// styles
import variable from '../sass/variable.module.scss';

// eslint-disable-next-line
const NotfoundImg = () => <img src={notFoundImage} alt="not found" />;

const NoFoundPage = () => {
  // Redux
  const dispatch = useDispatch();

  // eslint-disable-next-line
  const { isMobile } = useRwd();

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
        icon={
          <img style={{ width: isMobile && '10.2rem' }} src={notFoundImage} alt="not found" />
       }

      />
    </>
  );
};

export default NoFoundPage;
