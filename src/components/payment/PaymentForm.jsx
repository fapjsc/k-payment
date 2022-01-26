import React, { useEffect } from 'react';

import PropTypes from 'prop-types';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Antd
import ProForm, {
  ProFormText,
} from '@ant-design/pro-form';

import {
  Row, Col, Button, Image, message,
} from 'antd';

// Actions
import { getOrderToken } from '../../store/actions/orderActions';

// Image
import towWayImage from '../../asset/i_twoways.png';

const PaymentForm = ({
  buyRate, clientName, RequestedAmt, id,
}) => {
  // Redux
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.orderToken);

  const onFinish = (values) => {
    dispatch(getOrderToken(id, values));
  };

  useEffect(() => {
    if (!error) return;
    message.destroy();
    message.error(error);
  }, [error]);
  return (
    <ProForm
      onFinish={onFinish}
      autoFocusFirstInput
      submitter={{
        render: (props, doms) => (
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <Button
              size="large"
              style={{ minWidth: '100%', borderRadius: '5px' }}
              type="primary"
              onClick={doms[1].props.onClick}
              loading={loading}
            >
              配對賣家
            </Button>
          </div>

        ),
      }}
    >
      <Row>
        <Col
          sm={24}
          xs={24}
        >
          <ProFormText
            label={`購買數量 (匯率：${buyRate || 'loading..'})`}
            name="buyAmount"
            suffix="USDT"
            disabled
            fieldProps={{ suffix: 'USDT', size: 'large' }}
            initialValue={RequestedAmt.toFixed(2)}

          />
        </Col>

        <Col
          sm={24}
          xs={24}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            src={towWayImage}
            width="10%"
            style={{ transform: 'rotate(90deg)' }}
          />
        </Col>

        <Col
          sm={24}
          xs={24}
        >
          <ProFormText
            label="支付金額"
            name="payAmount"
            suffix="CNY"
            disabled
            fieldProps={{ suffix: 'CNY', size: 'large', precision: 2 }}
            initialValue={(RequestedAmt * buyRate).toFixed(2)}
          />
        </Col>

        <Col
          sm={24}
          xs={24}
        >
          <ProFormText
            label="您的姓名"
            name="clientName"
            fieldProps={{ size: 'large' }}
            initialValue={clientName}
            rules={[{ required: true, message: '請填寫姓名!' }]}
          />
        </Col>
      </Row>

    </ProForm>
  );
};

PaymentForm.propTypes = {
  buyRate: PropTypes.string,
  clientName: PropTypes.string,
  RequestedAmt: PropTypes.number,
  id: PropTypes.string.isRequired,
};

PaymentForm.defaultProps = {
  buyRate: '',
  clientName: '',
  RequestedAmt: null,
};

export default PaymentForm;
