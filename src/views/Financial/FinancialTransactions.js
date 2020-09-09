import React, { useState, useEffect } from "react";

import _ from "lodash";
// import { format } from 'date-fns'
// import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

//------redux
import { connect } from "react-redux";
import { ICONS, enumsLabel } from "_constants";
import { h_confirm, history } from "_helper";
import { CreinoxTable, Inputs, withDatatableStore, ToolBar } from "components";
import Print from "components/Print";

// ******************************************************************* page setting
import {
  financialtransactionActions as dataActions,
  financialaccountActions,
} from "_actions";
import { financialtransactionModel as dataModel } from "_dataModel";

const DATASTORE = "financialtransactionData";

export const withTablePage = () => {
  // inject data
  const MyTable = withDatatableStore(
    CreinoxTable, // tablecomponent
    { data: DATASTORE }, // data source
    dataActions.get_bySearch // fetch action
  );

  // ============================================= render cell
  const renderOrderForm = (content, row) => {
    if (content) {
      return `[  ${
        enumsLabel.contractType[row["order_form_id.row"].contractType]
      }] ${row["order_form_id.row"].code}`;
    } else {
      return "无";
    }
  };

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
  
  const headCells = [
    { name: "id", disablePadding: true, className: "ml-2" },
    { name: "amount_in", onWrap: renderAmountIn },
    { name: "amount_out", onWrap: renderAmountOut },
    { name: "currency_id" },
    { name: "transdateAt" },
    { name: "balance" },
    { name: "tt_transUse" },

    { name: "order_form_id", onShow: renderOrderForm },
    { name: "memo" },
  ];

  // ============================================= Search Panel
  // 搜索框
  const searchBar = (
    <>
      <Inputs.MySwitch inputid="isContractPayment" />
      <Inputs.MyInput inputid="tt_transUse" />
      <Inputs.MyComboboxAsyncFK
        inputid="order_form_id"
        optionLabel="code"
        tableName="orderform"
        actionName="get_disposable_dropdown"/>

      <Inputs.MyInput inputid="bankaccountName" />
      <Inputs.MyInput inputid="bankaccountNo" />
      <Inputs.MyDateRangePicker inputid="transdateAt" />
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
  const CurrentPage = ({
    onDelete,
    onGetByIdAccount,
    dataByIdAccount,
    pageName,
    ...props
  }) => {
    const financialAccount_id =
      parseInt(_.get(props, "match.params.financialAccount_id")) || 0;
    const preConditions = { financialAccount_id };

    const EDITURL = "/financial/financialtransactions/" + financialAccount_id;
    const CREATEURL =
      "/financial/financialtransactions/" + financialAccount_id + "/add";

    // 切换的时候刷新
    const [toggle, setToggle] = useState(false);
    useEffect(() => {
      setToggle((prev) => !prev);
      onGetByIdAccount(financialAccount_id);
    }, [financialAccount_id]);

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

    const buttonPrint = (
      <Button color="secondary" variant="outlined" className="ml-1">
        打印银行对账表
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
      { label: "添加转账记录", url: CREATEURL, color: "primary" },
      { onRender: renderButtonPrint },
    ];

    // ============================================= Render
    return (
      <>
        <ToolBar buttons={topButtons} />
        <MyTable
          {...props}
          onRowDbClick={handleOnEdit}
          tableTitle={`${
            (dataByIdAccount &&
              dataByIdAccount.row &&
              dataByIdAccount.row.name) ||
            "[查找账户中...]"
          }转账记录`}
          preConditions={preConditions}
          toggle={toggle}
          headCells={headCells}
          dataModel={dataModel}
          rowButtons={rowButtons}
          searchBar={searchBar}
        />
      </>
    );
  };

  // ============================================= propTypes

  // ============================================= Redux
  function mapState(state) {
    return {
      dataByIdAccount: state.financialaccountData.dataById,
      errorById: state.financialaccountData.errorById,
    };
  }

  const actionCreators = {
    onDelete: dataActions._delete,
    onGetByIdAccount: financialaccountActions.get_byId,
    // onAlertNotify: alertActions.dispatchNotify
  };

  return connect(mapState, actionCreators)(CurrentPage);
};

export default withTablePage();
