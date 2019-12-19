import { authHeader, handleResponse, h_queryString } from '../_helper';
// import _ from 'lodash';
// import axios from 'axios'


export const withFacelessService = (tableName="faceless",  targetUrl = {
    get_bySearch_url: "",
    get_byId_url : "",
    post_create_url : "",
    put_update_url: "",
    _delete_url: "",
  }) => {
       
    // const url = 'http://localhost:3000/api/' + tableName;
    
    function get_bySearch(pagination, searchTerms, reNew = false) {
    
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };
    
        const queryString = h_queryString(pagination, searchTerms, tableName)
    
        //  const url = './dataset/companydata.json'
        const url = targetUrl.get_bySearch_url;
        
        console.log("search service faceless:", queryString);
    
        return fetch(`${url}?${queryString}`, requestOptions).then(handleResponse);
    
    }
    
    function get_byId(id) {
    
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };
    
        const url = targetUrl.get_byId_url
        console.log("getId service faceless,", id)
    
        // return fetch(`${url}/${id}`, requestOptions).then(handleResponse);
        return fetch(`${url}?id=${id}`, requestOptions).then(handleResponse);
    }
    
    function post_create(item) {
        return new Promise(resolve => resolve("on create service faceless"))
    }
    
    function put_update(item) {
        return new Promise(resolve => resolve("on update service faceless"))
    }
    
    // prefixed function name with underscore because delete is a reserved word in javascript
    function _delete(pagination, id) {
        console.log("on delete service faceless:", id);
        return new Promise(resolve => resolve("on delete service"))
    }
    
    return {
        get_bySearch,
        get_byId,
        post_create,
        put_update,
        _delete: _delete
    };
}


