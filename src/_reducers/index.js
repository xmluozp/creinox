import {combineReducers} from 'redux'
import auth from './authReducer'
import loading from './loadingReducer'
import alert from './alertReducer'

import role from './roleReducer'
import user from './userReducer'

import company from './companyReducer'

import product from './productReducer'
import category from './categoryReducer'


// 多表格的时候这里是所有的reducer
export default combineReducers({
    authData: auth, // login status
    loadingData: loading,
    alertData: alert,

    roleData: role,
    userData: user,
    
    companyData: company,
    
    productData: product,
    categoryData: category,
});
