import React from "react";

// import _ from "lodash";
// import { format } from 'date-fns'
// import TextField from "@material-ui/core/TextField";

//------redux
import { connect } from "react-redux";
import { ICONS } from "_constants";
import { h_confirm, history } from "_helper";
import { CreinoxTable,Inputs, withDatatableStore } from "components";

// ******************************************************************* page setting
import { paymentrequestActions as dataActions } from "_actions";
import { paymentrequestModel as dataModel } from "_dataModel";


const EDITURL = "/dailyBusinesses/paymentRequests";
const CREATEURL = "/dailyBusinesses/paymentRequests/add";
const DATASTORE = "paymentrequestData";

export const withTablePage = () => {
  // inject data
  const MyTable = withDatatableStore(
    CreinoxTable, // tablecomponent
    { data: DATASTORE }, // data source
    dataActions.get_bySearch // fetch action
  );

  // ============================================= render cell
  const renderStatus = (content, row) => {
    return <span style={{color: ["blue", "green", "red"][row.status || 0]}}>
      {content}
    </span>
  }

  const headCells = [
    { name: "id", disablePadding: true, className: "ml-2" },
    { name: "requestType" },
    { name: "tt_transUse" },
    { name: "to_companyName" },
    { name: "bankaccountName" },
    { name: "bankaccountNo" },
    { name: "amount" },
    { name: "currency_id" },
    { name: "paymentType_id" },
    { name: "status", onShow: renderStatus },
  ];

  // ============================================= Search Panel
  // 搜索框
  const searchBar = (
    <>
      <Inputs.MyInputRange inputid="amount" />
      <Inputs.MyInput inputid="to_companyName" />
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
      <>
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
