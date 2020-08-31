import { COMPANY as CONST, enums } from "_constants";
import { companyService as service } from "_services";
import {
  _am,
  // done,
  failure,
  // success,
  loading,
  loaded,
  loadedFailure
} from "./_actionsMaker";


const {
  get_bySearch,
  get_byId,
  post_create,
  put_update,
  _delete,
  _clear
} = _am(CONST, service);

// FETCH  ---------------------------------------------

//======================== customized

function get_disposable_dropdown(keyword, preConditions) {
  return dispatch => {
    dispatch(loading);
    // 20200603: 不判断keyword是否为空因为有时候需要搜索空字符串
    preConditions.keyword = keyword
    return service.get_disposable_dropdown(preConditions)
      .then(
        response => {
          dispatch(loaded);
          console.log("company get_disposable_dropdown", response)
          return response
        },
        error => {
          dispatch(loadedFailure);
          dispatch(failure(error.toString()));
        }
      );
  };
}

// 前台用方法，一次性方法不存store。获取当前code最大的公司。获取不到不报错直接忽略
function get_code(companyType, keyWord) {
  return dispatch => {
    return service.get_code(companyType, keyWord)
      .then(
        response => {
          return response
        },
        error => {
        }
      );
  };
}


export const companyActions = {
  get_bySearch,
  get_byId,
  post_create,
  put_update,
  _delete,
  _clear,

  get_disposable_dropdown,
  get_code
};