import React, { useEffect } from 'react';

import PropTypes from 'prop-types';

// Redux
import { useSelector } from 'react-redux';

// Components
import Payment from '../components/Payment';
import BuyForm from '../components/buy-form/BuyForm';
// import PairModal from '../components/PairModal';

// websocket
import { buyConnectWs } from '../utils/webSocket';
import { chatConnectWs } from '../utils/chatSocket';

const PaymentScreen = ({ match }) => {
  // Init State
  //   const [showModal, setShowModal] = useState(false);

  // Redux
  const { orderToken } = useSelector((state) => state.orderToken);
  const { sessions } = useSelector((state) => state.diOrderSession);
  const { data: sessionData } = sessions || {};
  const {
    params: { id },
  } = match;

  useEffect(() => {
    if (!orderToken || !id) return;

    buyConnectWs(id, orderToken);
    chatConnectWs(id, orderToken);
  }, [orderToken, id]);

  return (
    <div>
      <h1>Payment screen</h1>
      {/* <PairModal
        isModalVisible={sessionData?.Order_StatusID === 31 || false}
        usdt={sessionData?.UsdtAmt}
        cny={sessionData?.D2}
      /> */}
      {sessionData?.Order_StatusID !== 31 && sessions?.code === 200 ? (
        <BuyForm />
      ) : (
        <Payment />
      )}
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
