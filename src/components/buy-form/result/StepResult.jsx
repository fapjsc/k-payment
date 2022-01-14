import React from 'react';
import { Result } from 'antd';
import PropTypes from 'prop-types';

const StepResult = ({ txHash }) => (
  <Result
    status="success"
    title="交易成功成功"
    subTitle={`交易回执： ${txHash}`}
    // extra={
    //   <>
    //     <Button type="primary" onClick={props.onFinish}>
    //       再转一笔
    //     </Button>
    //     <Button>查看账单</Button>
    //   </>
    // }
    // className={styles.result}
  >
    {/* {props.children} */}
  </Result>
);

StepResult.propTypes = {
  txHash: PropTypes.string,
};

StepResult.defaultProps = {
  txHash: '',
};

export default StepResult;
