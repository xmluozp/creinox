import React from "react";

// import _ from "lodash";
// import { format } from 'date-fns'
// import TextField from "@material-ui/core/TextField";

//------redux
import { connect } from "react-redux";

import { ICONS } from "_constants";
import { h_confirm, history } from "_helper";
import {
  CreinoxTable,
  Inputs,
  // TabVertical, // 第三级菜单用
  withDatatableStore
} from "components";

// ******************************************************************* page setting
import { companyActions as dataActions } from "_actions";
import { companyModel as dataModel } from "_dataModel";

// ******************************************************************* page setting

export const withCompanyList = (
  pagetype = 0,
  EDITURL = "/company/companies",
  CREATEURL = "/company/companies/add"
) => {
  
  // inject data
  const MyTable = withDatatableStore(
    CreinoxTable, // tablecomponent
    { data: "companyData" }, // data source
    dataActions.get_bySearch // fetch action
  );

  // =============================== render cell
  const headCells = [
    { name: "id", disablePadding: true, className: "ml-2" },
    { name: "code" },
    // { name: "companyType", onShow: renderOnShowType },
    { name: "name" },
    { name: "shortname" },
    { name: "address" },
    { name: "retrieveTime" },
    { name: "retriever_id" } // 从取回的数据 retriever_id.userName 显示
  ];

  // =============================== Search Panel
  const searchBar = (
    <>
    <Inputs.MyInput  inputid="id"/>
    <Inputs.MyInput  inputid="code"/>
    <Inputs.MyInput  inputid="name"/>
    <Inputs.MyInput  inputid="ename"/>
      <Inputs.MyComboboxFK
        inputid="retriever_id"
        stateName="retrieverDropdown"
        optionLabel="userName"
        tableName="user"
      />
      <Inputs.MyDateRangePicker inputid="retrieveTime" />
    </>
  );

  // **************************************************************************************************
  // **************************************************************************************************
  // ====================================== Component Render ==========================================
  // **************************************************************************************************
  // **************************************************************************************************

  const CurrentPage = ({ onDelete, pageName,...props }) => {
    // ============================================= handles
    const handleOnDelete = (id, row, pagination, searchTerms) => {
      h_confirm("是否删除？").then(resolve => {
        if (resolve) onDelete(id, pagination, searchTerms);
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

    const toolbarButtons = [
      { label: "Create", url: CREATEURL, color: "success", icon: ICONS.ADD() }
    ];

    // ============================================= Render
    return (
      <MyTable
      {...props}
        onRowDbClick={handleOnEdit}
        tableTitle={pageName}
        headCells={headCells}
        dataModel={dataModel}
        preConditions={{ companyType: pagetype }}
        rowButtons={rowButtons}
        toolbarButtons={toolbarButtons}
        searchBar={searchBar}

      />
    );
  };

  // ============================================= propTypes

  // ============================================= Redux
  const actionCreators = {
    onDelete: dataActions._delete
  };

  return connect(null, actionCreators)(CurrentPage);
};

export default withCompanyList();
