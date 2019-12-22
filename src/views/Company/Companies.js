import React from "react";

// import _ from "lodash";
// import { format } from 'date-fns'
// import TextField from "@material-ui/core/TextField";

//------redux
import { connect } from "react-redux";

import { ICONS } from "../../_constants";
import { h_confirm, history } from "../../_helper";
import { CreinoxTable, Inputs, withDatatableStore } from "../../components";

// ******************************************************************* page setting
import { companyActions as dataActions, alertActions } from "../../_actions";
import { companyModel as dataModel } from "../../_dataModel";



// ******************************************************************* page setting

export const withCompanyList = (pagetype = 0, EDITURL = "/company/company", CREATEURL = EDITURL) => {
  
  // inject data
  const MyTable = withDatatableStore(
    CreinoxTable, // tablecomponent
    { data: "companyData" }, // data source
    dataActions.get_bySearch // fetch action
  );

  const CurrentPage = ({ onDelete, onAlertNotify, pageName }) => {
    // ============================================= handles
    const handleOnDelete = (pagination, id) => {
      h_confirm("是否删除？").then(resolve => {
        if (resolve) onDelete(pagination, id);
      });
    };

    const handleOnEdit = (pagination, id) => {
      history.push(`${EDITURL}/${id}`)
    }
  

    const headCells = [
      { name: "id", disablePadding: true, className: "ml-2" },
      { name: "code" },
      // { name: "companyType", onShow: renderOnShowType },
      { name: "name" },
      { name: "shortname" },
      { name: "address" },
      { name: "retriveTime" },
      { name: "retriever_id" }, // 从取回的数据 retriever_id.userName 显示
      { name: "imageLicense" }
    ];

    // ============================================= Table Settings
    const rowButtons = [
      {
        label: "修改",
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
        <MyTable
          onRowDbClick ={handleOnEdit}
          tableTitle={pageName}
          headCells={headCells}
          dataModel={dataModel}
          preConditions = {{companyType:pagetype} }
          rowButtons={rowButtons}
          toolbarButtons={toolbarButtons}
          searchBar={searchBar}
        />
    );
  };

  // ============================================= Search Panel
  // 搜索框
  const searchBar = (
    <>
      <Inputs.MyComboboxFK
        inputid="retriever_id"
        optionLabel="userName"
        tableName="user"
      />
      <Inputs.MyDateRangePicker
        inputid="retriveTime"
      />
      
    </>
  );

  // ============================================= propTypes

  // ============================================= Redux
  const actionCreators = {
    onDelete: dataActions._delete,
    onAlertNotify: alertActions.dispatchNotify
  };

  return connect(null, actionCreators)(CurrentPage);
};

export default withCompanyList();