import React from 'react'

import _ from 'lodash'
// import { format } from 'date-fns'
import TextField from '@material-ui/core/TextField';

//------redux
import { connect } from 'react-redux'
import { userActions, alertActions } from '../../_actions'
import { userModel } from '../../_dataModel'

import { ICONS } from '../../_constants'
import { h_confirm } from '../../_helper'
import { CreinoxTable } from '../../components'


const Users = ({ onGetBySearch, onDelete, userData, onAlertNotify}) => {
  // ============================================= handles
  const handleOnDelete = (pagination, id) => {
    h_confirm("是否删除？").then(resolve=>{
      if(resolve) onDelete(pagination, id)
    })
  }
  const handleSelectAction = (list) => {
    console.log(list);
    onAlertNotify(`选中了 ${list.join(",")}`)
  }

  // ============================================= render cell
  const handleOnShowRole = (content, row) => {
    return `[${row.role_id}] ${content}`
  }
  const handleOnShowMemo = (content) => {
    return <span title={content}>{_.truncate(content, {length: 10})}</span>
  }

  // ============================================= Table Settings
  const rowButtons = [
    { label: "修改", color: "primary", url: `/users/users`, icon: ICONS.EDIT("mr-1") },
    { label: "删除", color: "danger", onClick: handleOnDelete, icon: ICONS.DELETE() }
  ];

  const selectBox = {
    icon: ICONS.ACTIVE(),
    title: "批量启用",
    onAction: handleSelectAction,
  }

  const toolbarButtons = [
    { label: "Create", url: `/users/create`, color: "success", icon: ICONS.ADD() }
  ]


  // TODO: 看看maker如何设计，既能快速生成又能定制. 如何方便地取到列名？  定制的目的是为了快速生成那些发票之类的功能。所以可以走极端。完全根据model生成
  const headCells = [
    { name: 'id', disablePadding: true, className: 'ml-2' },
    { name: 'role_id', onShow: handleOnShowRole},
    { name: 'userName' },
    { name: 'fullName' },
    { name: 'ip' },
    { name: 'lastLogin' },
    { name: 'memo', onShow: handleOnShowMemo },
    {
      name: 'isActive', 
      align: 'center', 
      label: '状态', 
      // onClick: handleSwitchActive,
      className: { true: 'text-success', false: 'text-danger' }, 
      lookup: { true: ICONS.TRUE("mr-4"), false: ICONS.FALSE("mr-4") }
    }
  ];
 
  // ============================================= Render
  return (
    <>
    <CreinoxTable
      tableTitle="用户列表"
      headCells={headCells}
      data={userData}
      dataModel={userModel}
      onGetBySearch={onGetBySearch}
      rowButtons={rowButtons}
      toolbarButtons={toolbarButtons}
      searchBar={searchBar}
      selectBox={selectBox}
    />
    <button onClick = {() => { onGetBySearch()}}>test</button>
    </>
  )
}

// ============================================= Search Panel
// 搜索框
const searchBar =
  <> 
    <TextField autoFocus margin="dense" id="userName" type="text" />
    <TextField margin="dense" id="fullName" type="text" />
  </>;

// ============================================= propTypes



// ============================================= Redux
function mapState(state) {
  return { 
    userData: state.userData.data
   };
}

const actionCreators = {
  onGetBySearch: userActions.get_bySearch,
  onDelete: userActions._delete,
  onAlertNotify: alertActions.dispatchNotify
};


export default connect(mapState, actionCreators)(Users);