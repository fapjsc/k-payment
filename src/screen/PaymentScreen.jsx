import React, { useEffect } from 'react';

import PropTypes from 'prop-types';

// Redux
import { useSelector } from 'react-redux';

// Components
import Payment from '../components/Payment';

// websocket
// eslint-disable-next-line
import { buyConnectWs } from '../utils/webSocket';
// eslint-disable-next-line
import { chatConnectWs } from '../utils/chatSocket';

const PaymentScreen = ({ match }) => {
  const { orderToken } = useSelector((state) => state.orderToken);
  const {
    params: { id },
  } = match;

  useEffect(() => {
    if (!orderToken || !id) return;

    buyConnectWs(id, orderToken);
    // chatConnectWs(id, orderToken);
  }, [orderToken, id]);
  return (
    <div>
      <h1>Payment screen</h1>
      <Payment />
    </div>
  );
};

PaymentScreen.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

PaymentScreen.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: '',
    }),
  }),
};
export default PaymentScreen;
