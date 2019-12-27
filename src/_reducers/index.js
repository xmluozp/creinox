import { combineReducers } from "redux";
import auth from "./authReducer";
import loading from "./loadingReducer";
import alert from "./alertReducer";

import role from "./roleReducer";
import user from "./userReducer";
import commonitem from "./commonitemReducer";
import image from "./imageReducer";

import company from "./companyReducer";
import region from "./regionReducer";

import product from "./productReducer";
import category from "./categoryReducer";


// usage: xxxData: reducerMaker(null, tableName="XXXTABLE")
import { reducerMaker } from "../_helper/facelessMaker";

// 多表格的时候这里是所有的reducer
export default combineReducers({
  authData: auth, // login status
  loadingData: loading,
  alertData: alert,

  roleData: role,
  userData: user,
  commonitemData: commonitem,
  imageData: image,

  companyData: company,
  regionData: region,

  productData: product,
  categoryData: category,

  rostercontactData: reducerMaker(null, "ROSTERCONTACT"),
  bankaccountData: reducerMaker(null, "BANKACCOUNT")
});
