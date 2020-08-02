import { authHeader, handleResponse, handleFileResponse } from "_helper";
import { RESTURL } from "../config";

export const printService = {
  get,
  get_pdf,
};

const URL = RESTURL + `/api/printFolder`;

const testurl1 = "./dataset/print.json";

function get(templateFolder) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  console.log("print template folder:", templateFolder);

  // return fetch(`${testurl1}`, requestOptions).then(handleResponse);

  console.log("url", `${URL}/${templateFolder}`);
  return fetch(`${URL}/${templateFolder}`, requestOptions).then(handleResponse);
}

function get_pdf(origin_path) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  const path = origin_path + "/pdf";

  return fetch(path, requestOptions).then(handleFileResponse);
}
