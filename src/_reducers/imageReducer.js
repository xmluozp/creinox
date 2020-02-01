import { IMAGE as CONST } from "../_constants";
// import {reducerMaker} from "../_helper/facelessMaker";

// const returnFunction = reducerMaker(CONST);
// export default returnFunction;

// 数据传到界面上显示
export default (state = {}, action) => {
  switch (action.type) {
    case CONST.GETBYSEARCH_SUCCESS:
      return { ...state, data: action.payload };
    case CONST.GET_SUCCESS:
      return { ...state, dataById: action.payload, errorById:{}  };
    case CONST.UPDATE_SUCCESS:
      return { ...state, dataById: action.payload, data:action.payload,  errorById:{}  };
    case CONST.UPDATE_FAILURE:
      return { ...state, errorById: action.payload }; // error message included
    case CONST.CREATE_SUCCESS:
      return { ...state, dataById: action.payload, data:action.payload, errorById:{}  }; // jump to a new page (edit or create page)
    case CONST.CREATE_FAILURE:
      return { ...state, errorById: action.payload }; // error message included
    case CONST.DELETE_SUCCESS:
      return { ...state, data: action.payload };
    case CONST.DELETE_FAILURE:
      return state;
    default:
      return state;
  }
};
