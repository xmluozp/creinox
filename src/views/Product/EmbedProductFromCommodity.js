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
import { commodityActions as dataActions } from "_actions";
import { productModel as dataModel, } from "_dataModel";
import { Button } from "reactstrap";

// ******************************************************************* page setting

/**
 * 产品列表。扩展功能有：可以切换成图片列表；搜索条件包含关联表的
 * @param {} pageCategoryId
 * @param {*} EDITURL
 * @param {*} CREATEURL
 */
const withProductCommodityList = (EDITURL = "/product/products") => {
  // inject data
  const MyTable = withDatatableStore(
    CreinoxTable, // tablecomponent
    { data: "commodityData.data_getproduct" }, // data source
    dataActions.get_bySearch_getProduct // fetch action
  );

  const CurrentPage = ({
    onDisassemble,
    onAssemble,
    onGetBySearch,
    pageName,
    commodity_id = 0,
    product_id = 0,
    isParent = true,
    ...props
  }) => {
    const [isImageListMode, setIsImageListMode] = useState(false);
    const [selectedId, setSelectedId] = useState();

    const preConditions = { commodity_id: commodity_id };

    // ============================================= handles
    const handleOnDisassemble = (pagination, row) => {
      h_confirm("是否解除绑定？").then(resolve => {
        if (resolve) onDisassemble(pagination, {commodity_id, product_id: row.id});
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
      const newSelectedId = (item && item.id) || 0
      setSelectedId(newSelectedId);
    };

    const handleAssemble = () => {
      onAssemble({ commodity_id, product_id: selectedId }, () => {
        onGetBySearch({}, preConditions); 
      });
    };

    const renderOnShowIsMeta = (content, row) => {

      if(row.id === product_id) {
        return <span className = "text-danger">产品本身</span>
      } else {
        return <span className = " text-success">附加产品</span>
      }
    };
    // ============================================= render cell

    const headCells = [
      { name: "id", disablePadding: true, className: "ml-2" },
      {
        name: "isMeta",
        align: "center",
        label: "商品组合",
        onShow: renderOnShowIsMeta,
        disablePadding: true, 
      },
      { name: "code" },
      { name: "name" },
      { name: "ename" },
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
        icon: ICONS.DELETE(),
        onShow: (row)=> {
            return {disabled:row.id === product_id} // 主产品不可解绑
        }
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
        {isParent && (
          <Grid container spacing={2}>
            <Grid item lg={12} md={12} xs={12}>
              <Inputs.MyComboboxAsyncFK
                inputid = "temp_product"
                tableName="product"
                label="搜索附加产品"
                 // 取的下拉列表包括其它商品的元产品。本应排除自己的元产品，但可以从后台限制。就不用多此一举了
                actionName="get_disposable_dropdown" 
                value = {selectedId}
                onSelect={handleGetTargetProductId}
              />
            </Grid>
            <Grid item lg={4} md={4} xs={12}>
              <Button onClick={handleAssemble} className="btn-success"> 绑定附加产品 </Button>
            </Grid>
          </Grid>
        )}
        <MyTable
        {...props}
          onRowDbClick={handleOnEdit}
          tableTitle={pageName}
          headCells={headCells}
          dataModel={dataModel}
          isBorder={false}
          isImageListMode={isImageListMode}
          onImageListMapping={handleImageListMapping}
          preConditions={preConditions}
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
    onGetBySearch: dataActions.get_bySearch_getProduct
  };

  return connect(null, actionCreators)(CurrentPage);
};

export const EmbedProductFromCommodity = withProductCommodityList();
