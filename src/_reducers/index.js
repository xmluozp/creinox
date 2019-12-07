import {combineReducers} from 'redux'
import auth from './authReducer'
import user from './userReducer'

// 多表格的时候这里是所有的reducer
export default combineReducers({
    authData: auth, // login status
    userData: user,
});