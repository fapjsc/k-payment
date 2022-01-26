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
      },
      {
        訂單編號: hash,
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

  const list = (item) => (
    <List.Item>
      <List.Item.Meta
        avatar={(
          <p className="avatar-p" style={{ width: '9rem' }}>
            {`${Object.keys(item)[0]}:`}
          </p>
        )}
        description={
          <Typography.Text copyable>{Object.values(item)[0]}</Typography.Text>
        }
      />
    </List.Item>
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
