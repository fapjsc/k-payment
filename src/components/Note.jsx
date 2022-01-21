import React from 'react';

// Antd
import {
  Space, Descriptions,
} from 'antd';

import { UpCircleFilled } from '@ant-design/icons';

const Note = () => (
  <>
    <Descriptions title="注意事項">
      <Descriptions.Item>
        <Space>
          <UpCircleFilled />
          本平台目前只提供USDT交易，其他数字货币交易将不予受理。
        </Space>
      </Descriptions.Item>
    </Descriptions>

    <Descriptions>
      <Descriptions.Item>
        <Space>
          <UpCircleFilled />
          本平台钱包地址充值或转出，都是经由 USDT区块链系统网络确认。
        </Space>
      </Descriptions.Item>
    </Descriptions>

    <Descriptions>
      <Descriptions.Item>
        <Space>
          <UpCircleFilled />
          本平台钱包地址可以重复充值或转出；如因系统更新，我们会通过网站或口讯通知。
        </Space>
      </Descriptions.Item>
    </Descriptions>

    <Descriptions>
      <Descriptions.Item>
        <Space>
          <UpCircleFilled />
          请勿向钱包地址充值任何非USDT资产，否则资产将不可找回。
        </Space>
      </Descriptions.Item>
    </Descriptions>

    <Descriptions>
      <Descriptions.Item>
        <Space>
          <UpCircleFilled />
          最小充值金额：100USDT，小于最小金额的充值将不会上账且无法退回。
        </Space>
      </Descriptions.Item>
    </Descriptions>

    <Descriptions>
      <Descriptions.Item>
        <Space>
          <UpCircleFilled />
          请务必确认电脑及浏览器安全，防止信息被篡改或泄露。
        </Space>
      </Descriptions.Item>
    </Descriptions>

    <Descriptions>
      <Descriptions.Item>
        <Space>
          <UpCircleFilled />
          如有其他问题或要求提出争议，可透过网页上的客服对话窗联络我们。
        </Space>
      </Descriptions.Item>
    </Descriptions>
  </>
);

export default Note;
