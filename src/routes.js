import React from "react";

import { enumsLabel, enums } from "./_constants";

const Dashboard = React.lazy(() => import("./views/Dashboard"));
const Test = React.lazy(()=>import("./views/Test/TestPage"));

//================ user
const Users = React.lazy(() => import("./views/Users/Users"));
const User = React.lazy(() => import("./views/Users/User"));
const Roles = React.lazy(() => import("./views/Users/Roles"));
const Role = React.lazy(() => import("./views/Users/Role"));
const Commonitems = React.lazy(() => import("./views/Setting/Commonitems"));
const Commonitem = React.lazy(() => import("./views/Setting/Commonitem"));
const Images = React.lazy(() => import("./views/Image/Images"));

//================ product
const ProductCategories = React.lazy(() =>
  import("./views/Product/Categories")
);

const ProductProducts = React.lazy(() => import("./views/Product/Products"));
const ProductProduct = React.lazy(() => import("./views/Product/Product"));

const ProductPurchases = React.lazy(() => import("./views/Product/ProductPurchases"));

//================ commodity
const Commodity = React.lazy(() => import("./views/Commodity/Commodity"));
const Commodities = React.lazy(() => import("./views/Commodity/Commodities"));


//================ region
const Regions = React.lazy(() => import("./views/Setting/Regions"));

//================ ports
const Ports = React.lazy(() => import("./views/Setting/Ports"));
const Port = React.lazy(() => import("./views/Setting/Port"));

//================ contracts
const Allcontracts = React.lazy(() => import("./views/Contract/Allcontracts"));
const Sellcontract = React.lazy(() => import("./views/Contract/Sellcontract"));
// const Sellcontracts = React.lazy(() => import("./views/Contract/Sellcontracts"));
const Buycontract = React.lazy(() => import("./views/Contract/Buycontract"));
const Buycontracts = React.lazy(() => import("./views/Contract/Buycontracts"));
const Mouldcontract = React.lazy(() => import("./views/Contract/Mouldcontract"));
const Mouldcontracts = React.lazy(() => import("./views/Contract/Mouldcontracts"));

//================ financial
const FinancialAccounts = React.lazy(() => import("./views/Financial/FinancialAccounts"));
const FinancialAccount = React.lazy(() => import("./views/Financial/FinancialAccount"));

const FinancialLedger = React.lazy(() => import("./views/Financial/FinancialLedger"));

const FinancialAccountsTransactions = React.lazy(() => import("./views/Financial/FinancialAccountsTransactions"));
const FinancialTransactions = React.lazy(() => import("./views/Financial/FinancialTransactions"));
const FinancialTransaction = React.lazy(() => import("./views/Financial/FinancialTransaction"));

const FinancialVouchers = React.lazy(() => import("./views/Financial/FinancialVouchers"));
const FinancialVoucher = React.lazy(() => import("./views/Financial/FinancialVoucher"));


//================ company types

const CompaniesInternal = React.lazy(() =>
  import("./views/Company/Companies").then(mymodule => ({
    default: mymodule.withCompanyList(
      enums.companyType.internal,
      "/companyinternal/companies",
      "/companyinternal/companies/add"
    )
  }))
);
const CompanyInternal = React.lazy(() =>
  import("./views/Company/Company").then(mymodule => ({
    default: mymodule.withCompany(
      enums.companyType.internal,
      "/companyinternal/companies"
    )
  }))
);

const CompaniesFactory = React.lazy(() =>
  import("./views/Company/Companies").then(mymodule => ({
    default: mymodule.withCompanyList(
      enums.companyType.factory,
      "/companyfactory/companies",
      "/companyfactory/companies/add"
    )
  }))
);

const CompanyFactory = React.lazy(() =>
  import("./views/Company/Company").then(mymodule => ({
    default: mymodule.withCompany(
      enums.companyType.factory,
      "/companyfactory/companies"
    )
  }))
);

