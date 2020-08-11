import { orderformService as service } from "_services";
import { _am, failure, loading, loaded, loadedFailure } from "./_actionsMaker";

function get_disposable_dropdown(keyword, preConditions) {
  return (dispatch) => {
    dispatch(loading);
    preConditions.keyword = keyword;
    return service.get_disposable_dropdown(preConditions).then(
      (response) => {
          console.log("返回",response)
        dispatch(loaded);
        return response;
      },
      (error) => {
        dispatch(loadedFailure);
        dispatch(failure(error.toString()));
      }
    );
  };
}

// function get_byId() {
//   return (dispatch) => {
//     dispatch(loading);
//     return service.get_last().then(

//       (response) => {
//         dispatch(loaded);
//         let returnValue = "";
//         if (response && response.row) {
//           // 修改它的值
//           returnValue = h_code_plus_one(response.row.invoiceCode);
//         }
//         return returnValue;
//       },
//       (error) => {
//         dispatch(loadedFailure);
//         const errorInfo = error && error.info ? error.info : "";
//         dispatch(failure(errorInfo.toString()));
//       }
//     );
//   };
// }

export const orderformActions = {
  get_disposable_dropdown,
  // get_byId,
};
