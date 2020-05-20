
import store from './store';
import _ from 'lodash'

// 不直接调用。如果是多次，就通过h_fkFetchOnceAsync，如果只调用一次存进store里就通过h_fkFetchOnce
export async function h_fkFetch(table, params=[], actionName="get_dropdown") {

    try {
        let myActions
        // 根据表名称动态加载
        try {
            myActions = await import(`../_actions/${table}.actions`);
            // do stuff
        } catch (ex) {
            myActions = await import(`../_actions/index`);
        }

        // 20200518：用这个虽然也行，但我不想把全部action都import
        // myActions = await import(`../_actions/index`);
        
        // 远程读取action里的方法
        const actionPromise = _.get(myActions, [`${table}Actions`, actionName])
        // const data = await myActions.roleActions.readAll()(store.dispatch)

        const data = await actionPromise(...params)(store.dispatch) // 调用了这里导致的
            .then((response, reject) => {          
                return response; 
            }).catch(error=>{ console.log("调用action失败", error) })
        // 注意，这里是异步的
        
        return data;    
    } catch (error) {
        console.log("调用action失败","表" ,table,"参数" ,params, "actionName", actionName,  error)
        return Promise.reject()
    }
}

export async function h_fkPicker(table, id) {
    // 如果store里已经有就从store里取，否则主动抓取
    const rows = await h_fkFetchOnce(table);
    return _.find(rows, ['id', id]);
}

export async function h_fkFetchOnceAsync(table, params=[], actionName="get_dropdown") {
    
    let rows;
    const dataSource = await h_fkFetch(table, params, actionName);
    rows = _.get(dataSource, "rows");

    if(!rows){return Promise.reject()}

    return rows; 
}

// 注意：这个只抓取一次，是一次性的值
export async function h_fkFetchOnce(table = "", stateName = "dropdown", params=[], actionName="get_dropdown") {

    let rows;
    const state = store.getState();
    const getFromStore = _.get(state, [`${table}Data`, stateName, "rows"]);

    if( getFromStore ) {
        rows = getFromStore;
    } else {
        const dataSource = await h_fkFetch(table, params, actionName);
        rows = _.get(dataSource, "rows");

        if(!rows){return Promise.reject()}
    }
    return rows; 
}

export function h_dataPagination(table) {
    const state = store.getState();
    return _.get(state, [`${table}Data`, "data", "pagination"]);
}

export function h_dataSearchTerms(table) {
    const state = store.getState();
    return _.get(state, [`${table}Data`, "data", "searchTerms"]);
}

export function h_queryString(pagination = {}, searchTerm = {}, table) {

    // cover old data
    const oldPagination = h_dataPagination(table);
    const oldSearchTerms = h_dataSearchTerms(table);

    const newPagination = {...oldPagination, ...pagination}
    let newSearchTerms = {...oldSearchTerms, ...searchTerm} 

    for (let [key, value] of Object.entries(newSearchTerms)) {

        if(typeof(value) === "boolean") {
            value = value?1:0
        }
        
        if(
            ! (key === "id" && (isNaN(value) ||  parseInt(value) <= 0 )) && // 如果搜索id，特殊对待：输入0就放空(因为number input输入空会自动变成0)
            !isNaN(value) && value !== null) {
            newSearchTerms[key] = value.toString() // 后台json只认string
        }
        
    }
    // console.log("newSearchTerms", newSearchTerms)


    let searchString; 
    searchString = encodeURIComponent(JSON.stringify(newSearchTerms));

    const paginationString = Object.keys(newPagination).map(key => key + '=' + newPagination[key]).join('&');

    return paginationString +"&q=" + searchString;
}







// import React, {useEffect} from 'react'
// import { connect } from 'react-redux'
// import { roleActions } from '../_actions'


// export const fkPicker = (table, id) => {

//     const FkRow = ({roleData, onReadAll}) => {

//         console.log(roleData)
//         useEffect(() => {
//             if(!roleData) {
//                 onReadAll()
//             }
//         }, [])
//         return <>hi</>

//     }

//     function mapState(state) {
//         return { roleData: state.roleData.data };
//     }

//     const actionCreators = {
//         onReadAll: roleActions.readAll,
//     };


//     return connect(mapState, actionCreators)(FkRow);
// }

