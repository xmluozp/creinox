import { authHeader, handleResponse, h_queryString, h_formData } from '_helper';
import {getUrl} from '../config'
// import _ from 'lodash';
// import axios from 'axios'

export const companyService = {
    // get_dropdown,
    get_bySearch,
    get_byId,
    post_create,
    put_update,
    _delete: _delete,

    get_disposable_dropdown,
    get_code,
};

const TABLENAME = "company";

const URL = `/api/company`;
const URL_GET_CODE = `/api/companyGetCode`;

function get_disposable_dropdown(searchTerms) {

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    // 对应companyType是all的选项
    if(searchTerms && searchTerms.companyType === 0) {
        delete searchTerms.companyType
    }

    const queryString = h_queryString({}, searchTerms, TABLENAME, false)

    /* 
        公司类型如果不写，下拉菜单和搜索列表之间的cache里，searchTerms会互相覆盖。
        所以搜索全部公司也强行指定一个类型 -1， 后台-1就是不搜索
    */

    console.log("getdropdown with search:", searchTerms);
    return fetch(`${getUrl(URL)}?${queryString}`, requestOptions).then(handleResponse);

}

function get_bySearch(pagination, searchTerms, reNew = false) {

    const requestOptions = {
        method: "GET",
        headers: authHeader()
      };


      console.log("search service:", searchTerms);
      const queryString = h_queryString(pagination, searchTerms, TABLENAME);
      return fetch(`${getUrl(URL)}?${queryString}`, requestOptions).then(handleResponse);

}

function get_byId(id) {

    const requestOptions = {
        method: "GET",
        headers: authHeader()
      };
    
      console.log("getId service,", id);
      return fetch(`${getUrl(URL)}/${id}`, requestOptions).then(handleResponse);
}

function post_create(item) {

    const requestOptions = {
        method: "POST",
        headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
        body: h_formData(item)
      };
      delete requestOptions.headers['Content-Type'];    
      return fetch(`${getUrl(URL)}`, requestOptions).then(handleResponse);

}

function put_update(item) {

    const requestOptions = {
        method: "PUT",
        headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
        body: h_formData(item, true)
      };
      delete requestOptions.headers['Content-Type'];
      return fetch(`${getUrl(URL)}`, requestOptions).then(handleResponse);
}

function _delete(id) {

    const requestOptions = {
        method: "DELETE",
        headers: authHeader()
      };
    
      return fetch(`${getUrl(URL)}/${id}`, requestOptions)
        .then(handleResponse);
}

// =========== customized

function get_code(companyType, keyWord) {

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    // const queryString = h_queryString({}, searchTerms, TABLENAME)

    console.log("get code:", companyType, keyWord);
    return fetch(`${getUrl(URL_GET_CODE)}/${companyType}/${keyWord}`, requestOptions).then(handleResponse);
}