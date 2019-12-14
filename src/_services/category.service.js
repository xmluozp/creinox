import { authHeader, handleResponse, h_queryString } from '../_helper';
// import _ from 'lodash';
// import axios from 'axios'

export const categoryService = {
    get_bySearch,
    get_byId,
    post_create,
    put_update,
    _delete: _delete
};

const TABLENAME = "category";

// const url = 'http://localhost:3000/api/';

function get_bySearch(pagination, searchTerms, reNew = false) {

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const queryString = h_queryString(pagination, searchTerms, TABLENAME)

    const url = './dataset/companydata.json'
    console.log("search service:", queryString);

    return fetch(`${url}?${queryString}`, requestOptions).then(handleResponse);

}

function get_byId(id) {

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const url = './dataset/companydata_byId.json'
    console.log("getId service,", id)

    // return fetch(`${url}/${id}`, requestOptions).then(handleResponse);
    return fetch(`${url}?id=${id}`, requestOptions).then(handleResponse);
}

function post_create(item) {
    return new Promise(resolve => resolve("on create service"))
}

function put_update(item) {
    return new Promise(resolve => resolve("on update service"))
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(pagination, id) {
    console.log("on delete service:", id);
    return new Promise(resolve => resolve("on delete service"))
}

