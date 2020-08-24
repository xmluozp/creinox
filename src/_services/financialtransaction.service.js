import { authHeader, handleResponse,  h_queryString, h_nilFilter, h_nilFilter_update } from '_helper';
import {RESTURL} from '../config'
// import axios from 'axios'

export const financialtransactionService = {
  // get_dropdown,
  get_bySearch,
  get_byId,
  post_create,
  put_update,
  _delete: _delete
};

const TABLENAME = "financialtransaction";
const URL = RESTURL + `/api/financialTransaction`;


// function get_dropdown(searchTerms = {}) {
//   const requestOptions = {
//     method: "GET",
//     headers: authHeader()
//   };

//   console.log("get_all service:", searchTerms);

//   const queryString = h_queryString({perPage:-1}, searchTerms, TABLENAME);
//   return fetch(`${URL}?${queryString}`, requestOptions).then(handleResponse);
// }

function get_bySearch(pagination, searchTerms = {}) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  const queryString = h_queryString(pagination, searchTerms, TABLENAME);
  console.log("search service:", queryString);

  // return fetch(`${testurl1}`, requestOptions).then(handleResponse);
  return fetch(`${URL}?${queryString}`, requestOptions).then(handleResponse);
}

function get_byId(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  console.log("getId service,", id);

  // return fetch(`${testurl2}?id=${id}`, requestOptions).then(handleResponse);
  return fetch(`${URL}/${id}`, requestOptions).then(handleResponse);
}

function post_create(item) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(h_nilFilter(item))
  };

  console.log("处理过的json",h_nilFilter(item))

  return fetch(`${URL}`, requestOptions).then(handleResponse);
}

function put_update(item) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(h_nilFilter_update(item))
  };


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
