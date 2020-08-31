import React from "react";

// import _ from "lodash";
// import { format } from 'date-fns'
// import TextField from "@material-ui/core/TextField";

//------redux
import { connect } from "react-redux";

import { ICONS, enums } from "_constants";
import { h_confirm, history } from "_helper";
import {
  CreinoxTable,
  Inputs,
  // TabVertical, // 第三级菜单用
  withDatatableStore,
} from "components";

import { withSimpleTable } from "components/SimpleTable";
import { ImageThumb } from "components/ImageThumb";

// ******************************************************************* page setting
import { mouldcontractActions as dataActions } from "_actions";
import { mouldcontractModel as dataModel, financialtransactionModel} from "_dataModel";

// ******************************************************************* page setting

export const withMouldcontractList = (
  EDITURL = "/contract/mouldcontracts",
  CREATEURL = "/contract/mouldcontracts/add"
) => {
  const CREATEURL_TRANSACTION = "/financial/contractTransactions/add"
  // inject data
  const MyTable = withDatatableStore(
    CreinoxTable, // tablecomponent
    { data: "mouldcontractData" }, // data source
    dataActions.get_bySearch // fetch action
  );

  const renderOnShowThumbnail = (content, row) => {
    return (
      <ImageThumb path={content} alt={"thumbnail of " + row.view_productCode} />
    );
  };

  // =============================== render cell
  const headCells = [
    { name: "id", disablePadding: true, className: "ml-2",  width: 50},
    { name: "code"},
    { name: "view_productCode" },
    { name: "view_image_thumbnail", onShow: renderOnShowThumbnail },
    { name: "activeAt" },
    { name: "deliverAt" },
    { name: "view_seller_company_name" },
    { name: "prepayAt" },
    { name: "totalPrice" },
    { name: "paidPrice"},
    {
      name: "isDone",
      align: "center",
      label: "完成",
      className: { true: "text-success" },
      lookup: { true: ICONS.TRUE("mr-4") }
    },
    { name: "view_follower" },
  ];

  // =============================== Search Panel
  const searchBar = (
    <>
      <Inputs.MyInput inputid="code" />
      <Inputs.MyDateRangePicker inputid="activeAt" />
      <Inputs.MyInput inputid="order_memo" />
      <Inputs.MyComboboxAsyncFK
        inputid="buyer_company_id"
        tableName="company"
        actionName="get_disposable_dropdown"
        preConditions={{ companyType: enums.companyType.internal }}
      />
      <Inputs.MyComboboxAsyncFK
        inputid="seller_company_id"
        tableName="company"
        actionName="get_disposable_dropdown"
        preConditions={{ companyType: enums.companyType.factory }}
      />
      <Inputs.MyComboboxFK
        inputid="follower_id"
        stateName="followerDropdown"
        optionLabel="userName"
        tableName="user"
      />
    </>
  );

  const renderAmountOut = (prev, curr) => {
    const num1 = parseFloat(prev) || 0
    const num2 = parseFloat(curr) || 0
    return (num1 + num2).toFixed(2)
  }

  const renderAmountIn = (prev, curr) => {
    const num1 = parseFloat(prev) || 0
    const num2 = parseFloat(curr) || 0
    return (num1 + num2).toFixed(2)
  }

  // >>> 下属付款记录 ---------------------------------------
  const headCells_financialTransactions = [
    { name: "id", disablePadding: true, className: "ml-2", width:80 },
    { name: "transdateAt", width: 170},
    { name: "amount_in", width:140, onWrap: renderAmountIn},
    { name: "amount_out", width:140, onWrap: renderAmountOut  },
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
    // ============================================= handles
    const handleOnDelete = (id, row, pagination, searchTerms) => {
      h_confirm("是否删除？").then((resolve) => {
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
        icon: ICONS.EDIT("mr-1"),
      },
      {
        label: "删除",
        color: "danger",
        onClick: handleOnDelete,
        icon: ICONS.DELETE(),
      },
    ];

    const toolbarButtons = [
      { label: "Create", url: CREATEURL, color: "success", icon: ICONS.ADD() },
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
        collapsePanel={collapsePanel}
        searchBar={searchBar}
      />
    );
  };

  // ============================================= propTypes

  // ============================================= Redux
  const actionCreators = {
    onDelete: dataActions._delete,
  };

  return connect(null, actionCreators)(CurrentPage);
};

export default withMouldcontractList();
