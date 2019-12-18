export const reducerMaker = (constOutside, tableName="FACELESS") => {

    let CONST;

    if (constOutside) {
        CONST = constOutside;
    } else {
        CONST={
            GETDROPDOWN_SUCCESS:tableName+"_"+'GETDROPDOWN_SUCCESS',
            GETBYSEARCH_SUCCESS:tableName+"_"+'GETBYSEARCH_SUCCESS',
            GET_SUCCESS:    tableName+"_"+'GET_SUCCESS',
            UPDATE_SUCCESS: tableName+"_"+'UPDATE_SUCCESS',
            UPDATE_FAILURE: tableName+"_"+'UPDATE_FAILURE',
            CREATE_SUCCESS: tableName+"_"+'CREATE_SUCCESS',
            CREATE_FAILURE: tableName+"_"+'CREATE_FAILURE',
            DELETE_SUCCESS: tableName+"_"+'DELETE_SUCCESS',
            DELETE_FAILURE: tableName+"_"+'DELETE_FAILURE'
        }
    }


    return (state = {}, action) => {

        switch (action.type) {
          case CONST.GETDROPDOWN_SUCCESS: // waiting while logging
          return {...state,  dropdown: action.payload };
          case CONST.GETBYSEARCH_SUCCESS:
            return { ...state, data: action.payload };
          case CONST.GET_SUCCESS:
            return { ...state, dataById: action.payload };
          case CONST.UPDATE_SUCCESS:
            return { ...state, dataById: action.payload };
          case CONST.UPDATE_FAILURE:
            return { ...state, errorById: action.payload }; // error message included
          case CONST.CREATE_SUCCESS:
            return { ...state, dataById: action.payload }; // jump to a new page (edit or create page)
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
}