import React from 'react';

// Redux
// import { useSelector } from 'react-redux';

// Antd
import { Row, Col, Button } from 'antd';

// Components
import Timer from './Timer';
import BuyInfo from './Buy/BuyInfo';

// Styles
import variable from '../sass/variable.module.scss';

// Hooks
import useRwd from '../hooks/useRwd';

// image
import waitImage from '../asset/waiting.png';
import warning from '../asset/warning.png';

// eslint-disable-next-line
const WaitConfirm = ({ setModalShow, paymentStatus }) => {
  // eslint-disable-next-line
  const { isMobile, isTablets } = useRwd();

  const cancelHandler = () => {
    setModalShow({
      type: 'cancel',
      show: true,
      title: '取消本次交易？',
      text: '若您已進行匯款，請不要取消本次交易，已匯款項不能拿回',
    });
  };

  const shortScreen = window.innerHeight <= 553;

  if (paymentStatus === 35) {
    return (
      <>
        {/* <div style={{ textAlign: 'right' }}>
          <Timer size="1.4rem" />
        </div> */}

        <Row
          style={{
            textAlign: 'center',
            color: variable['color-dark-grey'],
            gap: '2rem',
          }}
          align="center"
        >
          <Col xs={24} sm={24}>
            <BuyInfo timer={false} />
          </Col>

          <Col xs={24} sm={24} style={{}}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: !isTablets && '1rem',
                // backgroundColor: 'blue',
              }}
            >
              <img
                style={{ width: shortScreen ? '2rem' : '3rem' }}
                src={warning}
                alt="wait"
              />
              <h4
                style={{
                  marginBottom: 0,
                  fontSize: isTablets ? '1.6rem' : '2.6rem',
                  color: variable['color-primary'],
                  fontWeight: 'bold',
                }}
              >
                申訴中
              </h4>
            </div>

            <p
              style={{
                marginBottom: '0px',
                margin: 0,
                fontSize: shortScreen && '1rem',
              }}
            >
              對方確認收款後，系統會自動將數字貨幣匯到您的帳戶內
            </p>

            <Button
              type="link"
              onClick={cancelHandler}
              style={{
                padding: '0',
                height: shortScreen ? '2rem' : '3rem',
                color: variable['color-primary'],
                marginTop: '0px',
              }}
            >
              取消交易
            </Button>
          </Col>

          {/* <Col xs={24} sm={24} style={{ backgroundColor: 'green' }}>
            <p style={{ marginBottom: '0px', backgroundColor: 'red' }}>
              對方確認收款後，系統會自動將數字貨幣匯到您的帳戶內
            </p>
            <Button
              className={isMobile && 'easy-btn2'}
              size="large"
              type={!isMobile ? 'link' : 'default'}
              block
              onClick={cancelHandler}
              style={{
                height: isMobile && '4rem',
                maxWidth: '17rem',
                color: variable['color-primary'],
                // backgroundColor: 'blue',
              }}
            >
              取消交易
            </Button>
          </Col> */}
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
          textAlign: 'center',
          color: variable['color-dark-grey'],
        }}
        align="center"
      >
        <Col xs={24} sm={24} style={{}}>
          <img
            style={{ width: isMobile ? '7rem' : '20rem' }}
            src={waitImage}
            alt="wait"
          />
          <h4
            style={{
              fontSize: isMobile ? '1.8rem' : '2rem',
              color: variable['color-primary'],
            }}
          >
            等候確定中
          </h4>
        </Col>

        <Col xs={24} sm={24} style={{}}>
          <p style={{ marginBottom: '0px' }}>
            對方確認收款後，系統會自動將數字貨幣匯到您的帳戶內
          </p>
          <Row
            direction={isMobile ? 'horizontal' : 'vertical'}
            style={{ width: '100%' }}
          >
            <Col
              md={24}
              sm={12}
              xs={12}
              // order={isMobile && 2}
              style={{ margin: 'auto' }}
            >
              <Button
                size="large"
                type="default"
                disabled
                className="disable-easy-btn"
                block
                style={{
                  height: isTablets && '4rem',
                  maxWidth: '40rem',
                }}
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
