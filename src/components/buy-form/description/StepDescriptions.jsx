import React from 'react';
// eslint-disable-next-line
import { Descriptions, Statistic, Row, Col, Button } from 'antd';

// eslint-disable-next-line
const StepDescriptions = ({ stepData, bordered }) => {
  // eslint-disable-next-line
  const { D2, P1, P2, P3, P4, UsdtAmt } = stepData;
  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Statistic title="總額 (CNY)" value={D2} />
        </Col>
        <Col span={12}>
          <Statistic title="數量 (USDT)" value={UsdtAmt} />
        </Col>
      </Row>

      <br />
      <Descriptions column={1} bordered={bordered} title="轉帳資料">
        <Descriptions.Item label="付款金额">
          <Statistic
            value={`￥${D2}`}
            suffix={
              // eslint-disable-next-line
              <span
                style={{
                  fontSize: 14,
                }}
              >
                元
              </span>
            }
            precision={2}
          />
        </Descriptions.Item>
        <Descriptions.Item label="收款姓名">{P2}</Descriptions.Item>
        <Descriptions.Item label="付款帳號">{P1}</Descriptions.Item>
        <Descriptions.Item label="開戶銀行">{P3}</Descriptions.Item>
        <Descriptions.Item label="所在省市">{P4}</Descriptions.Item>
      </Descriptions>
    </>
  );
};
export default StepDescriptions;
