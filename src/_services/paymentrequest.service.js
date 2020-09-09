import { authHeader, handleResponse,  h_queryString, h_nilFilter, h_nilFilter_update } from '_helper';
import {RESTURL} from '../config'
// import axios from 'axios'

export const paymentrequestService = {
  // get_dropdown,
  get_bySearch,
  get_byId,
  post_create,
  put_update,
  _delete: _delete,
  
  put_approve,
  put_reject
};

const TABLENAME = "paymentRequest";
const URL = RESTURL + `/api/paymentRequest`;

const URL_APPROVE = RESTURL + `/api/paymentRequest_approve`;
const URL_REJECT = RESTURL + `/api/paymentRequest_reject`;

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

// status 和通过人无法在这里修改
function post_create(item) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(h_nilFilter(item))
  };

  console.log("处理过的json",h_nilFilter(item))

  return fetch(`${URL}`, requestOptions).then(handleResponse);
}

// status 和通过人无法在这里修改
function put_update(item) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(h_nilFilter_update(item))
  };

  return fetch(`${URL}`, requestOptions).then(handleResponse);
}

function _delete(id) {
  console.log("on delete service:", id);
  const requestOptions = {
    method: "DELETE",
    headers: authHeader()
  };

  return fetch(`${URL}/${id}`, requestOptions)
    .then(handleResponse);
}

// 审批通过
function put_approve(item) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(h_nilFilter_update(item))
  };

  return fetch(`${URL_APPROVE}`, requestOptions).then(handleResponse);
}

// 审批拒绝
function put_reject(item) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(h_nilFilter_update(item))
  };

  return fetch(`${URL_REJECT}`, requestOptions).then(handleResponse);
}
