import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
//================ user
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));

const Companies = React.lazy(() => import('./views/Company/Companies'));
const Company = React.lazy(() => import('./views//Company/Company'));

const ProductCategories = React.lazy(() => import('./views/Product/Categories'));
const ProductCategory = React.lazy(() => import('./views//Product/Category'));
const ProductProducts = React.lazy(() => import('./views/Product/Products'));
const ProductProduct = React.lazy(() => import('./views//Product/Product'));

// const Page404 = React.lazy(() => import('./views/Pages/Page404'));
// const Page500 = React.lazy(() => import('./views/Pages/Page500'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
  //--------------------------------------------- 
  { path: '/users/users', exact: true, name: '用户列表', component: Users },
  { path: '/users/user', exact: true, name: '用户', component: User },
  { path: '/users/user/:id', exact: true, name: '用户', component: User },
  //--------------------------------------------- 
  { path: '/company/companies', exact: true, name: '公司列表', component: Companies },
  { path: '/company/company', exact: true, name: '公司', component: Company },
  { path: '/company/company/:id', exact: true, name: '公司', component: Company },

  //--------------------------------------------- 
  { path: '/product/categories', exact: true, name: '产品类别表', component: ProductCategories },
  { path: '/product/category', exact: true, name: '产品类别', component: ProductCategory },
  { path: '/product/category/:id', exact: true, name: '产品类别', component: ProductCategory },

  { path: '/product/products', exact: true, name: '产品目录', component: ProductProducts },
  { path: '/product/product', exact: true, name: '产品', component: ProductProduct },
  { path: '/product/product/:id', exact: true, name: '产品', component: ProductProduct },

  
];


export default routes;
