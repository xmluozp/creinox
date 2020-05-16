import { PRODUCT as CONST } from "../_constants";
import { productService as service } from "../_services";
import { alertActions } from "./";
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
  get_byId,
  post_create,
  put_update,
  _delete,
  _clear
} = _am(CONST, service);

//======================== customized
// includemeta是用来过滤掉已经和商品一一绑定的产品, 但会影响到显示（下拉菜单已选中项肯定是meta）。
// 解决方案：所有都显示，多一列isMeta表示是否已是商品。已是商品绑定的时候会失败
function get_disposable_dropdown(keyword, preConditions, isIncludeMeta = true) {
  return dispatch => {
    dispatch(loading);
    return service
      .get_dropdown({}, { ...preConditions, view_code_name: keyword }, isIncludeMeta)
      .then(
        response => {
          dispatch(loaded);
          let returnValue = [];
          console.log("dropdown test", response)
          if (response && response.rows) {
            returnValue = response.rows.map(item => {
              item.name = `[${item.code}] ${item.name}`;
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

function get_disposable_dropdown_fromSellcontract(keyword, preConditions) {
  return dispatch => {
    dispatch(loading);
    return service
      .get_dropdown_fromSellcontract({}, { ...preConditions, view_code_name: keyword })
      .then(
        response => {
          dispatch(loaded);
          let returnValue = [];
          console.log("dropdown test", response)
          if (response && response.rows) {
            returnValue = response.rows.map(item => {
              item.name = `[${item.code}] ${item.name}`;
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

function get_dropdown_fromSellsubitem(preConditions) {
  return dispatch => {
    dispatch(loading);
    return service
      .get_dropdown_fromSellsubitem(preConditions)
      .then(
        response => {
          dispatch(loaded);
          let returnValue = [];
          console.log("dropdown test", response)
          if (response && response.rows) {
            returnValue = response.rows.map(item => {
              item.name = `[${item.code}] ${item.name}`;
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



function get_disposable_dropdown_excludeMeta(keyword, preConditions) {
  return get_disposable_dropdown(keyword, preConditions, false);
}

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

function get_bySearch_component(pagination, searchTerms = {}) {
  return dispatch => {
    dispatch(loading);
    return service.get_bySearch_component(pagination, searchTerms).then(
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

function post_create_assemble(item, callBack = () => {}) {
  console.log("action assemble:", item);
  return dispatch => {
    dispatch(loading);
    return service.post_create_assemble(item).then(
      response => {
        dispatch(loaded);
        dispatch(success("添加成功"));

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

function _delete_disassemble(item = {parent_id : 0, child_id : 0}, pagination) {
  console.log("disassemble:", item);
  return dispatch => {
    return service._delete_disassemble(item, pagination).then(
      response => {
        dispatch(success("解除成功"));
      },
      error => {
        dispatch(alertActions.error("解除失败"));
      }
    ).then(() => p_getbysearch(dispatch, pagination,{parent_id: item.parent_id, child_id: item.child_id}));;
  };
}

function p_getbysearch(dispatch, pagination, searchTerms) {
  dispatch(loading);
  return service.get_bySearch_component(pagination, searchTerms).then(
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
}

export const productActions = {
  get_dropdown,
  get_bySearch,
  get_byId,
  post_create,
  put_update,
  _delete,
  _clear,

  // customized
  get_dropdown_fromSellsubitem,
  get_disposable_dropdown,
  get_disposable_dropdown_excludeMeta,
  get_disposable_dropdown_fromSellcontract,
  get_disposable_byId,
  get_bySearch_component,
  post_create_assemble,
  _delete_disassemble
};