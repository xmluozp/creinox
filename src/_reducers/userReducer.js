import {USER} from '../_constants'

// 数据传到界面上显示
const userReducer = (state = {}, action) => {
  switch (action.type) {
    case USER.READALL_SUCCESS: // waiting while logging
      return {...state,  data: action.payload };
    case USER.DELETE_SUCCESS:
      return {...state,  data: action.payload }; 
    case USER.DELETE_FAILURE:
      return state
    default:
      return state
  }
}

export default userReducer;