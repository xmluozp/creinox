import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
//================ user
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));
// const Page404 = React.lazy(() => import('./views/Pages/Page404'));
// const Page500 = React.lazy(() => import('./views/Pages/Page500'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/users/users', exact: true, name: 'User List', component: Users },
  { path: '/users/users/:id', exact: true, name: 'User', component: User },
];


export default routes;
