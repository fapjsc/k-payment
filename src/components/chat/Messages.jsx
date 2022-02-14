// import React, { Fragment, useState, useCallback } from 'react';

// // Redux
// import { useSelector } from 'react-redux';

// import { Controlled as ControlledZoom } from 'react-medium-image-zoom';
// import 'react-medium-image-zoom/dist/styles.css';

// // Moment
// import moment from 'moment';

// import {
//   MessageList,
//   Message,
//   MessageSeparator,
//   //   Avatar,
// } from '@chatscope/chat-ui-kit-react';

// // Styles
// import variable from '../../sass/variable.module.scss';

// const Messages = () => {
//   const [isZoomed, setIsZoomed] = useState(false);

//   const { chatSessions } = useSelector((state) => state.chat);

//   const handleZoomChange = useCallback((shouldZoom) => {
//     setIsZoomed(shouldZoom);
//   }, []);
//   return (
//     <MessageList autoScrollToBottomOnMount loading={!chatSessions?.length}>
//       <MessageSeparator content="今天 20:00" />

//       {chatSessions?.map((chat, index) => {
//         const {
//           Message_Role: role,
//           Sysdate: time,
//           Message_Type: type,
//           Message: message,
//         } = chat || {};

//         return (
//           <Fragment
//             // eslint-disable-next-line
//             key={index}
//           >
//             {type === 1 && (
//               <Message
//                 className="text-message"
//                 style={{ width: '70%' }}
//                 model={{
//                   message: message,
//                   direction: role === 1 ? 'incoming' : 'outgoing',
//                 }}
//               >
//                 <Message.Header sender="Emily" sentTime="just now" />
//               </Message>
//             )}

//             {type === 2 && (
//               <ControlledZoom
//                 isZoomed={isZoomed}
//                 onZoomChange={handleZoomChange}
//               >
//                 <Message
//                   style={{ width: isZoomed ? '100%' : '70%' }}
//                   model={{
//                     direction: role === 1 ? 'incoming' : 'outgoing',
//                   }}
//                 >
//                   <Message.ImageContent
//                     width="100%"
//                     src={message}
//                     alt="avatar"
//                   />
//                 </Message>
//               </ControlledZoom>
//             )}

//             <p
//               style={{
//                 color: variable['color-secondary'],
//                 textAlign: chat.Message_Role === 1 ? 'left' : 'right',
//               }}
//             >
//               {moment(time).format('HH:mm')}
//             </p>
//           </Fragment>
//         );
//       })}
//     </MessageList>
//   );
// };

// export default Messages;
