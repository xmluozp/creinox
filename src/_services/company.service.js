import { authHeader, handleResponse, h_queryString, h_formData } from '_helper';
import {RESTURL} from '../config'
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

const URL = RESTURL + `/api/company`;
const URL_GET_CODE = RESTURL + `/api/companyGetCode`;


function get_disposable_dropdown(searchTerms) {

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const queryString = h_queryString({}, searchTerms, TABLENAME)

    console.log("getdropdown with search:", searchTerms);
    return fetch(`${URL}?${queryString}`, requestOptions).then(handleResponse);

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

    const requestOptions = {
        method: "POST",
        headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
        body: h_formData(item)
      };
      delete requestOptions.headers['Content-Type'];    
      return fetch(`${URL}`, requestOptions).then(handleResponse);

}

function put_update(item) {

    const requestOptions = {
        method: "PUT",
        headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
        body: h_formData(item, true)
      };
      delete requestOptions.headers['Content-Type'];
      return fetch(`${URL}`, requestOptions).then(handleResponse);
}

function _delete(id) {

    const requestOptions = {
        method: "DELETE",
        headers: authHeader()
      };
    
      return fetch(`${URL}/${id}`, requestOptions)
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
    return fetch(`${URL_GET_CODE}/${companyType}/${keyWord}`, requestOptions).then(handleResponse);
}