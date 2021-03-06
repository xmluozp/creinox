import React, { useState } from "react";

import _ from "lodash";
//------redux
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";

import { ICONS, enumsLabel } from "_constants";
import { h_confirm, history } from "_helper";
import {
  CreinoxTable,
  Inputs,
  TabVertical,
  withDatatableStore
} from "components";

// ******************************************************************* page setting
import { commonitemActions as dataActions } from "_actions";
import { commonitemModel as dataModel } from "_dataModel";

const LISTURL = "/commonitems/commonitemsList";
const EDITURL = "/commonitems/commonitemsList";
const CREATEURL = "/commonitems/commonitemsList";
const DATASTORE = "commonitemData";

export const withTablePage = () => {
  // inject data
  const MyTable = withDatatableStore(
    CreinoxTable, // tablecomponent
    { data: DATASTORE }, // data source
    dataActions.get_bySearch // fetch action
  );

  // =============================== render cell

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

  // =============================== Search Panel
  // 搜索框
  const searchBar = (
    <>
      <Inputs.MyInput inputid="name" />
      <Inputs.MyInput inputid="ename" />
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
    // 3rd navigation: define
    const currentCommonType =
      parseInt(_.get(props, "match.params.commonType")) || 0;

    const [preCondition, setPreCondition] = useState({
      commonType: currentCommonType
    });
    const [toggle, setToggle] = useState(false);

    // =============================== handles
    const handleOnDelete = (id, row, pagination, searchTerms) => {
      h_confirm("是否删除？").then(resolve => {
        if (resolve) onDelete(id, pagination, searchTerms);
      });
    };

    const handleOnEdit = (id) => {
      history.push(`${EDITURL}/${currentCommonType}/${id}`);
    };

    // 3rd navigation: handle page switch
    const handleOnSelectCommonType = commonTypeIndex => {

      setPreCondition({ commonType: commonTypeIndex }); // 设置precondition为了toggle用

      // 清空历史记录（否则为了方便编辑与返回上一页，历史记录会记住当前页面和搜索结果，导致切换分类时换不过去）
      // 200729 放在table里面toggle的地方清空
      // h_removeHistoryQuery(h_getTableUniqueCode(dataModel.dataStore,  enumsLabel.commonType[currentCommonType]))

      history.push(`${LISTURL}/${commonTypeIndex}`); // 标记url的param。从edit返回用

      setToggle(prev => !prev); // 强迫table reload
    };
    // =============================== Table Settings
    const rowButtons = [
      {
        label: "详情",
        color: "primary",
        url: `${EDITURL}/${currentCommonType}`,
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
      {
        label: "Create",
        url: `${CREATEURL}/${currentCommonType}/add`,
        color: "success",
        icon: ICONS.ADD()
      }
    ];

    // 3rd navigation: menu
    const commonTypeOptions = enumsLabel.commonType.map((label, index) => {
      return { label: label, value: index };
    });

    return (
      <>
        <Grid container spacing={2}>
          <Grid item lg={2} xs={12}>
            <TabVertical
              options={commonTypeOptions}
              value={currentCommonType}
              onSelect={handleOnSelectCommonType}
            />
          </Grid>
          <Grid item lg={10} xs={12}>
            <MyTable
            {...props}
              onRowDbClick={handleOnEdit}
              tableTitle={enumsLabel.commonType[currentCommonType]}
              preConditions={preCondition}
              headCells={headCells}
              dataModel={dataModel}
              rowButtons={rowButtons}
              toolbarButtons={toolbarButtons}
              searchBar={searchBar}
              toggle={toggle}

            />
          </Grid>
        </Grid>
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
