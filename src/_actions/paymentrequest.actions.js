import { PAYMENTREQUEST as CONST } from "_constants";
import { paymentrequestService as service } from "_services";
import {
  _am,
  failure,
  success,
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

function put_approve(item, callBack = () => {}) {
  return dispatch => {
    dispatch(loading);
    return service.put_approve(item).then(
      response => {
        dispatch(loaded);
        dispatch(success("审批通过成功"));
        callBack();
      },
      error => {
        dispatch(loadedFailure);
        const errorInfo =error && error.info ? error.info : ""
        dispatch(failure("审批通过出错." + errorInfo.toString()));
      }
    );
  };
}

function put_reject(item, callBack = () => {}) {
  return dispatch => {
    dispatch(loading);
    return service.put_reject(item).then(
      response => {
        dispatch(loaded);
        dispatch(success("审批拒绝成功"));
        callBack();
      },
      error => {
        dispatch(loadedFailure);
        const errorInfo =error && error.info ? error.info : ""
        dispatch(failure("审批拒绝出错." + errorInfo.toString()));
      }
    );
  };
}





export const paymentrequestActions = {
  get_bySearch,
  get_byId,
  post_create,
  put_update,
  _delete,
  _clear,

  put_approve,
  put_reject
};
