import React from "react";

import _ from "lodash";
// import { format } from 'date-fns'
import TextField from "@material-ui/core/TextField";

//------redux
import { connect } from "react-redux";
import { ICONS } from "../../_constants";
import { h_confirm } from "../../_helper";
import { CreinoxTreeview, Inputs, withDatatableStore } from "../../components";

// ******************************************************************* page setting
import { categoryActions as dataActions, alertActions } from "../../_actions";
import { categoryModel as dataModel } from "../../_dataModel";

const EDITURL = "/product/category";
const CREATEURL = "/product/category";

// inject data
// ******************************************************************* page setting
const MyTreeview = withDatatableStore(
  CreinoxTreeview,               // tablecomponent
  { data: "categoryData" },       // data source
  dataActions.get_bySearch    // fetch action
);


const CurrentPage = ({ onDelete, pageName }) => {
  // ============================================= handles
  const handleOnDelete = (pagination, id) => {
    h_confirm("是否删除？").then(resolve => {
      if (resolve) onDelete(pagination, id);
    });
  };

  // ============================================= Table Settings
  const rowButtons = [
    { label: "修改", color: "primary", url: EDITURL, icon: ICONS.EDIT("mr-1") },
    {
      label: "删除",
      color: "danger",
      onClick: handleOnDelete,
      icon: ICONS.DELETE()
    }
  ];

  // ============================================= Render
  return (
    <MyTreeview 

    rowButtons = {rowButtons}
    />
  );
};


// ============================================= propTypes

// ============================================= Redux
const actionCreators = {
  onDelete: dataActions._delete,
};

export default connect(null, actionCreators)(CurrentPage);
