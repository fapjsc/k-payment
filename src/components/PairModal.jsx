import React from 'react';
import {
  // eslint-disable-next-line
  Modal, Avatar, Typography,Space
} from 'antd';
import PropTypes from 'prop-types';

// Image
// eslint-disable-next-line
import searchImage from '../asset/icon_search.gif';

const { Title } = Typography;

const PairModal = ({ isModalVisible, cny, usdt }) => (
  <Modal
    visible={isModalVisible}
    footer={null}
    width={320}
    style={{ top: 300, borderRadius: '30px' }}
    bodyStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}

    // onOk={handleOk}
    // onCancel={() => console.log('tests')}
  >
    <Avatar
      style={{
        backgroundColor: '#fff',
        borderRadius: '100%',
        width: '35%',
        height: '35%',
        transform: 'translateY(-70%)',
      }}
      shape="square"
      src={searchImage}
    />

    <div style={{
      marginTop: '-20%',
      textAlign: 'start',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
    >
      <Title level={3}>正為您找尋賣方</Title>

      <div style={{ width: '90%', fontSize: '.9rem' }}>
        <p style={{ marginBottom: '5px' }}>{`購買數量: ${usdt} USDT`}</p>
        <p>{`支付金額: ${cny} CNY`}</p>
      </div>
    </div>
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
