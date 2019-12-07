import { AUTH, USER, LOADING } from '../_constants'
import { userService } from '../_services'
import { alertActions } from './';
import { history } from '../_helper';

// const url = '/api/auth';
// import axios from 'axios'

export const userActions = {
    login,
    logout,
    readAll,
    readSearch,
    _delete
}


// LOGIN ---------------------------------------------

function login (userName, password) {

    return (dispatch) => {

        // 登录中
        dispatch(request({ userName}));
        userService.login(userName, password).then(
            response=> {
                dispatch(success(response));
                history.push('/');
            },
            error => {
                dispatch(failure(error));
                dispatch(alertActions.error("登录失败"));
            }
        )

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
    }

    function request(payload) { return { type: AUTH.LOGIN, payload } }
    function success(payload) { return { type: AUTH.LOGIN_SUCCESS, payload } }
    function failure(payload) { return { type: AUTH.LOGIN_FAILURE, payload } }
}


// LOGOUT ---------------------------------------------
function logout() {
    userService.logout();
    return { type: AUTH.LOGOUT };
}

// FETCH  ---------------------------------------------
function readAll(pagination) { // pagination: page, perPage, orderBy, searchTerms:object
    return (dispatch) => {
        // 登录中
        console.log("读数据翻页", pagination)
        dispatch({ type: LOADING.LOADING });
        userService.readAll(pagination).then(
            response=> {
                dispatch({ type: LOADING.SUCCESS });
                dispatch(success(response));
            },
            error => {
                dispatch({ type: LOADING.FAILURE });
                dispatch(failure(error));
            }
        )
    }

    function success(payload) { return { type: USER.READALL_SUCCESS, payload } }
    function failure(payload) { return { type: USER.READALL_FAILURE, payload } }
}

function readSearch(pagination, searchTerms = {}) { // pagination: page, perPage, orderBy, searchTerms:object
    return (dispatch) => {
        // 登录中
        console.log("搜索翻页", pagination, "搜索条件", searchTerms)
        dispatch({ type: LOADING.LOADING });
        userService.readSearch(pagination).then(
            response=> {
                dispatch({ type: LOADING.SUCCESS });
                dispatch(success(response));
            },
            error => {
                dispatch({ type: LOADING.FAILURE });
                dispatch(failure(error));
            }
        )
    }

    function success(payload) { return { type: USER.READALL_SUCCESS, payload } }
    function failure(payload) { return { type: USER.READALL_FAILURE, payload } }
}

function _delete(pagination, id) { // pagination 刷新用
    return (dispatch) => {

        dispatch({ type: LOADING.LOADING });
        userService._delete(pagination, id). then(
            response=> {
                dispatch({ type: LOADING.SUCCESS });
                dispatch({ type:USER.DELETE_SUCCESS, payload: response});
            },
            error => {
                dispatch({ type: LOADING.FAILURE });
                dispatch({ type:USER.DELETE_FAILURE, payload: error});
            }
        )
    }
}