import { authHeader, handleResponse, handleResponseTestError, h_queryString } from '../_helper';
// import _ from 'lodash';
import axios from 'axios'

export const imageService = {
    get_bySearch,
    get_byId,
    post_create,
    post_createMultiple,
    put_update,
    _delete: _delete,
    _deleteMultiple: _deleteMultiple
};

const TABLENAME = "image";

// const url = 'http://localhost:3000/api/';

function get_bySearch(pagination, searchTerms, reNew = false) {

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const queryString = h_queryString(pagination, searchTerms, TABLENAME)

    const url = './dataset/imagesdata.json'
    console.log("search service:", queryString);

    return fetch(`${url}?${queryString}`, requestOptions).then(handleResponse);

}

function get_byId(id) {

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const url = './dataset/imagesdata_byId.json'
    console.log("getId service,", id)

    // return fetch(`${url}/${id}`, requestOptions).then(handleResponse);
    return fetch(`${url}?id=${id}`, requestOptions).then(handleResponse);
}

function post_create(item) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const url = './dataset/imagesdata_byId.json'
    console.log("getId create,", item)

    // axios.post(url, {}  )
    // return fetch(`${url}/${id}`, requestOptions).then(handleResponse);
    return fetch(`${url}`, requestOptions).then(handleResponse);
}

function post_createMultiple(itemList) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const url = './dataset/imagesdata_byId.json'
    console.log("getId create,", itemList)

    // axios.post(url, {}  )
    // return fetch(`${url}/${id}`, requestOptions).then(handleResponse);
    return fetch(`${url}`, requestOptions).then(handleResponse);
}



// 测试错误信息
function put_update(item) {
    return new Promise(resolve => resolve("on update service"))
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(pagination, id) {
    console.log("on delete service:", id);
    return new Promise(resolve => resolve("on delete service"))
}

function _deleteMultiple(pagination, list) {
    console.log("on delete service:", list);
    return new Promise(resolve => resolve("on delete service"))
}

