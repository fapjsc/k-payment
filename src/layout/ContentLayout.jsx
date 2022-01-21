import React from 'react';

// Antd
import {
  Layout,
} from 'antd';

const { Content } = Layout;

// eslint-disable-next-line
const ContentLayout = ({ children }) => (
  <Layout style={{ paddingTop: '1.5rem' }}>
    <Content>
      <div className="site-layout-background">
        {children}
      </div>
    </Content>
  </Layout>
);

export default ContentLayout;
