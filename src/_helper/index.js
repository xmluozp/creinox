// import React from 'react';
import { createHashHistory } from 'history';
import {userService} from '_services'

import _ from 'lodash'
import { format } from 'date-fns'
import {h_dataPagination, h_dataSearchTerms, h_queryString } from './getStoreData'


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

// read byte[] file
export function handleFileResponse(response) {
    if (!response.ok) {
        if (response.status === 401) {
            // auto logout if 401 response returned from api
            userService.logout();
            window.location.reload(true);
        }
        
        const error = response.statusText;
        return Promise.reject(error);
    } else {
        return response
    }
}



export function handleOnChange(e, setFunc) {
    e.preventDefault();
    setFunc( e.target.value )

    // console.log("funcs:", test);
}

// export function h_code_cut_padding_digits(s) {

//     if (!s) return s

//     let prefix = s
//     let cur = prefix.length - 1
//     while (cur > 0 && prefix[cur] >= '0'  && prefix[cur]  <= '9') {
//       cur--
//     }
//     return prefix.substring(0, cur+1)
// }

export function h_postfix_plus_one(s) { 

    if (!s) return s

    const isLegit = c => (
        (c >= '0' && c <= '9' )|| 
        (c >= 'a' && c <= 'z' )||
        (c >= 'A' && c <= 'Z'))

    const getIsDigit = c => c >= '0' && c <= '9'

    let codeStr = []
    const sArr = s.split('')

    // 截出非法字符
    while(sArr.length >= 0) {
        if(isLegit (sArr[sArr.length-1])) {
            break
        } else {
            sArr.pop()
        }
    }

    let curr =  sArr.length -1

    // 尾部是不是数字
    const isDigit = getIsDigit(sArr[curr])

    // 截尾部
    while( (isDigit === getIsDigit(sArr[curr])) && isLegit(sArr[curr])) {
        codeStr.unshift(sArr[curr])
        curr--
    }

    codeStr = codeStr.join('')
    const prefixStr = sArr.join('').substring(0, curr + 1)

    // 如果是数字，简单的+1
    if(!isNaN(parseInt(codeStr))) {
        return prefixStr + _.padStart( parseInt(codeStr) + 1, codeStr.length, '0')
    } else {
    // 如果是字母，26进制

        // 如果是大写
        if(codeStr === codeStr.toUpperCase()) {
            return prefixStr + numToLetters(numFromLetters(codeStr.toUpperCase()) +1)
        } else {
            return prefixStr + numToLetters(numFromLetters(codeStr.toUpperCase()) +1).toLowerCase()
        }
    }

}

function numToLetters(num) {
    "use strict";
    var mod = num % 26,
        pow = num / 26 | 0,
        out = mod ? String.fromCharCode(64 + mod) : (--pow, 'Z');
    return pow ? numToLetters(pow) + out : out;
}

function numFromLetters(str) {
    "use strict";
    var out = 0, len = str.length, pos = len;
    while (--pos > -1) {
        out += (str.charCodeAt(pos) - 64) * Math.pow(26, len - 1 - pos);
    }
    return out;
}



export function h_code_plus_one(s) {

    if (typeof(s) !== "string") return s

    const num = []
    const str = s.split('')

    while(str.length > 0) {
        const c = str.pop()
        if (c >= '0' && c <= '9') {
            num.push(c)
        } else {
            str.push(c)
            break;
        }       
    }

    if (num.length > 0) {
        const trailNumber = parseInt(num.reverse().join('')) 

        const r1 = str.join('')
        const r2 = trailNumber + 1
        return r1 + _.padStart(r2, num.length, '0');
    }

    else return s
}