const CompaniesOverseas = React.lazy(() =>
  import("./views/Company/Companies").then(mymodule => ({
    default: mymodule.withCompanyList(
      enums.companyType.overseasCustomer,
      "/companyoverseas/companies",
      "/companyoverseas/companies/add"
    )
  }))
);
const CompanyOverseas = React.lazy(() =>
  import("./views/Company/Company").then(mymodule => ({
    default: mymodule.withCompany(
      enums.companyType.overseasCustomer,
      "/companyoverseas/companies"
    )
  }))
);

const CompaniesDomestic = React.lazy(() =>
  import("./views/Company/Companies").then(mymodule => ({
    default: mymodule.withCompanyList(
      enums.companyType.domesticCustomer,
      "/companydomestic/companies",
      "/companydomestic/companies/add"
    )
  }))
);
const CompanyDomestic = React.lazy(() =>
  import("./views/Company/Company").then(mymodule => ({
    default: mymodule.withCompany(
      enums.companyType.domesticCustomer,
      "/companydomestic/companies"
    )
  }))
);

const CompaniesShipping = React.lazy(() =>
  import("./views/Company/Companies").then(mymodule => ({
    default: mymodule.withCompanyList(
      enums.companyType.shippingCompany,
      "/companyshipping/companies",
      "/companyshipping/companies/add"
    )
  }))
);
const CompanyShipping = React.lazy(() =>
  import("./views/Company/Company").then(mymodule => ({
    default: mymodule.withCompany(
      enums.companyType.shippingCompany,
      "/companyshipping/companies"
    )
  }))
);

// const Page404 = React.lazy(() => import('./views/Pages/Page404'));
// const Page500 = React.lazy(() => import('./views/Pages/Page500'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", exact: true, name: "Dashboard", component: Dashboard },
  {
    path: "/test",
    exact: true,
    name: "测试",
    component: Test,
    authTag: "test"
  },
  //--------------------------------------------- 用户
  {
    path: "/users/users",
    exact: true,
    name: "用户列表",
    component: Users,
    authTag: "user"
  },
  {
    path: "/users/users/add",
    exact: true,
    name: "新增",
    component: User,
    authTag: "user"
  },
  {
    path: "/users/users/:id",
    exact: true,
    name: "详情",
    component: User,
    authTag: "user"
  },
  {
    path: "/users/roles",
    exact: true,
    name: "角色列表",
    component: Roles,
    authTag: "user"
  },
  {
    path: "/users/roles/add",
    exact: true,
    name: "新增",
    component: Role,
    authTag: "user"
  },
  {
    path: "/users/roles/:id",
    exact: true,
    name: "详情",
    component: Role,
    authTag: "user"
  },



  //--------------------------------------------- 通用选项表
  {
    path: "/commonitems/commonitemsList/:commonType",
    exact: true,
    name: "通用选项集",
    component: Commonitems,
    authTag: "commonitem"
  },
  // {
  //   path: "/commonitems/commonitemsList",
  //   exact: true,
  //   name: "通用选项集",
  //   component: Commonitems,
  //   authTag: "commonitem"
  // },
  {
    path: "/commonitems/commonitemsList/:commonType/add", // 必须在commonType下新增
    exact: true,
    name: "通用选项新增",
    component: Commonitem,
    authTag: "commonitem"
  },
  {
    path: "/commonitems/commonitemsList/:commonType/:id",
    exact: true,
    name: "详情",
    component: Commonitem,
    authTag: "commonitem"
  },

  //--------------------------------------------- 图片
  {
    path: "/image/images",
    exact: true,
    name: "已上传图片",
    component: Images,
    authTag: "image"
  },
  //--------------------------------------------- 国家地区
  {
    path: "/setting/regions",
    exact: true,
    name: "国家地区集",
    component: Regions,
    authTag: "region"
  },
  //--------------------------------------------- 港口
  {
    path: "/setting/ports",
    exact: true,
    name: "港口",
    component: Ports,
    authTag: "port"
  },
  {
    path: "/setting/ports/add",
    exact: true,
    name: "新增",
    component: Port,
    authTag: "port"
  },
  {
    path: "/setting/ports/:id",
    exact: true,
    name: "详情",
    component: Port,
    authTag: "port"
  },
  //--------------------------------------------- 合同
  {
    path: "/contract/sellcontracts",
    exact: true,
    name: "销售合同",
    component: Allcontracts,
    authTag: "sellcontract" // 因为入口是销售合同所以用销售合同的权限
  },
  {
    path: "/contract/sellcontracts/add",
    exact: true,
    name: "新增",
    component: Sellcontract,
    authTag: "sellcontract"
  },
  {
    path: "/contract/sellcontracts/:id",
    exact: true,
    name: "详情",
    component: Sellcontract,
    authTag: "sellcontract"
  },
  {
    path: "/contract/buycontracts",
    exact: true,
    name: "采购合同",
    component: Buycontracts,
    authTag: "buycontract"
  },
  {
    path: "/contract/buycontracts/add",
    exact: true,
    name: "新增",
    component: Buycontract,
    authTag: "buycontract"
  },  
  {
    path: "/contract/buycontracts/add/:sell_contract_id",
    exact: true,
    name: "从销售合同新增",
    component: Buycontract,
    authTag: "buycontract"
  },
  {
    path: "/contract/buycontracts/:id",
    exact: true,
    name: "详情",
    component: Buycontract,
    authTag: "buycontract"
  },
  {
    path: "/contract/mouldcontracts",
    exact: true,
    name: "产品开发合同",
    component: Mouldcontracts,
    authTag: "mouldcontract"
  },
  {
    path: "/contract/mouldcontracts/add",
    exact: true,
    name: "新增",
    component: Mouldcontract,
    authTag: "mouldcontract"
  },  
  {
    path: "/contract/mouldcontracts/:id",
    exact: true,
    name: "详情",
    component: Mouldcontract,
    authTag: "mouldcontract"
  },

