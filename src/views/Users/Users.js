import React from "react";

import _ from "lodash";
// import { format } from 'date-fns'
// import TextField from "@material-ui/core/TextField";

//------redux
import { connect } from "react-redux";
import { ICONS } from "../../_constants";
import { h_confirm, history } from "../../_helper";
import { CreinoxTable, Inputs, withDatatableStore } from "../../components";

// ******************************************************************* page setting
import { userActions as dataActions } from "../../_actions";
import { userModel as dataModel } from "../../_dataModel";


const EDITURL = "/users/users";
const CREATEURL = "/users/users/add";
const DATASTORE = "userData";

export const withTablePage = () => {
  // inject data
  const MyTable = withDatatableStore(
    CreinoxTable, // tablecomponent
    { data: DATASTORE }, // data source
    dataActions.get_bySearch // fetch action
  );

  // ============================================= render cell
  const renderOnShowRole = (content, row) => {
    return `[${row.role_id}] ${content}`;
  };
  const renderOnShowMemo = content => {
    return <span title={content}>{_.truncate(content, { length: 10 })}</span>;
  };

  const headCells = [
    { name: "id", disablePadding: true, className: "ml-2" },
    { name: "role_id", onShow: renderOnShowRole },
    { name: "userName" },
    { name: "fullName" },
    { name: "ip" },
    { name: "lastLogin" },
    { name: "memo", onShow: renderOnShowMemo },
    {
      name: "isActive",
      align: "center",
      label: "状态",
      className: { true: "text-success", false: "text-danger" },
      lookup: { true: ICONS.TRUE("mr-4"), false: ICONS.FALSE("mr-4") }
    }
  ];

  // ============================================= Search Panel
  // 搜索框
  const searchBar = (
    <>
      <Inputs.MyInput inputid="userName" />
      <Inputs.MyInput inputid="fullName" />
    </>
  );

  // ******************************************************************* page setting

  // **************************************************************************************************
  // **************************************************************************************************
  // ====================================== Component Render ==========================================
  // **************************************************************************************************
  // **************************************************************************************************

  /**
   * Basic page for list
   * @param {} param0
   */
  const CurrentPage = ({ onDelete, pageName }) => {
    // ============================================= handles
    const handleOnDelete = (id, row, pagination, searchTerms) => {
      h_confirm("是否删除？").then(resolve => {
        if (resolve) onDelete(id, pagination, searchTerms);
      });
    };

    // const handleSelectAction = list => {
    //   console.log(`选中了 ${list.join(",")}`);
    // };

    const handleOnEdit = (id) => {
      history.push(`${EDITURL}/${id}`);
    };

    // const selectBox = {
    //   icon: ICONS.ACTIVE(),
    //   title: "批量启用",
    //   onAction: handleSelectAction
    // };

    // ============================================= Table Settings
    const rowButtons = [
      {
        label: "详情",
        color: "primary",
        url: EDITURL,
        icon: ICONS.EDIT("mr-1")
      },
      {
        label: "删除",
        color: "danger",
        onClick: handleOnDelete,
        icon: ICONS.DELETE()
      }
    ];

    const toolbarButtons = [
      { label: "Create", url: CREATEURL, color: "success", icon: ICONS.ADD() }
    ];

    // ============================================= Render
    return (
      <>
        <MyTable
          onRowDbClick={handleOnEdit}
          tableTitle={pageName}
          headCells={headCells}
          dataModel={dataModel}
          rowButtons={rowButtons}
          toolbarButtons={toolbarButtons}
          searchBar={searchBar}
        />
      </>
    );
  };

  // ============================================= propTypes

  // ============================================= Redux
  const actionCreators = {
    onDelete: dataActions._delete
    // onAlertNotify: alertActions.dispatchNotify
  };

  return connect(null, actionCreators)(CurrentPage);
};

export default withTablePage();
