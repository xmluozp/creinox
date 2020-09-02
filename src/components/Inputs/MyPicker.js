import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import _ from "lodash";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";

import { connect } from "react-redux";


import { ICONS } from "../../_constants";
import { MyModalForm } from "../Modal";
// import { withDatatableStore } from "../withDatatableStore";

import { CreinoxTreeview } from "../Treeview";
import { regionActions, categoryActions, financialledgerActions } from "../../_actions";

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
    onSelect,
    onRender,
    onRenderTreeNodes,
    error = false,
    helperText = "",
    fullWidth = true,
    disabled = false,
    data,
    onGetBySearch, // 第一次打开获取数据
    subName = "ename",
    mainName= "name",
    ...props
  }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNode, setSelectedNode] = useState({ id: value });
    const [text, setText] = useState("");

    // 初始化树，选中value所属节点
    useEffect(() => {
      if (!data) {
        onGetBySearch(0);
      } else if (data.rows) {
        const initSelectedNode = _.find(data.rows, ["id", value]);
        setSelectedNode(initSelectedNode);

        // 生成的文字
        if  (typeof onRender === "function") {
          setText(onRender(initSelectedNode, data.rows));
        } else {
          setText(renderDefaultText(initSelectedNode));
        }

      }
      return () => {};
    }, [data, value]);

    const handleModalClose = () => {
      setIsModalOpen(false);
    };
    const handleModalOpen = () => {
      if (!disabled) setIsModalOpen(true);
    };

    const handleOnSelect = (node, rows) => {
      if (node && !disabled) {

        // 送给外部的value
        onChange(null, id, node.id);
        if (typeof onSelect === "function") onSelect(node, rows);

        // 下次打开时，默认选中的节点
        setSelectedNode(node);

        // 生成的文字
        if  (typeof onRender === "function") {
          setText(onRender(node, rows));
        } else {
          setText(renderDefaultText(node));
        }


        // 关闭选单        
        setIsModalOpen(false);
      }
    };

    // 显示的内容
    const renderDefaultText = (node) => {
      const subTitle = node && node[subName] ? `[${node[subName]}] ` : ""
      const displayText =
      node && node.name
        ? `${subTitle}${node[mainName]}`
        : "";

      return displayText
    }

    const PopupTree = (
      <CreinoxTreeview
        onSelect={handleOnSelect}
        initialNode={selectedNode}
        selectedNode={selectedNode}
        data={data}
        onRender = {onRenderTreeNodes}
        mainName = {mainName}
        subName = {subName}
        onGetBySearch={onGetBySearch}
        {...props}
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
          disabled={disabled}
          id={id}
          label={label}
          onClick={handleModalOpen}
          margin="dense"
          value={text}
          placeholder = "未选择"
          helperText={!disabled && helperText}
          inputProps={
            {
              onKeyDown: () => {},
              onFocus: e => e.target.blur(),
            }
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" >
                <IconButton size="small"  disabled={disabled}>
                  {ICONS.TREE()}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </>
    );
  }
);

function mapStateRegion(state) {
  return {
    data: state.regionData.data,
  };
}
function mapStateCategory(state) {
  return {
    data: state.categoryData.data,
  };
}
function mapStateFinancialLedger(state) {
  return {
    data: state.financialledgerData.data,
  };
}



const actionCreatorsCategory = {
  onGetBySearch: categoryActions.get_treeNotesById,
};
const actionCreatorsRegion = {
  onGetBySearch: regionActions.get_treeNotesById,
};
const actionCreatorsFinancialLedger = {
  onGetBySearch: financialledgerActions.get_treeNotesById,
};




// =======================================================

const MyRegionPickerWrapper = (props) => {
  return (
    <CurrentPicker
      {...props}
      searchColumns={["name", "ename", "telPrefix", "code"]}
    />
  );
};
const MyCategoryPickerWrapper = (props) => {

  return (
    <CurrentPicker
      {...props}
      subName="prefix"

      searchColumns={["name", "ename", "prefix"]}
    />
  );
};
const MyFinancialLedgerPickerWrapper = (props) => {

  // 显示财务科目
  const handleOnRenderFinancialLedger = (node, rows) => {
    // if (!node) return "";

    // const map = new Map();

    // // 整棵树变成map
    // for (let i = 0; i < rows.length; i++) {
    //   if (!rows[i].id) continue;
    //   map.set(rows[i].id.toString(), rows[i].name);
    // }

    // const pathArr = (node["path"] && node["path"].split(",")) || [];
    // if (pathArr[0] === "0") pathArr.shift();

    // for (let i = 0; i < pathArr.length; i++) {
    //   pathArr[i] = map.get(pathArr[i]);
    // }
    // pathArr.push(node["name"]);

    // return pathArr.join("/");

    if(node && node.ledgerName) {

      const nameArr = node.ledgerName.split('/')
      const cate = nameArr.shift()

      const newLedgerName = `[${cate}] ` + (nameArr ? nameArr.join('/') : "")

      return newLedgerName
    } else {
      return ""
    }
  };


  return (
    <CurrentPicker
      {...props}
      onRender={handleOnRenderFinancialLedger}
      subName="code"
      searchColumns={["name", "code"]}
    />
  );
};

export const MyRegionPicker = connect(
  mapStateRegion,
  actionCreatorsRegion
)(MyRegionPickerWrapper);

export const MyCategoryPicker = connect(
  mapStateCategory,
  actionCreatorsCategory
)(MyCategoryPickerWrapper);

export const MyFinancialLedgerPicker = connect(
  mapStateFinancialLedger,
  actionCreatorsFinancialLedger
)(MyFinancialLedgerPickerWrapper);
