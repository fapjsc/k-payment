// import { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';

// // Redux
// import { useDispatch, useSelector } from 'react-redux';

// // Hooks
// import useQuery from './useQuery';

// // Actions
// import { getOrderDetail } from '../store/actions/orderActions';

// // Helper
// // import { _decrypt } from '../utils/helpers';

// const useGetIdToken = () => {
//   const [id, setId] = useState('');
//   const [orderToken, setOrderToken] = useState('');

//   const dispatch = useDispatch();
//   const { data } = useSelector((state) => state.orderDetail);

//   const history = useHistory();
//   const query = useQuery();

//   useEffect(() => {
//     const queryStr = query.get('session') || query.get('id');
//     try {
//       // const { id: idStr, orderToken: token } = JSON.parse(_decrypt(queryStr));
//       const { id: idStr, orderToken: token } = JSON.parse(queryStr);
//       setId(idStr);
//       setOrderToken(token);
//     } catch (error) {
//       alert('get id or token fail');
//       history.replace('/not-found');
//     }
//   }, [history, query]);

//   useEffect(() => {
//     if (!orderToken || !id) return;

//     if (data) return;

//     dispatch(getOrderDetail({ id, token: orderToken }));
//   }, [data, id, orderToken, dispatch]);

//   return null;
// };

// export default useGetIdToken;
