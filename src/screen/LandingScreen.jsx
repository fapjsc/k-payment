import React, { useEffect } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Antd
import { Spin } from 'antd';

// Router
import { useParams, useHistory } from 'react-router-dom';

// Actions
import { openOrder } from '../store/actions/orderActions';

// Helpers
// import { _encrypt } from '../utils/helpers';

const LandingScreen = () => {
  const params = useParams();
  const history = useHistory();

  const { id } = params || {};

  // Redux
  const dispatch = useDispatch();
  const { orderInfo, error } = useSelector((state) => state.openOrder);

  useEffect(() => {
    if (!id) return;
    dispatch(openOrder(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!orderInfo) return;
    // const encryptId = _encrypt(id);
    // history.replace(`/auth/home?id=${encryptId}`);
    history.replace(`/auth/home?id=${id}`);
  }, [orderInfo, id, history]);

  useEffect(() => {
    if (!error) return;
    history.replace('/not-found');
  }, [error, history]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20vh',
      }}
    >
      <Spin size="large" />
    </div>
  );
};

export default LandingScreen;
