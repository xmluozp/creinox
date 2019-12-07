import {AUTH} from '../_constants'

let user = JSON.parse(localStorage.getItem('user'));
const defaultState = user ? { loggedIn: true, user } : {};

// 数据传到界面上显示. 只有这里用"user"作为关键字，其他都用data。因为登录的user可能和页面的data同时使用
const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case AUTH.LOGIN: // waiting while logging
      return {...state,  loggingIn: true , message: action.message };
    case AUTH.LOGIN_SUCCESS: // login finish
      return {...state,  loggedIn: true,  message: action.message , user: action.payload};
    case AUTH.LOGIN_ERROR:
      return {...state, loggedIn: false,  message: action.message , user: {}};
    case AUTH.LOGOUT:
      return {};
    default:
      return state
  }
}

export default authReducer;