import React, {useState}  from "react";

// import _ from "lodash";
// import { format } from 'date-fns'
// import TextField from "@material-ui/core/TextField";
import formatCurrency from "format-currency";

//------redux
import { connect } from "react-redux";

import { ICONS, enums } from "_constants";
import { h_confirm, history } from "_helper";
import {
  CreinoxTable,
  Inputs,
  // TabVertical, // 第三级菜单用
  withDatatableStore,
  ToolBar,
} from "components";

import { withSimpleTable } from "components/SimpleTable";

// ******************************************************************* page setting
import { buycontractActions as dataActions } from "_actions";
import { buycontractModel as dataModel, financialtransactionModel} from "_dataModel";

// ******************************************************************* page setting

export const withBuycontractList = (
  EDITURL = "/contract/buycontracts",
  CREATEURL = "/contract/buycontracts/add"
) => {
  const CREATEURL_TRANSACTION = "/financial/contractTransactions/add"

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
    <Inputs.MyComboboxAsyncFK
        inputid="seller_company_id"
        tableName="company"
        actionName="get_disposable_dropdown"
        preConditions={{companyType: enums.companyType.all}}
      />
    <Inputs.MyComboboxFK
      inputid="follower_id"
      stateName="followerDropdown"
      optionLabel="userName"
      tableName="user"/>   
    </>
  );

  const renderAmount = (prev, curr) => {
    const num1 = parseFloat(prev) || 0
    const num2 = parseFloat(curr) || 0
    return (num1 + num2).toFixed(2)
  }

  // 货币显示逗号
  const renderWrap = content => formatCurrency(parseFloat(content))

  // >>> 下属付款记录 ---------------------------------------
  const headCells_financialTransactions = [
    { name: "id", disablePadding: true, className: "ml-2", width:80 },
    { name: "transdateAt", width: 170},
    { name: "amount_in", width:140, onWrap: renderAmount, onShowWrap: renderWrap},
    { name: "amount_out", width:140, onWrap: renderAmount, onShowWrap: renderWrap},
    { name: "financialAccount_id", width:200 },
    { name: "bankaccountName", width:200 },
    { name: "bankaccountNo", width:220 },
    { name: "tt_transUse"},
  ];

  const financialTransaction_list = withSimpleTable({
    headCells: headCells_financialTransactions,
    dataModel: financialtransactionModel
  });


  const collapsePanel = [
    {
      title: "转账记录",
      name: "financialTransaction_list",
      RenderComponent: financialTransaction_list,
      props: {
        tableTitle: "转账记录",
        style: {
          backgroundColor: "#e6eff6",
          padding: 10,
        },
      },
    }
  ]

  // **************************************************************************************************
  // **************************************************************************************************
  // ====================================== Component Render ==========================================
  // **************************************************************************************************
  // **************************************************************************************************

  const CurrentPage = ({ onDelete, pageName, ...props }) => {

    const [showAll, setShowAll] = useState(false)

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
        label: "收付款",
        color: "success",
        url: row => CREATEURL_TRANSACTION + "/" + row.order_form_id,
        icon: ICONS.MONEY("mr-1"),
      },
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

    const topButtons = [
      { label: "只显示未完成", onClick:()=> {setShowAll(false)}, color: "primary", variant: showAll ? "outlined": "contained"},
      { label: "显示全部", onClick:()=> {setShowAll(true)},color: "secondary", variant: showAll ? "contained": "outlined"},
    ];

    // ============================================= Render
    return (
      <>
        <ToolBar buttons={topButtons} />
        <MyTable
        {...props}
          onRowDbClick={handleOnEdit}
          preConditions = {showAll ? {} : {isDone: false}}
          tableTitle={pageName}
          headCells={headCells}
          dataModel={dataModel}
          rowButtons={rowButtons}
          toolbarButtons={toolbarButtons}
          collapsePanel={collapsePanel}
          searchBar={searchBar} 
          toggle={showAll}
          />
          
      </>
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
