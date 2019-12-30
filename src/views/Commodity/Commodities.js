import React, {useState} from "react";

// import _ from "lodash";

//------redux
import { connect } from "react-redux";

import { ICONS, enums } from "../../_constants";
import { h_confirm } from "../../_helper";
import { CreinoxTable, Inputs, withDatatableStore } from "../../components";
import { history } from "../../_helper";

// ******************************************************************* page setting
import { commodityActions as dataActions } from "../../_actions";
import { commodityModel as dataModel } from "../../_dataModel";

// ******************************************************************* page setting

/**
 * 产品列表。扩展功能有：可以切换成图片列表；搜索条件包含关联表的
 * @param {} pageCategoryId 
 * @param {*} EDITURL 
 * @param {*} CREATEURL 
 */
export const withCommodityList = (
  pageCategoryId = 0,
  EDITURL = "/commodity/commodities",
  CREATEURL = "/commodity/commodity",
) => {
  // inject data
  const MyTable = withDatatableStore(
    CreinoxTable, // tablecomponent
    { data: "commodityData" }, // data source
    dataActions.get_bySearch // fetch action
  );

  const CurrentPage = ({ onDelete, pageName }) => {

    const [isImageListMode, setIsImageListMode] = useState(false)


    // ============================================= handles
    const handleOnDelete = (pagination, id) => {
      h_confirm("是否删除？").then(resolve => {
        if (resolve) onDelete(pagination, id);
      });
    };

    const handleToggleMode = () => {
      setIsImageListMode(!isImageListMode)
    }

    const handleOnEdit = (pagination, id) => {
      history.push(`${EDITURL}/${id}`);
    };
    const handleImageListMapping = (rows) => {
      
      const newDataRows =  rows && rows.map(item=> {
        return {...item["image_id.row"], name: item.name} || null;
      })
      return newDataRows
    }


    // ============================================= render cell

    const headCells = [
      { name: "id", disablePadding: true, className: "ml-2" },
      { name: "code" },
      { name: "name" },
      { name: "shortname" },
      { name: "ename" },
      { name: "price" }
    ];

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
      { label: "Create", onClick: handleToggleMode, color: "default", icon: !isImageListMode? ICONS.IMAGE(): ICONS.LIST() },
      { label: "Create", url: CREATEURL, color: "success", icon: ICONS.ADD() }
    ];

    // ============================================= Render
    return (
      <MyTable
        onRowDbClick={handleOnEdit}
        tableTitle={pageName}
        headCells={headCells}
        dataModel={dataModel}
        isImageListMode={isImageListMode}
        onImageListMapping={handleImageListMapping}
        preConditions={{ category_id: pageCategoryId }} // 假如需要选择分类的话，需要改造
        rowButtons={rowButtons}
        toolbarButtons={toolbarButtons}
        searchBar={searchBar}
      />
    );
  };

  // ============================================= Search Panel
  // 搜索框
  const searchBar = (
    <>
      <Inputs.MyCategoryPicker inputid="category_id" />
      <Inputs.MyInput inputid="code" />
      <Inputs.MyComboboxFK
        inputid="companyDomesticCustomer.id"
        label="内销客户"
        optionLabel="name"
        tableName="company"
        stateName="dropdown_domesticCustomer"
        preConditions={{ companyType: enums.companyType.domesticCustomer }}
      />

      <Inputs.MyComboboxFK
        inputid="companyOverseasCustomer.id"
        label="外贸客户"
        optionLabel="name"
        tableName="company"
        stateName="dropdown_overseasCustomer"
        preConditions={{ companyType: enums.companyType.overseasCustomer }}
      />
    </>
  );

  // ============================================= propTypes

  // ============================================= Redux
  const actionCreators = {
    onDelete: dataActions._delete
  };

  return connect(null, actionCreators)(CurrentPage);
};

export default withCommodityList();
