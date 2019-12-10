import {AUTH as CONST} from '../_constants'

let user
try {
  user = JSON.parse(localStorage.getItem('user'));
} catch (error) {
  user = {};
}
const defaultState = user ? { loggedIn: true, user } : {};

// 数据传到界面上显示. 只有这里用"user"作为关键字，其他都用data。因为登录的user可能和页面的data同时使用
export default  (state = defaultState, action) => {
  switch (action.type) {
    case CONST.LOGIN: // waiting while logging
      return {...state,  loggingIn: true , message: action.message };
    case CONST.LOGIN_SUCCESS: // login finish
      return {...state,  loggedIn: true,  message: action.message , user: action.payload};
    case CONST.LOGIN_ERROR:
      return {...state, loggedIn: false,  message: action.message , user: {}};
    case CONST.LOGOUT:
      return {};
    default:
      return state
  }
}