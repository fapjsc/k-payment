import React, { useState } from 'react';

import classnames from 'classnames';

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

  const { fullScreen } = useSelector((state) => state.chatFullScreen);

  const {
    // eslint-disable-next-line
    isMobile, isTablets, isSmallScreen, isTinyScreen,
  } = useRwd();

  const { sessions } = useSelector((state) => state.diOrderSession);
  const { data } = sessions || {};
  const { Tx_HASH: hash, Order_StatusID: statusID } = data || {};

  if (isTablets) {
    return (
      <div className={classnames({
        [styles['move-out-100']]: fullScreen,
        [styles['move-in-100']]: !fullScreen,
      })}
      >
        <NoteModal visible={visible} setVisible={setVisible} />
        <Header
          className=""
          style={{
            lineHeight: '1rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent:
            isTablets && (statusID === 1 || statusID >= 33)
              ? 'center'
              : 'center',
            alignItems: 'start',
            padding: isSmallScreen && '0.9rem',
            backgroundColor: '#242e47',
            minHeight: '90px',
            height: isTablets && (statusID === 1 || statusID >= 33) && '14rem',
            gap: '1rem',

          }}
        >
          <Row
            justify="space-between"
            align="middle"
            style={{
              // backgroundColor: 'blue',
              width: '100%',
              transform:
                (statusID === 1 || statusID > 90) && 'translateY(-.8rem)',
            }}
          >
            <div className={styles.logo} />

            {(statusID === 1 || statusID >= 33) && (
              <span
                role="presentation"
                onKeyDown={() => setVisible(true)}
                onClick={() => setVisible(true)}
                style={{ color: '#fff' }}
              >
                交易條款
              </span>
            )}
          </Row>

          {statusID >= 33 && statusID < 99 && (
            <div
              style={{
                color: '#fff',
                fontSize: '1rem',
                lineHeight: '1.5',
                display: 'flex',
                flexWrap: 'wrap',
                wordBreak: 'break-all',
                transform: statusID > 90 && 'translateY(.5rem)',
              }}
            >
              <span style={{}}>訂單編號：</span>
              <span>{hash}</span>
            </div>
          )}

          {(statusID >= 33 || statusID === 1) && (
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
                width: '100%',
              }}
            >
              <BuyHeader />
            </div>
          )}
        </Header>
      </div>
    );
  }
  return (
    <Header
      className={styles.header}
      style={{ backgroundColor: '#242e47', minHeight: '9rem' }}
    >
      <div className={styles.logo} />
      {statusID >= 33 && (
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
      )}
    </Header>
  );
};

export default HeaderLayout;
