import { USER as CONST } from "../_constants";

// 数据传到界面上显示
export default (state = {}, action) => {
  switch (action.type) {
    case CONST.GETALL_SUCCESS:
      return { ...state, data: action.payload };
    case CONST.GET_SUCCESS:
      return { ...state, dataById: action.payload };

    case CONST.DELETE_SUCCESS:
      return { ...state, data: action.payload };
    case CONST.DELETE_FAILURE:
      return state;
    default:
      return state;
  }
};
