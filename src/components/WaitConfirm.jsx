import React from 'react';

// Redux
// import { useSelector } from 'react-redux';

// Antd
import { Row, Col, Button } from 'antd';

// Components
import Timer from './Timer';

// Styles
import variable from '../sass/variable.module.scss';

// Hooks
import useRwd from '../hooks/useRwd';

// image
import waitImage from '../asset/waiting.png';
import warning from '../asset/warning.png';

// eslint-disable-next-line
const WaitConfirm = ({ setModalShow, appeal }) => {
  // appeal = true;
  const { isMobile } = useRwd();

  // const {
  //   sessions: { data },
  // } = useSelector((state) => state.diOrderSession);
  // const { Tx_HASH: hash } = data || {};

  const cancelHandler = () => {
    // const token = localStorage.getItem('orderToken');
    // const id = localStorage.getItem('id');
    // if (!id || !token) {
    //   message.error('session or token invalid');
    // }

    setModalShow({
      type: 'cancel',
      show: true,
      title: '取消本次交易？',
      text: '若您已進行匯款，請不要取消本次交易，已匯款像不能拿回',
    });
  };

  if (appeal) {
    return (
      <>
        <div style={{ textAlign: 'right' }}>
          <Timer size="1.4rem" />
        </div>

        <Row
          style={{
            textAlign: 'center',
            color: variable['color-dark-grey'],
          }}
          align="center"
        >
          <Col md={{ span: 24 }}>
            <img
              style={{ width: isMobile ? '7.3rem' : '20rem' }}
              src={warning}
              alt="wait"
            />
            <h4 style={{ fontSize: '2rem', color: variable['color-primary'] }}>
              賣方申訴中
            </h4>
          </Col>

          <Col style={{}}>
            <p style={{ marginBottom: '0px' }}>
              對方確認收款後，系統會自動將數字貨幣匯到您的帳戶內
            </p>
            <Row
              direction={isMobile ? 'horizontal' : 'vertical'}
              style={{ width: '100%' }}
            >
              <Col md={24} sm={12} xs={12}>
                <Button
                  className={isMobile && 'easy-btn2'}
                  size="large"
                  type={!isMobile ? 'link' : 'default'}
                  block
                  onClick={cancelHandler}
                  style={{
                    height: isMobile && '4rem',
                    maxWidth: isMobile && '17rem',
                    color: variable['color-primary'],
                  }}
                >
                  取消交易
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    );
  }

  return (
    <>
      <div style={{ textAlign: 'right' }}>
        <Timer size="1.4rem" />
      </div>

      <Row
        style={{
          textAlign: 'center', color: variable['color-dark-grey'],
        }}
        align="center"
      >

        <Col md={{ span: 24 }}>
          <img style={{ width: isMobile ? '7.3rem' : '20rem' }} src={waitImage} alt="wait" />
          <h4 style={{ fontSize: '2rem', color: variable['color-primary'] }}>等候確定中</h4>
        </Col>

        <Col style={{ }}>
          <p style={{ marginBottom: '0px' }}>對方確認收款後，系統會自動將數字貨幣匯到您的帳戶內</p>
          <Row direction={isMobile ? 'horizontal' : 'vertical'} style={{ width: '100%' }}>
            <Col md={24} sm={12} xs={12} order={isMobile && 2} style={{ }}>
              <Button
                size="large"
                type="default"
                disabled
                className="disable-easy-btn"
                block
                onClick={() => alert('not yet')}
                style={{ height: isMobile && '4rem', maxWidth: isMobile && '17rem' }}
              >
                對方確認中
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default WaitConfirm;
