
import store from './store';
import _ from 'lodash'

export async function h_fkFetch(table) {

    try {
        // 根据表名称动态加载
        let myActions = await import(`../_actions/${table}.actions`);
        const actionPromise = _.get(myActions, [`${table}Actions`, 'get_all'])
        // const data = await myActions.roleActions.readAll()(store.dispatch)
        const data = await actionPromise()(store.dispatch)
            .then((response) => { return response; })
    
        // 注意，这里是异步的
        return data;    
    } catch (error) {
        console.log("调用action失败，表不存在", error)
        return {};
    }

}

export async function h_fkPicker(table, id) {

    // grab current state

    // 如果store里已经有就从store里取，否则主动抓取
    const rows = await h_fkFetchOnce(table);
    return _.find(rows, ['id', id]);
}

export async function h_fkFetchOnce(table) {

    let rows;
    const state = store.getState();
    const getFromStore = _.get(state, [`${table}Data`, "data", "rows"]);

    if( getFromStore ) {
        rows = getFromStore;
    } else {
        const dataSource = await h_fkFetch(table);
        rows = _.get(dataSource, "rows");
    }

    return rows;
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

