import { AUTH, USER as CONST, LOADING } from '../_constants'
import { userService as service } from '../_services'
import { alertActions } from './';
import { history } from '../_helper';

// const url = '/api/auth';
// import axios from 'axios'

export const userActions = {
    login,
    logout,
    get_all,
    get_bySearch,
    get_byId,
    post_create,
    put_update,
    _delete
}


// LOGIN ---------------------------------------------

function login(userName, password) {

    return (dispatch) => {

        // 登录中
        dispatch(request({ userName }));
        return service.login(userName, password).then(
            response => {
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
    service.logout();
    return { type: AUTH.LOGOUT };
}

// FETCH  ---------------------------------------------
function get_all(pagination) { // pagination: page, perPage, orderBy, searchTerms:object
    
    return (dispatch) => {  
        dispatch(alertActions.info("测试：读取数据"));
        dispatch({ type: LOADING.LOADING });
        return service.get_all(pagination).then(
            response => {
                dispatch({ type: LOADING.SUCCESS });
                dispatch(success(response));
            },
            error => {
                dispatch({ type: LOADING.FAILURE });
                dispatch(failure(error.toString()));
            }
        )
    }

    function success(payload) { return { type: CONST.GETALL_SUCCESS, payload } }
    function failure(payload) { return alertActions.error(payload) }
}

function get_bySearch(pagination, searchTerms = {}) { // pagination: page, perPage, orderBy, searchTerms:object
    return (dispatch) => {
        // 登录中

        console.log("action,", pagination, searchTerms)
        dispatch({ type: LOADING.LOADING });
        return service.get_bySearch(pagination, searchTerms).then(
            response => {
                dispatch({ type: LOADING.SUCCESS });
                dispatch(success(response));
            },
            error => {
                dispatch({ type: LOADING.FAILURE });
                dispatch(failure(error.toString()));
            }
        )
    }

    function success(payload) { return { type: CONST.GETALL_SUCCESS, payload } }
    function failure(payload) { return alertActions.error(payload) }
}

function get_byId(id) { //
    return (dispatch) => {

        console.log("action getbyid")

        dispatch({ type: LOADING.LOADING });
        return service.get_byId(id).then(
            response => {
                dispatch({ type: LOADING.SUCCESS });
                dispatch(success(response));
            },
            error => {
                console.log(error);
                dispatch({ type: LOADING.FAILURE });
                dispatch(failure(error.toString()));
            }
        )
    }

    function success(payload) { return { type: CONST.GET_SUCCESS, payload } }
    function failure(payload) { return alertActions.error(payload) }
}

function post_create(item) {
    console.log("actio create:", item);
    return (dispatch) => {dispatch(alertActions.success("测试：新建成功"));}
}

function put_update(item) {
    console.log("actio update:", item);
    return (dispatch) => {dispatch(alertActions.success("测试：保存成功"));}
}


function _delete(pagination, id) { // pagination: 删除后刷新列表用
    return (dispatch) => {

        dispatch({ type: LOADING.LOADING });
        return service._delete(pagination, id).then(
            response => {
                dispatch({ type: LOADING.SUCCESS });
                dispatch({ type: CONST.DELETE_SUCCESS, payload: response });
            },
            error => {
                dispatch({ type: LOADING.FAILURE });
                dispatch({ type: CONST.DELETE_FAILURE, payload: error });
            }
        )
    }
}