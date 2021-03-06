import { COMMODITY as CONST } from "_constants";
import { commodityService as service } from "_services";
import {
  _am,
  done,
  failure,
  success,
  loading,
  loaded,
  loadedFailure
} from "./_actionsMaker";


const {
  get_dropdown,
  get_bySearch,
  // get_byId,
  post_create,
  put_update,
  _delete,
  _clear
} = _am(CONST, service);

// FETCH  ---------------------------------------------
function get_byId(commodity_id = 0, product_id = 0, isMeta = false) {
  return dispatch => {
    dispatch(loading);
    dispatch(done({}, CONST.GET));
    return service.get_byId(commodity_id, product_id, isMeta).then(
      response => {
        dispatch(loaded);
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

//======================== customized
function get_disposable_byId(id) {
  return dispatch => {
    dispatch(loading);
    return service.get_byId(id).then(
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

function get_disposable_dropdown(keyword, preConditions) {
  return dispatch => {
    dispatch(loading);
    preConditions.keyword = keyword
    return service.get_dropdown({}, preConditions).then(
      response => {
        dispatch(loaded);
        let returnValue = [];
        if (response && response.rows) {
          returnValue = response.rows.map(item => {
            item.name = `[${item.code}] ${item.ename}`;
            return item;
          });
        }
        return { rows: returnValue };
      },
      error => {
        dispatch(loadedFailure);
        const errorInfo =error && error.info ? error.info : ""
        dispatch(failure(errorInfo.toString()));
      }
    );
  };
}

function get_bySearch_getProduct(pagination, searchTerms = {}) {
  return dispatch => {
    dispatch(loading);
    return service.get_bySearch_getProduct(pagination, searchTerms).then(
      response => {
        dispatch(loaded);
        dispatch(done(response, CONST.GETBYSEARCH_GETPRODUCT_SUCCESS));
      },
      error => {
        dispatch(loadedFailure);
        const errorInfo =error && error.info ? error.info : ""
        dispatch(failure(errorInfo.toString()));
      }
    );
  };
}

function get_bySearch_getCommodity(pagination, searchTerms = {}) {
  return dispatch => {
    dispatch(loading);
    return service.get_bySearch_getCommodity(pagination, searchTerms).then(
      response => {
        dispatch(loaded);
        dispatch(done(response, CONST.GETBYSEARCH_GETCOMMODITY_SUCCESS));
      },
      error => {
        dispatch(loadedFailure);
        const errorInfo =error && error.info ? error.info : ""
        dispatch(failure(errorInfo.toString()));
      }
    );
  };
}

function post_create_assemble(item, callBack = () => {}) {
  console.log("action assemble:", item);
  return dispatch => {
    dispatch(loading);
    return service.post_create_assemble(item).then(
      response => {
        dispatch(loaded);

        const info = response && response.info ? response.info : ""
        dispatch(success("添加成功" + info.toString()));

        callBack();
      },
      error => {
        dispatch(loadedFailure);
        const errorInfo =error && error.info ? error.info : ""
        dispatch(failure("添加失败." + errorInfo.toString()));
      }
    );
  };
}

function _delete_disassemble(pagination, item) {
  console.log("disassemble:", item);
  return dispatch => {
    return service._delete_disassemble(item.commodity_id, item.product_id).then(
      response => {
        dispatch(success("解除成功"));
      },
      error => {
        const errorInfo =error && error.info ? error.info : ""
        dispatch(failure("解除失败." + errorInfo.toString()));
      }
    ).then(() => p_getbysearch_getproduct(dispatch, pagination, {commodity_id: item.commodity_id}));;;
  };
}

function p_getbysearch_getproduct(dispatch, pagination, searchTerms) {
  dispatch(loading);
  return service.get_bySearch_getProduct(pagination, searchTerms).then(
    response => {
      console.log("search again?")
      dispatch(loaded);
      dispatch(done(response, CONST.GETBYSEARCH_GETPRODUCT_SUCCESS));
    },
    error => {
      dispatch(loadedFailure);
      const errorInfo =error && error.info ? error.info : ""
      dispatch(failure(errorInfo.toString()));
    }
  );
}


export const commodityActions = {
  get_dropdown,
  get_bySearch,
  get_byId,
  post_create,
  put_update,
  _delete,
  _clear,

  // customized
  get_disposable_dropdown,
  get_disposable_byId,
  get_bySearch_getProduct,
  get_bySearch_getCommodity,
  post_create_assemble,
  _delete_disassemble
};
