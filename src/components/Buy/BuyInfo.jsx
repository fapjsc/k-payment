import React, { useState, useEffect } from 'react';

// Redux
import { useSelector } from 'react-redux';

// Antd
import { List, Typography } from 'antd';

// Styles
import variable from '../../sass/variable.module.scss';

// Components
import Timer from '../Timer';

const BuyInfo = () => {
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
        付款金額: `${cnyAmount}CNY`,
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
        marginTop: '-1rem',
      }}
    >
      <span style={{ fontSize: '1.6rem', color: variable['color-dark-grey'] }}>
        匯款資料
      </span>
      <Timer />
    </div>
  );

  const list = (item, index) => {
    console.log(index, item);

    return (
      <div
        style={{
          backgroundColor: 'rgba(215,226,243,0.20)',
          borderRadius:
            (item.id === 1 && '8px 8px 0 0')
            || (item.id === 2 && '0 0 8px 8px '),
          lineHeight: '1.2',
          paddingTop: item.id === 1 && '1.5rem',
          paddingLeft: '.8rem',
          letterSpacing: '1.5px',
        }}
      >
        <List.Item style={{}}>
          <List.Item.Meta
            avatar={(
              <p className="avatar-p" style={{ width: '11rem' }}>
                {`${Object.keys(item)[0]}：`}
              </p>
            )}
            description={(
              <Typography.Text copyable>
                {Object.values(item)[0]}
              </Typography.Text>
            )}
          />
        </List.Item>
      </div>
    );
  };

  return (
    <List
      header={header}
      dataSource={listData}
      renderItem={(item) => list(item)}
    />
  );
};

export default BuyInfo;
