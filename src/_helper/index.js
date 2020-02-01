// import React from 'react';
import { createHashHistory } from 'history';
import {userService} from '../_services'

// import _ from 'lodash'
import { format } from 'date-fns'


export * from './getStoreData'
export * from './initializeDropDownTables'
export * from './store'
export * from './authCheck'
export * from './facelessMaker'

export const history = createHashHistory({ forceRefresh: true });

export function authHeader() {
    // return authorization header with jwt token
    try {
        let user = JSON.parse(localStorage.getItem('user'));

        if (user && user.token) {
            return { 'Authorization': user.token };
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
                // window.location.reload(true);
            }

            if ( !(data && data.info)) {
                data.info = response.statusText;
            }
            
            // const error = (data && data.message) || response.statusText;
            return Promise.reject(data);
        }

        return data;
    });
}

// test
export function handleJsonResponse(response) {

    return response.text().then(text => {

        console.log("error data", text);
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
        
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    });
}


export function handleOnChange(e, setFunc) {
    e.preventDefault();
    setFunc( e.target.value )

    // console.log("funcs:", test);
}



export function h_keyNames(object) {
    const returnValue = {}

    Object.keys(object).map((value) => {
        returnValue[value] = value;
        return null;
    })

    return returnValue;
}

// 避免服务端出错，所有空值都去掉
export function h_nilFilter(object) {

    for (let [key, value] of Object.entries(object)) {
        if(!value){ delete object[key]}
    }
    return object;
}

// 更新时去空值要考虑用户原本就想空值的问题
export function h_nilFilter_update(object) {
    console.log(object)
    for (let [key, value] of Object.entries(object)) {

        
        // if(!value){ delete object[key]}
    }
    return object;
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

// 提交图片的时候，如果不是file object（是默认getById时候的image object）就不要提交
export function h_filterImage(values, columnName) {

    const returnValues = values

    if(returnValues[columnName]){
        const isUploaded = Object.prototype.toString.call(returnValues[columnName]) === "[object File]";
        if(!isUploaded) {
          delete returnValues[columnName];
        } 
    }
    
    return returnValues;
}

// 图片混合表单，表单字段当做图片的name：
export function h_formData(item) {

    const item_withoutnull = h_nilFilter_update(item)

    // TODO: formData 生成器
    // 生成：判断是不是file，是file的提出来，不是file的全部丢到doc里，其中file的部分删除

    const formData  = new FormData();

    // file和文件分开放
    for(const name in item_withoutnull) {

      // 如果是file
      const isUploaded = Object.prototype.toString.call(item_withoutnull[name]) === "[object File]";
      if(isUploaded) {
        formData.append(name, item_withoutnull[name]);
        delete item_withoutnull[name]
      }
    }

    formData.append("doc", JSON.stringify(item_withoutnull));

    return formData
}

// 传单纯的图片列表，图片名当做图片的name：
export function h_formData_files(itemList) {

    const formData  = new FormData();

    // file和文件分开放
    for(const idx in itemList) {

      // 如果是file
      const isUploaded = Object.prototype.toString.call(itemList[idx]) === "[object File]";
      if(isUploaded) {
        formData.append(itemList[idx].name, itemList[idx]);
        delete itemList[idx]
      }
    }

    return formData
}