import React from "react";

// import _ from "lodash";
// import { format } from 'date-fns'
// import TextField from "@material-ui/core/TextField";

//------redux
import { connect } from "react-redux";

import { ICONS, enums } from "../../_constants";
import { h_confirm, history } from "../../_helper";
import {
  CreinoxTable,
  Inputs,
  // TabVertical, // 第三级菜单用
  withDatatableStore
} from "../../components";

// ******************************************************************* page setting
import { buycontractActions as dataActions } from "../../_actions";
import { buycontractModel as dataModel } from "../../_dataModel";

// ******************************************************************* page setting

export const withBuycontractList = (
  EDITURL = "/contract/buycontracts",
  CREATEURL = "/contract/buycontracts/add"
) => {
  
  // inject data
  const MyTable = withDatatableStore(
    CreinoxTable, // tablecomponent
    { data: "buycontractData" }, // data source
    dataActions.get_bySearch // fetch action
  );

  // =============================== render cell
  const headCells = [
    { name: "id", disablePadding: true, className: "ml-2" },
    { name: "sell_contract_id" },
    { name: "code" },
    { name: "activeAt" },
    { name: "deliverAt" },
    { name: "seller_company_id" },
    { name: "totalPrice"},
    { name: "paidPrice"},
    {
      name: "isDone",
      align: "center",
      label: "完成",
      className: { true: "text-success" },
      lookup: { true: ICONS.TRUE("mr-4") }
    },
    { name: "follower_id" },
  ];

  // =============================== Search Panel
  const searchBar = (
    <>
    <Inputs.MyInput  inputid="code"/>
    <Inputs.MyDateRangePicker inputid="activeAt" />
    <Inputs.MyInput  inputid="ename"/>
    <Inputs.MyComboboxFK
        inputid="seller_company_id"
        label="工厂"
        optionLabel="name"
        tableName="company"
        stateName="dropdown_factory"
        preConditions={{ companyType: enums.companyType.factory }}
      />
    <Inputs.MyComboboxFK
      inputid="follower_id"
      optionLabel="userName"
      tableName="user"/>   
    </>
  );

  // **************************************************************************************************
  // **************************************************************************************************
  // ====================================== Component Render ==========================================
  // **************************************************************************************************
  // **************************************************************************************************

  const CurrentPage = ({ onDelete, pageName, ...props }) => {
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

export default withBuycontractList();
