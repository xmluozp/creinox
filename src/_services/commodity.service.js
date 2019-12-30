import { authHeader, handleResponse, h_queryString } from '../_helper';
// import _ from 'lodash';
// import axios from 'axios'

export const commodityService = {
    get_dropdown,
    get_bySearch,
    get_byId,
    post_create,
    put_update,
    _delete: _delete,

    get_bySearch_getProduct,
    get_bySearch_getCommodity,
    post_create_assemble,
    _delete_disassemble,
};

const TABLENAME = "commodity";

// const url = 'http://localhost:3000/api/';
function get_dropdown(pagination, searchTerms) {

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    console.log("service get dropdown:", searchTerms);
    const queryString = h_queryString(pagination, searchTerms, TABLENAME)

    const url = './dataset/commoditydata.json'
    return fetch(`${url}?${queryString}`, requestOptions).then(handleResponse);

}

function get_bySearch(pagination, searchTerms, reNew = false) {

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const queryString = h_queryString(pagination, searchTerms, TABLENAME)

    const url = './dataset/commoditydata.json'
    console.log("search service:", queryString);
    console.log("search terms:", searchTerms);
    return fetch(`${url}?${queryString}`, requestOptions).then(handleResponse);

}

function get_byId(id) {

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const url = './dataset/commoditydata_byId.json'
    console.log("getId service,", id)

    // return fetch(`${url}/${id}`, requestOptions).then(handleResponse);
    return fetch(`${url}?id=${id}`, requestOptions).then(handleResponse);
}

function post_create(item) {

    // TODO: 保存的时候更新category的最大编号（直接存入，不需要判断/ 或者比较当前和数据库的，如果大就存入，小就不变）
    // TODO: isCreateCommodity
    return new Promise(resolve => resolve("on create service"))
}

function put_update(item) {

    // TODO: 保存的时候更新category的最大编号（直接存入，不需要判断/ 或者比较当前和数据库的，如果大就存入，小就不变）
    return new Promise(resolve => resolve("on update service"))
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(pagination, id) {
    console.log("on delete service:", id);
    return new Promise(resolve => resolve("on delete service"))
}


// ==============================================================================

// TODO: url 取的是 commodity_product 这张表. 根据commodity搜索，返回product
function get_bySearch_getProduct(pagination, searchTerms) {

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const queryString = h_queryString(pagination, searchTerms, TABLENAME)

    const url = './dataset/commoditydata.json'


    console.log("search service:", queryString);
    console.log("search terms:", searchTerms);
    return fetch(`${url}?${queryString}`, requestOptions).then(handleResponse);
}

// TODO: url 取的是 commodity_product 这张表. 根据 product 搜索，返回 commodity
function get_bySearch_getCommodity(pagination, searchTerms) {

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const queryString = h_queryString(pagination, searchTerms, TABLENAME)

    const url = './dataset/commoditydata.json' 


    console.log("search service:", queryString);
    console.log("search terms:", searchTerms);
    return fetch(`${url}?${queryString}`, requestOptions).then(handleResponse);
}


function post_create_assemble(item) {
    // TODO: 创建的是product_component表的记录，不是product的
    return new Promise(resolve => resolve("on assemble service"))
}

function _delete_disassemble(pagination, commodity_id, product_id) {
    console.log("on disassemble service, commodity:", commodity_id, "product", product_id);
    return new Promise(resolve => resolve("on disassemble service"))
}