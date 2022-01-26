import React, { useEffect } from 'react';

// Redux
import { useDispatch } from 'react-redux';

// Antd
import { Button, Result } from 'antd';

// Actions
import { openOrderClear, exRateClear } from '../store/actions/orderActions';

const NoFoundPage = () => {
  // Redux
  const dispatch = useDispatch();

  const extraEl = (
    <Button type="primary" onClick={() => alert('redirect')}>
      Back
    </Button>
  );

  useEffect(() => {
    localStorage.clear();
    dispatch(openOrderClear());
    dispatch(exRateClear());
  }, [dispatch]);
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={extraEl}
    />
  );
};

export default NoFoundPage;
