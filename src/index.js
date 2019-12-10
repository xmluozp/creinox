// import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/ie11'; // For IE 11 support
import 'react-app-polyfill/stable';
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//=========================================================REDUX
// import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';  // passes store down
// import thunk from 'redux-thunk';  // async
// import rootReducer from './_reducers';

// const store = createStore(rootReducer, applyMiddleware(thunk));
import store from './_helper/store';

//=========================================================REDUX

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
