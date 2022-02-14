import React, { useState, useEffect } from 'react';

// Redux
import { useSelector } from 'react-redux';

// Antd
// eslint-disable-next-line
import { List, Typography } from 'antd';

// Hooks
import useRwd from '../../hooks/useRwd';

// Styles
import variable from '../../sass/variable.module.scss';

// Components
import Timer from '../Timer';

// Helpers
// eslint-disable-next-line
import { thousandsFormat } from '../../utils/helpers';

// eslint-disable-next-line
import copyIcon from '../../asset/copy.png';

const BuyInfo = () => {
  const { isMobile } = useRwd();

  // Init State
  const [listData, setListData] = useState([]);

  const {
    sessions: { data },
  } = useSelector((state) => state.diOrderSession);

  const {
    D2: cnyAmount,
    P2: payeeName,
    P1: account,
    P3: bank,
    P4: city,
    Tx_HASH: hash,
  } = data || {};

  useEffect(() => {
    const sourceData = [
      {
        付款金額: cnyAmount,
        id: 1,
      },
      {
        收款方姓名: payeeName,
      },
      {
        收款帳號: account,
      },
      {
        開戶銀行: bank,
      },
      {
        所在省市: city,
        id: 2,
      },
    ];

    setListData(sourceData);
  }, [cnyAmount, payeeName, account, bank, city, hash]);

  const header = (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: isMobile ? '-1rem' : '-1rem',
        // backgroundColor: 'red',
      }}
    >
      <span
        style={{
          fontSize: '1.6rem',
          color: variable['color-dark-grey'],
          paddingLeft: '1rem',
        }}
      >
        匯款資料
      </span>
      <Timer />
    </div>
  );

  const list = (item) => (
    <div
      style={{
        backgroundColor: 'rgba(215,226,243,0.20)',
        borderRadius:
            (item.id === 1 && '8px 8px 0 0')
            || (item.id === 2 && '0 0 8px 8px '),
        lineHeight: '1.2',
        // paddingTop: item.id === 1 && '1.5rem',
        letterSpacing: '1.5px',
        padding: isMobile ? '3px' : '1rem',
        paddingLeft: '1rem',
      }}
    >
      <List.Item
        style={{
          // backgroundColor: 'red',
          display: 'flex',
          justifyContent: 'flex-start',
          alignContent: 'center',
        }}
      >
        <p
          style={{ marginBottom: 0, width: isMobile ? '9rem' : '11rem' }}
          className="txt-16"
          mark
        >
          {Object.keys(item)[0]}
          ：
        </p>

        {item.id === 1 && <span style={{ color: '#242e47' }}>¥</span>}

        <Typography.Text
          style={{ color: '#242e47' }}
          copyable={{
            tooltips: ['複製', '已複製!'],
            onCopy: (e) => console.log(e),
            icon: (
              <img
                style={{
                  // marginLeft: '1rem',
                  marginBottom: '.5rem',
                  width: '1.6rem',
                  height: '1.6rem',
                }}
                src={copyIcon}
                alt="copy"
              />
            ),
          }}
        >
          {item?.id === 1
            ? thousandsFormat(Object.values(item)[0])
            : Object.values(item)[0]}
        </Typography.Text>

        {/* <List.Item.Meta
          // style={{ backgroundColor: 'blue' }}
          avatar={(
            <p className="avatar-p"
            style={{ width: c ? '8.2rem' : '11rem', height: '100%' }}>
              {`${Object.keys(item)[0]}：`}
            </p>
          )}
          description={(
            <div style={{ }}>
              {item.id === 1 && <span style={{ color: '#242e47' }}>¥</span>}
              <Typography.Text
                style={{}}
                copyable={{
                  tooltips: ['複製', '已複製!'],
                  onCopy: (e) => console.log(e),
                  icon: (
                    <img
                      style={{
                        // marginLeft: '1rem',
                        marginBottom: '.5rem',
                        width: '1.6rem',
                        height: '1.6rem',
                      }}
                      src={copyIcon}
                      alt="copy"
                    />
                  ),
                }}
              >
                {item?.id === 1
                  ? thousandsFormat(Object.values(item)[0])
                  : Object.values(item)[0]}
              </Typography.Text>
            </div>
          )}
        /> */}
      </List.Item>
    </div>
  );

  return (
    <List
      header={header}
      dataSource={listData}
      renderItem={(item) => list(item)}
    />
  );
};

export default BuyInfo;
