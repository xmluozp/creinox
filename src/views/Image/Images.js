import React from "react";

// import _ from "lodash";
// import { format } from 'date-fns'
// import TextField from "@material-ui/core/TextField";

//------redux
import { connect } from "react-redux";
import { ICONS } from "_constants";
import { h_confirm, h_popfile } from "_helper";
import { CreinoxTable, Inputs, withDatatableStore } from "components";
import {ImageThumbLink } from "components/ImageThumb"

// ******************************************************************* page setting
import { imageActions as dataActions } from "_actions";
import { imageModel as dataModel } from "_dataModel";

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
    return (<ImageThumbLink image = {row} />);
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
  const CurrentPage = ({ onDeleteMultiple, pageName, ...props }) => {
    // ============================================= handles
    const handleSelectAction = (list,pagination) => {
      console.log("批量删除的paginaion",pagination)
      h_confirm("是否批量删除？").then(resolve => {
        if (resolve) onDeleteMultiple(list, pagination);
      });      
    };

    const handleOnEdit = (id, row) => {
      h_popfile(row.path)
      // window.open(row.path , "_blank");
    };

    const selectBox = {
      icon: ICONS.DELETE(),
      title: "批量删除",
      onAction: handleSelectAction
    };

    // ============================================= Table Settings
    // const rowButtons = [
    //   {
    //     label: "删除",
    //     color: "danger",
    //     onClick: handleOnDelete,
    //     icon: ICONS.DELETE()
    //   }
    // ];

    // ============================================= Render
    return (
      <>
        <MyTable
        {...props}
          onRowDbClick={handleOnEdit}
          tableTitle={pageName}
          headCells={headCells}
          dataModel={dataModel}
          searchBar={searchBar}
          selectBox={selectBox}

        />
      </>
    );
  };

  // ============================================= propTypes

  // ============================================= Redux
  const actionCreators = {
    onDeleteMultiple: dataActions._deleteMultiple
    // onAlertNotify: alertActions.dispatchNotify
  };

  return connect(null, actionCreators)(CurrentPage);
};

export default withTablePage();
