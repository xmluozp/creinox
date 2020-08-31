import { authHeader, handleResponse, h_queryString , h_nilFilter, h_nilFilter_update } from '_helper';
import {RESTURL} from '../config'
// import _ from 'lodash';
// import axios from 'axios'

export const productpurchaseService = {
    // get_dropdown,
    get_bySearch,
    get_byId,
    post_create,
    put_update,
    _delete: _delete,

    get_bySearch_groupByCompany,
    get_bySearch_history,
    get_disposable_byProductId
};

const TABLENAME = "productpurchase";

const URL = RESTURL + `/api/productPurchase`;
const URL_BY_COMPANY = RESTURL + `/api/productPurchase_companySearch`;
const URL_BY_HISTORY = RESTURL + `/api/productPurchase_historySearch`;
const URL_BY_PRODUCT_ID = RESTURL + `/api/productPurchase_byProductId`;


function get_bySearch(pagination, searchTerms, reNew = false) {

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


// ================== customized
// DONETODO，数据库读取的时候，根据company_id, currency_id 来groupBy。只显示排序最近的第一条
function get_bySearch_groupByCompany(pagination, searchTerms) { 

    const requestOptions = {
        method: "GET",
        headers: authHeader()
      };

      const queryString = h_queryString(pagination, searchTerms, TABLENAME);
      console.log("search service group:", queryString);
      console.log("search terms group:", searchTerms); 
      return fetch(`${URL_BY_COMPANY}?${queryString}`, requestOptions).then(handleResponse);
}

// DONETODO，数据库读取的时候，先找searchTerms里面的productpurchase_id，然后从搜到的productpurchase记录里去查找 product_id, company_id, pack_id...
// 这里显示的内容是：product_id, company_id下的所有信息。 currency虽然在product里显示过了，但这里依然要区分开
function get_bySearch_history(pagination, searchTerms) { 

    const requestOptions = {
        method: "GET",
        headers: authHeader()
      };

      const queryString = h_queryString(pagination, searchTerms, TABLENAME);
      console.log("search service history:", queryString);
      console.log("search terms history:", searchTerms); 
      return fetch(`${URL_BY_HISTORY}?${queryString}`, requestOptions).then(handleResponse);
}

function get_disposable_byProductId(product_id, company_id) {

  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  const _product_id = product_id || 0;
  const _company_id = company_id || 0;

  return fetch(`${URL_BY_PRODUCT_ID}/${_product_id}/${_company_id}`, requestOptions).then(handleResponse);
}