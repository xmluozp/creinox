import {
  authHeader,
  handleResponse,
  h_queryString,
  h_formData,
  h_nilFilter
} from "../_helper";
// import _ from 'lodash';
// import axios from 'axios'
import {RESTURL} from '../config'

export const productService = {
  get_dropdown,
  get_bySearch,
  get_byId,
  post_create,
  put_update,
  _delete: _delete,

  get_dropdown_fromSellsubitem,
  get_bySearch_component,
  get_dropdown_fromSellcontract,
  post_create_assemble,
  _delete_disassemble
};

const TABLENAME = "product";

const URL = RESTURL + `/api/product`;
const URL_DROP_DOWN = RESTURL + `/api/product_dropDown`;
const URL_DROP_DOWN_SELLCONTRACT = RESTURL + `/api/product_dropDown_sellContract`;
const URL_DROP_DOWN_SELLSUBITEM = RESTURL + `/api/product_dropDown_sellSubitem`;


const URL_COMPONENT = RESTURL + `/api/product_component`;

function get_dropdown(pagination, searchTerms, isIncludeMeta) {
  // TODO: isIncludeMeta 会返回全部产品。否则返回没成为commodity的

  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };
  console.log(
    "service get dropdown:",
    searchTerms,
    "包括一对一绑定commodity的产品",
    isIncludeMeta
  );

  const queryString = h_queryString(
    pagination,
    { ...searchTerms, isIncludeMeta: isIncludeMeta },
    TABLENAME
  );

  return fetch(`${URL_DROP_DOWN}?${queryString}`, requestOptions).then(
    handleResponse
  );
}


// 这里传入的是buycontract
function get_dropdown_fromSellcontract(pagination, searchTerms) {

  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };
  console.log(
    "service get dropdown 从采购订单（寻找外贸订单:",
    searchTerms
  );

  const queryString = h_queryString(
    pagination,
    { ...searchTerms},
    TABLENAME
  );

  return fetch(`${URL_DROP_DOWN_SELLCONTRACT}?${queryString}`, requestOptions).then(
    handleResponse
  );
}

function get_dropdown_fromSellsubitem(preConditions) {

  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };
  console.log(
    "service get dropdown:",
    preConditions,
  );

  // 限制不让他传别的东西过来
  const queryString = h_queryString(
    {},
    {sell_subitem_id: preConditions.sell_subitem_id},
    TABLENAME
  );

  return fetch(`${URL_DROP_DOWN_SELLSUBITEM}?${queryString}`, requestOptions).then(
    handleResponse
  );
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
  // TODO: 保存的时候更新category的最大编号（直接存入，不需要判断/ 或者比较当前和数据库的，如果大就存入，小就不变）
  // TODO: isCreateCommodity
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
    body: h_formData(item)
  };
  delete requestOptions.headers["Content-Type"];
  return fetch(`${URL}`, requestOptions).then(handleResponse);
}

function put_update(item) {
  // TODO: 保存的时候更新category的最大编号（直接存入，不需要判断/ 或者比较当前和数据库的，如果大就存入，小就不变）
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
    body: h_formData(item, true)
  };
  delete requestOptions.headers["Content-Type"];
  return fetch(`${URL}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  console.log("on delete service:", id);
  const requestOptions = {
    method: "DELETE",
    headers: authHeader()
  };

  return fetch(`${URL}/${id}`, requestOptions).then(handleResponse);
}

// ==============================================================================

// DONETODO: url 取的是 product_component 这张表而不是product. 返回的是product
function get_bySearch_component(pagination, searchTerms) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  console.log("search service:", searchTerms);
  const queryString = h_queryString(pagination, searchTerms, TABLENAME);
  console.log("search service:", queryString);

  //  有searchTerms.parent_id和有child_id两种
  return fetch(`${URL_COMPONENT}?${queryString}`, requestOptions).then(
    handleResponse
  );
}

function post_create_assemble(item) {
  // DONETODO: 创建的是product_component表的记录，不是product的. POST

  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(h_nilFilter(item))
  };
  return fetch(
    `${URL_COMPONENT}/${item.parent_id}/${item.child_id}`,
    requestOptions
  ).then(handleResponse);
}

// DONE解绑至少应该有两个id
function _delete_disassemble(item) {
  console.log("on disassemble service:", item);
  const requestOptions = {
    method: "DELETE",
    headers: authHeader()
  };

  return fetch(
    `${URL_COMPONENT}/${item.parent_id}/${item.child_id}`,
    requestOptions
  ).then(handleResponse);
}
