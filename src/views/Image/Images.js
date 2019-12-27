import React from "react";

import _ from "lodash";
// import { format } from 'date-fns'
// import TextField from "@material-ui/core/TextField";

//------redux
import { connect } from "react-redux";
import { ICONS } from "../../_constants";
import { h_confirm } from "../../_helper";
import { CreinoxTable, Inputs, withDatatableStore } from "../../components";

// ******************************************************************* page setting
import { imageActions as dataActions } from "../../_actions";
import { imageModel as dataModel } from "../../_dataModel";

const DATASTORE = "imageData";

export const withTablePage = () => {
  // inject data
  const MyTable = withDatatableStore(
    CreinoxTable, // tablecomponent
    { data: DATASTORE }, // data source
    dataActions.get_bySearch // fetch action
  );

  // ============================================= render cell
  const renderOnShowThumbnail = (content, row) => {
    return (<a href={row.path} rel="noopener noreferrer" target="_blank"><img src={content} height={100} alt={row.name}/></a>);
  };

  const headCells = [
    { name: "id", disablePadding: true, className: "ml-2" },
    { name: "name" },
    { name: "path" },
    { name: "thumbnailPath", onShow: renderOnShowThumbnail },
    { name: "gallary_folder_id.memo", label:"对应图册" },
  ];

  // ============================================= Search Panel
  // 搜索框
  const searchBar = (
    <>
      <Inputs.MyInput inputid="name" />
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
  const CurrentPage = ({ onDelete, onDeleteMultiple, pageName }) => {
    // ============================================= handles
    const handleOnDelete = (pagination, id) => {
      h_confirm("是否删除？").then(resolve => {
        if (resolve) onDelete(pagination, id);
      });
    };
    const handleSelectAction = list => {
      h_confirm("是否批量删除？").then(resolve => {
        if (resolve) onDeleteMultiple({}, list);
      });      
    };

    const handleOnEdit = (pagination, id, row) => {
      window.open(row.path , "_blank");
    };

    const selectBox = {
      icon: ICONS.DELETE(),
      title: "批量删除",
      onAction: handleSelectAction
    };

    // ============================================= Table Settings
    const rowButtons = [
      {
        label: "删除",
        color: "danger",
        onClick: handleOnDelete,
        icon: ICONS.DELETE()
      }
    ];

    // ============================================= Render
    return (
      <>
        <MyTable
          onRowDbClick={handleOnEdit}
          tableTitle={pageName}
          headCells={headCells}
          dataModel={dataModel}
          rowButtons={rowButtons}
          searchBar={searchBar}
          selectBox={selectBox}
        />
      </>
    );
  };

  // ============================================= propTypes

  // ============================================= Redux
  const actionCreators = {
    onDelete: dataActions._delete,
    onDeleteMultiple: dataActions._deleteMultiple
    // onAlertNotify: alertActions.dispatchNotify
  };

  return connect(null, actionCreators)(CurrentPage);
};

export default withTablePage();
