import {LOADING} from '../_constants'

const loading = (state = {}, action) => {
    switch (action.type) {
        case LOADING.LOADING:
            return {loading: 'loading'}
    
        default:
            break;
    }


}

export default loading;