import { PRINT as CONST } from "../_constants";
import { printService as service } from "../_services";
import {
  _am,
  failure,
  loading,
  loaded,
  done,
  loadedFailure
} from "./_actionsMaker";


//======================== customized

function get(templateFolder) {
  return dispatch => {
    dispatch(loading);
    dispatch(done({}, CONST.GET));

    return service.get(templateFolder).then(
      response => {
        dispatch(loaded);
        dispatch(done(response, CONST.GET_SUCCESS));
      },
      error => {
        dispatch(loadedFailure);
        const errorInfo =error && error.info ? error.info : ""
        dispatch(failure(errorInfo.toString()));
      }
    );
  };
}

export const printActions = {
  get
};
