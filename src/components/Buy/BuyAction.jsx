import React, { useEffect } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Media Query
import { useMediaQuery } from 'react-responsive';

// Antd
import {
  Button, Row, Col, message,
} from 'antd';

// Actions
import { confirmBuyStatusClear } from '../../store/actions/orderActions';

// Styles
import variable from '../../sass/variable.module.scss';

// eslint-disable-next-line
const BuyAction = ({ setModalShow, id, orderToken }) => {
  // Redux
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.confirmBuy);

  // Media query
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const mobileBtnStyle = {
    borderRadius: '5px',
    height: '4rem',
  };

  const confirmHandler = () => {
    // const token = localStorage.getItem('orderToken');
    // const id = localStorage.getItem('id');
    if (!id || !orderToken) {
      message.error('session or orderToken invalid');
    }

    setModalShow({
      type: 'payment',
      show: true,
      title: '確定已匯款？',
      text: '請確認您已將款項透過銀行匯款',
    });
  };

  const cancelHandler = () => {
    // const token = localStorage.getItem('orderToken');
    // const id = localStorage.getItem('id');
    if (!id || !orderToken) {
      message.error('session or orderToken invalid');
    }

    setModalShow({
      type: 'cancel',
      show: true,
      title: '取消本次交易？',
      text: '若您已進行匯款，請不要取消本次交易，已匯款像不能拿回',
    });
  };

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(confirmBuyStatusClear());
    }
  }, [error, dispatch]);

  if (isMobile) {
    return (
      <Row justify="space-between" style={{ marginBottom: '1rem' }}>
        <Col span={11}>
          <Button
            block
            style={mobileBtnStyle}
            type="primary"
            size="large"
            ghost
            onClick={cancelHandler}
          >
            取消交易
          </Button>
        </Col>
        <Col span={11}>
          <Button
            style={mobileBtnStyle}
            loading={loading}
            block
            type="primary"
            size="large"
            onClick={confirmHandler}
          >
            我已完成匯款
          </Button>
        </Col>
      </Row>
    );
  }
  return (
    <Row justify="center">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '1rem',
        }}
      >
        {!isMobile && (
          <span style={{ color: variable['color-secondary'], textAlign: 'center' }}>
            完成轉帳後，可上傳匯款憑證給收款方確認
          </span>
        )}
        <Button
          style={{
            marginTop: '8px', borderRadius: '5px', height: '54px', width: '40rem',
          }}
          loading={loading}
          block
          type="primary"
          size="large"
          onClick={confirmHandler}
        >
          我已完成匯款
        </Button>
        <Button onClick={cancelHandler} type="link">
          取消交易
        </Button>
      </div>
    </Row>
  );
};

export default BuyAction;
