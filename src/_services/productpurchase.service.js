import { authHeader, handleResponse, h_queryString } from '../_helper';
// import _ from 'lodash';
// import axios from 'axios'

export const productpurchaseService = {
    get_dropdown,
    get_bySearch,
    get_byId,
    post_create,
    put_update,
    _delete: _delete,

    get_bySearch_groupByCompany,
    get_bySearch_history
};

const TABLENAME = "product_purchase";

// const url = 'http://localhost:3000/api/';
function get_dropdown(pagination, searchTerms) {

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const queryString = h_queryString(pagination, searchTerms, TABLENAME)

    const url = './dataset/productpurchasedata.json'
    return fetch(`${url}?${queryString}`, requestOptions).then(handleResponse);

}

function get_bySearch(pagination, searchTerms, reNew = false) {

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const queryString = h_queryString(pagination, searchTerms, TABLENAME)

    const url = './dataset/productpurchasedata.json'
    console.log("search service:", queryString);
    console.log("search terms:", searchTerms);
    return fetch(`${url}?${queryString}`, requestOptions).then(handleResponse);

}

function get_byId(id) {

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const url = './dataset/productpurchasedata_byId.json'
    console.log("getId service,", id)

    // return fetch(`${url}/${id}`, requestOptions).then(handleResponse);
    return fetch(`${url}?id=${id}`, requestOptions).then(handleResponse);
}

function post_create(item) {

    // TODO: 保存的时候更新category的最大编号（直接存入，不需要判断/ 或者比较当前和数据库的，如果大就存入，小就不变）
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


// ================== customized
// TODO，数据库读取的时候，根据company_id, currency_id 来groupBy。只显示排序最近的第一条
function get_bySearch_groupByCompany(pagination, searchTerms) { 
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const queryString = h_queryString(pagination, searchTerms, TABLENAME)

    const url = './dataset/productpurchasedata.json'
    console.log("search service group:", queryString);
    console.log("search terms group:", searchTerms);
    return fetch(`${url}?${queryString}`, requestOptions).then(handleResponse);
}

// TODO，数据库读取的时候，先找searchTerms里面的productpurchase_id，然后从搜到的productpurchase记录里去查找 product_id, company_id, pack_id...
// 这里显示的内容是：product_id, company_id下的所有信息。 currency虽然在product里显示过了，但这里依然要区分开
function get_bySearch_history(pagination, searchTerms) { 
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const queryString = h_queryString(pagination, searchTerms, TABLENAME)

    const url = './dataset/productpurchasedata.json'
    console.log("search service history:", queryString);
    console.log("search terms history:", searchTerms);
    return fetch(`${url}?${queryString}`, requestOptions).then(handleResponse);
}