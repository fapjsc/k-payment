import React from 'react';

// Media Query
import { useMediaQuery } from 'react-responsive';

// Antd
import { Layout } from 'antd';

// Components
// eslint-disable-next-line
import BuyHeader from '../../components/Buy/BuyHeader';

// Styles
import styles from './HeaderLayout.module.scss';

const { Header } = Layout;

const HeaderLayout = () => {
  // Media query
// eslint-disable-next-line
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  return (
    <Header className={styles.header}>
      <div className={styles.logo} />
      {isMobile && <BuyHeader />}
    </Header>
  );
};

export default HeaderLayout;
