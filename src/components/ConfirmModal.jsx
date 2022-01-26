import React, { useState } from 'react';

// Antd
import {
  Modal,
  Button,
  Row,
  Col,
} from 'antd';

// Images
import warningImg from '../asset/warning.png';

// eslint-disable-next-line
const ConfirmModal = ({ visible, title, text, setModalShow, actionCall }) => {

  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleCancel = () => {
    setModalShow(false);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    actionCall();
    setConfirmLoading(false);
    setModalShow(false);
  };
  return (
    <Modal
      title=""
      visible={visible}
      closable={false}
      width={400}
      // onOk={handleOk}
      confirmLoading
      onCancel={handleCancel}
      centered
      footer={null}
      bodyStyle={{
        height: '306px',
      }}
    >
      <Row align="center" style={{ transform: 'translateY(-60%)' }}>
        <Col>
          <img
            src={warningImg}
            alt="warning"
            style={{ width: '16rem' }}
          />
        </Col>
      </Row>

      <Row direction="vertical" style={{ transform: 'translateY(-45%)', textAlign: 'center' }}>
        <Col span={24}>
          <h4 style={{ fontSize: '3rem' }}>{title}</h4>
        </Col>
        <Col span={24}>
          <p>{text}</p>
        </Col>
        <Col span={24}>
          <Button loading={confirmLoading} type="primary" size="large" block onClick={handleOk}>確認</Button>
        </Col>
        <br />
        <Col span={24}>
          <Button type="link" size="large" block onClick={handleCancel}>取消</Button>
        </Col>
      </Row>

    </Modal>
  );
};

export default ConfirmModal;
