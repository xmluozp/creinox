import { authHeader, handleResponse, handleFileResponse, h_queryString, h_dataPagination, h_dataSearchTerms } from "_helper";
import { RESTURL } from "../config";

export const printService = {
  get,
  get_pdf,
};

const URL = RESTURL + `/api/printFolder`;

// 找模板
function get(templateFolder) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  let path = `${URL}/${templateFolder}`;
  return fetch(path, requestOptions).then(handleResponse);
}

// 直接打印pdf
function get_pdf(origin_path, storeName) {

  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  let path = origin_path + "/pdf";

  console.log("dayin",storeName)

  // 如果有搜索条件
  if(storeName) {
    const queryString = h_queryString({
      ...h_dataPagination(storeName),
      perPage:-1},  h_dataSearchTerms(storeName));
    path += "?" + queryString
  }  

  return fetch(path, requestOptions).then(handleFileResponse);
}
