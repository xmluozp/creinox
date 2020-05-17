import { authHeader, handleResponse, h_queryString , h_nilFilter, h_nilFilter_update} from '../_helper';
import {RESTURL} from '../config'
// import _ from 'lodash';
// import axios from 'axios'

export const regionService = {
    get_bySearch,
    get_byId,
    post_create,
    put_update,
    _delete: _delete,
    get_treeNotesById
};

const TABLENAME = "region";
const URL = RESTURL + `/api/region`;


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

// 后台除了修改这个节点本身以外，还要更新所有下级节点的path。通过like左匹配找到左右下级节点，path把当前节点的path左替换掉
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


// ============================================ customized
function get_treeNotesById(regionId) { // 取子类

    const requestOptions = {
        method: "GET",
        headers: authHeader()
      };
    
      const queryString = h_queryString({perPage:-1, orderBy:"path", order:"ASC"}, {root_id: regionId}, TABLENAME);
      console.log("search service, get by root:", queryString);
      return fetch(`${URL}?${queryString}`, requestOptions).then(handleResponse);


    // 后台需要取：根据Id匹配path+","+id。否则全部返回 SELECT * FROM region WHERE id = xx, path like CONCAT(region.path,"," ,region.id)
    // like只取右like（防止10,2这种混淆）
    // 如果没有id的话concat会出问题。就全取
    // const requestOptions = {
    //     method: 'GET',
    //     headers: authHeader()
    // };

    // // const queryString = h_queryString(pagination, searchTerms, TABLENAME)

    // const url = './dataset/regiondata.json'
    // console.log("get by region service:", regionId);

    // return fetch(`${url}?regionId=${regionId}`, requestOptions).then(handleResponse);
}