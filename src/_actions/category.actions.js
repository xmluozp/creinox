import { CATEGORY as CONST } from "../_constants";
import { _am } from "./_actionsMaker";

import { categoryService as service } from "../_services";


const {
  get_dropdown,
  get_treeNotesById,
  get_bySearch,
  get_byId,
  post_create,
  put_update,
  _delete_treeNode,
  _clear
} = _am(CONST, service);

// FETCH  ---------------------------------------------
// function get_dropdown(pagination, searchTerms = {}) {
//   return dispatch => {
//     dispatch(loading);
//     return service.get_dropdown(pagination, searchTerms).then(
//       response => {
//         dispatch(loaded);
//         dispatch(done(response, CONST.GETDROPDOWN_SUCCESS));
//       },
//       error => {
//         dispatch(loadedFailure);
//         dispatch(failure(error.toString()));
//       }
//     );
//   };
// }

// function get_bySearch(pagination, searchTerms = {}) {
//   return dispatch => {
//     dispatch(loading);
//     return service.get_bySearch(pagination, searchTerms).then(
//       response => {
//         dispatch(loaded);
//         console.log("getbysearch", response)
//         dispatch(done(response, CONST.GETBYSEARCH_SUCCESS));
//       },
//       error => {
//         dispatch(loadedFailure);
//         dispatch(failure(error.toString()));
//       }
//     );
//   };
// }

// function get_byId(id) {
//   return dispatch => {
//     dispatch(loading);
//     return service.get_byId(id).then(
//       response => {
//         dispatch(loaded);
//         dispatch(done(response, CONST.GET_SUCCESS));
//       },
//       error => {
//         dispatch(loadedFailure);
//         dispatch(failure(error.toString()));
//       }
//     );
//   };
// }

// function post_create(item, callBack=()=>{}) {
//   console.log("action create:", item);
//   return dispatch => {
//     dispatch(loading);
//     return service.post_create(item).then(
//       response => {
//         dispatch(loaded);
//         dispatch(alertActions.success("保存成功"));
//         dispatch(done(response, CONST.CREATE_SUCCESS));

//         const id = (response.row && response.row.id) || null
//         callBack(id);
//       },
//       error => {
//         dispatch(loadedFailure);
//         dispatch(failure("保存失败"));
//         dispatch(done(error, CONST.CREATE_FAILURE));
//       }
//     );
//   };
// }

// function put_update(item, callBack=()=>{}) {
//   console.log("action update:", item);
//   return dispatch => {
//     dispatch(loading);
//     return service.put_update(item).then(
//       response => {
//         dispatch(loaded);
//         dispatch(alertActions.success("保存成功"));
//         dispatch(done(response, CONST.UPDATE_SUCCESS));
//         callBack(response);
//       },
//       error => {
//         dispatch(loadedFailure);
//         dispatch(failure("保存失败"));
//         dispatch(done(error, CONST.UPDATE_FAILURE));
//       }
//     );
//   };
// }

// function _delete(pagination, id) {
//   // pagination: 删除后刷新列表用
//   return dispatch => {
//     return service._delete(pagination, id).then(
//       response => {
//         dispatch(alertActions.success("删除成功"));
//         dispatch(done(response, CONST.DELETE_SUCCESS));
//       },
//       error => {
//         dispatch(alertActions.error("删除失败"));
//         dispatch(failure(error.toString()));
//       }
//     );
//   };
// }

//======================== customized

// function get_treeNotesById(parentId = 0) {
//   // 通过某个分类，取所有的子级孙级分类 （在产品里也需要）
//   return dispatch => {
//     dispatch({ type: LOADING.LOADING });
//     return service.get_treeNotesById(parentId).then(
//       response => {
//         dispatch({ type: LOADING.SUCCESS });
//         dispatch({ type: CONST.GETBYSEARCH_SUCCESS, payload: response });
//       },
//       error => {
//         dispatch({ type: LOADING.FAILURE });
//         dispatch(alertActions.error(error.toString()));
//       }
//     );
//   };
// }

export const categoryActions = {
  get_dropdown,
  get_bySearch,
  get_byId,
  post_create,
  put_update,
  _delete_treeNode,
  _clear,

  // customized
  get_treeNotesById
};
