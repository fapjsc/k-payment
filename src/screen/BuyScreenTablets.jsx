// eslint-disable-next-line
import React, { useState } from 'react';

// Antd
import {
  Divider, Skeleton, Space,
} from 'antd';

// Components
import classnames from 'classnames';
import BuyInfo from '../components/Buy/BuyInfo';
import BuyAction from '../components/Buy/BuyAction';
import ConfirmModal from '../components/ConfirmModal';
import WaitConfirm from '../components/WaitConfirm';
import Chat from '../components/chat/Chat';

// Helpers
// import { _decrypt, _iosWhite, _isIOS15 } from '../utils/helpers';

import useViewportSize from '../hooks/useViewportSize';

// Styles
import styles from './BuyScreenTablets.module.scss';

// import variable from '../sass/variable.module.scss';

// Styles
import variable from '../sass/variable.module.scss';

//Image
import backImg from '../asset/back.png';

//Image
// import backImg from '../asset/back.png';

const BuyScreenTablets = ({
// eslint-disable-next-line
  statusArr,
  // eslint-disable-next-line
  fullScreen,
  // eslint-disable-next-line
  mobileChatHightRef,
  // eslint-disable-next-line
  modalShow,
  // eslint-disable-next-line
  setModalShow,
  // eslint-disable-next-line
  paymentStatus,
  // eslint-disable-next-line
  confirmBuyHandler,
  // eslint-disable-next-line
  cancelOrderHandler,
  // eslint-disable-next-line
  orderToken,
  // eslint-disable-next-line
  id,
  // eslint-disable-next-line
  fullScreenHandler,
  // eslint-disable-next-line
  viewPortHeight,
  //   height,
  // eslint-disable-next-line
  isIOS15Issue
}) => {
  const {
    title, text, show, type,
  } = modalShow || {};

  const [height] = useViewportSize();

  const clickHandler = () => {
    fullScreenHandler(true);
  };
  return (
    <>
      <ConfirmModal
        title={title}
        text={text}
        visible={show}
        setModalShow={setModalShow}
        actionCall={type === 'payment' ? confirmBuyHandler : cancelOrderHandler}
      />

      <div style={{ height: fullScreen ? height - 1 : height - 141 }} className={styles.container}>

        <div
          className={`${styles['content-box']} ${classnames({
            [styles['move-out-100']]: fullScreen,
            [styles['move-in-100']]: !fullScreen,
          })}`}
        >
          <Skeleton
            paragraph={{ rows: 4 }}
        // eslint-disable-next-line
          loading={!statusArr?.includes(paymentStatus)}
            style={{ minHeight: (window.innerHeight - 140) / 2, padding: 0 }}
          >
            {(paymentStatus === 31 || paymentStatus === 33) && (
            <Space direction="vertical" style={{ width: '100%' }}>
              <BuyInfo />
              <BuyAction
                setModalShow={setModalShow}
                id={id}
                orderToken={orderToken}
              />
            </Space>
            )}

            {(paymentStatus === 34 || paymentStatus === 35) && (
            <WaitConfirm
              setModalShow={setModalShow}
              paymentStatus={paymentStatus}
            />
            )}
          </Skeleton>

          <Divider style={{ margin: '5px' }} />
        </div>

        <div
          role="presentation"
          onClick={clickHandler}
          className={`${styles['chat-box']} ${classnames({
            [styles['height-100']]: fullScreen,
            [styles['height-45']]: !fullScreen,

          })}`}
        >
          {fullScreen && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                fullScreenHandler(false);
              }}
              onKeyDown={() => {}}
              role="presentation"
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: '1rem',
                padding: '5px 0',
                fontSize: '2rem',
                height: '5rem',
                borderBottom: `1px solid ${variable['color-light-grey']}`,
              }}
            >
              <img
                src={backImg}
                alt="1234"
                style={{
                  width: '2rem',
                  height: '2.5rem',
                  transform: 'rotate(-90deg)',
                }}
              />
              <span style={{ color: '#242e47' }}>查看匯款資料</span>
            </div>
          )}
          <Chat fullScreen={fullScreen} fullScreenHandler={fullScreenHandler} />

        </div>
      </div>

    </>
  );
};

export default BuyScreenTablets;
