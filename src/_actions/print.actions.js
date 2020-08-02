import { PRINT as CONST } from "_constants";
import { printService as service } from "_services";
import {
  _am,
  failure,
  loading,
  loaded,
  done,
  loadedFailure,
} from "./_actionsMaker";

//======================== customized

function get(templateFolder) {
  return (dispatch) => {
    dispatch(loading);
    dispatch(done({}, CONST.GET));

    return service.get(templateFolder).then(
      (response) => {
        dispatch(loaded);
        dispatch(done(response, CONST.GET_SUCCESS));
      },
      (error) => {
        dispatch(loadedFailure);
        const errorInfo = error && error.info ? error.info : "";
        dispatch(failure(errorInfo.toString()));
      }
    );
  };
}

function get_pdf(origin_path) {
  return (dispatch) => {
    dispatch(loading);

    // 20200611: 这里先处理数据，then以后再dispatch错误，因为永远要在最后一步处理error
    return service
      .get_pdf(origin_path)
      .then(response => {
        dispatch(loaded);
        var fileBytes = response.blob();
        return fileBytes;
      })
      .then(
        response => {
          const newUrl = URL.createObjectURL(response);
          window.open(newUrl, "_blank");
        },
        error => {
          dispatch(loadedFailure);
          const errorInfo = error && error.info ? error.info : error;
          dispatch(failure(errorInfo.toString()));
        }
      );
  };
}

export const printActions = {
  get,
  get_pdf,
};
