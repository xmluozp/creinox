import React, { useEffect, useState } from "react";
import _ from "lodash";

import { Row, Col, Card, CardHeader } from "reactstrap";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

//------redux
import { connect } from "react-redux";
import { productActions as dataActions, categoryActions } from "../../_actions";
import { productModel as dataModel } from "../../_dataModel";
import { CreinoxForm, Inputs, TabPanel } from "../../components";
// import { enumsLabel } from "../../_constants";
import { history, h_fkFetch, h_filterImage } from "../../_helper";
import { EmbedProductPurchaseGroup } from "./EmbedProductPurchase";
import { EmbedProductComponent } from "./EmbedProductComponent";
import { EmbedCommodityFromProduct } from "./EmbedCommodityFromProduct";

import { ICONS } from "../../_constants";

const EDITURL = "/product/products";
// const LISTURL = EDITURL
const PURCHASEURL = "/product/productpurchases";

export const withProduct = () => {
  const CurrentPage = ({
    dataById,
    errorById,
    onPostCreate,
    onPutUpdate,
    onGetById,
    onRenewCategory,
    ...props
  }) => {
    const id = parseInt(_.get(props, "match.params.id")) || "";
    const isFromEdit = Number.isInteger(id) ? true : false;
    const [disabled, setdisabled] = useState(isFromEdit);
    const [tabSelect, setTabSelect] = React.useState(0);
    const [productInjector, setProductInjector] = useState(null);

    useEffect(() => {
      // if there is ID, fetch data
      if (id) {
        onGetById(id);
      }
    }, [onGetById, id]);

    // ********************************

    const handleTabChange = (event, newValue) => {
      setTabSelect(newValue);
    };

    const handleGetProductInjector = internalInjector => {
      // 把接到的productInjector放在state里备用。
      setProductInjector(internalInjector);
    };

    // 填入复制的产品
    const handleGetSourceProductOnChange = (e, element, id) => {
      if (id > 0) {
        // fetch disposable data
        h_fkFetch("product", [id], "get_disposable_byId")
          .then(response => {
            if (response && response.id) {
              delete response["id"];
              delete response["image_id"];
              delete response["image_id.row"];
              delete response["updateAt"];
              delete response["createAt"];
              delete response["updateUser_id"];

              productInjector(response);
            }
          })
          .catch(error => {
            console.log("搜索不到对应产品", error);
          });
      }
    };

    // 选择产品类型
    const handleCategorySelect = node => {
      if (node && node.prefix && node.currentCode) {
        let currentCodeInt = parseInt(node.currentCode, 10);
        currentCodeInt = Number.isInteger(currentCodeInt) ? currentCodeInt : 0;
        // prefix & ( padzero(currentCode + 1)) 前缀，当前最大数值加一补零
        productInjector({
          code: `${node.prefix}${_.padStart(
            currentCodeInt + 1,
            node.currentCode.length,
            "0"
          )}`
        });
      }
    };

    // 保存产品
    const handleOnSubmit = values => {
      if (isFromEdit) {
        // 如果没有新的图片，就不上传图片
        values = h_filterImage(values, "image_id.row");
        onPutUpdate(values);
      } else {
        // onPostCreate(values, history.location.pathname);
        onPostCreate(values, id => {
          // not using async. because I want loadingbar's codes put with callback codes
          onRenewCategory(0)
          history.push(EDITURL + "/" + id);
        });
      }
    };

    // =============== 编辑页加载的值 ====================================={
    const defaultValues = isFromEdit && dataById && dataById.row;

    // values when add new productPurchase
    const preConditionsOfProductPurchase = defaultValues && {
      product_id: id,
      spec1: defaultValues.spec1,
      spec2: defaultValues.spec2,
      spec3: defaultValues.spec3,

      polishing_id: defaultValues.polishing_id,
      texture_id: defaultValues.texture_id,
      thickness: defaultValues.thickness,
      unitWeight: defaultValues.unitWeight,
      isComponent: true
    };
    const embedRowButtons = [
      {
        label: "历史记录",
        color: "success",
        url: PURCHASEURL,
        icon: ICONS.HISTORY("mr-1")
      }
    ];
    // =============== 编辑页加载的值 =====================================}

    const basicProperties = (
      <CreinoxForm
        defaultValues={defaultValues}
        errors={errorById}
        isFromEdit={isFromEdit}
        actionSubmit={handleOnSubmit}
        dataModel={dataModel}
        onGetInjector={handleGetProductInjector}
      >
        <Grid container spacing={2}>
          <Grid item lg={8} md={8} xs={12}>
            <Grid container spacing={2}>
              <Grid item lg={8} md={8} xs={12}>
                <Inputs.MyComboboxAsyncFK
                  tableName="product"
                  label="参考产品"
                  actionName="get_disposable_dropdown"
                  disabled={disabled}
                  onChange={handleGetSourceProductOnChange}
                />
              </Grid>
              <Grid item lg={4} md={4} xs={12}>
                <Inputs.MySwitch inputid="isOEM" disabled={disabled} />
              </Grid>
              <Grid item lg={8} md={8} xs={12}>
                <Inputs.MyCategoryPicker
                  inputid="category_id"
                  disabled={disabled}
                  onSelect={handleCategorySelect}
                />
              </Grid>
              <Grid item lg={4} md={8} xs={12}>
                <Inputs.MyInput inputid="code" disabled={disabled} />
              </Grid>

              <Grid item lg={8} md={8} xs={12}>
                <Inputs.MyInput inputid="name" disabled={disabled} />
              </Grid>
              <Grid item lg={4} md={4} xs={12}>
                <Inputs.MyInput inputid="shortname" disabled={disabled} />
              </Grid>
              <Grid item lg={8} md={8} xs={12}>
                <Inputs.MyInput inputid="ename" disabled={disabled} />
              </Grid>
              <Grid item lg={4} md={4} xs={12}>
                <Inputs.MyInput inputid="eshortname" disabled={disabled} />
              </Grid>

              <Grid item lg={6} md={4} xs={12}>
                <Inputs.MyInput inputid="spec1" disabled={disabled} />
              </Grid>
              <Grid item lg={6} md={4} xs={12}>
                <Inputs.MyInput inputid="spec2" disabled={disabled} />
              </Grid>
              <Grid item lg={6} md={4} xs={12}>
                <Inputs.MyInput inputid="spec3" disabled={disabled} />
              </Grid>
              <Grid item lg={6} md={4} xs={12}>
                <Inputs.MyInput inputid="barcode" disabled={disabled} />
              </Grid>

              <Grid item lg={6} xs={12}>
                <Inputs.MyComboboxPolishing
                  inputid="polishing_id"
                  disabled={disabled}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <Inputs.MyComboboxTexture
                  inputid="texture_id"
                  disabled={disabled}
                />
              </Grid>

              <Grid item lg={6} md={4} xs={12}>
                <Inputs.MyInput inputid="thickness" disabled={disabled} />
              </Grid>
              <Grid item lg={6} md={4} xs={12}>
                <Inputs.MyInput inputid="unitWeight" disabled={disabled} />
              </Grid>

              <Grid item lg={12} md={12} xs={12}>
                <Inputs.MyInput
                  inputid="memo"
                  multiline
                  rows={1}
                  disabled={disabled}
                />
              </Grid>

              {/* 资料责任人信息 */}
              <Grid item lg={6} xs={12}>
                <Inputs.MyComboboxFK
                  inputid="retriever_id"
                  optionLabel="userName"
                  tableName="user"
                  disabled={disabled}
                />
              </Grid>

              <Grid item lg={6} xs={12}>
                <Inputs.MyDatePicker
                  inputid="retrieveTime"
                  disabled={disabled}
                />
              </Grid>

              {/* 资料录入人信息 */}
              {isFromEdit ? (
                <>
                  <Grid item lg={4} xs={12}>
                    <Inputs.MyComboboxFK
                      inputid="updateUser_id"
                      optionLabel="userName"
                      tableName="user"
                      disabled={true}
                    />
                  </Grid>
                  <Grid item lg={4} xs={12}>
                    <Inputs.MyDatePicker inputid="updateAt" disabled={true} />
                  </Grid>
                  <Grid item lg={4} xs={12}>
                    <Inputs.MyDatePicker inputid="createAt" disabled={true} />
                  </Grid>
                </>
              ) : null}

              {/* 是否生成商品 */}
              {!isFromEdit ? (
                <Grid item lg={12} md={12} xs={12}>
                  <Inputs.MySwitch
                    inputid="isCreateCommodity"
                    disabled={disabled}
                  />
                </Grid>
              ) : null}
            </Grid>
          </Grid>
          <Grid item lg={4} md={4} xs={12}>
            <Grid container spacing={2}>
              <Inputs.MyImage inputid="image_id.row" disabled={disabled} />
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {isFromEdit && ( // only show edit button when update
            <Grid item>
              <Inputs.MyEditButton
                disabled={disabled}
                setdisabled={setdisabled}
              />
            </Grid>
          )}
          {disabled || ( // when browsering, hide save button
            <Grid item>
              <Button type="submit" variant="contained" color="primary">
                保存
              </Button>
            </Grid>
          )}
        </Grid>
      </CreinoxForm>
    );

    // ============================= 主框架
    return (
      <>
        <div className="animated fadeIn">
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <strong>
                    <i className="icon-info pr-1"></i>id: {id}
                  </strong>
                </CardHeader>

                <Tabs
                  value={tabSelect}
                  style={{ borderBottom: "1px solid #E0E0E0" }}
                  onChange={handleTabChange}
                  aria-label="tabs"
                >
                  <Tab label="基本属性" />
                  <Tab label="工厂报价" disabled={!isFromEdit} />
                  <Tab label="由什么部件构成" disabled={!isFromEdit} />
                  <Tab label="是什么产品的部件" disabled={!isFromEdit} />
                  <Tab label="商品信息" disabled={!isFromEdit} />
                </Tabs>

                {/* main form */}
                <TabPanel value={tabSelect} index={0}>
                  {basicProperties}
                </TabPanel>
                <TabPanel value={tabSelect} index={1}>
                  <EmbedProductPurchaseGroup
                    rowButtons={embedRowButtons}
                    preConditions={{ product_id: id }}
                    isBorder={false}
                    modalFormCreateProps={{
                      preConditions: preConditionsOfProductPurchase
                    }}
                  />
                </TabPanel>
                <TabPanel value={tabSelect} index={2}>
                  <EmbedProductComponent product_id={id} isParent={true} />
                </TabPanel>
                <TabPanel value={tabSelect} index={3}>
                  <EmbedProductComponent product_id={id} isParent={false} />
                </TabPanel>
                <TabPanel value={tabSelect} index={4}>
                  <EmbedCommodityFromProduct product_id={id} />
                </TabPanel>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  };

  // ============================================= Redux

  function mapState(state) {
    return {
      dataById: state.productData.dataById,
      errorById: state.productData.errorById
    };
  }

  const actionCreators = {
    onPostCreate: dataActions.post_create,
    onRenewCategory: categoryActions.get_treeNotesById,
    onPutUpdate: dataActions.put_update,
    onGetById: dataActions.get_byId
  };

  return connect(mapState, actionCreators)(CurrentPage);
};

export default withProduct();