export function h_is_all_letters(s) {

    const str = s.split('')
    while(str.length > 0) {
        const c = str.pop()
        if(c >= '0' && c <= '9') {
            return false
        }
    }

    return true
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

// 更新时去空值要考虑用户原本就想空值的问题: 暂时用不着
export function h_nilFilter_update(object) {
    // console.log(object)
    // for (let [key, value] of Object.entries(object)) {

        
        // if(!value){ delete object[key]}
    // }
    return object;
}


export function h_headCellsMaker(model, column) {

}

export function h_datetimeToJs_long(datetime = "") {

    try {
        const newDatetime = Date.parse(datetime);
        return format(newDatetime, 'yyyy年MM月dd日 HH点mm分ss秒')        
    } catch (error) {
        return ""
    }
}

export function h_datetimeToJs_middle(datetime = "") {
    try {
        const newDatetime = Date.parse(datetime);
        return format(newDatetime, 'yyyy年MM月dd日 HH点')  
    } catch (error) {
        return ""
    }
}

export function h_datetimeToJs_short(datetime = "") {
    try {
        const newDatetime = Date.parse(datetime);
        return format(newDatetime, 'yy年MM月dd日') 
    } catch (error) {
        return ""
    }
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
export function h_formData(item, isUpdate = false) {

    const item_withoutnull = isUpdate ? h_nilFilter_update(item) :h_nilFilter(item)  

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

// 传单纯的图片列表，图片名当做图片的name，如果没有folder就根据folder_structure生成一个：
export function h_formData_files(itemList, folder_structure) {

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

    formData.append("doc", JSON.stringify(folder_structure));

    return formData
}

// 下载(目前只有xlsx在用，之后也许会增加). 如果是列表，需要指定storeName，从里面fetch出searchTerm
export function h_download(origin_path, storeName) {

    const requestOptions = {
        method: "GET",
        headers: authHeader(),
      };
 
    let path = origin_path + "/xlsx"

    if(storeName) {
        const queryString = h_queryString({
            ...h_dataPagination(storeName),
            perPage:-1}, h_dataSearchTerms(storeName));
        path += "?" + queryString
    }
    
    fetch(path, requestOptions).then( response => {
        if(response.ok) {

            var file = response.blob();
            return file
        }
        return Promise.reject(response.statusText);
    }).then(response => {

        const fileName = origin_path.split("/").pop()

        const newUrl = URL.createObjectURL(response);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.href = newUrl;

        var timeString = format(
            new Date(),
            'yyyy_MMdd_hhmmss'
        )
        const fA = fileName.split(".")
        const ext = fA.pop()
        const name = fA.join('.')
        a.download = name + " [" +timeString + '].' + ext;
        a.click();
        window.URL.revokeObjectURL(newUrl);

        // window.open(newUrl, "_blank");
    });
}

// // 打开成pdf (做在action里，因为要loading条)
// export function h_pdf(origin_path) {

//     const requestOptions = {
//         method: "GET",
//         headers: authHeader(),
//       };

//     const path = origin_path + "/pdf"

//     fetch(path, requestOptions).then( response => {
//         if(response.ok) {

//             var file1 = response.blob();
//             return file1
//         }
//     }).then(response => {
//         const newUrl = URL.createObjectURL(response);
//         window.open(newUrl, "_blank");
//     });
// }

// 直接打开(看图片用)
export function h_popfile(path) {

    const requestOptions = {
        method: "GET",
        headers: authHeader(),
      };

    fetch(path, requestOptions).then( response => {
        if(response.ok) {
            return response.blob()
        }
    }).then(response => {
        const newUrl = URL.createObjectURL(response);
        window.open(newUrl, "_blank");
    });
}

// 为了返回上一页保留搜索结果用。设置搜索关键词
export function h_setHistoryQuery (key, query) {
    localStorage.setItem("query." + key, JSON.stringify(query));
}
export function h_removeHistoryQuery (key) {
    localStorage.removeItem("query." + key)
}

// 为了返回上一页保留搜索结果用。读取搜索关键词
export function h_getHistoryQuery (key) {
    return JSON.parse(localStorage.getItem("query." + key));
}

export function h_getTableUniqueCode (tableName, tableTitle) {

    const str = tableName + tableTitle

    var number = "0x";
    var length = str.length;
    for (var i = 0; i < length; i++)
        number += str.charCodeAt(i).toString(16);
    return number;
  }


// https://blog.csdn.net/muzi187/article/details/89465739
// author: muzi187
export function h_convertCurrency(currencyDigits) {
	var MAXIMUM_NUMBER = 99999999999.99;
	var CN_ZERO = "零";
	var CN_ONE = "壹";
	var CN_TWO = "贰";
	var CN_THREE = "叁";
	var CN_FOUR = "肆";
	var CN_FIVE = "伍";
	var CN_SIX = "陆";
	var CN_SEVEN = "柒";
	var CN_EIGHT = "捌";
	var CN_NINE = "玖";
	var CN_TEN = "拾";
	var CN_HUNDRED = "佰";
	var CN_THOUSAND = "仟";
	var CN_TEN_THOUSAND = "万";
	var CN_HUNDRED_MILLION = "亿";
	var CN_SYMBOL = "";
	var CN_DOLLAR = "元";
	var CN_TEN_CENT = "角";
	var CN_CENT = "分";
	var CN_INTEGER = "整";
 
 
	var integral; 
	var decimal;
	var outputCharacters; 
	var parts;
	var digits, radices, bigRadices, decimals;
	var zeroCount;
	var i, p, d;
	var quotient, modulus;
 
 
	currencyDigits = currencyDigits.toString();
	if (currencyDigits == "") {
		return "";
	}else{
		let strtemp = currencyDigits.split("-");
		if (strtemp.length > 1) {currencyDigits=strtemp[1]}
	}
	if (currencyDigits.match(/[^,.\d]/) != null) {
		return "";
	}
	if ((currencyDigits).match(/^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/) == null) {
		return "";
	}
 
 
	currencyDigits = currencyDigits.replace(/,/g, ""); 
	currencyDigits = currencyDigits.replace(/^0+/, ""); 
 
	if (Number(currencyDigits) > MAXIMUM_NUMBER) {
		return "";
	}
	parts = currencyDigits.split(".");
	if (parts.length > 1) {
		integral = parts[0];
		decimal = parts[1];
		decimal = decimal.substr(0, 2);
	}else {
		integral = parts[0];
		decimal = "";
	}
	digits = new Array(CN_ZERO, CN_ONE, CN_TWO, CN_THREE, CN_FOUR, CN_FIVE, CN_SIX, CN_SEVEN, CN_EIGHT, CN_NINE);
	radices = new Array("", CN_TEN, CN_HUNDRED, CN_THOUSAND);
	bigRadices = new Array("", CN_TEN_THOUSAND, CN_HUNDRED_MILLION);
	decimals = new Array(CN_TEN_CENT, CN_CENT);
	outputCharacters = "";
	if (Number(integral) > 0) {
		zeroCount = 0;
		for (i = 0; i < integral.length; i++) {
			p = integral.length - i - 1;
			d = integral.substr(i, 1);
			quotient = p / 4;
			modulus = p % 4;
			if (d == "0") {
				zeroCount++;
			}else {
				if (zeroCount > 0){
					outputCharacters += digits[0];
				}
				zeroCount = 0;
				outputCharacters += digits[Number(d)] + radices[modulus];
			}
			if (modulus == 0 && zeroCount < 4) {
				outputCharacters += bigRadices[quotient];
			}
		}
		outputCharacters += CN_DOLLAR;
	}
 
	if (decimal != "") {
		for (i = 0; i < decimal.length; i++) {
			d = decimal.substr(i, 1);
			if (d != "0") {
				outputCharacters += digits[Number(d)] + decimals[i];
			}
		}
	}
	if (outputCharacters == "") {
		outputCharacters = CN_ZERO + CN_DOLLAR;
	}
	if (decimal == "" || decimal == 0) {
		outputCharacters += CN_INTEGER;
	}
	outputCharacters = CN_SYMBOL + outputCharacters;
	return outputCharacters;
}

function h_formatPera(num) {
    var p = num.toFixed(2).split(".");
    return "Php " + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
        return  num + (i && !(i % 3) ? "," : "") + acc;
    }, "") + "." + p[1];
}