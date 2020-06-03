import { combineReducers } from "redux";
import auth from "./authReducer";
import loading from "./loadingReducer";
import alert from "./alertReducer";
import print from "./printReducer";

import role from "./roleReducer";
import user from "./userReducer";
import commonitem from "./commonitemReducer";
import image from "./imageReducer";

import company from "./companyReducer";
import region from "./regionReducer";

import product from "./productReducer";
import category from "./categoryReducer";
import productpurchase from "./productpurchaseReducer";

import commodity from "./commodityReducer";


// usage: xxxData: reducerMaker(null, tableName="XXXTABLE")
import { reducerMaker } from "../_helper/facelessMaker";

// 多表格的时候这里是所有的reducer
export default combineReducers({

  // 全局
  authData: auth, // login status
  loadingData: loading,
  alertData: alert,
  printData: print,

  // 角色
  roleData: role,
  userData: user,

  // 通用
  commonitemData: commonitem,
  imageData: image,
  texttemplateData: reducerMaker(null, "TEXTTEMPLATE"),

  // 公司、组织
  sellcontractData: reducerMaker(null, "SELLCONTRACT"),
  sellsubitemData: reducerMaker(null, "SELLSUBITEM"),

  buycontractData: reducerMaker(null, "BUYCONTRACT"),
  buysubitemData: reducerMaker(null, "BUYSUBITEM"),
  
  mouldcontractData: reducerMaker(null, "MOULDCONTRACT"),

  companyData: company,
  regionData: region,
  portData: reducerMaker(null, "PORT"),

  // 产品、商品
  categoryData: category,
  productData: product,
  productpurchaseData: productpurchase,

  commodityData: commodity,

  // faceless 的单纯信息表
  rostercontactData: reducerMaker(null, "ROSTERCONTACT"),
  bankaccountData: reducerMaker(null, "BANKACCOUNT")  
});
