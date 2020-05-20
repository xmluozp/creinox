import { authHeader, handleResponse, h_queryString, h_nilFilter, h_nilFilter_update } from '../_helper';
import {RESTURL} from '../config'
// import _ from 'lodash';
// import axios from 'axios'

export const buysubitemService = {
    get_dropdown,
    get_bySearch,
    get_byId,
    post_create,
    put_update,
    _delete: _delete
};

const TABLENAME = "buy_subitem";
const URL = RESTURL + `/api/buysubitem`;

const testurl1 = './dataset/buysubitemdata.json'
const testurl2 = './dataset/buysubitemdata_byId.json'

function get_dropdown(companyType) {

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const queryString = h_queryString({}, {companyType: companyType}, TABLENAME);
    console.log("getdropdown service:", companyType);
    // return fetch(`${testurl1}`, requestOptions).then(handleResponse);

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
      // return fetch(`${testurl1}`, requestOptions).then(handleResponse);

      return fetch(`${URL}?${queryString}`, requestOptions).then(handleResponse);

}

function get_byId(id) {

    const requestOptions = {
        method: "GET",
        headers: authHeader()
      };
    
      console.log("getId service,", id);
      // return fetch(`${testurl2}`, requestOptions).then(handleResponse);

      return fetch(`${URL}/${id}`, requestOptions).then(handleResponse);
}

function post_create(item) {
    const requestOptions = {
      method: "POST",
      headers: { ...authHeader(), "Content-Type": "application/json" },
      body: JSON.stringify(h_nilFilter(item))
    };
  
    console.log("处理过的json",h_nilFilter(item))

    // return fetch(`${testurl2}`, requestOptions).then(handleResponse); 
    return fetch(`${URL}`, requestOptions).then(handleResponse);
}


function put_update(item) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(h_nilFilter_update(item))
  };
  // return fetch(`${testurl2}`, requestOptions).then(handleResponse); 
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
