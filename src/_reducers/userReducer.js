import { USER as CONST } from '../_constants'

// 数据传到界面上显示
export default  (state = {}, action) => {
  
  switch (action.type) {
    case CONST.GETALL_SUCCESS: // waiting while logging
      return { ...state, data: action.payload};
    case CONST.GETALL_FAILURE: // waiting while logging
      return { ...state, error: action.payload };
    case CONST.DELETE_SUCCESS:
      return { ...state, data: action.payload };
    case CONST.DELETE_FAILURE:
      return state
    default:
      return state
  }
}