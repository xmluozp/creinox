import React, {useState} from "react";

// import _ from "lodash";

//------redux
import { connect } from "react-redux";

import { ICONS, enums } from "../../_constants";
import { h_confirm } from "../../_helper";
import { CreinoxTable, Inputs, withDatatableStore } from "../../components";
import { history } from "../../_helper";

// ******************************************************************* page setting
import { productActions as dataActions, alertActions } from "../../_actions";
import { productModel as dataModel } from "../../_dataModel";

// ******************************************************************* page setting

export const withProductList = (
  pageCategoryId = 0,
  EDITURL = "/product/products",
  CREATEURL = "/product/product",
) => {
  // inject data
  const MyTable = withDatatableStore(
    CreinoxTable, // tablecomponent
    { data: "productData" }, // data source
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
      { name: "spec1" }
    ];

    // ============================================= Table Settings
    const rowButtons = [
      {
        label: "修改",
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
        preConditions={{ category_id: pageCategoryId }}
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

       {/* 这里看的是客户的产品。看客户商品另外 */}
      <Inputs.MyInput inputid="comodity.code" />
      <Inputs.MyComboboxFK
        inputid="companyFactory.id"
        label="工厂"
        optionLabel="name"
        tableName="company"
        stateName="dropdown_factory"
        params={{ companyType: enums.companyType.factory }}
      />
      <Inputs.MyComboboxFK
        inputid="companyDomesticCustomer.id"
        label="内销客户"
        optionLabel="name"
        tableName="company"
        stateName="dropdown_domesticCustomer"
        params={{ companyType: enums.companyType.domesticCustomer }}
      />

      <Inputs.MyComboboxFK
        inputid="companyOverseasCustomer.id"
        label="外贸客户"
        optionLabel="name"
        tableName="company"
        stateName="dropdown_overseasCustomer"
        params={{ companyType: enums.companyType.overseasCustomer }}
      />

      <Inputs.MyComboboxFK
        inputid="retriever_id"
        optionLabel="userName"
        tableName="user"
      />
      <Inputs.MyDateRangePicker inputid="retriveTime" />
    </>
  );

  // ============================================= propTypes

  // ============================================= Redux
  const actionCreators = {
    onDelete: dataActions._delete,
    onAlertNotify: alertActions.dispatchNotify
  };

  return connect(null, actionCreators)(CurrentPage);
};

export default withProductList();