//

  //--------------------------------------------- 财务
  {
    path: "/financial/financialaccounts/:where/",
    exact: true,
    name: "财务账户",
    component: FinancialAccounts,
    authTag: "financial"
  },
  {
    path: "/financial/financialaccounts/:where/add",
    exact: true,
    name: "新增",
    component: FinancialAccount,
    authTag: "financial"
  },
  {
    path: "/financial/financialaccounts/:where/:id",
    exact: true,
    name: "详情",
    component: FinancialAccount,
    authTag: "financial"
  },

  // 科目
  {
    path: "/financial/financialledgers",
    exact: true,
    name: "国家地区集",
    component: FinancialLedger,
    authTag: "financial"
  },
  // 转账记录
  {
    path: "/financial/financialaccountsTransactions/:where/",
    exact: true,
    name: "财务账户转账记录",
    component: FinancialAccountsTransactions,
    authTag: "financial"
  },
  {
    path: "/financial/financialtransactions/:financialAccount_id/",
    exact: true,
    name: "转账记录",
    component: FinancialTransactions,
    authTag: "financial"
  },
  {
    path: "/financial/financialtransactions/:financialAccount_id/add",
    exact: true,
    name: "新增",
    component: FinancialTransaction,
    authTag: "financial"
  },
  {
    path: "/financial/financialtransactions/:financialAccount_id/:id",
    exact: true,
    name: "详情",
    component: FinancialTransaction,
    authTag: "financial"
  },

  // 转账凭据
  {
    path: "/financial/financialvouchers",
    exact: true,
    name: "转账凭证",
    component: FinancialVouchers,
    authTag: "financial"
  },
  {
    path: "/financial/financialvouchers/add",
    exact: true,
    name: "新增",
    component: FinancialVoucher,
    authTag: "financial"
  },
  {
    path: "/financial/financialvouchers/:id",
    exact: true,
    name: "详情",
    component: FinancialVoucher,
    authTag: "financial"
  },


  //--------------------------------------------- 公司
  {
    path: "/companyinternal/companies",
    exact: true,
    name: enumsLabel.companyType[enums.companyType.internal] + "列表",
    component: CompaniesInternal,
    authTag: "companyinternal"
  },
  {
    path: "/companyinternal/companies/add",
    exact: true,
    name: "新增",
    component: CompanyInternal,
    authTag: "companyinternal"
  },
  {
    path: "/companyinternal/companies/:id",
    exact: true,
    name: "详情",
    component: CompanyInternal,
    authTag: "companyinternal"
  },

  {
    path: "/companyfactory/companies",
    exact: true,
    name: enumsLabel.companyType[enums.companyType.factory] + "列表",
    component: CompaniesFactory,
    authTag: "companyfactory"
  },
  {
    path: "/companyfactory/companies/add",
    exact: true,
    name: "新增",
    component: CompanyFactory,
    authTag: "companyfactory"
  },
  {
    path: "/companyfactory/companies/:id",
    exact: true,
    name: "详情",
    component: CompanyFactory,
    authTag: "companyfactory"
  },

  {
    path: "/companyoverseas/companies",
    exact: true,
    name: enumsLabel.companyType[enums.companyType.overseasCustomer] + "列表",
    component: CompaniesOverseas,
    authTag: "companyoverseas"
  },
  {
    path: "/companyoverseas/companies/add",
    exact: true,
    name: "新增",
    component: CompanyOverseas,
    authTag: "companyoverseas"
  },
  {
    path: "/companyoverseas/companies/:id",
    exact: true,
    name: "详情",
    component: CompanyOverseas,
    authTag: "companyoverseas"
  },

  {
    path: "/companydomestic/companies",
    exact: true,
    name: enumsLabel.companyType[enums.companyType.domesticCustomer] + "列表",
    component: CompaniesDomestic,
    authTag: "companydomestic"
  },
  {
    path: "/companydomestic/companies/add",
    exact: true,
    name: "新增",
    component: CompanyDomestic,
    authTag: "companydomestic"
  },
  {
    path: "/companydomestic/companies/:id",
    exact: true,
    name: "详情",
    component: CompanyDomestic,
    authTag: "companydomestic"
  },

  {
    path: "/companyshipping/companies",
    exact: true,
    name: enumsLabel.companyType[enums.companyType.shippingCompany] + "列表",
    component: CompaniesShipping,
    authTag: "companyshipping"
  },
  {
    path: "/companyshipping/companies/add",
    exact: true,
    name: "新增",
    component: CompanyShipping,
    authTag: "companyshipping"
  },
  {
    path: "/companyshipping/companies/:id",
    exact: true,
    name: "详情",
    component: CompanyShipping,
    authTag: "companyshipping"
  },

  //--------------------------------------------- 产品
  {
    path: "/product/categories",
    exact: true,
    name: "产品类别集",
    component: ProductCategories,
    authTag: "category"
  },
  {
    path: "/product/products",
    exact: true,
    name: "产品列表",
    component: ProductProducts,
    authTag: "product"
  },
  {
    path: "/product/productsComponent/:parentProductId",
    exact: true,
    name: "产品部件列表",
    component: ProductProducts,
    authTag: "product"
  },
  {
    path: "/product/productsParent/:componentProductId",
    exact: true,
    name: "产品成品列表",
    component: ProductProducts,
    authTag: "product"
  },
  {
    path: "/product/products/add",
    exact: true,
    name: "新增",
    component: ProductProduct,
    authTag: "product"
  },
  {
    path: "/product/products/:id",
    exact: true,
    name: "详情",
    component: ProductProduct,
    authTag: "product"
  },
  {
    path: [
      "/product/productpurchases",
      "/product/productpurchases/:productpurchase_id"
    ],
    exact: true,
    name: "工厂报价",
    component: ProductPurchases,
    authTag: "productpurchase"
  },

  //--------------------------------------------- 商品
  {
    path: "/commodity/commodities",
    exact: true,
    name: "商品列表",
    component: Commodities,
    authTag: "commodity"
  },
  {
    path: "/commodity/commodities/add",
    exact: true,
    name: "新增",
    component: Commodity,
    authTag: "commodity"
  },
  {
    path: "/commodity/commodities/:id",
    exact: true,
    name: "详情",
    component: Commodity,
    authTag: "commodity"
  },
  
];

export default routes;
