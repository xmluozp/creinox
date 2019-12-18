import React from 'react';

import {enumsLabel, enums} from './_constants';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
//================ user
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));

//================ company types
const CompaniesInternal = React.lazy(() => import('./views/Company/Companies').then(mymodule=> ({default: mymodule.withCompanyList(
            enums.companyType.internal, '/companyinternal/company')})));
const CompanyInternal = React.lazy(() => import('./views/Company/Company').then(mymodule=> ({default: mymodule.withCompany(enums.companyType.internal)})));

const CompaniesFactory = React.lazy(() => import('./views/Company/Companies').then(mymodule=> ({default: mymodule.withCompanyList(
  enums.companyType.factory, '/companyfactory/company')})));
const CompanyFactory = React.lazy(() => import('./views/Company/Company').then(mymodule=> ({default: mymodule.withCompany(enums.companyType.factory)})));

const CompaniesOverseas = React.lazy(() => import('./views/Company/Companies').then(mymodule=> ({default: mymodule.withCompanyList(
  enums.companyType.overseasCustomer, '/companyoverseas/company')})));
const CompanyOverseas = React.lazy(() => import('./views/Company/Company').then(mymodule=> ({default: mymodule.withCompany(enums.companyType.overseasCustomer)})));

const CompaniesDomestic = React.lazy(() => import('./views/Company/Companies').then(mymodule=> ({default: mymodule.withCompanyList(
  enums.companyType.domesticCustomer, '/companydomestic/company')})));
const CompanyDomestic = React.lazy(() => import('./views/Company/Company').then(mymodule=> ({default: mymodule.withCompany(enums.companyType.domesticCustomer)})));

const CompaniesShipping = React.lazy(() => import('./views/Company/Companies').then(mymodule=> ({default: mymodule.withCompanyList(
  enums.companyType.shippingCompany, '/companyshipping/company')})));
const CompanyShipping = React.lazy(() => import('./views/Company/Company').then(mymodule=> ({default: mymodule.withCompany(enums.companyType.shippingCompany)})));


//================ product
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
  //--------------------------------------------- 用户
  { path: '/users/users', exact: true, name: '用户列表', component: Users, authTag:'user' },
  { path: '/users/user', exact: true, name: '用户', component: User, authTag:'user' },
  { path: '/users/user/:id', exact: true, name: '用户', component: User, authTag:'user' },
  //--------------------------------------------- 公司
  { path: '/companyinternal/companies', exact: true, name:  enumsLabel.companyType[enums.companyType.internal] + '列表', component: CompaniesInternal, authTag:'companyinternal' },
  { path: '/companyinternal/company', exact: true, name: enumsLabel.companyType[enums.companyType.internal], component: CompanyInternal, authTag:'companyinternal' },
  { path: '/companyinternal/company/:id', exact: true, name: enumsLabel.companyType[enums.companyType.internal], component:  CompanyInternal, authTag:'companyinternal' },

  { path: '/companyfactory/companies', exact: true, name:  enumsLabel.companyType[enums.companyType.factory] + '列表', component: CompaniesFactory, authTag:'companyfactory' },
  { path: '/companyfactory/company', exact: true, name: enumsLabel.companyType[enums.companyType.factory], component: CompanyFactory, authTag:'companyfactory' },
  { path: '/companyfactory/company/:id', exact: true, name: enumsLabel.companyType[enums.companyType.factory], component:  CompanyFactory, authTag:'companyfactory' },

  { path: '/companyoverseas/companies', exact: true, name:  enumsLabel.companyType[enums.companyType.overseasCustomer] + '列表', component: CompaniesOverseas, authTag:'companyoverseas' },
  { path: '/companyoverseas/company', exact: true, name: enumsLabel.companyType[enums.companyType.overseasCustomer], component: CompanyOverseas, authTag:'companyoverseas' },
  { path: '/companyoverseas/company/:id', exact: true, name: enumsLabel.companyType[enums.companyType.overseasCustomer], component:  CompanyOverseas, authTag:'companyoverseas' },

  { path: '/companydomestic/companies', exact: true, name:  enumsLabel.companyType[enums.companyType.domesticCustomer] + '列表', component: CompaniesDomestic, authTag:'companydomestic' },
  { path: '/companydomestic/company', exact: true, name: enumsLabel.companyType[enums.companyType.domesticCustomer], component: CompanyDomestic, authTag:'companydomestic' },
  { path: '/companydomestic/company/:id', exact: true, name: enumsLabel.companyType[enums.companyType.domesticCustomer], component:  CompanyDomestic, authTag:'companydomestic' },

  { path: '/companyshipping/companies', exact: true, name:  enumsLabel.companyType[enums.companyType.shippingCompany] + '列表', component: CompaniesShipping, authTag:'companyshipping' },
  { path: '/companyshipping/company', exact: true, name: enumsLabel.companyType[enums.companyType.shippingCompany], component: CompanyShipping, authTag:'companyshipping' },
  { path: '/companyshipping/company/:id', exact: true, name: enumsLabel.companyType[enums.companyType.shippingCompany], component:  CompanyShipping, authTag:'companyshipping' },

  //--------------------------------------------- 产品
  { path: '/product/categories', exact: true, name: '产品类别表', component: ProductCategories, authTag:'product' },
  { path: '/product/category', exact: true, name: '产品类别', component: ProductCategory, authTag:'product' },
  { path: '/product/category/:id', exact: true, name: '产品类别', component: ProductCategory, authTag:'product' },

  { path: '/product/products', exact: true, name: '产品目录', component: ProductProducts, authTag:'product' },
  { path: '/product/product', exact: true, name: '产品', component: ProductProduct, authTag:'product' },
  { path: '/product/product/:id', exact: true, name: '产品', component: ProductProduct, authTag:'product' },

  
];


export default routes;
