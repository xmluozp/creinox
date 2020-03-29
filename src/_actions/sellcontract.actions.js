import { SELLCONTRACT as CONST } from "../_constants";
import { sellcontractService as service } from "../_services";
import {
  _am,
  failure,
  loading,
  loaded,
  loadedFailure
} from "./_actionsMaker";

const {
  get_dropdown,
  get_bySearch,
  get_byId,
  post_create,
  put_update,
  _delete
} = _am(CONST, service);

function get_last() {
  return dispatch => {
    dispatch(loading);
    return service.get_last().then(
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
        const errorInfo =error && error.info ? error.info : ""
        dispatch(failure(errorInfo.toString()));
      }
    );
  };
}

export const sellcontractActions = {
  get_dropdown,
  get_bySearch,
  get_byId,
  post_create,
  put_update,
  _delete,

  get_last
};
