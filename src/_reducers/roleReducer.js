import {ROLE as CONST} from '../_constants'

// 数据传到界面上显示
export default (state = {}, action) => {
  switch (action.type) {
    case CONST.GETDROPDOWN_SUCCESS: // waiting while logging
      return {...state,  dropdown: action.payload };
    case CONST.GETBYSEARCH_SUCCESS:
      return {...state,  data: action.payload };
    case CONST.DELETE_SUCCESS:
      return {...state,  data: action.payload }; 
    case CONST.DELETE_FAILURE:
      return state
    default:
      return state
  }
}