import React from 'react'

import { connect } from 'react-redux'
import { userActions } from '../../_actions'
import { history } from '../../_helper'

import { CreinoxTable } from '../../components'



// ============================================= Render
const Users = ({ onReadAll, onDelete, data }) => {

  // ============================================= handles
  const handleOnEdit = (id) => {
    history.push({ pathname: `/users/users/${id}`, })
  }

  const handleOnDelete = (pagination, id) => {
    onDelete(pagination, id)
  }

  // ============================================= Settings
  const buttons = [
    { label: "修改", color:"primary", onClick: handleOnEdit },
    { label: "删除", color:"secondary", onClick: handleOnDelete }
  ];

  const headCells = [
    { id: 'id', disablePadding: true, label: 'ID' },
    { id: 'userName', label: '用户名' },
    { id: 'fullName', label: '姓名' },
    { id: 'ip', label: '登录IP' },
    { id: 'lastLogin', label: '上次登录' },
    { id: 'memo', label: '备注' },
    { id: 'isActive', label: '状态', lookup: { true: '是', false: '否' } }
  ];

  // TODO: 搜索框。每个页面的都不一样，在这里设定。因为要用到pagination所以在table里实现
  return (
    <CreinoxTable tableTitle = "用户列表" headCells={headCells} data={data} onReadAll={onReadAll} buttons={buttons} />
  )
}


// ============================================= Redux
function mapState(state) {
  return { data: state.userData.data };
}

const actionCreators = {
  onReadAll: userActions.readAll,
  onDelete: userActions._delete,
};

export default connect(mapState, actionCreators)(Users);