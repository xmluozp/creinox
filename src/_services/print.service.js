import {
  authHeader,
  handleResponse,
  h_queryString,
} from "../_helper";
import {RESTURL} from '../config'

export const printService = {
  get,
};


const URL = RESTURL + `/api/printFolder`;

const testurl1 = './dataset/print.json'

function get(templateFolder) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  console.log("print template folder:", templateFolder);

  // return fetch(`${testurl1}`, requestOptions).then(handleResponse);

  console.log("url", `${URL}/${templateFolder}`)
  return fetch(`${URL}/${templateFolder}`, requestOptions).then(handleResponse);
}
