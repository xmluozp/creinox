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
  withDatatableStore,
} from "../../components";

import { withSimpleTable } from "../../components/SimpleTable";

// ******************************************************************* page setting
import { sellcontractActions as dataActions } from "../../_actions";
import {
  sellcontractModel as dataModel,
  buycontractModel,
  sellsubitemModel,
} from "../../_dataModel";

// ******************************************************************* page setting
// customized：在销售合同下面新增工厂采购合同

export const withSellcontractList = (
  EDITURL = "/contract/sellcontracts",
  CREATEURL = "/contract/sellcontracts/add"
) => {
  const CREATEURL_BUY = "/contract/buycontracts/add"
  // inject data
  const MyTable = withDatatableStore(
    CreinoxTable, // tablecomponent
    { data: "sellcontractData" }, // data source
    dataActions.get_bySearch // fetch action
  );

  // =============================== render cell
  const headCells = [
    { name: "id", disablePadding: true, className: "ml-2" },
    { name: "code", label: "销售合同号"  },
    { name: "activeAt" },
    { name: "deliverAt" },
    { name: "buyer_company_id" },
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
      <Inputs.MyInput inputid="code" />
      <Inputs.MyDateRangePicker inputid="activeAt" />
      <Inputs.MyInput inputid="ename" />
      <Inputs.MyComboboxFK
        inputid="buyer_company_id"
        label="外贸客户"
        optionLabel="name"
        tableName="company"
        stateName="dropdown_overseasCustomer"
        preConditions={{ companyType: enums.companyType.overseasCustomer }}
      />
      <Inputs.MyComboboxFK
        inputid="follower_id"
        optionLabel="userName"
        tableName="user"
      />
    </>
  );

  // =============================== SimpleTable (用简单表格展示)
  const headCells_buy = [
    { name: "id", disablePadding: true, className: "ml-2", width:80},
    { name: "code", width:150  },
    { name: "activeAt", width:120  },
    { name: "deliverAt", width:120 },
    { name: "seller_company_id" },
    { name: "totalPrice", width:150 },
    { name: "follower_id" , width:150},
  ];

  const renderCommodity = (content, row) => {
    return `[${row["commodity_id.row"].code}] ${row["commodity_id.row"].name}`
  }
  
  const renderPackAmount = (content, row) => {
    return `${row["packAmount"]} / ${row["unitType_id.row"].ename}`
  }

  const headCells_subitems = [
    { name: "id", disablePadding: true, className: "ml-2", width:80 },
    { name: "commodity_id", label: "商品", onShow: renderCommodity, minWidth: 250},
    { name: "buyerCode", width:150  },
    { name: "amount", width:120 },
    { name: "view_packAmount_unitType", align: "right", label:"包装数量/单位", onShow: renderPackAmount, width:200 },
    { name: "unitPrice", width:120 }  
  ];




  // 采购合同
  const Allcontracts_buyContract_list = withSimpleTable(
    headCells_buy,
    buycontractModel
  );

  const Allcontracts_subitems_list = withSimpleTable(
    headCells_subitems,
    sellsubitemModel
  );
  

  // 订单的子项
  // obj 这里是一个数组
  //
  const buyContract_rowButtons = [
    {
      label: "详情",
      color: "primary",
      url: "/contract/buycontracts",
      icon: ICONS.EDIT("mr-1"),
    }
  ];

  const collapsePanel = [
    {
      title: "销售的商品",
      name: "subitem_list",
      RenderComponent: Allcontracts_subitems_list,
      props: {
        tableTitle: "销售的商品",
        style: {
          backgroundColor: "#e6eff6",
          padding: 10,
        },
      },
    },
    {
      title: "采购合同",
      name: "buyContract_list",
      RenderComponent: Allcontracts_buyContract_list,
      props: {
        tableTitle: "采购合同",
        style: {
          backgroundColor: "#e6eff6",
          padding: 10,
        },
        rowButtons: buyContract_rowButtons,
      },
    },
  ];

  // **************************************************************************************************
  // **************************************************************************************************
  // ====================================== Component Render ==========================================
  // **************************************************************************************************
  // **************************************************************************************************

  const CurrentPage = ({ onDelete, pageName }) => {
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
        label: "采购",
        color: "success",
        url: CREATEURL_BUY,
        icon: ICONS.EDIT("mr-1"),
      },{
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
      }

    ];

    const toolbarButtons = [
      { label: "Create", url: CREATEURL, color: "success", icon: ICONS.ADD() },
    ];

    // ============================================= Render
    return (
      <MyTable
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

export default withSellcontractList();
