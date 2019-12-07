import {combineReducers} from 'redux'
import auth from './authReducer'
import user from './userReducer'
import loading from './loadingReducer'

// 多表格的时候这里是所有的reducer
export default combineReducers({
    authData: auth, // login status
    userData: user,
    loadingData: loading,
});