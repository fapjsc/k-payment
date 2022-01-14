import React from 'react';
import { Alert } from 'antd';
// import { ProFormText } from '@ant-design/pro-form';
import StepDescriptions from '../description/StepDescriptions';

// eslint-disable-next-line
const StepTwo = ({ stepData }) => (
  <div>
    <Alert
      closable
      showIcon
      message="确认转账后，资金将直接打入对方账户，无法退回。"
      style={{ marginBottom: 24 }}
    />
    <StepDescriptions stepData={stepData} bordered />
    {/* <Divider style={{ margin: '24px 0' }} /> */}
    {/* <ProFormText.Password
      label="支付密码"
      width="md"
      name="password"
      required={false}
      rules={[{ required: true, message: '需要支付密码才能进行支付' }]}
    /> */}
  </div>
);

export default StepTwo;
