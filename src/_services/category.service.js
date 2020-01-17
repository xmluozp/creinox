import { authHeader, handleResponse, h_queryString } from '../_helper';
// import _ from 'lodash';
// import axios from 'axios'

export const categoryService = {
    get_bySearch,
    get_byId,
    post_create,
    put_update,
    _delete: _delete,
    get_treeNotesById
};

const TABLENAME = "category";

// const url = 'http://localhost:3000/api/';

function get_bySearch(pagination, searchTerms, reNew = false) {

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const queryString = h_queryString(pagination, searchTerms, TABLENAME)

    const url = './dataset/categorydata.json'
    console.log("search service:", queryString);

    return fetch(`${url}?${queryString}`, requestOptions).then(handleResponse);

}

function get_byId(id) {

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const url = './dataset/categorydata_byId.json'
    console.log("getId service,", id)

    // return fetch(`${url}/${id}`, requestOptions).then(handleResponse);
    return fetch(`${url}?id=${id}`, requestOptions).then(handleResponse);
}

function post_create(item) {
    return new Promise(resolve => resolve("on create service"))
}

// 后台除了修改这个节点本身以外，还要更新所有下级节点的path。通过like左匹配找到左右下级节点，path把当前节点的path左替换掉
function put_update(item) {

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const url = './dataset/categorydata_byId.json'
    console.log("getId service,", item)

    // return fetch(`${url}/${id}`, requestOptions).then(handleResponse);
    return fetch(`${url}`, requestOptions).then(handleResponse);

    // return new Promise(resolve => resolve("on update service"))
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id, pagination) {
    console.log("on delete service:", id);
    return new Promise(resolve => resolve("on delete service"))
}


// ============================================ customized
function get_treeNotesById(categoryId) {

    // 后台需要取：根据Id匹配path+","+id。否则全部返回 SELECT * FROM category WHERE id = xx, path like CONCAT(category.path,"," ,category.id)
    // like只取右like（防止10,2这种混淆）
    // 如果没有id的话concat会出问题。就全取
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    // const queryString = h_queryString(pagination, searchTerms, TABLENAME)

    const url = './dataset/categorydata.json'
    console.log("get by category service:", categoryId);

    return fetch(`${url}?categoryId=${categoryId}`, requestOptions).then(handleResponse);
}