import React from 'react';

// Redux
import { useSelector } from 'react-redux';

// Antd
import { Layout, Row } from 'antd';

// Hooks
import useRwd from '../../hooks/useRwd';

// Components
import BuyHeader from '../../components/Buy/BuyHeader';

// Styles
import styles from './HeaderLayout.module.scss';

const { Header } = Layout;

const HeaderLayout = () => {
  const { isMobile, isSmallScreen, isTinyScreen } = useRwd();

  const { sessions } = useSelector((state) => state.diOrderSession);
  const { data } = sessions || {};
  const { Tx_HASH: hash } = data || {};

  if (isMobile) {
    return (
      <Header
        className=""
        style={{
          lineHeight: '1rem',
          height: isTinyScreen ? '14rem' : '15rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '1.4rem',
          padding: isSmallScreen && '0.9rem',
        }}
      >
        <Row justify="space-between" align="middle">
          <div className={styles.logo} />
          <span style={{ color: '#fff' }}>交易條款</span>
        </Row>

        <div style={{
          color: '#fff',
          fontSize: '1rem',
          lineHeight: '1.5',
          display: 'flex',
          flexWrap: 'wrap',
          wordBreak: 'break-all',
        }}
        >
          <span style={{}}>訂單編號：</span>
          <span>{hash}</span>
        </div>

        <div
          style={{
            backgroundColor: '#fff',
            border: '1px solid grey',
            minHeight: '3.7rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isTinyScreen ? 'flex-start' : 'center',
            flexWrap: 'wrap',
            padding: '0.5rem 0',
            wordBreak: 'break-all',
          }}
        >
          <BuyHeader />
        </div>
      </Header>
    );
  }
  return (
    <Header className={styles.header} style={{}}>
      <div className={styles.logo} />
      <span style={{ color: '#fff', fontSize: '1.2rem' }}>
        訂單編號：
        {hash}
      </span>
    </Header>
  );
};

export default HeaderLayout;
