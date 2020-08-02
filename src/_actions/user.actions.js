import { AUTH, USER as CONST } from "_constants";
import { userService as service } from "_services";
import { history } from "_helper";
import { _am, done, failure, loading, loaded, loadedFailure } from "./_actionsMaker";

const {
  get_dropdown,
  get_bySearch,
  get_byId,
  post_create,
  put_update,
  _delete,
  _clear
} = _am(CONST, service);

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

        const errorInfo =error && error.info ? error.info : ""
        dispatch(dispatch({ type: AUTH.LOGIN_FAILURE, message: errorInfo }));
        dispatch(failure("登录失败. " + errorInfo));
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


function get_loginUserList() {
  return dispatch => {
    dispatch(loading);

    return service.get_loginUserList().then(
      response => {
        dispatch(loaded);
        // dispatch(done(response, CONST.GETDROPDOWN_SUCCESS));
 
        // console.log("dropdown test", response)
        let returnValue = []
        if (response && response.rows) {
          returnValue = response.rows.map(item => {
            item.name = `[${item.fullName}] ${item.userName}`;
            return item;
          });
        }
        return { rows: returnValue };


        // return response;
      },
      error => {
        dispatch(loadedFailure);

        const errorInfo =error && error.info ? error.info : ""
        dispatch(failure(errorInfo.toString()));
      }
    );
  };
}


// LOGOUT ---------------------------------------------
function logout() {
  service.logout();
  return { type: AUTH.LOGOUT };
}

// FETCH  ---------------------------------------------

export const userActions = {
  login,
  logout,
  get_dropdown,
  get_bySearch,
  get_byId,
  post_create,
  put_update,
  _delete,

  get_loginUserList,
  _clear
};
