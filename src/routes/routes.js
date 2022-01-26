import { lazy } from 'react';

const routes = [
  {
    path: 'home',
    component: lazy(() => import('../screen/HomeScreen')),
    exact: true,
  },
  {
    path: 'payment',
    component: lazy(() => import('../screen/BuyScreen')),
    exact: true,
  },
  {
    path: 'result',
    component: lazy(() => import('../components/result/BuyResult')),
    exact: true,
  },
];

export default routes;
