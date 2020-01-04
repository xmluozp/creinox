import { COMMONITEM as CONST, enums } from "../_constants";
import { commonitemService as service } from "../_services";
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
  _delete
} = _am(CONST, service);


// FETCH  ---------------------------------------------
function get_dropdown({commonType = 0}) {

  return dispatch => {
    dispatch(loading);
    return service.get_dropdown(commonType).then(
      response => {
        const payload = {};
        dispatch(loaded);
        switch (commonType) {
          case enums.commonType.currency:
            payload.dropdown_currency = response;
            break;
          case enums.commonType.pack:
            payload.dropdown_pack = response;
            break;
          case enums.commonType.polishing:
            payload.dropdown_polishing = response;
            break;
          case enums.commonType.pricingTerm:
            payload.dropdown_pricingTerm = response;
            break;
          case enums.commonType.shippingType:
            payload.dropdown_shippingType = response;
            break;
          case enums.commonType.texture:
            payload.dropdown_texture = response;
            break;
          case enums.commonType.unitType:
            payload.dropdown_unitType = response;
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
        return []
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


// a table to store all common selections
export const commonitemActions = {
  get_dropdown,
  get_bySearch,
  get_byId,
  post_create,
  put_update,
  _delete
};