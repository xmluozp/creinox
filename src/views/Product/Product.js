import React, { useEffect, useState } from "react";
import _ from "lodash";

import { Row, Col, Card, CardHeader } from "reactstrap";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

//------redux
import { connect } from "react-redux";
import { productActions as dataActions } from "../../_actions";
import { productModel as dataModel } from "../../_dataModel";
import { CreinoxForm, Inputs, TabPanel, Gallery } from "../../components";
// import { enumsLabel } from "../../_constants";
import { history, h_fkFetch, h_filterImage } from "../../_helper";

export const withProduct = (EDITURL = "/product/products") => {
  const CurrentPage = ({
    dataById,
    errorById,
    onPostCreate,
    onPutUpdate,
    onGetById,
    ...props
  }) => {
    const id = parseInt(_.get(props, "match.params.id")) || "";
    const isFromEdit = Number.isInteger(id) ? true : false;
    const [disabled, setdisabled] = useState(isFromEdit);
    const [tabSelect, setTabSelect] = React.useState(0);
    const [injector, setInjector] = useState(null);

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

    const handleGetInjector = internalInjector => {
      // 把接到的injector放在state里备用。
      setInjector(internalInjector);
    };

    const handleGetSourceProductOnChange = (e, element, id) => {
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

            injector(response);
          }
        })
        .catch(error => {
          console.log("搜索不到对应产品", error);
        });
    };

    const handleCategorySelect = node => {
      if (node && node.prefix && node.currentCode) {
        let currentCodeInt = parseInt(node.currentCode, 10);
        currentCodeInt = Number.isInteger(currentCodeInt) ? currentCodeInt : 0;
        // prefix & ( padzero(currentCode + 1)) 前缀，当前最大数值加一补零
        injector({
          code: `${node.prefix}${_.padStart(
            currentCodeInt + 1,
            node.currentCode.length,
            "0"
          )}`
        });
      }
    };

    const handleOnSubmit = values => {
      if (isFromEdit) {

        // 如果没有新的图片，就不上传图片   
        values = h_filterImage(values, "image_id.row")

        onPutUpdate(values);
      } else {
        // onPostCreate(values, history.location.pathname);
        onPostCreate(values, id => {
          // not using async. because I want loading bar's codes put with callback codes
          history.push(EDITURL + "/" + id);
        });
      }
    };

    const inputsOfBasicProperties = (
      <>
        {/* 基本信息 */}
        <Grid item lg={4} md={4} xs={12}>
          <Inputs.MySwitch inputid="isOEM" disabled={disabled} />
        </Grid>
        <Grid item lg={8} md={8} xs={12}>
          <Inputs.MyComboboxAsyncFK
            tableName="product"
            label="参考产品"
            actionName="get_disposable_dropdown"
            disabled={disabled}
            onChange={handleGetSourceProductOnChange}
          />
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
          <Inputs.MyComboboxTexture inputid="texture_id" disabled={disabled} />
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
          <Inputs.MyDatePicker inputid="retriveTime" disabled={disabled} />
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
      </>
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
                  <Tab label="商品属性(销售侧)" disabled={!isFromEdit} />
                </Tabs>

                {/* main form */}
                <TabPanel value={tabSelect} index={0}>
                  <CreinoxForm
                    defaultValues={
                      isFromEdit && dataById && { ...dataById.row }
                    }
                    errors={errorById}
                    isFromEdit={isFromEdit}
                    actionSubmit={handleOnSubmit}
                    dataModel={dataModel}
                    onGetInjector={handleGetInjector}
                  >
                    <Grid container spacing={2}>
                      <Grid item lg={8} md={8} xs={12}>
                        <Grid container spacing={2}>
                          {inputsOfBasicProperties}
                        </Grid>
                      </Grid>
                      <Grid item lg={4} md={4} xs={12}>
                        <Grid container spacing={2}>
                          <Inputs.MyImage
                            inputid="image_id.row"
                            disabled={disabled}
                          />
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
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                          >
                            保存
                          </Button>
                        </Grid>
                      )}
                    </Grid>
                  </CreinoxForm>
                </TabPanel>
                <TabPanel value={tabSelect} index={1}>
                  {/* <Contacts preConditions={{ product_id: id }} /> */}
                  工厂信息
                </TabPanel>
                <TabPanel value={tabSelect} index={2}>
                  由什么产品构成
                </TabPanel>
                <TabPanel value={tabSelect} index={3}>
                  可以组成什么产品
                  {/* <Contacts preConditions={{ product_id: id }} /> */}
                </TabPanel>
                <TabPanel value={tabSelect} index={4}>
                  商品属性(销售侧)
                  {/* <BankaccountsCompany preConditions={{ product_id: id }} /> */}
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
    onPutUpdate: dataActions.put_update,
    onGetById: dataActions.get_byId
  };

  return connect(mapState, actionCreators)(CurrentPage);
};

export default withProduct();
