import { authHeader, handleResponse, h_queryString} from '../_helper';
// import axios from 'axios'

export const roleService = {
    get_all,
    get_bySearch,
    get_byId,
    post_create,
    post_update,
    _delete: _delete
};

// const url = 'http://localhost:3000/api/role';

function get_all(pagination) {

    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };

    console.log("get_all service:", pagination);

    const queryString = h_queryString(pagination);
    const url = './dataset/roledata.json'
    // pagination也可以在这里拆开了放进uri

    return fetch(`${url}?${queryString}`, requestOptions).then(handleResponse);
    // return fetch('http://localhost:3000/', requestOptions).then(handleResponse);
}

function get_bySearch(pagination, searchTerms = {}) {

    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: searchTerms
    };

    
    const queryString = h_queryString(pagination,searchTerms)
    const url = './dataset/roledata.json'
    console.log("search service:", queryString);

    
    return fetch(`${url}?${queryString}`, requestOptions).then(handleResponse);
}


function get_byId(id) {

}

function post_create(item) {

}

function post_update(item) {

}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(pagination, id) {
    console.log("on delete service:", id);
    return new Promise(resolve=>resolve("on delete service"))
}

