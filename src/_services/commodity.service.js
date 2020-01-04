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

// 数据用meta排序。没有meta照样取出来
function get_byId(commodity_id, product_id) {

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const url = './dataset/commoditydata_byId.json'
    console.log("getId service,", commodity_id, product_id)

    // return fetch(`${url}/${id}`, requestOptions).then(handleResponse);
    return fetch(`${url}?id=${commodity_id}`, requestOptions).then(handleResponse);
}




// TODO:create的时候建立的是meta。所以需要限制：产品和商品都不允许有多个meta。分别搜索product_id + isMeta，搜索commodity_id + isMeta。
function post_create(item) {
    return new Promise(resolve => resolve("on create service"))
}

// TODO: 只更新名称和memo。如果没有meta就定义当前提交的product_id为meta，如果已经有就不动。
function put_update(item) {
    return new Promise(resolve => resolve("on update service"))
}

// TODO: 删除商品并且删除所有相关的many to many表
function _delete(pagination, id) {
    console.log("on delete service:", id);
    return new Promise(resolve => resolve("on delete service"))
}

// ==============================================================================

// TODO: url 取的是 commodity_product 这张表. 根据commodity搜索，返回product. 排除Meta
function get_bySearch_getProduct(pagination, searchTerms) {

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const queryString = h_queryString(pagination, searchTerms, TABLENAME)

    const url = './dataset/commodityproductdata.json'


    console.log("search service:", queryString);
    console.log("search terms:", searchTerms);
    return fetch(`${url}?${queryString}`, requestOptions).then(handleResponse);
}

// TODO: url 取的是 commodity_product 这张表. 根据 product 搜索，返回 commodity. 排除Meta
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

// 不可重复绑定. 只能有一个 meta。不存在换meta的可能性
function post_create_assemble(item) {
    // TODO: 创建的是product_component表的记录，不是product的
    return new Promise(resolve => resolve("on assemble service"))
}

// 主产品meta也可解绑（下架）
function _delete_disassemble(pagination, commodity_id, product_id) {
    console.log("on disassemble service, commodity:", commodity_id, "product", product_id);
    return new Promise(resolve => resolve("on disassemble service"))
}