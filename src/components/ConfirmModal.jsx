import React, { useState } from 'react';

// Antd
import {
  Modal, Button, Row, Col,
} from 'antd';

// Images
import warningImg from '../asset/warning.png';

// Hooks
import useRwd from '../hooks/useRwd';

// eslint-disable-next-line
const ConfirmModal = ({ visible, title, text, setModalShow, actionCall }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const { isMobile } = useRwd();

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
      width={500}
      // onOk={handleOk}
      confirmLoading
      onCancel={handleCancel}
      centered
      footer={null}
      bodyStyle={{
        height: '306px',
        fontSize: '16px',
      }}
    >
      <Row align="center" style={{ transform: 'translateY(-60%)' }}>
        <Col>
          <img src={warningImg} alt="warning" style={{ width: '16rem' }} />
        </Col>
      </Row>

      <Row
        direction="vertical"
        style={{ transform: 'translateY(-45%)', textAlign: 'center' }}
        justify={isMobile && 'space-between'}
      >
        <Col span={24} style={{ marginTop: isMobile && '-10px' }}>
          <p style={{
            fontSize: '3rem',
            color: '#3e80f9',
            marginBottom: 10,
            marginTop: isMobile && '-10px',
          }}
          >
            {title}
          </p>
        </Col>
        <Col span={24} style={{ textAlign: 'center', fontWeight: 700, color: '#212529' }}>
          <p style={{ fontSize: isMobile && '14px' }}>{text}</p>
        </Col>
        <Col span={isMobile ? 11 : 24} order={isMobile && 1}>
          <Button
            loading={confirmLoading}
            type="primary"
            size="large"
            block
            onClick={handleOk}
            style={{ height: isMobile && '42px', maxWidth: '40rem' }}
          >
            確認
          </Button>
        </Col>
        <br />
        <Col span={isMobile ? 11 : 24}>
          <Button
            type="link"
            size="large"
            block
            onClick={handleCancel}
            style={{
              border: isMobile && '1px solid #3e80f9',
              height: isMobile && '42px',
              maxWidth: '40rem',
            }}
          >
            取消
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};

export default ConfirmModal;
