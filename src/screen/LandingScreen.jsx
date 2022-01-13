import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

// Antd
import { Spin } from 'antd';

import { openOrder } from '../store/actions/orderActions';

// const { Header, Footer, Content } = Layout;

const HomeScreen = ({ match, history }) => {
  console.log('landing');
  const dispatch = useDispatch();
  const { error, orderInfo } = useSelector((state) => state.openOrder);

  const {
    params: { id },
  } = match;

  useEffect(() => {
    if (id) {
      dispatch(openOrder(id));
    } else {
      history.push('/not-found');
    }
  }, [id, dispatch, history]);

  useEffect(() => {
    if (error) {
      history.push('/not-found');
    }
  }, [error, history]);

  useEffect(() => {
    if (orderInfo && id) {
      history.push(`/payment/${id}`);
    }
  }, [orderInfo, id, history]);

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spin size="large" />
    </div>
  );
};

HomeScreen.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

HomeScreen.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: '',
    }),
  }),
};

export default HomeScreen;
