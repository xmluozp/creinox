import { USER as CONST } from "_constants";

// 数据传到界面上显示
export default (state = {}, action) => {
  switch (action.type) {
    case CONST.GETDROPDOWN: // waiting while logging
    return {...state,  dropdown: {} };
    case CONST.GETDROPDOWN_SUCCESS: // waiting while logging
    return {...state,  dropdown: action.payload };
    case CONST.GETBYSEARCH:
      return { ...state, data: {} };
    case CONST.GETBYSEARCH_SUCCESS:
      return { ...state, data: action.payload };
    case CONST.GET:
      return { ...state, dataById: {}, errorById:{}};
    case CONST.GET_SUCCESS:
      return { ...state, dataById: action.payload, errorById:{}  };
    case CONST.UPDATE_SUCCESS:
      return { ...state, dataById: action.payload, errorById:{}, dropdown: {}};
    case CONST.UPDATE_FAILURE:
      return { ...state, errorById: action.payload }; // error message included
    case CONST.CREATE_SUCCESS:
      return { ...state, dataById: action.payload, errorById:{}, dropdown: {}}; // jump to a new page (edit or create page)
    case CONST.CREATE_FAILURE:
      return { ...state, errorById: action.payload }; // error message included
    case CONST.DELETE_SUCCESS:
      return { ...state, data: action.payload, dropdown: {}};
    case CONST.DELETE_FAILURE:
      return state;
    default:
      return state;
  }
};
