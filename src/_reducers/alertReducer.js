import { ALERT as CONST } from '_constants'

export default (state = { status: 'clear', toggle: false }, action) => {
    switch (action.type) {
        case CONST.SUCCESS:
            return { ...state, status: 'success', message: action.message, toggle: !state.toggle }
        case CONST.ERROR:
            return { ...state, status: 'error', message: action.message, toggle: !state.toggle }
        case CONST.NOTIFY:
            return { ...state, status: 'notify', message: action.message, toggle: !state.toggle }
        case CONST.INFO:
            return { ...state, status: 'info', message: action.message, toggle: !state.toggle }
        case CONST.CLEAR:
            return { ...state, status: 'clear', message: action.message, toggle: !state.toggle }

        default:
            return state;
    }
}
