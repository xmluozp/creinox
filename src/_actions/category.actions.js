import { CATEGORY as CONST, LOADING } from "../_constants";
import { categoryService as service } from "../_services";
import { alertActions } from "./";
import { history } from "../_helper";

// const url = '/api/auth';
// import axios from 'axios'

export const categoryActions = {
  get_dropdown,
  get_bySearch,
  get_byId,
  post_create,
  put_update,
  _delete,
  // customized
  get_byCategory
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
        console.log("getbysearch", response)
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

function post_create(item, page) {
  console.log("action create:", item);
  return dispatch => {
    dispatch(loading);
    return service.post_create(item).then(
      response => {
        dispatch(loaded);
        dispatch(alertActions.success("保存成功"));
        dispatch(done(response, CONST.CREATE_SUCCESS));

        if (page) history.push(page);
      },
      error => {
        dispatch(loadedFailure);
        dispatch(failure("保存失败"));
        dispatch(done(error, CONST.CREATE_FAILURE));
      }
    );
  };
}

function put_update(item, page) {
  console.log("action update:", item);
  return dispatch => {
    dispatch(loading);
    return service.put_update(item).then(
      response => {
        dispatch(loaded);
        dispatch(alertActions.success("保存成功"));
        dispatch(done(response, CONST.UPDATE_SUCCESS));
        if (page) history.push(page);
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

function get_byCategory(categoryId = 0) {
  return dispatch => {
    dispatch(loading);
    return service.get_byCategory(categoryId).then(
      response => {
        dispatch(loaded);
        console.log("getbyCategory", response)
        dispatch(done(response, CONST.GETBYSEARCH_SUCCESS));
      },
      error => {
        dispatch(loadedFailure);
        dispatch(failure(error.toString()));
      }
    );
  };
}