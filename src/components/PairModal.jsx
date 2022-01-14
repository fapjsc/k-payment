import React from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';

const PairModal = ({ isModalVisible, cny, usdt }) => (
  <Modal
    title="请稍等，现正整合交易者资料"
    visible={isModalVisible}
    footer={null}
    // onOk={handleOk}
    onCancel={() => console.log('tests')}
  >
    <p>{`購買訂單: ${usdt} USDT = ￥${cny} CNY`}</p>
  </Modal>
);

PairModal.propTypes = {
  isModalVisible: PropTypes.bool,
  cny: PropTypes.number,
  usdt: PropTypes.number,
  //   handleCancel: PropTypes.func.isRequired,
};

PairModal.defaultProps = {
  cny: 0,
  usdt: 0,
  isModalVisible: false,
};

export default PairModal;
