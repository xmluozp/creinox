import React, { useEffect, useState } from "react";
import _ from "lodash";

import { Row, Col, Card, CardHeader } from "reactstrap";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

//------redux
import { connect } from "react-redux";
import { commodityActions as dataActions } from "../../_actions";
import { commodityModel as dataModel } from "../../_dataModel";
import { CreinoxForm, Inputs, TabPanel } from "../../components";
// import { enumsLabel } from "../../_constants";
import { history, h_fkFetch, h_filterImage } from "../../_helper";

import { ICONS } from "../../_constants";

const EDITURL = "/commodity/commodities";
// const LISTURL = EDITURL

export const withProduct = () => {
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

    // 从产品搜索字段填入
    const handleGetSourceProductOnChange = (e, element, id) => {
      // fetch disposable data
      h_fkFetch("product", [id], "get_disposable_byId")
        .then(response => {
          if (response && response.id) {
            productInjector({
              product_id: response.id,
              code: response.code,
              name: response.name,
              ename: response.ename,
              shortname: response.ename,
              eshortname: response.eshortname,
              price: response.sellPrice
            });
          }
        })
        .catch(error => {
          console.log("搜索不到对应产品", error);
        });
    };

    // 保存
    const handleOnSubmit = values => {
      if (isFromEdit) {
        // 如果没有新的图片，就不上传图片
        // values = h_filterImage(values, "image_id.row");
        onPutUpdate(values);
      } else {
        // onPostCreate(values, history.location.pathname);
        onPostCreate(values, id => {
          // not using async. because I want loadingbar's codes put with callback codes
          history.push(EDITURL + "/" + id);
        });
      }
    };

    // =============== 编辑页加载的值 ====================================={
    const defaultValues = isFromEdit && dataById && dataById.row;

    // 搜索下属产品时候的条件
    const preConditionsOfProducts = defaultValues && {
      commodity_id: id
    };

    // =============== 编辑页加载的值 =====================================}

    // 排版参考原系统“商品合并”
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
                  label="从现有产品复制属性"
                  actionName="get_disposable_dropdown"
                  disabled={disabled}
                  onChange={handleGetSourceProductOnChange}
                />
              </Grid>

              <Grid item lg={8} md={8} xs={12}>
                <Inputs.MyCategoryPicker
                  inputid="category_id"
                  disabled={disabled}
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

              <Grid item lg={12} md={12} xs={12}>
                <Inputs.MyInput
                  inputid="memo"
                  multiline
                  rows={1}
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
            </Grid>
          </Grid>
          <Grid item lg={4} md={4} xs={12}>
            <Grid container spacing={2}>
              <Inputs.MyImage inputid="image_id.row" disabled={true} />
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
                  <Tab label="对应产品（生产侧信息）" disabled={!isFromEdit} />
                </Tabs>

                {/* main form */}
                <TabPanel value={tabSelect} index={0}>
                  {basicProperties}
                </TabPanel>
                <TabPanel value={tabSelect} index={1}>
                  一个选择框可以搜索添加多个关联产品。下面是产品列表，关联的每一个产品都显示在列表中。每个列表项都可链接到相应的产品详情页。一个按钮用于解除关联
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
      dataById: state.commodityData.dataById,
      errorById: state.commodityData.errorById
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
