import { ALERT } from '../_constants';

export const alertActions = {
    success,
    error,
    notify,
    clear,
    info,
    dispatchClear,
    dispatchInfo,
};

function success(message) {
    return { type: ALERT.SUCCESS, message }
}

function error(message) {
    return { type: ALERT.ERROR, message }
}

function notify(message) {
    return  { type: ALERT.NOTIFY, message }
}
function info(message) {
    return{ type: ALERT.INFO, message }
}

function clear() {
    return{ type: ALERT.CLEAR }
}

function dispatchClear() {
    return (dispatch) => {
        dispatch({ type: ALERT.CLEAR })
    }    
}

function dispatchInfo(message) {
    return (dispatch) => {
        dispatch({ type: ALERT.INFO, message })
    }    
}