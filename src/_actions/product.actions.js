import { PRODUCT as CONST, LOADING } from "../_constants";
import { productService as service } from "../_services";
import { alertActions } from "./";
// import { history } from "../_helper";

// const url = '/api/auth';
// import axios from 'axios'

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

const done = (payload, type) => {
  return { type: type, payload };
};
const failure = payload => {
  return alertActions.error(payload);
};
const loading = { type: LOADING.LOADING };
const loaded = { type: LOADING.SUCCESS };
const loadedFailure = { type: LOADING.FAILURE };

// FETCH  ---------------------------------------------
function get_dropdown(pagination, searchTerms = {}) {
  return dispatch => {
    dispatch(loading);
    return service.get_dropdown(pagination, searchTerms).then(
      response => {
        dispatch(loaded);
        dispatch(done(response, CONST.GETDROPDOWN_SUCCESS));

        return response;
      },
      error => {
        dispatch(loadedFailure);
        dispatch(failure(error.toString()));
      }
    );
  };
}

function get_bySearch(pagination, searchTerms = {}) {
  return dispatch => {
    dispatch(loading);
    return service.get_bySearch(pagination, searchTerms).then(
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

function get_byId(id) {
  return dispatch => {
    dispatch(loading);
    return service.get_byId(id).then(
      response => {
        dispatch(loaded);
        dispatch(done(response, CONST.GET_SUCCESS));
      },
      error => {
        dispatch(loadedFailure);
        dispatch(failure(error.toString()));
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
        dispatch(alertActions.success("保存成功"));
        dispatch(done(response, CONST.CREATE_SUCCESS));

        const id = (response.row && response.row.id) || 0;
        callBack(id);
      },
      error => {
        dispatch(loadedFailure);
        dispatch(failure("保存失败"));
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
        dispatch(alertActions.success("保存成功"));
        dispatch(done(response, CONST.UPDATE_SUCCESS));
        callBack(response);
      },
      error => {
        dispatch(loadedFailure);
        dispatch(failure("保存失败"));
        dispatch(done(error, CONST.UPDATE_FAILURE));
      }
    );
  };
}

function _delete(pagination, id) {
  // pagination: 删除后刷新列表用
  return dispatch => {
    return service._delete(pagination, id).then(
      response => {
        dispatch(alertActions.success("删除成功"));
        dispatch(done(response, CONST.DELETE_SUCCESS));
      },
      error => {
        dispatch(alertActions.error("删除失败"));
        dispatch(failure(error.toString()));
      }
    );
  };
}

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
        dispatch(alertActions.success("添加成功"));

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
        dispatch(alertActions.success("解除成功"));
      },
      error => {
        dispatch(alertActions.error("解除失败"));
      }
    );
  };
}
