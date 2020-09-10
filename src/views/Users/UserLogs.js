import React from "react";

// import _ from "lodash";
// import { format } from 'date-fns'
// import TextField from "@material-ui/core/TextField";

//------redux
import { connect } from "react-redux";
import { ICONS, enumLogType } from "_constants";
import { h_confirm, history } from "_helper";
import { CreinoxTable,Inputs, withDatatableStore } from "components";

// ******************************************************************* page setting
import { userlogActions as dataActions } from "_actions";
import { userlogModel as dataModel } from "_dataModel";


const EDITURL = "/users/userLogs";
const CREATEURL = "/users/userLogs/add";
const DATASTORE = "userlogData";

export const withTablePage = () => {
  // inject data
  const MyTable = withDatatableStore(
    CreinoxTable, // tablecomponent
    { data: DATASTORE }, // data source
    dataActions.get_bySearch // fetch action
  );

  const handleTypeOnShow = (content, row) => {
    return enumLogType[content] || "其他"
  }
  // ============================================= render cell

  const headCells = [
    { name: "id", disablePadding: true, className: "ml-2" },
    { name: "functionName"},
    { name: "type", onShow: handleTypeOnShow},
    { name: "createAt" },
    { name: "memo" },
    { name: "updateUser_id" }
  ];

  // ============================================= Search Panel
  // 搜索框
  const searchBar = (
    <>
      <Inputs.MyInput inputid="memo" />
      <Inputs.MyInput inputid="type" />
      <Inputs.MyInput inputid="functionName" />
      <Inputs.MyDateRangePicker inputid="createAt" />
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
  const CurrentPage = ({ onDeleteMultiple, onDelete, pageName, ...props }) => {
    // ============================================= handles
    const handleOnDelete = (id, row, pagination, searchTerms) => {
      h_confirm("是否删除？").then(resolve => {
        if (resolve) onDelete(id, pagination, searchTerms);
      });
    };

    const handleSelectAction = (list,pagination) => {
      h_confirm("是否批量删除？").then(resolve => {
        if (resolve) onDeleteMultiple(list, pagination);
      });      
    };

    const handleOnEdit = (id) => {
      history.push(`${EDITURL}/${id}`);
    };

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

    const selectBox = {
      icon: ICONS.DELETE(),
      title: "批量删除",
      onAction: handleSelectAction
    };

    const toolbarButtons = [
      { label: "Create", url: CREATEURL, color: "success", icon: ICONS.ADD() }
    ];

    // ============================================= Render
    return (
      <>
        <MyTable
        {...props}
          onRowDbClick={handleOnEdit}
          tableTitle={pageName}
          headCells={headCells}
          dataModel={dataModel}
          rowButtons={rowButtons}
          toolbarButtons={toolbarButtons}
          searchBar={searchBar}
          selectBox={selectBox}
        />
      </>
    );
  };

  // ============================================= propTypes

  // ============================================= Redux
  const actionCreators = {
    onDeleteMultiple: dataActions._deleteMultiple,
    onDelete: dataActions._delete
    // onAlertNotify: alertActions.dispatchNotify
  };

  return connect(null, actionCreators)(CurrentPage);
};

export default withTablePage();
