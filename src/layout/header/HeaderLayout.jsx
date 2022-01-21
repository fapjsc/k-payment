import React from 'react';

// Antd
import {
  Layout,
} from 'antd';

// Styles
import styles from './HeaderLayout.module.scss';

const { Header } = Layout;

const HeaderLayout = () => (
  <Header className="header">
    <div className={styles.logo} />
  </Header>
);

export default HeaderLayout;
