import React, { useState } from 'react';

// Redux
import { useSelector } from 'react-redux';

// Antd
import { Layout, Row } from 'antd';

// Hooks
import useRwd from '../../hooks/useRwd';

// Components
// eslint-disable-next-line
import BuyHeader from '../../components/Buy/BuyHeader';
import NoteModal from '../../components/NoteModal';

// Styles
import styles from './HeaderLayout.module.scss';

const { Header } = Layout;

const HeaderLayout = () => {
  const [visible, setVisible] = useState(false);

  const { isMobile, isSmallScreen, isTinyScreen } = useRwd();

  const { sessions } = useSelector((state) => state.diOrderSession);
  const { data } = sessions || {};
  const { Tx_HASH: hash, Order_StatusID: statusID } = data || {};

  if (isMobile) {
    return (
      <>
        <NoteModal visible={visible} setVisible={setVisible} />
        <Header
          className=""
          style={{
            lineHeight: '1rem',
            // height: isTinyScreen ? '14rem' : '15rem',
            // gap: '1.4rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: isSmallScreen && '0.9rem',
            backgroundColor: '#242e47',
            minHeight: '90px',
            height: (statusID === 1 || statusID > 90) && '14rem',
          }}
        >
          <Row
            justify="space-between"
            align="middle"
            style={{
              transform: (statusID === 1 || statusID > 90) && 'translateY(-.8rem)',
            }}
          >
            <div className={styles.logo} />
            <span
              role="presentation"
              onKeyDown={() => setVisible(true)}
              onClick={() => setVisible(true)}
              style={{ color: '#fff' }}
            >
              交易條款
            </span>
          </Row>

          <div style={{
            color: '#fff',
            fontSize: '1rem',
            lineHeight: '1.5',
            display: 'flex',
            flexWrap: 'wrap',
            wordBreak: 'break-all',
            transform: statusID > 90 && 'translateY(.5rem)',
          }}
          >
            {
            (statusID >= 33 || statusID === 1) && (
              <>
                <span style={{}}>訂單編號：</span>
                <span>{hash}</span>
              </>
            )
          }

          </div>

          {
          (statusID >= 33 || statusID === 1) && (
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
                transform: (statusID === 1 || statusID > 90) && 'translateY(1.2rem)',
              }}
            >
              <BuyHeader />
            </div>
          )
        }
        </Header>
      </>
    );
  }
  return (
    <Header className={styles.header} style={{ backgroundColor: '#242e47', minHeight: '9rem' }}>
      <div className={styles.logo} />
      {
        statusID >= 33 && (
          <span
            className="txt-12"
            style={{
              color: '#fff',
              paddingLeft: '1.5rem',
            }}
          >
            訂單編號 ：
            {hash}
          </span>
        )
      }

    </Header>
  );
};

export default HeaderLayout;
