import { COMPANY as CONST, enums } from "../_constants";
import { companyService as service } from "../_services";
import {
  _am,
  // done,
  failure,
  // success,
  loading,
  loaded,
  loadedFailure
} from "./_actionsMaker";


const {
  // get_dropdown,
  get_bySearch,
  get_byId,
  post_create,
  put_update,
  _delete,
  _clear
} = _am(CONST, service);

// FETCH  ---------------------------------------------
function get_dropdown({ companyType = 0 }) {
  return dispatch => {
    dispatch(loading);
    return service.get_dropdown(companyType).then(
      response => {
        const payload = {};
        dispatch(loaded);
        switch (companyType) {
          case enums.companyType.internal:
            payload.dropdown_internal = response;
            break;
          case enums.companyType.factory:
            payload.dropdown_factory = response;
            break;
          case enums.companyType.domesticCustomer:
            payload.dropdown_domesticCustomer = response;
            break;
          case enums.companyType.overseasCustomer:
            payload.dropdown_overseasCustomer = response;
            break;
          case enums.companyType.shippingCompany:
            payload.dropdown_shippingCompany = response;
            break;
          default:
            break;
        }

        dispatch({ type: CONST.GETDROPDOWN_SUCCESS, payload });
        return response;
      },
      error => {
        dispatch(loadedFailure);
        dispatch(failure(error.toString()));
      }
    );
  };
}

// function get_bySearch(pagination, searchTerms = {}) {
//   return dispatch => {
//     dispatch(loading);
//     return service.get_bySearch(pagination, searchTerms).then(
//       response => {
//         dispatch(loaded);
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

// function post_create(item, callBack = () => {}) {
//   console.log("action create:", item);
//   return dispatch => {
//     dispatch(loading);
//     return service.post_create(item).then(
//       response => {
//         dispatch(loaded);
//         dispatch(alertActions.success("保存成功"));
//         dispatch(done(response, CONST.CREATE_SUCCESS));
//         // const id = (response.row && response.row.id) || null
//         const id = "1";
//         callBack(id);
//         // if (page) history.push(page + "/" + id);
//       },
//       error => {
//         dispatch(loadedFailure);
//         dispatch(failure("保存失败"));
//         dispatch(done(error, CONST.CREATE_FAILURE));
//       }
//     );
//   };
// }

// function put_update(item, callBack = () => {}) {
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

function get_disposable_dropdown(keyword, preConditions) {
  return dispatch => {
    dispatch(loading);

    // console.log("preConditions ???", preConditions, keyword)

    if(keyword) {preConditions.name = keyword}
    return service.get_disposable_dropdown(preConditions)
      .then(
        response => {
          dispatch(loaded);
          return response
        },
        error => {
          dispatch(loadedFailure);
          dispatch(failure(error.toString()));
        }
      );
  };
}


export const companyActions = {
  get_dropdown,
  get_bySearch,
  get_byId,
  post_create,
  put_update,
  _delete,
  _clear,

  get_disposable_dropdown
};