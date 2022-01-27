import React, { useEffect } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Antd
import { Spin } from 'antd';

// Router
import { Link, useParams, useHistory } from 'react-router-dom';

// Actions
// eslint-disable-next-line
import { openOrder } from '../store/actions/orderActions';

const LandingScreen = () => {
  const params = useParams();
  const history = useHistory();

  const { id } = params || {};

  // Redux
  const dispatch = useDispatch();
  const { orderInfo, error } = useSelector((state) => state.openOrder);

  useEffect(() => {
    // eslint-disable-next-line
    if (!id) return;
    dispatch(openOrder(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!orderInfo) return;
    localStorage.setItem('id', id);
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
      <Link to="/t308V%2bOFafSZj0eTXZZiXWpgufwq8Hg1StfpAvn5cMmyQzwNVWpDf6wQMiY3Dbb4O0XuENyA1RSWnYSP8kH99xnXYFUetonCPQXwWMS8%2bhY%3d">
        HOME
      </Link>
    </div>
  );
};

export default LandingScreen;
