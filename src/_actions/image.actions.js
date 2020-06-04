import { IMAGE as CONST } from "_constants";
import { imageService as service } from "_services";
import {
  _am, done, failure , success
} from "./_actionsMaker";

const {
  get_dropdown,
  get_bySearch,
  get_byId,
  // post_create,
  post_createMultiple,
  // _delete,
  _deleteMultiple,
  _clear
} = _am(CONST, service);

// 因为只删除图片，不提交刷新，所以这里特殊对待
function _deleteGallary(id) {
  return dispatch => {
    return service._deleteMultiple([id]).then(
      response => {
        const info = response && response.info ? response.info : ""
        dispatch(success("删除成功." + info.toString()));
        dispatch(done(response, CONST.DELETE_SUCCESS));
      },
      error => {
        const errorInfo =error && error.info ? error.info : ""
        dispatch(failure("删除失败. " + errorInfo.toString()));
      }
    );
  };
}

// FETCH  ---------------------------------------------


export const imageActions = {
  get_dropdown,
  get_bySearch,
  get_byId,
  // post_create,
  post_createMultiple,
  _deleteGallary,
  _deleteMultiple,
  _clear
};