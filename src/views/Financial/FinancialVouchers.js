import React, {useState, useEffect} from "react";

import _ from "lodash";
// import { format } from 'date-fns'
// import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

//------redux
import { connect } from "react-redux";
import { ICONS, enumsLabel } from "_constants";
import { h_confirm, history } from "_helper";
import { CreinoxTable,Inputs, withDatatableStore, ToolBar } from "components";
import Print from "components/Print";

// ******************************************************************* page setting
import { financialvoucherActions as dataActions } from "_actions";
import { financialvoucherModel as dataModel } from "_dataModel";

const DATASTORE = "financialvoucherData";

export const withTablePage = () => {
  // inject data
  const MyTable = withDatatableStore(
    CreinoxTable, // tablecomponent
    { data: DATASTORE }, // data source
    dataActions.get_bySearch // fetch action
  );

  const renderFinancialLedger = (content, row) => {

    // 科目去掉根目录
    let ledger = (row["financialLedger_id.row"] && row["financialLedger_id.row"].ledgerName) || content || "";
    const ledgerSplit = ledger.split('/')
    if(ledgerSplit.length > 1) {
      ledgerSplit.shift()
      ledger = ledgerSplit.join('/')
    }
    
    return ledger
  }

  // ============================================= render cell

  const headCells = [
    { name: "id", disablePadding: true, className: "ml-2" },
    { name: "financialAccount_id" },
    { name: "createAt" },
    { name: "word" },
    { name: "number" },
    { name: "memo" },
    { name: "financialLedger_id", onShow: renderFinancialLedger },
    { name: "debit" },
    { name: "credit" }
  ];

  // ============================================= Search Panel
  // 搜索框
  const searchBar = (
    <>
      <Inputs.MyComboboxFK
        inputid="financialAccount_id"
        optionLabel="name"
        tableName="financialaccount"
      />
      <Inputs.MyInput inputid="word" />     
      <Inputs.MyInput inputid="number" />    
      <Inputs.MyDateRangePicker inputid="createAt" />
      <Inputs.MyFinancialLedgerPicker inputid="financialLedger_id"/>
      <Inputs.MyInputTT inputid="memo" />  

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
  const CurrentPage = ({ onDelete, pageName, ...props }) => {

    const EDITURL = "/financial/financialvouchers"
    const CREATEURL = "/financial/financialvouchers/add";

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

    const buttonPrint = (
      <Button color="secondary" variant="outlined" className="ml-1">
        打印凭证
      </Button>
    );

    const renderButtonPrint = (key) => (
      <Print
        dataModel={dataModel}
        isSearchResult={true}
        key={key}
        onRender={buttonPrint}
      />
    );

    const topButtons = [
      { onRender: renderButtonPrint },
    ];

    const toolbarButtons = [
      { label: "Create", url: CREATEURL, color: "success", icon: ICONS.ADD() }
    ];


    // ============================================= Render
    return (
      <>
        <ToolBar buttons={topButtons} />
        <MyTable
        {...props}
          onRowDbClick={handleOnEdit}
          tableTitle="转账凭证"
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
