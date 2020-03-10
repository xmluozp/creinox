import React, { useState, useEffect } from "react";

// import _ from "lodash";

//------redux
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import { ICONS } from "../../_constants";
import { h_confirm } from "../../_helper";
import {
  CreinoxTable,
  CreinoxForm,
  withDatatableStore,
  Inputs
} from "../../components";
import { history } from "../../_helper";

// ******************************************************************* page setting
import { commodityActions as dataActions } from "../../_actions";
import { commodityModel as dataModel } from "../../_dataModel";
import { Button } from "reactstrap";

// ******************************************************************* page setting

/**
 * 产品列表。扩展功能有：可以切换成图片列表；搜索条件包含关联表的
 * @param {} pageCategoryId
 * @param {*} EDITURL
 * @param {*} CREATEURL
 */
const withCommodityFromProductList = (EDITURL = "/commodity/commodities") => {
  // inject data
  const MyTable = withDatatableStore(
    CreinoxTable, // tablecomponent
    { data: "commodityData.data_getcommodity" }, // data source
    dataActions.get_bySearch_getCommodity // fetch action
  );

  const CurrentPage = ({
    onDisassemble,
    onDelete,
    onGetBySearch,
    pageName = "包含此产品的商品/组合商品",
    onPostCreate,
    onPutUpdate,
    errorById,
    onGetById,
    dataById,
    product_id = 0,
    isParent = true
  }) => {
    const [isImageListMode, setIsImageListMode] = useState(false);
    const preConditions = { product_id: product_id };
    const defaultValues = (dataById && dataById.row) || null;
    // const defaultValues = null;
    const commodity_id = defaultValues && defaultValues.id;

    useEffect(() => {
      // if there is ID, fetch data
      if (product_id) {
        onGetById(0, product_id, true); // get one commodity by product + isMeta
      }
    }, [onGetById, product_id]);

    // ============================================= handles
    const handleOnDisassembleMeta = () => {
      h_confirm(
        "是否取消商品化？(如果该商品是组合商品，所有下属子产品都会解除绑定; 不会影响到部件的绑定状态)"
      ).then(resolve => {
        if (resolve) onDelete(commodity_id);
      }).then(()=>{
        onGetById(0, product_id, true);
      });
    };

    const handleOnDisassemble = () => {
      h_confirm("是否解除单项绑定？").then(resolve => {
        if (resolve) onDisassemble({}, { commodity_id, product_id });
      });
    };

    const handleAssembleMeta = () => {
      onPostCreate({ product_id: product_id }, () => {
        onGetBySearch({}, preConditions);
        onGetById(0, product_id, true);
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
          return { ...item["image_id.row"], name: item.name } || null;
        });
      return newDataRows;
    };

    const handleOnSubmit = values => {
        onPutUpdate(values);
    };

    // const renderOnShowIsMeta = (content, row) => {
    //   return row.product_id === product_id && ICONS.TRUE("mr-4 text-success");
    // };

    // product_id
    // ============================================= render cell

    const headCells = [
      { name: "id", disablePadding: true, className: "ml-2" },
      // {
      //   name: "isMeta",
      //   align: "center",
      //   label: "主产品",
      //   onShow: renderOnShowIsMeta,
      //   disablePadding: true
      // },
      { name: "code" },
      { name: "name" }
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
        onShow: row => {
          return { disabled: commodity_id === row.product_id }; // 主产品不可解绑。只可以下架
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
          {defaultValues ? 
          <Paper variant="outlined" style={{ padding: 10 }}>
            <Grid container spacing={2}>
              <Grid item lg={12} md={12} xs={12}>
              <CreinoxForm
                    defaultValues={defaultValues}
                    errors={errorById}
                    isFromEdit={true}
                    actionSubmit={handleOnSubmit}
                    dataModel={dataModel}
                  >
                    <Grid container spacing={2}>
                      <Grid item lg={4} md={4} xs={12}>
                        <Inputs.MyInput inputid="name" />
                      </Grid>

                      <Grid item lg={8} md={8} xs={12}>
                        <Inputs.MyInput inputid="memo" multiline rows={1} />
                      </Grid>

                      <Grid item lg={12} md={12} xs={12}>
                        
                        <Button type="submit" className="mr-2" color="primary">保存商品信息</Button>
                        <Button onClick={handleOnDisassembleMeta} className="btn-danger">取消商品化</Button>
                      </Grid>
                    </Grid>
                  </CreinoxForm>
              </Grid>
            </Grid>
          </Paper>: <Button onClick={handleAssembleMeta} className="btn-success">设置为商品</Button>
          }

        
        <MyTable
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

  // ============================================= propTypes

  // ============================================= Redux
  function mapState(state) {
    return {
      dataById: state.commodityData.dataById,
      errorById: state.commodityData.errorById
    };
  }

  const actionCreators = {
    onDisassemble: dataActions._delete_disassemble,
    onDelete: dataActions._delete,
    onPostCreate: dataActions.post_create,
    onPutUpdate: dataActions.put_update,
    onGetBySearch: dataActions.get_bySearch_getCommodity,
    onGetById: dataActions.get_byId
  };

  return connect(mapState, actionCreators)(CurrentPage);
};

export const EmbedCommodityFromProduct = withCommodityFromProductList();
