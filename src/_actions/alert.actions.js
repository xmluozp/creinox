import { ALERT } from '../_constants';

export const alertActions = {
    success,
    error,
    clear
};

function success(message) {
    return { type: ALERT.SUCCESS, message };
}

function error(message) {
    return { type: ALERT.ERROR, message };
}

function clear() {
    return { type: ALERT.CLEAR };
}