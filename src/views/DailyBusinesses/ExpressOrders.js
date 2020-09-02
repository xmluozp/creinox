import React from "react";

// import _ from "lodash";
// import { format } from 'date-fns'
// import TextField from "@material-ui/core/TextField";

//------redux
import { connect } from "react-redux";
import { ICONS, enumsLabel, enums} from "_constants";
import { h_confirm, history } from "_helper";
import { CreinoxTable,Inputs, withDatatableStore } from "components";

// ******************************************************************* page setting
import { expressorderActions as dataActions } from "_actions";
import { expressorderModel as dataModel } from "_dataModel";


const EDITURL = "/dailyBusinesses/expressOrders";
const CREATEURL = "/dailyBusinesses/expressOrders/add";
const DATASTORE = "expressorderData";

export const withTablePage = () => {
  // inject data
  const MyTable = withDatatableStore(
    CreinoxTable, // tablecomponent
    { data: DATASTORE }, // data source
    dataActions.get_bySearch // fetch action
  );

  // ============================================= render cell
  const renderDirection = (content, row) => {
    return row.direction === 0 ? 
    <span className="text-success">{content} &rarr;</span> : 
    <span className="text-danger">&larr; {content}</span>
  }
  const renderInternal = (content, row) => {
    return row.direction === 0 ? 
    <span className="text-success">{content}</span> : 
    <span className="text-danger">{content}</span>
  }
  
  const renderExternal = (content, row) => {
    return row.direction === 0 ? 
    <span className="text-success">{content}</span> : 
    <span className="text-danger">{content}</span>
  }
  
  const headCells = [
    { name: "id", disablePadding: true, className: "ml-2" },
    { name: "createAt" },
    { name: "code" },
    { name: "expressType" },
    { name: "internal_company_id", onShow: renderInternal },
    { name: "direction", onShow: renderDirection },
    { name: "external_company_id", onShow: renderExternal},
  ];

  // ============================================= Search Panel
  // 搜索框
  const searchBar = (
    <>
      <Inputs.MyInput inputid="code" />
      <Inputs.MySelect options={enumsLabel.direction} inputid="direction"/>
      <Inputs.MyDateRangePicker inputid="createAt" />
      <Inputs.MyDateRangePicker inputid="expressAt" />
      <Inputs.MyComboboxAsyncFK
        inputid="external_company_id"
        tableName="company"
        actionName="get_disposable_dropdown"
        preConditions={{ companyType: enums.companyType.all }}
      />  
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
