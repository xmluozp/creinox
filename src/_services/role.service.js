import { authHeader, handleResponse,  h_queryString, h_nilFilter } from "../_helper";
// import axios from 'axios'

export const roleService = {
  get_dropdown,
  get_bySearch,
  get_byId,
  post_create,
  put_update,
  _delete: _delete
};

const TABLENAME = "role";

const URL = `/api/role`;

function get_dropdown(pagination, searchTerms = {}) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  console.log("get_all service:", pagination);

  const queryString = h_queryString(pagination, {}, TABLENAME);

  // pagination也可以在这里拆开了放进uri

  return fetch(`${URL}?${queryString}`, requestOptions).then(handleResponse);
  // return fetch('http://localhost:3000/', requestOptions).then(handleResponse);
}

function get_bySearch(pagination, searchTerms = {}) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

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

  console.log("处理过的json",h_nilFilter(item))

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

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id, pagination, searchTerms = {}) {
  console.log("on delete service:", id);
  const requestOptions = {
    method: "DELETE",
    headers: authHeader()
  };

  const queryString = h_queryString(pagination, searchTerms, TABLENAME);

  return fetch(`${URL}/${id}?${queryString}`, requestOptions)
    .then(handleResponse)
    .then(() => get_bySearch(pagination, searchTerms));
}
