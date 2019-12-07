import { authHeader, handleResponse } from '../_helper';
import axios from 'axios'

export const userService = {
    login,
    logout,
    readAll,
    readSearch,
    readById,
    create,
    update,
    _delete: _delete
};

const url = 'http://localhost:3000/api/';

function login(userName, password) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, password})
    };

    const response = {
        status: 200,
        message: '登录成功',
        payload: {                     
            id: 1,
            userName: 'test1',
            fullName: '老王',
            ip: '192.168.0.1',
            lastLogin: '',
            memo: '测试用户',
            token: 'tokenjwt123',
            role_id: 1
         }, // test    
    }

    localStorage.setItem('user', JSON.stringify(response.payload));

    return new Promise((resolve, reject)=>{
        resolve(response);
    }) ;

    // return fetch(`${url}/authenticate`, requestOptions)
    //     .then(handleResponse)
    //     .then(response => {
    //         // store user details and jwt token in local storage to keep user logged in between page refreshes
    //         localStorage.setItem('user', JSON.stringify(response.data));

    //         return response;
    //     });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function readAll(pagination = "") {

    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };

    const url = './dataset/userdata_p1.json'
    // pagination也可以在这里拆开了放进uri

    return fetch(`${url}?${pagination}`, requestOptions).then(handleResponse);
    // return fetch('http://localhost:3000/', requestOptions).then(handleResponse);
}

function readSearch(pagination = "", searchTerms = {}) {

    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: searchTerms
    };

    const url = './dataset/userdata_p1.json'

    // pagination也可以在这里拆开了放进uri
    return fetch(`${url}?${pagination}`, requestOptions).then(handleResponse);
    // return fetch('http://localhost:3000/', requestOptions).then(handleResponse);
}


function readById(id) {

}

function create(user) {

}

function update(user) {

}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(pagination, id) {
    return new Promise(resolve=>resolve("test"))
}

