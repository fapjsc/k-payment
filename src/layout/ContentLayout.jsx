import React from 'react';

// Redux
import { useSelector } from 'react-redux';

// Antd
import { Layout, Spin } from 'antd';

// Hooks
import useRwd from '../hooks/useRwd';

const { Content } = Layout;

// eslint-disable-next-line
const ContentLayout = ({ children }) => {

  const { loading } = useSelector((state) => state.cancelOrder);

  const { isMobile } = useRwd();
  return (
    <Spin tip="訂單取消中..." spinning={loading}>
      <Layout
        style={{
          marginTop: !isMobile && '1.8rem',
          padding: isMobile ? '0 1.5rem' : '0 5rem',
          backgroundColor: '#fff',
        }}
      >
        <Content>
          <div style={{ }} className="site-layout-background">{children}</div>
        </Content>
      </Layout>
    </Spin>
  );
};

export default ContentLayout;
