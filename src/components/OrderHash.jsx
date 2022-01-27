import React from 'react';

import PropTypes from 'prop-types';
import { Space, Typography } from 'antd';

// Styles
import variable from '../sass/variable.module.scss';

const OrderHash = ({ hash }) => (
  <Space style={{ maxWidth: '100%' }} direction="vertical">
    <span>訂單編號：</span>
    <Typography.Text copyable style={{ fontSize: '1.4rem', color: variable['color-dark-grey'] }}>
      {hash}
    </Typography.Text>
  </Space>
);

OrderHash.propTypes = {
  hash: PropTypes.string,
};

OrderHash.defaultProps = {
  hash: '',
};

export default OrderHash;
