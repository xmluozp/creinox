import { authHeader, handleResponse, h_nilFilter_update, h_nilFilter, h_queryString } from '_helper';
import {RESTURL} from '../config'
// import _ from 'lodash';
// import axios from 'axios'

export const commonitemService = {
    get_dropdown,
    get_bySearch,
    get_byId,
    post_create,
    put_update,
    _delete: _delete
};

const TABLENAME = "commonitem";

const URL = RESTURL + `/api/commonitem`;
const URL_DROP_DOWN = RESTURL + `/api/commonitem_dropDown`;


function get_dropdown(commonType, searchTerms) {

    // const requestOptions = {
    //     method: 'GET',
    //     headers: authHeader()
    // };
    // let url;
    // url = commonType === 1? './dataset/commonitemdata1.json' : './dataset/commonitemdata2.json'

    // return fetch(`${url}?${commonType}`, requestOptions).then(handleResponse);

    const requestOptions = {
        method: "GET",
        headers: authHeader()
      };

      const queryString = h_queryString({perPage: -1}, {...searchTerms,commonType: commonType}, TABLENAME, false);
        
      return fetch(`${URL_DROP_DOWN}?${queryString}`, requestOptions).then(handleResponse);
}

function get_bySearch(pagination, searchTerms) {

    // const requestOptions = {
    //     method: 'GET',
    //     headers: authHeader()
    // };

    // const queryString = h_queryString(pagination, searchTerms, TABLENAME)

    // let url;
    // url = searchTerms.commonType === 1? './dataset/commonitemdata1.json' : './dataset/commonitemdata2.json'


    // console.log("search service:", queryString);

    // return fetch(`${url}?${queryString}`, requestOptions).then(handleResponse);
    const requestOptions = {
        method: "GET",
        headers: authHeader()
      };
    
      const queryString = h_queryString(pagination, searchTerms, TABLENAME);
      console.log("search service:", queryString);
      return fetch(`${URL}?${queryString}`, requestOptions).then(handleResponse);

}

function get_byId(id) {

    // const requestOptions = {
    //     method: 'GET',
    //     headers: authHeader()
    // };

    // const url = './dataset/commonitemdata_byId.json'
    // console.log("getId service,", id)

    // // return fetch(`${url}/${id}`, requestOptions).then(handleResponse);
    // return fetch(`${url}?id=${id}`, requestOptions).then(handleResponse);

    const requestOptions = {
        method: "GET",
        headers: authHeader()
      };
    
      console.log("getId service,", id);
      return fetch(`${URL}/${id}`, requestOptions).then(handleResponse);
    
}

function post_create(item) {
    // const requestOptions = {
    //     method: 'GET',
    //     headers: authHeader()
    // };

    // const url = './dataset/commonitemdata_byId.json'
    // console.log("getId create,", item)

    // // return fetch(`${url}/${id}`, requestOptions).then(handleResponse);
    // return fetch(`${url}`, requestOptions).then(handleResponse);
    const requestOptions = {
        method: "POST",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify(h_nilFilter(item))
      };
    
      console.log("处理过的json",h_nilFilter(item))
    
      return fetch(`${URL}`, requestOptions).then(handleResponse);
    
}

// 测试错误信息
function put_update(item) {

    // const requestOptions = {
    //     method: 'GET',
    //     headers: authHeader()
    // };

    // const url = './dataset/commonitemerror_byId.json'
    // const updateReturn = fetch(`${url}`, requestOptions).then(handleJsonResponse);
    // return updateReturn

    // return new Promise(resolve => resolve("on update service"))
    const requestOptions = {
        method: "PUT",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify(h_nilFilter_update(item))
      };

      console.log("put update:", item)
    
      return fetch(`${URL}`, requestOptions).then(handleResponse);
    
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    // console.log("on delete service:", id);
    // return new Promise(resolve => resolve("on delete service"))

    console.log("on delete service:", id);
    const requestOptions = {
      method: "DELETE",
      headers: authHeader()
    };
  
    return fetch(`${URL}/${id}`, requestOptions)
      .then(handleResponse);
}

