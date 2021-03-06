import { authHeader, handleResponse,  h_queryString, h_nilFilter, h_nilFilter_update } from '_helper';
import {getUrl} from '../config'
// import axios from 'axios'

export const texttemplateService = {
  get_dropdown,
  get_bySearch,
  get_byId,
  post_create,
  put_update,
  _delete: _delete,
  get_bySearch_template
};

const TABLENAME = "texttemplate";

const URL = `/api/texttemplate`;
const URL_TEMPLATE = `/api/texttemplate_all`;

// TODO: 改造成autocomplete的时候用
function get_dropdown(pagination, searchTerms = {}) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  console.log("get_all service:", searchTerms);

  const queryString = h_queryString({perPage:-1}, searchTerms, TABLENAME, false);
  return fetch(`${getUrl(URL)}?${queryString}`, requestOptions).then(handleResponse);
}

function get_bySearch(pagination, searchTerms = {}) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  const queryString = h_queryString(pagination, searchTerms, TABLENAME);
  console.log("search service:", queryString);

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
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(h_nilFilter(item))
  };

  console.log("处理过的json",h_nilFilter(item))

  return fetch(`${getUrl(URL)}`, requestOptions).then(handleResponse);
}

function put_update(item) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(h_nilFilter_update(item))
  };

  return fetch(`${getUrl(URL)}`, requestOptions).then(handleResponse);
}

function _delete(id) {
  console.log("on delete service:", id);
  const requestOptions = {
    method: "DELETE",
    headers: authHeader()
  };

  return fetch(`${getUrl(URL)}/${id}`, requestOptions)
    .then(handleResponse);
}


function get_bySearch_template(pagination, searchTerms = {}) {
    const requestOptions = {
      method: "GET",
      headers: authHeader()
    };
  
    const queryString = h_queryString(pagination, searchTerms, TABLENAME);
    console.log("search service:", queryString);
  
    return fetch(`${getUrl(URL_TEMPLATE)}?${queryString}`, requestOptions).then(handleResponse);
  }
  