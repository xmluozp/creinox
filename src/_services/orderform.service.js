import { authHeader, handleResponse, h_queryString} from '_helper';
import {getUrl} from '../config'
// import _ from 'lodash';
// import axios from 'axios'

export const orderformService = {
    get_disposable_dropdown,
    get_byId,
};

const TABLENAME = "orderform";
const URL = `/api/orderform`;
const URL_DROPDOWN = `/api/orderform_dropDown`;




function get_disposable_dropdown(searchTerms) {

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const queryString = h_queryString({}, searchTerms, TABLENAME)

    console.log("getdropdown with search:", searchTerms);
    return fetch(`${getUrl(URL_DROPDOWN)}?${queryString}`, requestOptions).then(handleResponse);

}
function get_byId(id) {

    const requestOptions = {
        method: "GET",
        headers: authHeader()
      };
    
      console.log("getId service,", id);
      // return fetch(`${testurl2}`, requestOptions).then(handleResponse);

      return fetch(`${getUrl(URL)}/${id}`, requestOptions).then(handleResponse);
}
