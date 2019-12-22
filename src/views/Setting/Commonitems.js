import React, { useState } from "react";

import _ from "lodash";
//------redux
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";

import { ICONS, enumsLabel } from "../../_constants";
import { h_confirm, history } from "../../_helper";
import {
  CreinoxTable,
  Inputs,
  TabVertical,
  withDatatableStore
} from "../../components";

// ******************************************************************* page setting
import { commonitemActions as dataActions, alertActions } from "../../_actions";
import { commonitemModel as dataModel } from "../../_dataModel";

const LISTURL = "/commonitems/commonitemsList";
const EDITURL = "/commonitems/commonitems";
const CREATEURL = "/commonitems/commonitem";
const DATASTORE = "commonitemData";

// inject data
const MyTable = withDatatableStore(
  CreinoxTable, // tablecomponent
  { data: DATASTORE }, // data source
  dataActions.get_bySearch // fetch action
);

// ============================================= render cell

const headCells = [
  { name: "id", disablePadding: true, className: "ml-2" },
  { name: "name" },
  { name: "ename" },
  { name: "commonType" },
  { name: "sorting" },
  { name: "memo" },
  {
    name: "isActive",
    align: "center",
    className: { true: "text-success", false: "text-danger" },
    lookup: { true: ICONS.TRUE("mr-4"), false: ICONS.FALSE("mr-4") }
  }
];

// ============================================= Search Panel
// 搜索框
const searchBar = (
  <>
    <Inputs.MyInput inputid="name" />
    <Inputs.MyInput inputid="ename" />
  </>
);

// ******************************************************************* page setting

/**
 * Basic page for list
 * @param {} param0
 */
const CurrentPage = ({ onDelete, pageName, ...props }) => {

  const defaultCommonType = parseInt(_.get(props, "match.params.commonType")) || 0;

  const [preCondition, setPreCondition] = useState({commonType:defaultCommonType})
  const [toggle, setToggle] = useState(false)

  

  // ============================================= handles
  const handleOnDelete = (pagination, id) => {
    h_confirm("是否删除？").then(resolve => {
      if (resolve) onDelete(pagination, id);
    });
  };

  const handleOnEdit = (pagination, id) => {
    history.push(`${EDITURL}/${id}`);
  };

  const handleOnSelectCommonType = (commonTypeIndex) => {
    // setCommonType(commonTypeIndex); // 跳转edit的时候用
    setPreCondition({commonType: commonTypeIndex}); // 设置precondition为了toggle用
    history.push(`${LISTURL}/${commonTypeIndex}`); // 标记url的param。从edit返回用

    setToggle(!toggle); // 强迫table reload
  }
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

  const toolbarButtons = [
    {
      label: "Create",
      url: `${CREATEURL}/${defaultCommonType}`,
      color: "success",
      icon: ICONS.ADD()
    }
  ];

  const commonTypeOptions = enumsLabel.commonType.map((label, index) => {
    return { label: label, value: index };
  });

  // ============================================= Render
  return (
    <>
      <Grid container spacing={2}>
        <Grid item lg={2} xs={12}>

          <TabVertical
            options={commonTypeOptions}
            value={defaultCommonType}
            onSelect={handleOnSelectCommonType}
          />
        </Grid>
        <Grid item lg={10} xs={12}>
          <MyTable
            onRowDbClick={handleOnEdit}
            tableTitle={enumsLabel.commonType[defaultCommonType]}
            preConditions={preCondition}
            headCells={headCells}
            dataModel={dataModel}
            rowButtons={rowButtons}
            toolbarButtons={toolbarButtons}
            searchBar={searchBar}
            toggle= {toggle}
          />
        </Grid>
      </Grid>
    </>
  );
};

// ============================================= propTypes

// ============================================= Redux
const actionCreators = {
  onDelete: dataActions._delete,
  onAlertNotify: alertActions.dispatchNotify
};

export default connect(null, actionCreators)(CurrentPage);
