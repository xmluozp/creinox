import { PRODUCTPURCHASE as CONST } from "../_constants";
import { productpurchaseService as service } from "../_services"
import {
  _am,
  done,
  failure,
  // success,
  loading,
  loaded,
  loadedFailure
} from "./_actionsMaker";

const {
  get_dropdown,
  get_bySearch,
  get_byId,
  post_create,
  put_update,
  _delete
} = _am(CONST, service);

// FETCH  ---------------------------------------------


//======================== customized
function get_bySearch_groupByCompany(pagination, searchTerms = {}) {
  return dispatch => {
    dispatch(loading);
    return service.get_bySearch_groupByCompany(pagination, searchTerms).then(
      response => {
        dispatch(loaded);
        dispatch(done(response, CONST.GETBYSEARCH_SUCCESS));
      },
      error => {
        dispatch(loadedFailure);
        const errorInfo =error && error.info ? error.info : ""
        dispatch(failure(errorInfo.toString()));
      }
    );
  };
}

function get_bySearch_history(pagination, searchTerms = {}) {
  return dispatch => {
    dispatch(loading);
    return service.get_bySearch_history(pagination, searchTerms).then(
      response => {
        dispatch(loaded);
        dispatch(done(response, CONST.GETBYSEARCH_SUCCESS));
      },
      error => {
        dispatch(loadedFailure);
        const errorInfo =error && error.info ? error.info : ""
        dispatch(failure(errorInfo.toString()));
      }
    );
  };
}

// 取根据product id最新的一条。用途：合同录入的时候，选择商品，快捷注入信息
function get_disposable_byProductId(product_id) {
  return dispatch => {
    dispatch(loading);
    return service.get_disposable_byProductId(product_id).then(
      response => {
        dispatch(loaded);
        let returnValue = {};
        if (response && response.row) {
          returnValue = response.row;
        }
        return returnValue;
      },
      error => {
        dispatch(loadedFailure);
        const errorInfo =error && error.info ? error.info : ""
        dispatch(failure(errorInfo.toString()));
      }
    );
  };
}


export const productpurchaseActions = {
  get_dropdown,
  get_bySearch,
  get_byId,
  post_create,
  put_update,
  _delete,

  // customized
  get_bySearch_groupByCompany,
  get_bySearch_history,
  get_disposable_byProductId
};