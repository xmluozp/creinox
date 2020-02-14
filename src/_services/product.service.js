import { authHeader, handleResponse, h_queryString, h_formData } from '../_helper';
// import _ from 'lodash';
// import axios from 'axios'

export const productService = {
    get_dropdown,
    get_bySearch,
    get_byId,
    post_create,
    put_update,
    _delete: _delete,

    get_bySearch_component,
    post_create_assemble,
    _delete_disassemble,
};

const TABLENAME = "product";

const URL = `/api/product`;
const URL_DROP_DOWN = `/api/product_dropDown`;


function get_dropdown(pagination, searchTerms, isIncludeMeta) {

    // TODO: isIncludeMeta 会返回全部产品。否则返回没成为commodity的

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    console.log("service get dropdown:", searchTerms, "包括一对一绑定commodity的产品", isIncludeMeta);

    const queryString = h_queryString(pagination, {...searchTerms, isIncludeMeta: isIncludeMeta}, TABLENAME)

    return fetch(`${URL_DROP_DOWN}?${queryString}`, requestOptions).then(handleResponse);

}

function get_bySearch(pagination, searchTerms, reNew = false) {

    const requestOptions = {
        method: "GET",
        headers: authHeader()
      };


      console.log("search service:", searchTerms);
      const queryString = h_queryString(pagination, searchTerms, TABLENAME);
      console.log("search service:", queryString);
      return fetch(`${URL}?${queryString}`, requestOptions).then(handleResponse);


}

function get_byId(id) {
    const requestOptions = {
        method: "GET",
        headers: authHeader()
      };
    
      console.log("getId service,", id);
      return fetch(`${URL}/${id}`, requestOptions).then(handleResponse);
}

function post_create(item) {

    // TODO: 保存的时候更新category的最大编号（直接存入，不需要判断/ 或者比较当前和数据库的，如果大就存入，小就不变）
    // TODO: isCreateCommodity
    const requestOptions = {
        method: "POST",
        headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
        body: h_formData(item)
      };
      delete requestOptions.headers['Content-Type'];    
      return fetch(`${URL}`, requestOptions).then(handleResponse);
}

function put_update(item) {

    // TODO: 保存的时候更新category的最大编号（直接存入，不需要判断/ 或者比较当前和数据库的，如果大就存入，小就不变）
      const requestOptions = {
        method: "PUT",
        headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
        body: h_formData(item, true)
      };
      delete requestOptions.headers['Content-Type'];
      return fetch(`${URL}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    console.log("on delete service:", id);
    const requestOptions = {
        method: "DELETE",
        headers: authHeader()
      };
    
      return fetch(`${URL}/${id}`, requestOptions)
        .then(handleResponse);
}


// ==============================================================================

// TODO: url 取的是 product_component 这张表而不是product. 返回的是product
function get_bySearch_component(pagination, searchTerms) {

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const queryString = h_queryString(pagination, searchTerms, TABLENAME)

    const url = searchTerms && searchTerms.parent_id? './dataset/productcomponentdata.json' :  './dataset/productcomponentdata2.json'


    console.log("search service:", queryString);
    console.log("search terms:", searchTerms);
    return fetch(`${url}?${queryString}`, requestOptions).then(handleResponse);

}

function post_create_assemble(item) {
    // TODO: 创建的是product_component表的记录，不是product的
    return new Promise(resolve => resolve("on assemble service"))
}

function _delete_disassemble(item,pagination) {
    console.log("on disassemble service:", item);
    return new Promise(resolve => resolve("on disassemble service"))
}