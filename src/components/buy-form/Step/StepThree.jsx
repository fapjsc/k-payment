import React from 'react';
import StepDescriptions from '../description/StepDescriptions';
// eslint-disable-next-line
const StepThree = ({ stepData }) => (
  <div>
    <StepDescriptions stepData={stepData} bordered />
    {/* <Divider style={{ margin: '24px 0' }} /> */}
  </div>
);

export default StepThree;
