import { AUTH, USER as CONST, LOADING } from "../_constants";
import { userService as service } from "../_services";
import { alertActions } from "./";
import { history } from "../_helper";

// const url = '/api/auth';
// import axios from 'axios'

export const userActions = {
  login,
  logout,
  get_dropdown,
  get_bySearch,
  get_byId,
  post_create,
  put_update,
  _delete
};


const done = (payload, type) => { return { type: type, payload };}
const failure = (payload) => { return alertActions.error(payload); }
const loading = { type: LOADING.LOADING }
const loaded = { type: LOADING.SUCCESS }
const loadedFailure = { type: LOADING.FAILURE }


// LOGIN ---------------------------------------------

function login(userName, password) {
  return dispatch => {
    // 登录中
    dispatch(done({ userName }, AUTH.LOGIN));
    return service.login(userName, password).then(
      response => {
        dispatch(done(response, AUTH.LOGIN_SUCCESS));
        history.push("/");
      },
      error => {
        dispatch(failure(error, AUTH.LOGIN_FAILURE));
        dispatch(alertActions.error("登录失败"));
      }
    );

    // 模拟发送
    // return axios.post(url, data).then(response => {  }).catch(error => {})

    // 假装成功, 更新前端数据. 包括一个token；失败返回信息
    //  const data = response.data;

    // {
    //     "access_token":"2YotnFZFEjr1zCsicMWpAA",
    //     "token_type":"example",
    //     "expires_in":3600,
    //     "refresh_token":"tGzv3JOkF0XG5Qx2TlKWIA",
    //     "example_parameter":"example_value"
    // }

    // 登录完成，服务端返回，照这个格式：
  };
}

// LOGOUT ---------------------------------------------
function logout() {
  service.logout();
  return { type: AUTH.LOGOUT };
}

// FETCH  ---------------------------------------------
function get_dropdown(pagination) { // 用来给下拉列表提供值
  // pagination: page, perPage, orderBy, searchTerms:object

  return dispatch => {

    dispatch(loading);
    return service.get_dropdown(pagination).then(
      response => {
        dispatch(loaded);
        dispatch(done(response, CONST.GETDROPDOWN_SUCCESS));
        // return response;
      },
      error => {
        dispatch(loadedFailure);
        dispatch(failure(error.toString()));
      }
    );
  };
}

function get_bySearch(pagination, searchTerms = {}) {
  // pagination: page, perPage, orderBy, searchTerms:object
  return dispatch => {
    // 登录中

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
  //
  return dispatch => {
    console.log("action getbyid");

    dispatch(loading);
    return service.get_byId(id).then(
      response => {
        dispatch(loaded);
        dispatch(done(response, CONST.GET_SUCCESS));
      },
      error => {
        console.log(error);
        dispatch(loadedFailure);
        dispatch(failure(error.toString()));
      }
    );
  };
}

function post_create(item, callBack=()=>{}) {
  console.log("action create:", item);
  return dispatch => {
    dispatch(loading);
    return service.post_create(item).then(
      response => {
        dispatch(loaded);
        dispatch(alertActions.success("保存成功"));
        dispatch(done(response, CONST.CREATE_SUCCESS));

        const id = "1"
        // const id = (response.row && response.row.id) || null
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

function put_update(item, callBack=()=>{}) {
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
        dispatch(failure(error.toString()));
      }
    );
  };
}