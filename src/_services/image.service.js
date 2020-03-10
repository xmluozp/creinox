import { authHeader, handleResponse, h_queryString, h_formData_files } from '../_helper';
// import _ from 'lodash';
// import axios from 'axios'

export const imageService = {
    get_bySearch,
    get_byId,
    // post_create,
    post_createMultiple,
    // put_update,
    // _delete: _delete,
    _deleteMultiple: _deleteMultiple
};

const TABLENAME = "image";
const URL = `/api/image`;


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

function post_createMultiple(itemList, folder_id) {

    // const url = './dataset/imagesdata_byId.json'
    console.log("getId create,", itemList, folder_id)

    // axios.post(url, {}  )
    // return fetch(`${url}/${id}`, requestOptions).then(handleResponse);
    // return fetch(`${url}`, requestOptions).then(handleResponse);

    const requestOptions = {
        method: "POST",
        headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
        body: h_formData_files(itemList)
      };
      delete requestOptions.headers['Content-Type'];

      return fetch(`${URL}/${folder_id}`, requestOptions).
      then(handleResponse).
      then(() => get_bySearch({perPage: -1}, {gallary_folder_id: folder_id}));  
}

function _deleteMultiple(list) {

    const requestOptions = {
        method: "PUT",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify(list)
    };

    console.log("批量删除", list)
    
    return fetch(`${URL}_delete`, requestOptions).
    then(handleResponse);  
}

