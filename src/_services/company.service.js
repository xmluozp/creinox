import { authHeader, handleResponse, h_nilFilter, h_queryString } from '../_helper';
// import _ from 'lodash';
// import axios from 'axios'

export const companyService = {
    get_dropdown,
    get_bySearch,
    get_byId,
    post_create,
    put_update,
    _delete: _delete,

    get_disposable_dropdown
};

const TABLENAME = "company";

const URL = `/api/company`;

function get_dropdown(companyType) {

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const queryString = h_queryString({}, {companyType: companyType}, TABLENAME);
    console.log("getdropdown service:", companyType);

    return fetch(`${URL}?${queryString}`, requestOptions).then(handleResponse);
}

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
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify(h_nilFilter(item))
      };
    
      return fetch(`${URL}`, requestOptions).then(handleResponse);

}

function put_update(item) {

    const requestOptions = {
        method: "PUT",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify(h_nilFilter(item))
      };
    
      return fetch(`${URL}`, requestOptions).then(handleResponse);
}

function _delete(id, pagination, searchTerms) {
    const requestOptions = {
        method: "DELETE",
        headers: authHeader()
      };
    
      const queryString = h_queryString(pagination, searchTerms, TABLENAME);
    
      return fetch(`${URL}/${id}?${queryString}`, requestOptions)
        .then(handleResponse)
        .then(() => get_bySearch(pagination, searchTerms));
}

