import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';  // async
import rootReducer from '../_reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;