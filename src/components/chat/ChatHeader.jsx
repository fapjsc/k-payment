import React from 'react';

// Antd
import { Space } from 'antd';

import {
  ConversationHeader,
  //   Avatar,
} from '@chatscope/chat-ui-kit-react';

// Styles
import variable from '../../sass/variable.module.scss';

// Images
import chatImage from '../../asset/chat_icon.png';

const ChatHeader = () => {
  console.log('call');
  return (
    <ConversationHeader style={{ height: '6.3rem' }}>
      <ConversationHeader.Content>
        <Space>
          <img style={{ width: '4.2rem' }} src={chatImage} alt="chat" />
          <span
            style={{
              fontSize: '1.6rem',
              color: variable['color-primary'],
            }}
          >
            對話紀錄
          </span>
        </Space>
      </ConversationHeader.Content>
    </ConversationHeader>
  );
};

export default ChatHeader;
