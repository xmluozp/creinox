import { AUTH, USER as CONST } from "../_constants";
import { userService as service } from "../_services";
import { history } from "../_helper";
import { _am, done, failure } from "./_actionsMaker";

const {
  get_dropdown,
  get_bySearch,
  get_byId,
  post_create,
  put_update,
  _delete
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
        dispatch(dispatch({ type: AUTH.LOGIN_FAILURE, message: error }));
        dispatch(failure("登录失败"));
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
