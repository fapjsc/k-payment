import React, { useEffect } from 'react';

import PropTypes from 'prop-types';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Antd
import ProForm, { ProFormText } from '@ant-design/pro-form';

import {
  Row, Col, Button, message,
} from 'antd';

// Actions
import { getOrderToken } from '../../store/actions/orderActions';

// Hooks
import useRwd from '../../hooks/useRwd';

// Image
// import towWayImage from '../../asset/i_twoways.png';

const PaymentForm = ({
  // eslint-disable-next-line
  buyRate,
  clientName,
  RequestedAmt,
  id,
}) => {
  // Redux
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.orderToken);

  const { isMobile } = useRwd();

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
      style={{}}
      onFinish={onFinish}
      autoFocusFirstInput
      submitter={{
        render: (props, doms) => (
          <div
            style={{
              textAlign: 'center',
              // marginTop: '1rem',
              padding: '0 20px',
            }}
          >
            <Button
              size="large"
              style={{ minWidth: '100%', borderRadius: '5px' }}
              type="primary"
              onClick={doms[1].props.onClick}
              loading={loading}
              className="easy-btn1"
            >
              配對賣家
            </Button>
          </div>
        ),
      }}
    >
      <Row>
        <Row
          style={{
            backgroundColor: '#f2f5fa',
            padding: '20px',
            borderRadius: '1.3rem',
            width: '100%',
            marginBottom: isMobile ? '1rem' : '3rem',
            paddingBottom: 0,
          }}
        >
          <Col
            sm={24}
            xs={24}
            // style={{ backgroundColor: 'red' }}
          >
            <ProFormText
              // label={`購買數量 (匯率：${buyRate || 'loading..'})`}
              label="購買數量"
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
            style={
              {
                // backgroundColor: 'blue',
              }
            }
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
        </Row>

        <Col
          sm={24}
          xs={24}
          style={{
            padding: '0px 20px',
            // backgroundColor: 'red',
          }}
        >
          <ProFormText
            label="請填寫匯款人全名"
            name="clientName"
            fieldProps={{ size: 'large' }}
            initialValue={clientName}
            rules={[{ required: true, message: '請填寫姓名!' }]}
          />
          {/* <input type="text" /> */}
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
