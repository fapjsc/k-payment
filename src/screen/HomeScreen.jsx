import React, { useEffect } from 'react';

import PropTypes from 'prop-types';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Antd
import {
  Layout, Row, Col, Divider,
} from 'antd';

// Layout
import ContentLayout from '../layout/ContentLayout';
import HeaderLayout from '../layout/header/HeaderLayout';

// Components
import PairModal from '../components/PairModal';
import Payment from '../components/payment/Payment';
import Buy from '../components/Buy/Buy';
import Note from '../components/Note';

// websocket
import { buyConnectWs } from '../utils/webSocket';
import { chatConnectWs } from '../utils/chatSocket';

// Actions
import { openOrder, getExRate } from '../store/actions/orderActions';

const wrapLayout = {
  span: 6,
  offset: 9,
};

const mobileWrapLayout = {
  span: 20,
  offset: 2,
};

const dividerLayout = {
  span: 12,
  offset: 6,
};

const PaymentScreen = ({ match }) => {
  // Router Props
  const {
    params: { id },
  } = match;

  // Redux
  const dispatch = useDispatch();

  const { orderToken } = useSelector((state) => state.orderToken);

  // 拿到token後自動連接websocket
  useEffect(() => {
    if (!orderToken || !id) return;

    buyConnectWs(id, orderToken);
    chatConnectWs(id, orderToken);
  }, [orderToken, id]);

  useEffect(() => {
    dispatch(getExRate(id));
    dispatch(openOrder(id));
  }, [dispatch, id]);

  return (
    <Layout className="layout">
      <PairModal isModalVisible={false} usdt={1234} cny={333} />
      <HeaderLayout />

      <ContentLayout>
        <Row>
          {orderToken && <Buy />}

          {!orderToken && <Payment id={id} />}

          <Col
            span={dividerLayout.span}
            offset={dividerLayout.offset}
            style={{ marginTop: '1rem' }}
          >
            <Divider />
          </Col>

          <Col
            span={wrapLayout.span}
            offset={wrapLayout.offset}
            md={{ ...dividerLayout }}
            sm={{ ...mobileWrapLayout }}
            xs={{ ...mobileWrapLayout }}
          >
            <Note />
          </Col>
        </Row>
      </ContentLayout>
    </Layout>
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
