import { ROLE as CONST } from "../_constants";
import { roleService as service } from "../_services";
import {
  _am,
//   done,
//   failure,
  // success,
//   loading,
//   loaded,
//   loadedFailure
} from "./_actionsMaker";

const {
  get_dropdown,
  get_bySearch,
  get_byId,
  post_create,
  put_update,
  _delete,
  _clear
} = _am(CONST, service);

// FETCH  ---------------------------------------------
// function get_dropdown(pagination) {
//   // pagination: page, perPage, orderBy, searchTerms:object
//   return dispatch => {
//     dispatch({ type: LOADING.LOADING });
//     return service.get_all(pagination).then(
//       response => {
//         dispatch({ type: LOADING.SUCCESS });
//         dispatch(success(response));
//         return response;
//       },
//       error => {
//         dispatch({ type: LOADING.FAILURE });
//         dispatch(failure(error));
//       }
//     );
//   };

//   function success(payload) {
//     return { type: CONST.GETDROPDOWN_SUCCESS, payload };
//   }
//   function failure(payload) {
//     return alertActions.error(payload);
//   }
// }

// function get_bySearch(pagination, searchTerms = {}) {
//   // pagination: page, perPage, orderBy, searchTerms:object
//   return dispatch => {
//     dispatch({ type: LOADING.LOADING });
//     return service.get_bySearch(pagination, searchTerms).then(
//       response => {
//         dispatch({ type: LOADING.SUCCESS });
//         dispatch(success(response));
//       },
//       error => {
//         dispatch({ type: LOADING.FAILURE });
//         dispatch(failure(error));
//       }
//     );
//   };

//   function success(payload) {
//     return { type: CONST.GETBYSEARCH_SUCCESS, payload };
//   }
//   function failure(payload) {
//     return alertActions.error(payload);
//   }
// }

// function _delete(pagination, id) {
//   // pagination 刷新用
//   return dispatch => {
//     dispatch({ type: LOADING.LOADING });
//     service._delete(pagination, id).then(
//       response => {
//         dispatch({ type: LOADING.SUCCESS });
//         dispatch({ type: CONST.DELETE_SUCCESS, payload: response });
//       },
//       error => {
//         dispatch({ type: LOADING.FAILURE });
//         dispatch({ type: CONST.DELETE_FAILURE, payload: error });
//       }
//     );
//   };
// }

export const roleActions = {
  get_dropdown,
  get_bySearch,
  get_byId,
  post_create,
  put_update,
  _delete,
  _clear
};
