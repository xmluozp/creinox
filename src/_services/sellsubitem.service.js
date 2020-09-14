import {
  authHeader,
  handleResponse,
  h_queryString,
  h_formData,
} from '_helper';
import {getUrl} from '../config'
// import _ from 'lodash';
// import axios from 'axios'

export const sellsubitemService = {
  get_dropdown,
  get_bySearch,
  get_byId,
  post_create,
  put_update,
  _delete: _delete,
};

const TABLENAME = "sellsubitem";
const URL = `/api/sellsubitem`;

function get_dropdown(pagination, searchTerms) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  console.log("search service:", searchTerms);
  const queryString = h_queryString(pagination, searchTerms, TABLENAME, false);
  console.log("search service:", queryString);
  // return fetch(`${testurl1}`, requestOptions).then(handleResponse);

  return fetch(`${getUrl(URL)}?${queryString}`, requestOptions).then(handleResponse);
}

function get_bySearch(pagination, searchTerms, reNew = false) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  console.log("search service:", searchTerms);
  const queryString = h_queryString(pagination, searchTerms, TABLENAME);
  console.log("search service:", queryString);
  // return fetch(`${testurl1}`, requestOptions).then(handleResponse);

  return fetch(`${getUrl(URL)}?${queryString}`, requestOptions).then(handleResponse);
}

function get_byId(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  console.log("getId service,", id);
  // return fetch(`${testurl2}`, requestOptions).then(handleResponse);

  return fetch(`${getUrl(URL)}/${id}`, requestOptions).then(handleResponse);
}

function post_create(item) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type":"multipart/form-data"  },
    body: h_formData(item),
  };

  console.log("处理过的json", item);
  
  delete requestOptions.headers['Content-Type'];  
  return fetch(`${getUrl(URL)}`, requestOptions).then(handleResponse);
}

function put_update(item) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "multipart/form-data"  },
    body: h_formData(item),
  };

  delete requestOptions.headers['Content-Type'];  
  return fetch(`${getUrl(URL)}`, requestOptions).then(handleResponse);
}

function _delete(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  return fetch(`${getUrl(URL)}/${id}`, requestOptions).then(handleResponse);
}
