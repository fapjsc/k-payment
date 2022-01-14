import React, { useRef, useState, useEffect } from 'react';

import PropTypes from 'prop-types';

// Router
import { withRouter } from 'react-router-dom';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Antd
// eslint-disable-next-line
import { Card, Divider, Button, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { StepsForm } from '@ant-design/pro-form';

// Actions
import { confirmBuy } from '../../store/actions/orderActions';

// Components
import StepDescriptions from './description/StepDescriptions';
// import StepOne from './Step/StepOne';
import StepTwo from './Step/StepTwo';
import StepThree from './Step/StepThree';
import StepResult from './result/StepResult';

import Footer from './footer/Footer';

const BuyForm = ({ match }) => {
  // Init State
  const [current, setCurrent] = useState(0);

  // Ref
  const formRef = useRef();

  // Redux
  const dispatch = useDispatch();

  const { orderToken } = useSelector((state) => state.orderToken);

  const { sessions } = useSelector((state) => state.diOrderSession);
  const { data: sessionData } = sessions || {};

  const { loading: confirmBuyLoading } = useSelector(
    (state) => state.confirmBuy,
  );

  // Props
  const {
    params: { id },
  } = match || {};

  const confirmBuyClickHandler = () => {
    if (!id || !orderToken) {
      message.error('驗證失敗');
      return;
    }
    dispatch(confirmBuy(id, orderToken));
  };

  const stepBtn = (props, dom) => {
    // eslint-disable-next-line
    const { step } = props;

    if (step === 0) {
      const preBtn = dom.filter((el) => el.key === 'pre');
      return [
        preBtn,
        <Button
          key="submit"
          loading={confirmBuyLoading}
          onClick={confirmBuyClickHandler}
          type="primary"
        >
          確定付款
        </Button>,
      ];
    }

    if (step === 2 || step === 1) {
      return null;
    }
    return dom;
  };

  useEffect(() => {
    if (!sessionData) return;
    if (sessionData.Order_StatusID === 34) {
      setCurrent(1);
      return;
    }

    if (sessionData.Order_StatusID === 1) {
      setCurrent(2);
    }
  }, [sessionData]);

  return (
    <PageContainer
      content={`匯率：${sessionData?.D1}`}
      style={{ maxWidth: '800px', margin: '0 auto' }}
    >
      <Card bordered={false}>
        <StepsForm
          current={current}
          onCurrentChange={setCurrent}
          submitter={{
            render: stepBtn,
          }}
        >
          {/* Step -1 */}
          <StepsForm.StepForm title="確認付款">
            {current === 0 && <StepTwo stepData={sessionData} />}
          </StepsForm.StepForm>

          {/* Step -2 */}
          <StepsForm.StepForm title="等待收款">
            {current === 1 && <StepThree stepData={sessionData} />}
          </StepsForm.StepForm>

          {/* Step -Result */}
          <StepsForm.StepForm title="交易完成">
            {current === 2 && (
              <StepResult
                txHash={sessionData?.Tx_HASH}
                onFinish={async () => {
                  setCurrent(0);
                  formRef.current?.resetFields();
                }}
              >
                <StepDescriptions stepData={sessionData} />
              </StepResult>
            )}
          </StepsForm.StepForm>
        </StepsForm>

        {/* Description */}
        <Divider style={{ margin: '40px 0 24px' }} />
        <Footer />
      </Card>
    </PageContainer>
  );
};

BuyForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

BuyForm.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: '',
    }),
  }),
};

export default withRouter(BuyForm);
