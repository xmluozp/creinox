import { authHeader, handleResponse, h_queryString, h_nilFilter, h_nilFilter_update } from '_helper';
import {RESTURL} from '../config'
// import _ from 'lodash';
// import axios from 'axios'

export const withFacelessService = (tableName="faceless",  targetUrl = "") => {

      function get_dropdown(pagination, searchTerms) {

        const requestOptions = {
            method: "GET",
            headers: authHeader()
          };

          const queryString = h_queryString(pagination, searchTerms, tableName);
          console.log("faceless dropdown:", queryString);
          return fetch(`${RESTURL}${targetUrl}?${queryString}`, requestOptions).then(handleResponse);

    }      
    
    function get_bySearch(pagination, searchTerms, reNew = false) {

        const requestOptions = {
            method: "GET",
            headers: authHeader()
          };
        
          const queryString = h_queryString(pagination, searchTerms, tableName);
          console.log("faceless search service:", queryString);
          return fetch(`${RESTURL}${targetUrl}?${queryString}`, requestOptions).then(handleResponse);

    }
    
    function get_byId(id) {


        const requestOptions = {
            method: "GET",
            headers: authHeader()
          };
        
          console.log("getId service,", `${targetUrl}/${id}`);
          return fetch(`${RESTURL}${targetUrl}/${id}`, requestOptions).then(handleResponse);
    }
    
    function post_create(item) {

        const requestOptions = {
            method: "POST",
            headers: { ...authHeader(), "Content-Type": "application/json" },
            body: JSON.stringify(h_nilFilter(item))
          };
        
          console.log("处理过的json: create",h_nilFilter(item), targetUrl)
          
          return fetch(`${RESTURL}${targetUrl}`, requestOptions).then(handleResponse);
    }
    
    function put_update(item) {
        const requestOptions = {
            method: "PUT",
            headers: { ...authHeader(), "Content-Type": "application/json" },
            body: JSON.stringify(h_nilFilter_update(item))
          };
          console.log("处理过的json: update",h_nilFilter(item), targetUrl)
          return fetch(`${RESTURL}${targetUrl}`, requestOptions).then(handleResponse);
    }
    
    // prefixed function name with underscore because delete is a reserved word in javascript
    function _delete(id) {
        console.log("on delete service:", id);
        const requestOptions = {
          method: "DELETE",
          headers: authHeader()
        };
      
        return fetch(`${RESTURL}${targetUrl}/${id}`, requestOptions)
          .then(handleResponse);
    }
    
    return {
        get_dropdown,
        get_bySearch,
        get_byId,
        post_create,
        put_update,
        _delete: _delete
    };
}


