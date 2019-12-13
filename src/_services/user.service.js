import { authHeader, handleResponse, h_queryString } from '../_helper';
// import _ from 'lodash';
// import axios from 'axios'

export const userService = {
    login,
    logout,
    get_all,
    get_bySearch,
    get_byId,
    post_create,
    put_update,
    _delete: _delete
};

const TABLENAME = "user";

// const url = 'http://localhost:3000/api/';

function login(userName, password) {

    // const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ userName, password})
    // };

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

    return new Promise((resolve) => {
        resolve(response);
    });

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

function get_all(pagination) {

    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };

    const queryString = h_queryString(pagination, {}, TABLENAME)
    const url = './dataset/userdata_p2.json'
    console.log("search service:", queryString);

    // 要带searchTerm
    return fetch(`${url}?${queryString}`, requestOptions).then(handleResponse);

    // return axios.post(`${url}?${pagination}`).then(response=>{console.log(response)})
    // return fetch('http://localhost:3000/', requestOptions).then(handleResponse);
}

function get_bySearch(pagination, searchTerms, reNew = false) {


    // search应该是返回pagination，但不应该提交，因为要刷新。这里pagination备用暂时用不到
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
        // body: searchTerms
    };

    const queryString = h_queryString(pagination, searchTerms, TABLENAME)

    const url = './dataset/userdata_p1.json'
    console.log("search service:", queryString);

    return fetch(`${url}?${queryString}`, requestOptions).then(handleResponse);

}


function get_byId(id) {

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const url = './dataset/userdata_byId.json'
    console.log("getId service,", id)

    // return fetch(`${url}/${id}`, requestOptions).then(handleResponse);
    return fetch(`${url}?id=${id}`, requestOptions).then(handleResponse);
}

function post_create(item) {

}

function put_update(item) {

}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(pagination, id) {
    console.log("on delete service:", id);
    return new Promise(resolve => resolve("on delete service"))
}

