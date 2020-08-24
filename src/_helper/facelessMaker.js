export const constMaker = (constPrefix="FACELESS") => {

    const CONST= {
      GETDROPDOWN:constPrefix+"_GETDROPDOWN",
      GETDROPDOWN_SUCCESS:constPrefix+"_GETDROPDOWN_SUCCESS",
      GETBYSEARCH:constPrefix+"_GETBYSEARCH",
      GETBYSEARCH_SUCCESS:constPrefix+"_GETBYSEARCH_SUCCESS",
      GET:            constPrefix+"_GET",
      GET_SUCCESS:    constPrefix+"_GET_SUCCESS",
      UPDATE_SUCCESS: constPrefix+"_UPDATE_SUCCESS",
      UPDATE_FAILURE: constPrefix+"_UPDATE_FAILURE",
      CREATE_SUCCESS: constPrefix+"_CREATE_SUCCESS",
      CREATE_FAILURE: constPrefix+"_CREATE_FAILURE",
      DELETE_SUCCESS: constPrefix+"_DELETE_SUCCESS",
      DELETE_FAILURE: constPrefix+"_DELETE_FAILURE",
  }

  return CONST;
}



export const reducerMaker = (constOutside, constPrefix="FACELESS") => {

    let CONST;

    if (constOutside) {
        CONST = constOutside;
    } else {
        CONST={
            GETDROPDOWN:constPrefix+"_GETDROPDOWN",
            GETDROPDOWN_SUCCESS:constPrefix+"_GETDROPDOWN_SUCCESS",
            GETBYSEARCH:constPrefix+"_GETBYSEARCH",
            GETBYSEARCH_SUCCESS:constPrefix+"_GETBYSEARCH_SUCCESS",
            GET:            constPrefix+"_GET",
            GET_SUCCESS:    constPrefix+"_GET_SUCCESS",
            UPDATE_SUCCESS: constPrefix+"_UPDATE_SUCCESS",
            UPDATE_FAILURE: constPrefix+"_UPDATE_FAILURE",
            CREATE_SUCCESS: constPrefix+"_CREATE_SUCCESS",
            CREATE_FAILURE: constPrefix+"_CREATE_FAILURE",
            DELETE_SUCCESS: constPrefix+"_DELETE_SUCCESS",
            DELETE_FAILURE: constPrefix+"_DELETE_FAILURE",
        }
    }


    return (state = {}, action) => {
        switch (action.type) {
          case CONST.GETDROPDOWN: // waiting while logging
          return {...state,  dropdown: {} };
          case CONST.GETDROPDOWN_SUCCESS: // waiting while logging
          return {...state,  dropdown: action.payload };
          case CONST.GETBYSEARCH:
            return { ...state, data: {}};        
          case CONST.GETBYSEARCH_SUCCESS:
            return { ...state, data: action.payload};
          case CONST.GET:
            return { ...state, dataById: {}, errorById:{}};
          case CONST.GET_SUCCESS:
            return { ...state, dataById: action.payload, errorById:{}  };
          case CONST.UPDATE_SUCCESS:
            return { ...state, dataById: action.payload, errorById:{}, dropdown: {} };
          case CONST.UPDATE_FAILURE:
            return { ...state, errorById: action.payload }; // error message included
          case CONST.CREATE_SUCCESS:
            return { ...state, dataById: action.payload, errorById:{}, dropdown: {} }; // jump to a new page (edit or create page)
          case CONST.CREATE_FAILURE:
            // console.log("hi")
            return { ...state, errorById: action.payload }; // error message included
          case CONST.DELETE_SUCCESS:
            return { ...state, data: action.payload, dropdown: {} };
          case CONST.DELETE_FAILURE:
            return state;
          default:
            return state;
        }
    };
}