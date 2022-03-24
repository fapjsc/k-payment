import React from 'react';

// Redux
import { useSelector } from 'react-redux';

// Antd
import {
  Modal, Avatar, Typography, Space,
} from 'antd';
import PropTypes from 'prop-types';

// Helpers
import { thousandsFormat } from '../utils/helpers';

// Image
import searchImage from '../asset/icon_search.gif';
import closeImage from '../asset/close.png';

// Actions

// Style
import variable from '../sass/variable.module.scss';

const { Text } = Typography;

const PairModal = ({ isModalVisible, cancelHandler }) => {
  const { orderInfo } = useSelector((state) => state.openOrder);
  const { rateInfo } = useSelector((state) => state.exRate);

  const { RequestedAmt } = orderInfo || {};
  const { RMB_BUY } = rateInfo || {};

  return (
    <Modal
      visible={isModalVisible}
      centered
      footer={null}
      width={500}
      style={{ borderRadius: '30px' }}
      maskClosable={false}
      keyboard={false}
      bodyStyle={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      closeIcon={<img style={{ width: '1.6rem' }} src={closeImage} alt="134" />}
      onCancel={cancelHandler}
    >
      <Avatar
        style={{
          backgroundColor: '#fff',
          borderRadius: '100%',
          width: '35%',
          height: '35%',
          transform: 'translateY(-60%)',
        }}
        shape="square"
        src={searchImage}
      />

      <div
        style={{
          marginTop: '-20%',
          textAlign: 'start',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <span style={{ color: variable['color-primary'], fontSize: '3rem' }}>
          正為您找尋賣方
        </span>

        <Space direction="vertical" style={{ marginTop: '2rem' }}>
          <Text
            style={{
              color: variable['color-dark-blue'],
              fontSize: '1.4rem',
              fontWeight: 700,
            }}
          >
            {`購買數量: ${thousandsFormat(RequestedAmt)} USDT`}
          </Text>
          <Text
            style={{
              color: variable['color-dark-blue'],
              fontSize: '1.4rem',
              fontWeight: 700,
            }}
          >
            {`支付金額: ${thousandsFormat(RequestedAmt * RMB_BUY)} CNY`}
          </Text>
        </Space>
      </div>
    </Modal>
  );
};

PairModal.propTypes = {
  isModalVisible: PropTypes.bool,
  cancelHandler: PropTypes.func,
};

PairModal.defaultProps = {
  // cny: 0,
  // usdt: 0,
  isModalVisible: false,
  cancelHandler: null,
};

export default PairModal;
