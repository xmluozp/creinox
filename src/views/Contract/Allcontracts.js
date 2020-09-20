import React, {useState} from "react";

// import _ from "lodash";
// import { format } from 'date-fns'
// import TextField from "@material-ui/core/TextField";
import formatCurrency from "format-currency";

//------redux
import { connect } from "react-redux";
import { ICONS, enums } from "_constants";
import { h_confirm, history, h_datetimeToJs_middle } from "_helper";
import {
  CreinoxTable,
  Inputs,
  // TabVertical, // 第三级菜单用
  withDatatableStore,
  ToolBar,
} from "components";

import { withSimpleTable } from "components/SimpleTable";

// ******************************************************************* page setting
import { sellcontractActions as dataActions } from "_actions";
import {
  sellcontractModel as dataModel,
  buycontractModel,
  sellsubitemModel,
  financialtransactionModel,
} from "_dataModel";

// ******************************************************************* page setting
// customized：在销售合同下面新增工厂采购合同

export const withSellcontractList = (
  EDITURL = "/contract/sellcontracts",
  CREATEURL = "/contract/sellcontracts/add"
) => {
  const CREATEURL_BUY = "/contract/buycontracts/add"
  const CREATEURL_TRANSACTION = "/financial/contractTransactions/add"
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
      <Inputs.MyInputRange inputid="totalPrice" />
      <Inputs.MyInput inputid="code" />
      <Inputs.MyDateRangePicker inputid="activeAt" />
      <Inputs.MyComboboxAsyncFK
        inputid="buyer_company_id"
        tableName="company"
        actionName="get_disposable_dropdown"
        preConditions={{ companyType: enums.companyType.overseasCustomer }}
      />
      <Inputs.MyComboboxFK
        inputid="follower_id"
        stateName="followerDropdown"
        optionLabel="userName"
        tableName="user"
      />
    </>
  );

  // =============================== SimpleTable (用简单表格展示) 子表

  // >>> 下属采购合同 ---------------------------------------
  const headCells_buy = [
    { name: "id", disablePadding: true, className: "ml-2", width:80},
    { name: "code", width:150  },
    { name: "activeAt", width:120  },
    { name: "deliverAt", width:120 },
    { name: "buyer_company_id" },
    { name: "seller_company_id" },
    { name: "totalPrice", width:150 },
    { name: "follower_id" , width:150},
  ];

  // 采购合同
  const Allcontracts_buyContract_list = withSimpleTable({
    headCells: headCells_buy,
    dataModel: buycontractModel
  });

  const buyContract_rowButtons = [
    {
      label: "详情",
      color: "primary",
      url: "/contract/buycontracts",
      icon: ICONS.EDIT("mr-1"),
    }
  ];

  // >>> 下属产品 ---------------------------------------
  const renderCommodity = (content, row) => {
    return `[${row["commodity_id.row"].code}] ${row["commodity_id.row"].ename}`
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

  const Allcontracts_subitems_list = withSimpleTable({
    headCells: headCells_subitems,
    dataModel: sellsubitemModel
  });

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
    { name: "transdateAt", width: 190, onShow: v => h_datetimeToJs_middle(v)},
    { name: "amount_in", width:130, onWrap: renderAmount, onShowWrap: renderWrap},
    { name: "amount_out", width:130, onWrap: renderAmount, onShowWrap: renderWrap },
    { name: "currency_id", width:100},
    { name: "financialAccount_id", width:200 },
    { name: "bankaccountName", width:200 },
    { name: "bankaccountNo", width:220 },
    { name: "tt_transUse"},
  ];


  const Allcontracts_financialTransaction_list = withSimpleTable({
    headCells: headCells_financialTransactions,
    dataModel: financialtransactionModel
  });
  
  const Allcontracts_financialTransaction_list_buyContract = withSimpleTable({
    headCells: headCells_financialTransactions,
    dataModel: financialtransactionModel
  });
  

  // 订单的子项
  // obj 这里是一个数组
  //


  const collapsePanel = [
    {
      title: "销售转账记录",
      name: "financialTransaction_list",
      RenderComponent: Allcontracts_financialTransaction_list,
      props: {
        tableTitle: "销售转账记录",
        style: {
          backgroundColor: "#e6eff6",
          padding: 10,
        },
      },
    },
    {
      title: "商品",
      name: "subitem_list", // 单条记录中取list，对应的key. (后台需要把list塞进这个key)
      RenderComponent: Allcontracts_subitems_list,
      props: {
        tableTitle: "商品",
        style: {
          backgroundColor: "#e6eff6",
          padding: 10,
        },
      },
    },
    {
      title: "采购转账记录",
      name: "financialTransaction_list_buyContract",
      RenderComponent: Allcontracts_financialTransaction_list_buyContract,
      props: {
        tableTitle: "采购转账记录",
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

  const CurrentPage = ({ onDelete, pageName, ...props }) => {

    const [showAll, setShowAll] = useState(false)

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
      },{
        label: "采购录入",
        color: "success",
        url: CREATEURL_BUY,
        icon: ICONS.ADD("mr-1"),
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
    onDelete: dataActions._delete,
  };

  return connect(null, actionCreators)(CurrentPage);
};

export default withSellcontractList();
