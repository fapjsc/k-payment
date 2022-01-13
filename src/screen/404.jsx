import { Button, Result } from 'antd';
import React from 'react';

const NoFoundPage = () => {
  const extraEl = (
    <Button type="primary" onClick={() => alert('redirect')}>
      Back
    </Button>
  );
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
