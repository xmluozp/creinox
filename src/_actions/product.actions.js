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
} = _am(CONST, service);

//======================== customized

function get_disposable_dropdown(keyword, preConditions, isIncludeMeta = true) {
  return dispatch => {
    dispatch(loading);
    return service
      .get_dropdown({}, { ...preConditions, code: keyword }, isIncludeMeta)
      .then(
        response => {
          dispatch(loaded);
          let returnValue = [];
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
          dispatch(failure(error.toString()));
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
        dispatch(failure(error.toString()));
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
        dispatch(failure(error.toString()));
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
        dispatch(failure("添加失败" + error.toString()));
      }
    );
  };
}

function _delete_disassemble(pagination, item = {parent_id : 0, child_id : 0}) {
  console.log("disassemble:", item);
  return dispatch => {
    return service._delete_disassemble(pagination, item).then(
      response => {
        dispatch(success("解除成功"));
      },
      error => {
        dispatch(alertActions.error("解除失败"));
      }
    );
  };
}


export const productActions = {
  get_dropdown,
  get_bySearch,
  get_byId,
  post_create,
  put_update,
  _delete,

  // customized
  get_disposable_dropdown,
  get_disposable_dropdown_excludeMeta,
  get_disposable_byId,
  get_bySearch_component,
  post_create_assemble,
  _delete_disassemble
};