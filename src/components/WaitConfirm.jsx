import React from 'react';

// Redux
import { useSelector } from 'react-redux';

// Antd
import {
  Space, Typography, Row, Col, Button, message,
} from 'antd';

// Components
import Timer from './Timer';

// Styles
import variable from '../sass/variable.module.scss';

// image
import waitImage from '../asset/waiting.png';

// eslint-disable-next-line
const WaitConfirm = ({setModalShow}) => {
  const {
    sessions: { data },
  } = useSelector((state) => state.diOrderSession);
  const { Tx_HASH: hash } = data || {};

  const cancelHandler = () => {
    const token = localStorage.getItem('orderToken');
    const id = localStorage.getItem('id');
    if (!id || !token) {
      message.error('session or token invalid');
    }

    setModalShow({
      type: 'cancel',
      show: true,
      title: '取消本次交易？',
      text: '若您已進行匯款，請不要取消本次交易，已匯款像不能拿回',
    });
  };

  return (
    <>
      <Row style={{ textAlign: 'start', fontSize: '1.4rem' }}>
        <Col>
          <Timer size="1.4rem" />
        </Col>
      </Row>

      <Row style={{ textAlign: 'center', color: variable['color-dark-grey'] }} align="center">
        <Col span={24}>
          <img style={{ width: '17rem' }} src={waitImage} alt="wait" />
          <h4 style={{ fontSize: '2rem', color: variable['color-primary'] }}>等候確定中</h4>
          <Space>
            <span>訂單編號：</span>
            <Typography.Text copyable style={{ fontSize: '1.4rem', color: variable['color-dark-grey'] }}>
              {hash}
            </Typography.Text>
          </Space>
        </Col>

        <Col style={{ marginTop: '3rem' }}>
          <p>對方確認收款後，系統會自動將數字貨幣匯到您的帳戶內</p>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Button size="large" type="primary" block>
              申訴
            </Button>
            <Button size="large" type="link" block onClick={cancelHandler}>
              取消交易
            </Button>
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default WaitConfirm;
