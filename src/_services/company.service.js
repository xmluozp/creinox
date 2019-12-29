import { authHeader, handleResponse, handleResponseTestError, h_queryString } from '../_helper';
// import _ from 'lodash';
// import axios from 'axios'

export const companyService = {
    get_dropdown,
    get_bySearch,
    get_byId,
    post_create,
    put_update,
    _delete: _delete
};

const TABLENAME = "company";

// const url = 'http://localhost:3000/api/';
function get_dropdown(companyType) {

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    let url;

    url = companyType === 1? './dataset/companydata.json' : './dataset/companydata2.json'

    return fetch(`${url}?${companyType}`, requestOptions).then(handleResponse);

}


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
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const url = './dataset/companydata_byId.json'
    console.log("getId create,", item)

    // return fetch(`${url}/${id}`, requestOptions).then(handleResponse);
    return fetch(`${url}`, requestOptions).then(handleResponse);
}

// 测试错误信息
function put_update(item) {

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const url = './dataset/companyerror_byId.json'
    const updateReturn = fetch(`${url}`, requestOptions).then(handleResponseTestError);
    return updateReturn

    // return new Promise(resolve => resolve("on update service"))
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(pagination, id) {
    console.log("on delete service:", id);
    return new Promise(resolve => resolve("on delete service"))
}

