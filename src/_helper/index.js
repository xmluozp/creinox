// import React from 'react';
import { createHashHistory } from 'history';
import {userService} from '../_services'
// import _ from 'lodash'
import { format } from 'date-fns'


export * from './fkPicker'
export * from './store'

export const history = createHashHistory({ forceRefresh: true });

export function authHeader() {
    // return authorization header with jwt token
    try {
        let user = JSON.parse(localStorage.getItem('user'));

        if (user && user.token) {
            return { 'Authorization': 'Bearer ' + user.token };
        } else {
            return {};
        }  
    } catch (error) {
        console.log(error)
    }
}

export function handleResponse(response) {

    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                userService.logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

export function handleOnChange(e, setFunc) {
    e.preventDefault();
    setFunc( e.target.value )

    // console.log("funcs:", test);
}

export function h_queryString(pagination = {page:0, order: 'desc', orderBy: 'id',}, searchTerms = {}) {

    let searchString; 

    searchString = encodeURIComponent(JSON.stringify(searchTerms));

    const paginationString = Object.keys(pagination).map(key => key + '=' + pagination[key]).join('&');

    return paginationString +"&q=" + searchString;
}

export function h_keyNames(object) {
    const returnValue = {}

    Object.keys(object).map((value) => {
        returnValue[value] = value;
        return null;
    })

    return returnValue;
}

export function h_headCellsMaker(model, column) {

}

export function h_datetimeToJs_long(datetime = "") {

    const newDatetime = Date.parse(datetime);
    return format(newDatetime, 'yyyy年MM月dd日 HH点mm分ss秒')
}

export function h_datetimeToJs_middle(datetime = "") {

    const newDatetime = Date.parse(datetime);
    return format(newDatetime, 'yyyy年MM月dd日 HH点')
}

export function h_datetimeToJs_short(datetime = "") {

    const newDatetime = Date.parse(datetime);
    return format(newDatetime, 'yy年MM月dd日')
}

export function h_datetimeToMySql(datetime = Date.now()) {

    return format(datetime, 'yyyy-MM-dd HH:mm:ss')
}

export function h_confirm(textMessage="确认操作") {

    const promise = new Promise(
        (resolve, reject) => {
            if (window.confirm(textMessage)){
                resolve(true);
            } else {
                resolve(false);
            }
        }
    );

    return promise;
}