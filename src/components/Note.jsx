import React from 'react';

// Antd
import {
  // eslint-disable-next-line
  Descriptions,
  Space,
} from 'antd';

// eslint-disable-next-line
import footerIcon from '../asset/footer_icon.png';

const Note = () => (
  <div style={{ }}>
    <ul className="txt-12-grey" style={{ paddingLeft: '1.7rem' }}>
      <Space direction="vertical" size="large">
        <li>本平台目前只提供USDT交易，其他数字货币交易将不予受理。</li>
        <li>本平台钱包地址充值或转出，都是经由 USDT区块链系统网络确认。</li>
        <li>本平台钱包地址可以重复充值或转出；如因系统更新，我们会通过网站或口讯通知。</li>
        <li>請勿向錢包地址充值任何非USDT資産，否則資産將不可找回。。</li>
        <li>最小充值金额：100USDT，小于最小金额的充值将不会上账且无法退回。</li>
        <li>请务必确认电脑及浏览器安全，防止信息被篡改或泄露。</li>
        <li> 如有其他问题或要求提出争议，可透过网页上的客服对话窗联络我们。</li>
      </Space>
    </ul>

    {/* <img style={{ marginTop: '2rem' }} src={footerIcon} alt="footer" /> */}
  </div>
);

export default Note;
