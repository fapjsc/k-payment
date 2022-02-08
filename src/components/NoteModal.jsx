import React from 'react';
import { Modal, Space } from 'antd';

// eslint-disable-next-line
const NoteModal = ({setVisible, visible}) => (
  <Modal
    // title="Modal 1000px width"
    centered
    visible={visible}
    onOk={() => setVisible(false)}
    onCancel={() => setVisible(false)}
    width={500}
    closable={false}
    footer={null}
    style={{ textAlign: 'center' }}
  >
    {/* <div
      className="modal-body"
      style={{
        fontSize: '12px',
        textAlign: 'left',
        // margin: '10px',
        // marginLeft: 0,
        // marginTop: '-40px',
        lineHeight: '30px',
      }}
    > */}
    <h5 style={{
      fontSize: '3rem',
      fontWeight: 'normal',
      color: '#3f80fa',
      marginBottom: 0,
    }}
    >
      交易條款
    </h5>
    <ul style={{
      fontSize: '1.2rem', fontWeight: 'bold', padding: '10px', textAlign: 'left',
    }}
    >
      <Space direction="vertical" size="middle">
        <li>本平台目前只提供USDT交易，其他數字貨幣交易將不予受理。</li>
        <li>本平台錢包地址充值或轉出，都是經由 USDT區塊鏈系統網絡確認。</li>
        <li>本平台錢包地址可以重複充值或轉出；如因系統更新，我們會通過網站或口訊通知。</li>
        <li>請勿向錢包地址充值任何非USDT資産，否則資産將不可找回。</li>
        <li>最小充值金額：100USDT，小于最小金額的充值將不會上賬且無法退回。</li>
        <li>請務必確認電腦及浏覽器安全，防止信息被篡改或泄露。</li>
        <li>如有其他問題或要求提出爭議，可透過網頁上的客服對話窗聯絡我們。</li>
      </Space>
    </ul>

    <button type="button" className="btn-close" onClick={() => setVisible(false)}>關閉</button>

  </Modal>
);

export default NoteModal;
