import React, {useState} from "react";

// import _ from "lodash";

//------redux
import { connect } from "react-redux";

import { ICONS, enums } from "_constants";
import { h_confirm } from "_helper";
import { CreinoxTable, Inputs, withDatatableStore } from "components";
import { history } from "_helper";

// ******************************************************************* page setting
import { productActions as dataActions } from "_actions";
import { productModel as dataModel } from "_dataModel";

// ******************************************************************* page setting

/**
 * 产品列表。扩展功能有：可以切换成图片列表；搜索条件包含关联表的
 * @param {} pageCategoryId 
 * @param {*} EDITURL 
 * @param {*} CREATEURL 
 */
export const withProductList = (
  pageCategoryId = 0,
  EDITURL = "/product/products",
  CREATEURL = "/product/products/add",
) => {
  // inject data
  const MyTable = withDatatableStore(
    CreinoxTable, // tablecomponent
    { data: "productData" }, // data source
    dataActions.get_bySearch // fetch action
  );

  const CurrentPage = ({ onDelete, pageName, ...props }) => {

    const [isImageListMode, setIsImageListMode] = useState(false)
    const preConditions = pageCategoryId ? { category_id: pageCategoryId } : {}

    // ============================================= handles
    const handleOnDelete = (id, row, pagination, searchTerms) => {
      h_confirm("是否删除？").then(resolve => {
        if (resolve) onDelete(id, pagination, searchTerms);
      });
    };

    const handleToggleMode = () => {
      setIsImageListMode(!isImageListMode)
    }

    const handleOnEdit = (id) => {
      history.push(`${EDITURL}/${id}`);
    };
    const handleImageListMapping = (rows) => {
      
      const newDataRows =  rows && rows.map(item=> {
        return {...item["image_id.row"], name: item.name, url: `${EDITURL}/${item.id}`} || null;
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
      { name: "spec1" }
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
      {...props}
        onRowDbClick={handleOnEdit}
        tableTitle={pageName}
        headCells={headCells}
        dataModel={dataModel}
        isImageListMode={isImageListMode}
        onImageListMapping={handleImageListMapping}
        preConditions={preConditions} // 假如需要选择分类的话，需要改造
        rowButtons={rowButtons}
        toolbarButtons={toolbarButtons}
        searchBar={searchBar}
      />
    );
  };

  // ============================================= Search Panel
  // 搜索框
  // DONETODO: 根据工厂搜索产品
  const searchBar = (
    <>
      <Inputs.MyCategoryPicker inputid="category_id" />
      <Inputs.MyInput inputid="code" />

       {/* 这里看的是客户的产品。看客户商品另外 */}
      <Inputs.MyInput inputid="comodity.code" />
      <Inputs.MyComboboxAsyncFK
        inputid="companyFactory.id"
        tableName="company"
        actionName="get_disposable_dropdown"
        preConditions={{ companyType: enums.companyType.factory }}
      />

      <Inputs.MyComboboxFK
        inputid="retriever_id"
        optionLabel="userName"
        tableName="user"
      />
      <Inputs.MyDateRangePicker inputid="retrieveTime" />
    </>
  );

  // ============================================= propTypes

  // ============================================= Redux
  const actionCreators = {
    onDelete: dataActions._delete
  };

  return connect(null, actionCreators)(CurrentPage);
};

export default withProductList();
