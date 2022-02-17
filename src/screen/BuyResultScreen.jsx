// import React from 'react';

// import {
//   Result, Typography, Space, Divider, Row, Col,
// } from 'antd';

// // Components
// import Note from '../components/Note';

// // Image
// // eslint-disable-next-line
// import successImage from '../asset/success.png';
// import cancelImage from '../asset/cancel.png';

// // Styles
// import variable from '../sass/variable.module.scss';

// // Layout
// // import { noteLayout, mobileWrapLayout } from '../../layout/layout-span';

// const spanLayout = {
//   span: 12,
//   offset: 6,
// };

// // eslint-disable-next-line
// const BuyResultScreen = ({ type }) => (
//   <div>
//     <Row>
//       <Col md={{ ...spanLayout }}>
//         <Row justify="space-between">
//           <Col>
//             <Space>
//               <span style={{ color: variable['color-dark-blue'] }}>匯率:</span>
//               <span style={{ color: variable['color-primary'] }}>1234</span>
//             </Space>
//           </Col>
//           <Col>
//             <Space>
//               <span style={{ color: variable['color-dark-blue'] }}>
//                 購買數量:
//               </span>
//               <span style={{ color: variable['color-primary'] }}>
//                 123412USDT
//               </span>
//             </Space>
//           </Col>
//           <Col>
//             <Space>
//               <span style={{ color: variable['color-dark-blue'] }}>
//                 支付金額:
//               </span>
//               <span style={{ color: variable['color-primary'] }}>1234CNY</span>
//             </Space>
//           </Col>
//         </Row>
//         <Divider />
//       </Col>
//     </Row>
//     <Result
//       title={(
//         <h4 style={{ fontSize: '2rem', color: variable['color-primary'] }}>
//           {type === 'cancel' ? '交易取消' : '交易完成'}
//         </h4>
//       )}
//       icon={(
//         <img
//           style={{ width: '20rem' }}
//           src={type === 'cancel' ? cancelImage : successImage}
//           alt="success"
//         />
//       )}
//       extra={(
//         <Space>
//           <span style={{ color: variable['color-secondary'] }}>交易回執：</span>
//           <Typography.Text
//             copyable
//             style={{ fontSize: '1.4rem', color: variable['color-dark-grey'] }}
//           >
//             12345145324021394812908
//           </Typography.Text>
//         </Space>
//       )}
//     />
//     <Row>
//       <Col md={{ ...spanLayout }}>
//         <Divider />
//       </Col>
//       <Col md={{ ...spanLayout }}>
//         <Note />
//       </Col>
//     </Row>
//   </div>
// );

// export default BuyResultScreen;
