import React from 'react';

// Types
import PropTypes from 'prop-types';

// Redux
import { useSelector } from 'react-redux';

// Antd
import {
  Col, Divider, Typography, Space, Spin,
} from 'antd';

// Components
import PaymentForm from './PaymentForm';

// Hooks
import useRwd from '../../hooks/useRwd';

// Layout
import { wrapLayout, mobileWrapLayout, dividerLayout } from '../../layout/layout-span';

// Helpers
// import { _decrypt } from '../../utils/helpers';

// Styles
import variable from '../../sass/variable.module.scss';

const { Title } = Typography;

const Payment = ({ id }) => {
  const { isMobile } = useRwd();

  const { rateInfo } = useSelector((state) => state.exRate);
  const { RMB_BUY: rmbBuy } = rateInfo || {};

  const { orderInfo } = useSelector((state) => state.openOrder);
  const { Client_CName: clientName, RequestedAmt } = orderInfo || {};

  return (
    <>
      <Col
        span={wrapLayout.span}
        offset={wrapLayout.offset}
        md={{ ...wrapLayout }}
        sm={{ ...mobileWrapLayout }}
        xs={{ ...mobileWrapLayout }}
        style={{
          maxWidth: '47rem',
          marginTop: isMobile && '1rem',
          margin: '0 auto',
          paddingLeft: '20px',
        }}
      >
        <Title
          style={{
            color: variable['color-primary'],
            fontSize: '2.6rem',
          }}
          level={3}
        >
          購買USDT

        </Title>
      </Col>

      {
        !isMobile && (
        <Col
          span={dividerLayout.span}
          offset={dividerLayout.offset}
          style={{ marginTop: '-1rem' }}
        >
          <Divider />
        </Col>
        )
      }

      <Col
        span={wrapLayout.span}
        offset={wrapLayout.offset}
        md={{ ...wrapLayout }}
        sm={{ ...mobileWrapLayout }}
        xs={{ ...mobileWrapLayout }}
        style={{
          maxWidth: '47rem',
          marginTop: isMobile && '1rem',
          margin: '0 auto',
        }}
      >
        {id && clientName && rmbBuy && RequestedAmt ? (
          <PaymentForm
            buyRate={rmbBuy}
            clientName={clientName}
            RequestedAmt={RequestedAmt}
            id={id}
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
