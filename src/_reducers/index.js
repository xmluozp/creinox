import { combineReducers } from "redux";
import auth from "./authReducer";
import loading from "./loadingReducer";
import alert from "./alertReducer";
import print from "./printReducer";

import financialledger from "./financialledgerReducer"

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
import { reducerMaker } from "_helper/facelessMaker";

// 用来存放各种下拉菜单. 因为会有比如同是port表，但是出发和到达分两个下拉菜单的情况
const cacheReducer = (state = {}, action) => {
  const {key, value} = action.payload || {}
  if(!(key && value)) {
    return state;
  }

  switch (action.type) {
    case "CACHE":
      return { ...state, [key]: value };
    default:
        return state;
  }
}

// 多表格的时候这里是所有的reducer
export default combineReducers({

  cacheData: cacheReducer,

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

  financialaccountData: reducerMaker(null, "FINANCIALACCOUNT"),
  financialledgerData: financialledger,
  financialtransactionData: reducerMaker(null, "FINANCIALTRANSACTION"),
  financialvoucherData: reducerMaker(null, "FINANCIALVOUCHER"),



  // 产品、商品
  categoryData: category,
  productData: product,
  productpurchaseData: productpurchase,

  commodityData: commodity,

  // faceless 的单纯信息表
  rostercontactData: reducerMaker(null, "ROSTERCONTACT"),
  bankaccountData: reducerMaker(null, "BANKACCOUNT")  
});


