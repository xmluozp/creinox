import React, { useState } from "react";

// import _ from "lodash";

//------redux
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";

import { ICONS } from "_constants";
import { h_confirm } from "_helper";
import { CreinoxTable, withDatatableStore, Inputs } from "components";
import { history } from "_helper";

// ******************************************************************* page setting
import { productActions as dataActions } from "_actions";
import { productModel as dataModel } from "_dataModel";
import { Button } from "reactstrap";

// ******************************************************************* page setting

/**
 * 产品列表。扩展功能有：可以切换成图片列表；搜索条件包含关联表的
 * @param {} pageCategoryId
 * @param {*} EDITURL
 * @param {*} CREATEURL
 */
const withProductList = (
  EDITURL = "/product/products",
) => {
  // inject data
  const MyTable = withDatatableStore(
    CreinoxTable, // tablecomponent
    { data: "productData" }, // data source
    dataActions.get_bySearch_component // fetch action
  );

  const CurrentPage = ({
    onDisassemble,
    onAssemble,
    onBySearch,
    pageName,
    product_id = 0,
    isParent = true,
    ...props
  }) => {
    const [isImageListMode, setIsImageListMode] = useState(false);
    const [selectedId, setSelectedId] = useState();

    const preConditions = isParent
      ? { parent_id: product_id }
      : { child_id: product_id };

    const tableTitle = isParent
    ? "产品由哪些部件构成"
    : "是什么产品的部件";
    // ============================================= handles
    const handleOnDisassemble = (pagination, row) => {
      h_confirm("是否解除部件？").then(resolve => {
        const parent_id = isParent ? product_id : row.id;
        const child_id = isParent ? row.id : product_id;

        if (resolve) onDisassemble({parent_id, child_id}, pagination);
      });
    };

    const handleToggleMode = () => {
      setIsImageListMode(!isImageListMode);
    };

    const handleOnEdit = (id) => {
      history.push(`${EDITURL}/${id}`);
    };
    const handleImageListMapping = rows => {
      const newDataRows =
        rows &&
        rows.map(item => {
          return { ...item["image_id.row"], name: item.name, url: `${EDITURL}/${item.id}` } || null;
        });
      return newDataRows;
    };

    const handleGetTargetProductId = (item) => {

      const selectedId = (item && item.id) || 0
      setSelectedId(selectedId);
    };

    const handleAssemble = () => {
      const parent_id = isParent ? product_id : selectedId;
      const child_id = isParent ? selectedId : product_id;

      onAssemble({ parent_id, child_id }, () => {

        onBySearch({}, {parent_id: parent_id})
      });
    };

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
        icon: ICONS.EDIT("mr-1"),
        onShow: () => {
          return {target: '_blank'}
        }
      },
      {
        label: "解绑",
        color: "danger",
        onClick: handleOnDisassemble,
        icon: ICONS.DELETE()
      }
    ];

    const toolbarButtons = [
      {
        label: "Create",
        onClick: handleToggleMode,
        color: "default",
        icon: !isImageListMode ? ICONS.IMAGE() : ICONS.LIST()
      }
    ];

    // ============================================= Render
    return (
      <>
        {isParent &&
            <Grid container spacing={2}>
            <Grid item lg={12} md={12} xs={12}>
                <Inputs.MyComboboxAsyncFK
                inputid = "temp_product"
                tableName="product"
                label="用产品货号搜索部件"
                value = {selectedId}
                actionName="get_disposable_dropdown"
                onSelect={handleGetTargetProductId}
                />
            </Grid>
            <Grid item lg={4} md={4} xs={12}>
                <Button onClick={handleAssemble}  className="btn-success"> 添加部件 </Button>
            </Grid>
            </Grid>
        }
        <MyTable
          {...props}
          onRowDbClick={handleOnEdit}
          tableTitle={tableTitle}
          headCells={headCells}
          dataModel={dataModel}
          isBorder={false}
          isImageListMode={isImageListMode}
          onImageListMapping={handleImageListMapping}
          preConditions={preConditions} // 假如需要选择分类的话，需要改造
          rowButtons={rowButtons}
          toolbarButtons={toolbarButtons}
        />
      </>
    );
  };

  // ============================================= Search Panel
  // 搜索框

  // ============================================= propTypes

  // ============================================= Redux
  const actionCreators = {
    onDisassemble: dataActions._delete_disassemble,
    onAssemble: dataActions.post_create_assemble,
    onBySearch: dataActions.get_bySearch_component,
  };

  return connect(null, actionCreators)(CurrentPage);
};

export const EmbedProductComponent = withProductList();
