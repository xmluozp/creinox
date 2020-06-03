import { PRINT as CONST} from '../_constants'

export default (state = {}, action) => {
    switch (action.type) {
        case CONST.GET:
            return { ...state, data: null}
        case CONST.GET_SUCCESS:
            return { ...state, data: action.payload }
        default:
            return state;
    }
}