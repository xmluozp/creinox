import { authHeader, handleResponse, h_queryString} from '../_helper';
// import axios from 'axios'

export const roleService = {
    get_dropdown,
    get_bySearch,
    get_byId,
    post_create,
    put_update,
    _delete: _delete
};

const TABLENAME = "role"
// const URL = 'http://localhost:3000/api/role';

function get_dropdown(pagination, searchTerms = {}) {

    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };

    console.log("get_all service:", pagination);

    const queryString = h_queryString(pagination, {}, TABLENAME);
    const url = './dataset/roledata.json'
    // pagination也可以在这里拆开了放进uri

    return fetch(`${url}?${queryString}`, requestOptions).then(handleResponse);
    // return fetch('http://localhost:3000/', requestOptions).then(handleResponse);
}

function get_bySearch(pagination, searchTerms = {}) {

    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };

    
    const queryString = h_queryString(pagination,searchTerms, TABLENAME)
    const url = './dataset/roledata.json'
    console.log("search service:", queryString);

    return fetch(`${url}?${queryString}`, requestOptions).then(handleResponse);
}


function get_byId(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const url = './dataset/roledata_byId.json'
    console.log("getId service,", id)

    // return fetch(`${url}/${id}`, requestOptions).then(handleResponse);
    return fetch(`${url}?id=${id}`, requestOptions).then(handleResponse);
}

function post_create(item) {
    return new Promise(resolve => resolve("on create service"))
}

function put_update(item) {
    return new Promise(resolve => resolve("on update service(实现后应该返回新数据)"))
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(pagination, id) {
    console.log("on delete service:", id);
    return new Promise(resolve=>resolve("on delete service"))
}

