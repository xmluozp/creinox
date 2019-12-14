import React from "react";

import _ from "lodash";
// import { format } from 'date-fns'
import TextField from "@material-ui/core/TextField";

//------redux
import { connect } from "react-redux";

import { ICONS, _DATATYPES } from "../../_constants";
import { h_confirm } from "../../_helper";
import { CreinoxTable, Inputs, withDatatableStore} from "../../components";

// ******************************************************************* page setting
import { companyActions as dataActions, alertActions } from "../../_actions";
import { companyModel as dataModel } from "../../_dataModel";

const EDITURL = "/company/company";
const CREATEURL = "/company/company";

// inject data
const MyTable = withDatatableStore(
  CreinoxTable,               // tablecomponent
  { data: "companyData" },       // data source
  dataActions.get_bySearch    // fetch action
);
// ******************************************************************* page setting


/**
 * Basic page for list
 * @param {} param0
 */
const CurrentPage = ({ onDelete, onAlertNotify, pageName }) => {

  // ============================================= handles
  const handleOnDelete = (pagination, id) => {
    h_confirm("是否删除？").then(resolve => {
      if (resolve) onDelete(pagination, id);
    });
  };

  // ============================================= render cell
  const renderOnShowType = (content, row) => {
    return content;
  };

  const headCells = [
    { name: "id", disablePadding: true, className: "ml-2" },
    { name: "code"},
    { name: "companyType", onShow: renderOnShowType},
    { name: "name" },
    { name: "shortname" },
    { name: "address" },
    { name: "retriveTime" },
    { name: "retriever_id" }, // 从取回的数据 retriever_id.userName 显示
    { name: "imageLicense" }
  ];

  // ============================================= Table Settings
  const rowButtons = [
    { label: "修改", color: "primary", url: EDITURL, icon: ICONS.EDIT("mr-1") },
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
        editUrl={EDITURL}
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

// ============================================= Search Panel
// 搜索框
const searchBar = (
  <>
    <Inputs.MySelect inputid= "companyType" options={_DATATYPES.ENUM.companyType}/>
    <Inputs.MyComboboxFK inputid="retriever_id" optionLabel="userName" tableName="user" />
  </>
);

// ============================================= propTypes

// ============================================= Redux
const actionCreators = {
  onDelete: dataActions._delete,
  onAlertNotify: alertActions.dispatchNotify
};

export default connect(null, actionCreators)(CurrentPage);
