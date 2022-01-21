import React from 'react';

import PropTypes from 'prop-types';

// Redux
import { useSelector } from 'react-redux';

// Antd
import {
  Col, Divider, Typography, Space, Spin,
} from 'antd';

// import Note from '../Note';
import PaymentForm from './PaymentForm';

const { Title } = Typography;

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

const Payment = ({ id }) => {
  const { rateInfo } = useSelector((state) => state.exRate);
  const { RMB_BUY: rmbBuy } = rateInfo || {};

  const { orderInfo } = useSelector((state) => state.openOrder);
  const { Client_CName: clientName, RequestedAmt } = orderInfo || {};

  const getFormData = (values) => {
    console.log(values);
  };
  return (
    <>
      <Col
        md={{ ...wrapLayout }}
        sm={{ ...mobileWrapLayout }}
        xs={{ ...mobileWrapLayout }}
      >
        <Title level={3}>購買USDT</Title>
      </Col>

      <Col
        span={dividerLayout.span}
        offset={dividerLayout.offset}
        style={{ marginTop: '-1rem' }}
      >
        <Divider />
      </Col>

      <Col
        span={wrapLayout.span}
        offset={wrapLayout.offset}
        md={{ ...wrapLayout }}
        sm={{ ...mobileWrapLayout }}
        xs={{ ...mobileWrapLayout }}
      >
        {id && clientName && rmbBuy && RequestedAmt ? (
          <PaymentForm
            buyRate={rmbBuy}
            clientName={clientName}
            RequestedAmt={RequestedAmt}
            id={id}
            getFormData={getFormData}
          />
        ) : (
          <Space
            size="large"
            style={{
              height: '22.68rem',
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <Spin size="large" />
          </Space>
        )}
      </Col>
    </>
  );
};

Payment.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Payment;
