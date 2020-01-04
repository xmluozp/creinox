import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import _ from "lodash";
import InputAdornment from "@material-ui/core/InputAdornment";
import { connect } from "react-redux";

import { ICONS } from "../../_constants";
import { MyModalForm } from "../Modal";
// import { withDatatableStore } from "../withDatatableStore";

import { CreinoxTreeview } from "../Treeview";
import { regionActions, categoryActions } from "../../_actions";

// const MyTreeview = withDatatableStore(
//   CreinoxTreeview, // tablecomponent
//   { data: "regionData" }, // data source
//   dataActions.get_byRegion // fetch action
// );

// 基本的按钮，负责modal弹出
const CurrentPicker = React.memo(
  ({
    id,
    value,
    label = "输入",
    onChange = () => {}, //
    onSelect = () => {}, 
    error = false,
    helperText = "",
    fullWidth = true,
    disabled = false,
    data,
    onGetBySearch // 第一次打开获取数据
  }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNode, setSelectedNode] = useState({ id: value });

    // 初始化树，选中value所属节点
    useEffect(() => {
      if (!data) {
        onGetBySearch(0);
      } else if (data.rows) {
        const initSelectedNode = _.find(data.rows, ["id", value]);
        setSelectedNode(initSelectedNode);
      }
      return () => {};
    }, [data, value]);

    const handleModalClose = () => {
      setIsModalOpen(false);
    };
    const handleModalOpen = () => {
      if (!disabled) setIsModalOpen(true);
    };
    const handleOnSelect = node => {
      if (node && !disabled ) {
        onChange(null,id, node.id);
        if(typeof(onSelect)==='function') onSelect(node);
        setSelectedNode(node);
        setIsModalOpen(false);
      }
    };

    const displayText =
      selectedNode && selectedNode.name ? `${selectedNode.name} [${selectedNode.ename}]` : "";

    const PopupTree = (
      <CreinoxTreeview
        onSelect={handleOnSelect}
        initialNode={selectedNode}
        selectedNode={selectedNode}
        data={data}
        onGetBySearch={onGetBySearch}
      />
    );
    return (
      <>
        <MyModalForm
          isOpen={isModalOpen}
          title={label}
          onClose={handleModalClose}
          component={PopupTree}
        />
        <TextField
          fullWidth={fullWidth}
          error={!disabled && error}
          disabled={true}
          id={id}
          label={label}
          onClick={handleModalOpen}
          margin="dense"
          value={displayText}
          helperText={!disabled && helperText}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">{ICONS.PICK()}</InputAdornment>
            )
          }}
        />
      </>
    );
  }
);

function mapStateRegion(state) {
  return {
    data: state.regionData.data
  };
}
function mapStateCategory(state) {
  return {
    data: state.categoryData.data
  };
}

const actionCreatorsCategory = {
  onGetBySearch: categoryActions.get_treeNotesById
};
const actionCreatorsRegion = {
  onGetBySearch: regionActions.get_treeNotesById
};

export const MyRegionPicker = connect(mapStateRegion, actionCreatorsRegion)(CurrentPicker);
export const MyCategoryPicker = connect(mapStateCategory, actionCreatorsCategory)(CurrentPicker);
