import {
  authHeader,
  handleResponse,
  h_queryString,
  h_formData_files,
} from '_helper';
// import _ from 'lodash';
// import axios from 'axios'
import {getUrl} from '../config'

export const imageService = {
  get_bySearch,
  get_byId,
  // post_create,
  post_createMultiple,
  // put_update,
  // _delete: _delete,
  _deleteMultiple: _deleteMultiple,
};

const TABLENAME = "image";
const URL = `/api/image`;

function get_bySearch(pagination, searchTerms, reNew = false) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  console.log("search service:", searchTerms, "pagination", pagination);
  const queryString = h_queryString(pagination, searchTerms, TABLENAME);
  console.log("search service:", queryString);
  return fetch(`${getUrl(URL)}?${queryString}`, requestOptions).then(handleResponse);
}

function get_byId(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  console.log("getId service,", id);
  return fetch(`${getUrl(URL)}/${id}`, requestOptions).then(handleResponse);
}

// 如果文件夹不存在，就根据structure新建一个
function post_createMultiple(itemList, folder_id, folder_structure) {

  console.log("getId create,", itemList, folder_id, folder_structure);

  let newItemList = itemList

  if(!folder_id || folder_id < 0) {
    folder_id = -1
  }

  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
    body: h_formData_files(newItemList, folder_structure),
  };
  delete requestOptions.headers["Content-Type"];

  return fetch(`${getUrl(URL)}/${folder_id}`, requestOptions)
    .then(handleResponse);
    // .then((res) =>{
    //   console.log("图片插入完成", res)
    //   get_bySearch({ perPage: -1 }, { gallary_folder_id: folder_id })
    //   }
    // );
}

function _deleteMultiple(list) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(list),
  };

  console.log("批量删除", list);

  return fetch(`${getUrl(URL)}_delete`, requestOptions).then(handleResponse);
}
