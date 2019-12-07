import { LOADING } from '../_constants'

const loading = (state = {}, action) => {
    switch (action.type) {
        case LOADING.LOADING:
            return { ...state, status: 'loading' }
        case LOADING.SUCCESS:
            return { ...state, status: 'success' }
        case LOADING.FAILURE:
            return { ...state, status: 'failure' }
        case LOADING.CLEAR:
            return { ...state, status: 'clear' }

        default:
            return state;
    }


}

export default loading;