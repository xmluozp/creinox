import { ROLE as CONST, LOADING } from '../_constants'
import { roleService as service } from '../_services'
// import { alertActions } from './';


export const roleActions = {
    get_all,
    get_bySearch,
    _delete
}

// FETCH  ---------------------------------------------
function get_all(pagination) { // pagination: page, perPage, orderBy, searchTerms:object
    return (dispatch) => {
        dispatch({ type: LOADING.LOADING });
        return service.get_all(pagination).then(
            response => {
                dispatch({ type: LOADING.SUCCESS });
                dispatch(success(response));
                return response;
            },
            error => {
                dispatch({ type: LOADING.FAILURE });
                dispatch(failure(error));
            }
        )
    }

    function success(payload) { return { type: CONST.GETALL_SUCCESS, payload } }
    function failure(payload) { return { type: CONST.GETALL_FAILURE, payload } }
}



function get_bySearch(pagination, searchTerms = {}) { // pagination: page, perPage, orderBy, searchTerms:object
    return (dispatch) => {
        dispatch({ type: LOADING.LOADING });
        return service.get_bySearch(pagination, searchTerms).then(
            response => {
                dispatch({ type: LOADING.SUCCESS });
                dispatch(success(response));
            },
            error => {
                dispatch({ type: LOADING.FAILURE });
                dispatch(failure(error));
            }
        )
    }

    function success(payload) { return { type: CONST.GETALL_SUCCESS, payload } }
    function failure(payload) { return { type: CONST.GETALL_FAILURE, payload } }
}

function _delete(pagination, id) { // pagination 刷新用
    return (dispatch) => {

        dispatch({ type: LOADING.LOADING });
        service._delete(pagination, id).then(
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