import React, { useEffect } from 'react';

// Redux
import { useDispatch } from 'react-redux';

import { useLocation } from 'react-router-dom';

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
  const query = useLocation()?.query;
  console.log(query);
  // Redux
  const dispatch = useDispatch();

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
          <div style={{ fontSize: '20px', color: variable['color-primary'] }}>
            <h4
              style={{ fontSize: '20px', color: variable['color-primary'] }}
            >
              發生錯誤
              {query && `CODE: ${query?.code}`}
            </h4>
            <p>{query && query?.message}</p>
            <p>{query && query?.orderToken}</p>
          </div>
        )}
        icon={
          <img style={{ width: isMobile && '10.2rem' }} src={notFoundImage} alt="not found" />
       }

      />
    </>
  );
};

export default NoFoundPage;
