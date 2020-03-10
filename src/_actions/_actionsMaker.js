import { LOADING } from "../_constants";
import { alertActions } from ".";

export const done = (payload, type) => {
  return { type: type, payload };
};
export const failure = payload => {
  return alertActions.error(payload);
};
export const success = payload => {
  return alertActions.success(payload);
};
export const loading = { type: LOADING.LOADING };
export const loaded = { type: LOADING.SUCCESS };
export const loadedFailure = { type: LOADING.FAILURE };

export const _am = (CONST, service) => {

  function get_dropdown(pagination, searchTerms = {}) {
    return dispatch => {
      dispatch(loading);
      dispatch(done({}, CONST.GETDROPDOWN));
      return service.get_dropdown(pagination, searchTerms).then(
        response => {
          dispatch(loaded);
          dispatch(done(response, CONST.GETDROPDOWN_SUCCESS));

          return response;
        },
        error => {
          dispatch(loadedFailure);

          const errorInfo =error && error.info ? error.info : ""
          dispatch(failure(errorInfo.toString()));
        }
      );
    };
  }

  // function get_bySearch(pagination, searchTerms = {}) {
  //   return dispatch => {
  //     dispatch(loading);
  //     dispatch(done({}, CONST.GETBYSEARCH));
  //     return service.get_bySearch(pagination, searchTerms).then(
  //       response => {
  //         dispatch(loaded);
  //         console.log("getbysearch", response);
  //         dispatch(done(response, CONST.GETBYSEARCH_SUCCESS));
  //       },
  //       error => {
  //         dispatch(loadedFailure);

  //         const errorInfo =error && error.info ? error.info : ""
  //         dispatch(failure(errorInfo.toString()));
  //       }
  //     );
  //   };
  // }



  function get_byId(id) {
    return dispatch => {
      dispatch(loading);
      dispatch(done({}, CONST.GET));
      return service.get_byId(id).then(
        response => {
          dispatch(loaded);        
          console.log("getbyid:", response)
          dispatch(done(response, CONST.GET_SUCCESS));
        },
        error => {
          dispatch(loadedFailure);

          const errorInfo =error && error.info ? error.info : ""
          dispatch(failure(errorInfo.toString()));
        }
      );
    };
  }

  function post_create(item, callBack = () => {}) {
    console.log("action create:", item);
    return dispatch => {
      dispatch(loading);
      return service.post_create(item).then(
        response => {
          dispatch(loaded);
          const info = response && response.info ? response.info : ""
          dispatch(success("保存成功" + info.toString()));
          dispatch(done(response, CONST.CREATE_SUCCESS));

          console.log("created:", response)

          const id = (response.row && response.row.id) || null;
          callBack(id);
        },
        error => {
          dispatch(loadedFailure);
          const errorInfo =error && error.info ? error.info : ""
          dispatch(failure("保存失败." + errorInfo.toString()));
          dispatch(done(error, CONST.CREATE_FAILURE));
        }
      );
    };
  }

  function post_createMultiple(itemList, folder_id, callBack=()=>{}) {
    console.log("action multiple create:", itemList);
    return dispatch => {
      dispatch(loading);
      return service.post_createMultiple(itemList, folder_id).then(
        response => {
          dispatch(loaded);
          const info = response && response.info ? response.info : ""
          dispatch(success("保存成功" + info.toString()));
          dispatch(done(response, CONST.CREATE_SUCCESS));
          // const id = (response.row && response.row.id) || null
          // 这里callback是一个id list. 但假如需要刷新，用不到这个list
          callBack(response);
        },
        error => {
          dispatch(loadedFailure);
          
          const errorInfo =error && error.info ? error.info : ""
          dispatch(failure("保存失败." + errorInfo.toString()));
          dispatch(done(error, CONST.CREATE_FAILURE));
        }
      );
    };
  }

  function put_update(item, callBack = () => {}) {
    console.log("action update:", item);
    return dispatch => {
      dispatch(loading);
      return service.put_update(item).then(
        response => {
          dispatch(loaded);
          const info = response && response.info ? response.info : ""
          dispatch(success("保存成功" + info.toString()));
          dispatch(done(response, CONST.UPDATE_SUCCESS));
          callBack(response);
        },
        error => {
          dispatch(loadedFailure);

          const errorInfo =error && error.info ? error.info : ""
          dispatch(failure("保存失败." + errorInfo.toString()));
          dispatch(done(error, CONST.UPDATE_FAILURE));
        }
      );
    };
  }

  function _delete(id, pagination, searchTerms, callBack = () => {}) {
    // pagination: 删除后刷新列表用
    return dispatch => {
      return service._delete(id).then(
        response => {
          console.log(response)
          const info = response && response.info ? response.info : ""
          dispatch(success("删除成功." + info.toString()));
          dispatch(done(response, CONST.DELETE_SUCCESS));
          callBack()
        },
        error => {
          const errorInfo =error && error.info ? error.info : ""
          dispatch(failure("删除失败. " + errorInfo.toString()));
        }
      ).then(() => p_getbysearch(dispatch, pagination, searchTerms));
    };
  }

  function _delete_treeNode(id, parentId, callBack = () => {}) {
    // pagination: 删除后刷新列表用
    return dispatch => {
      return service._delete(id).then(
        response => {
          console.log(response)
          const info = response && response.info ? response.info : ""
          dispatch(success("删除成功." + info.toString()));
          dispatch(done(response, CONST.DELETE_SUCCESS));
          callBack()
        },
        error => {
          const errorInfo =error && error.info ? error.info : ""
          dispatch(failure("删除失败. " + errorInfo.toString()));
        }
      ).then(() => p_gettreeNotesById(dispatch, parentId));
    };
  }

  function _deleteMultiple(list, pagination, searchTerms) {
    // pagination: 删除后刷新列表用
    return dispatch => {
      return service._deleteMultiple(list).then(
        response => {
          console.log("deleted", response)
          const info = response && response.info ? response.info : ""
          dispatch(success("批量删除成功." + info.toString()));
          dispatch(done(response, CONST.DELETE_SUCCESS));
        },
        error => {
          const errorInfo =error && error.info ? error.info : ""
          dispatch(failure("批量删除失败. " + errorInfo.toString()));
        }
      ).then(() => p_getbysearch(dispatch, pagination, searchTerms));
    };
  }

  function get_treeNotesById(parentId = 0) {
    // 通过某个分类，取所有的子级孙级分类
    return dispatch => {
      dispatch({ type: LOADING.LOADING });
      // dispatch(done({}, CONST.GETBYSEARCH)); // 会导致死循环
      return p_gettreeNotesById(dispatch, parentId);
    };
  }

  function get_bySearch(pagination, searchTerms = {}) {
    return dispatch => {
      dispatch(loading);
      dispatch(done({}, CONST.GETBYSEARCH));
      return p_getbysearch(dispatch, pagination, searchTerms);
    };
  }


  function p_getbysearch(dispatch, pagination, searchTerms) {
    return service.get_bySearch(pagination, searchTerms).then(
      response => {
        dispatch(loaded);
        console.log("getbysearch", response);
        dispatch(done(response, CONST.GETBYSEARCH_SUCCESS));
      },
      error => {
        dispatch(loadedFailure);
        const errorInfo =error && error.info ? error.info : ""
        dispatch(failure(errorInfo.toString()));
      }
    );
  }

  function p_gettreeNotesById(dispatch, parentId) {

    return service.get_treeNotesById(parentId).then(
      response => {
        dispatch({ type: LOADING.SUCCESS });
        console.log("getby treenode", response);
        dispatch({ type: CONST.GETBYSEARCH_SUCCESS, payload: response });
      },
      error => {
        dispatch({ type: LOADING.FAILURE });

        const errorInfo =error && error.info ? error.info : ""
        dispatch(failure(errorInfo.toString()));
      }
    );
  }





  return {
    get_dropdown,
    get_bySearch,
    get_treeNotesById,
    get_byId,
    post_create,
    post_createMultiple,
    put_update,
    _delete,
    _delete_treeNode,
    _deleteMultiple,
  };
};
