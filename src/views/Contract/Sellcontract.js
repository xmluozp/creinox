import React, { useEffect, useState } from "react";
import _ from "lodash";

import { Row, Col, Card, CardHeader } from "reactstrap";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import formatCurrency from "format-currency";

//------redux
import { connect } from "react-redux";
import { sellcontractActions as dataActions } from "_actions";
import { sellcontractModel as dataModel } from "_dataModel";
import { CreinoxForm, Inputs, TabPanel } from "components";
import { enumsLabel, enums } from "_constants";
import { history, h_fkFetch, authCheckUser } from "_helper";

import Sellsubitems from "./Sellsubitems";
const AUTHNAME_CONFORM = "confirm-payment"

export const withSellcontract = (EDITURL = "/contract/sellcontracts") => {
  const CurrentPage = ({
    dataById,
    errorById,
    onPostCreate,
    onPutUpdate,
    onGetById,
    onGetDefaultCode,
    onGetInvoiceCode,
    onClear,
    user,
    ...props
  }) => {
    const id = parseInt(_.get(props, "match.params.id")) || "";
    const isFromEdit = Number.isInteger(id) ? true : false;
    const [disabled, setdisabled] = useState(isFromEdit);
    const [tabSelect, setTabSelect] = React.useState(0);

    const handleTabChange = (event, newValue) => {
      setTabSelect(newValue);
    };

    useEffect(() => {
      // if there is ID, fetch data
      if (id) {
        onGetById(id);
      }

      return () => {
        onClear();
      };
    }, [onGetById, id]);

    // ********************************

    const handleOnSubmit = (values) => {
      if (isFromEdit) {
        onPutUpdate(values);
      } else {
        // onPostCreate(values, history.location.pathname);
        onPostCreate(values, (id) => {
          history.push(EDITURL + "/" + id);
        });
      }
    };

    // ******************************** injector: 用来读取最近一条合同
    const [injector, setInjector] = useState(null);
    const handleGetInjector = (inj) => {
      setInjector(inj);
    };

    const handleOnRead = () => {
      h_fkFetch("sellcontract", [], "get_last")
        .then((response) => {
          if (response && response.id) {
            delete response["id"];
            delete response["updateAt"];

            delete response["totalPrice"];
            delete response["paidPrice"];
            delete response["isDone"];
            
            injector(response);
          }
        })
        .catch((error) => {
          console.log("暂时没有合同记录", error);
        });
    };

    const handleOnGetDefaultCode = async () => {
      const defaultValue = await onGetDefaultCode();
      return defaultValue;
    };

    const handleOnGetInvoiceCode = async () => {
      const defaultValue = await onGetInvoiceCode();
      return defaultValue;
    };

    // 选择公司注入地址，销售合同优先注入英文地址
    const handleSellerSelect = (item) => {
      injector(oldValues => {

        if(item && (item.address || item.eaddress)) {
          return {
            sellerAddress: item.eaddress || item.address
          }
        }
      })
    }

    const handleBuySelect = (item) => {
      injector(() => {
        if(item && (item.address || item.eaddress)) {
          return {
            buyerAddress: item.eaddress || item.address
          }
        }
      })
    }

    let defaultData = isFromEdit && dataById && { ...dataById.row };
    const locked = defaultData && defaultData.isDone === true && !authCheckUser(user, AUTHNAME_CONFORM)

    return (
      <>
        {/* 主框架 */}
        <div className="animated fadeIn">
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <strong>
                    <i className="icon-info pr-1"></i>id: {id}{" "}
                    {dataById && dataById.row
                      ? "货款合计：" + formatCurrency(dataById.row.totalPrice)
                      : null}
                  </strong>
                </CardHeader>

                <Tabs
                  value={tabSelect}
                  style={{ borderBottom: "1px solid #E0E0E0" }}
                  onChange={handleTabChange}
                  aria-label="tabs"
                >
                  <Tab label="基本信息" />
                  <Tab label="销售商品" disabled={!isFromEdit} />
                </Tabs>

                {/* main form */}
                <TabPanel value={tabSelect} index={0}>
                  <CreinoxForm
                    defaultValues={defaultData}
                    errors={errorById}
                    isFromEdit={isFromEdit}
                    disabled = {disabled}
                    actionSubmit={handleOnSubmit}
                    dataModel={dataModel}
                    onGetInjector={handleGetInjector}
                    isEnglish = {true}
                  >
                    <Grid container spacing={2}>
                      {formInputs({
                        disabled,
                        onGetDefaultCode: handleOnGetDefaultCode,
                        onGetInvoiceCode: handleOnGetInvoiceCode,
                        handleSellerSelect, 
                        handleBuySelect,
                        user})}
                    </Grid>
                    <Grid container spacing={2}>
                      {isFromEdit && !locked && ( // only show edit button when update
                        <Grid item>
                          <Inputs.MyEditButton
                            disabled={disabled}
                            setdisabled={setdisabled}
                          />
                        </Grid>
                      )}
                      {!isFromEdit && !locked && (
                        <Grid item>
                          <Button
                            type="button"
                            variant="contained"
                            color="default"
                            onClick={handleOnRead}
                          >
                            引用上一张合同的内容
                          </Button>
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
                  {/* 更新embed的时候，外部也重新读取，这样才能获得最新的view */}
                  <Sellsubitems
                    onUpdate={() => {
                      onGetById(id);
                    }}
                    preConditions={{ sell_contract_id: id }}
                    disabled={locked}
                  />
                </TabPanel>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  };

  //
  const formInputs = (
    {
      disabled,
      onGetDefaultCode,
      onGetInvoiceCode,
      handleSellerSelect, 
      handleBuySelect,
      user}) => {
    return (
      <>
        {/* 基本信息 */}
        <Grid item lg={2} md={2} xs={12}>
          <Inputs.MyComboboxFK
            inputid="follower_id"
            stateName="followerDropdown"
            optionLabel="userName"
            tableName="user"
            disabled={disabled}
          />
        </Grid>
        <Grid item lg={5} md={5} xs={12}>
          <Inputs.MyComboboxAsyncFK
            disabled={disabled}
            optionLabel="ename"
            inputid="buyer_company_id"
            tableName="company"
            actionName="get_disposable_dropdown"
            onSelect = {handleBuySelect}
            preConditions={{ companyType: enums.companyType.all }}
          />
        </Grid>

        {/* 客户要求默认限制广州钰诚和景诚 */}
        <Grid item lg={5} md={5} xs={12}>
          <Inputs.MyComboboxFK
            disabled={disabled}
            optionLabel="ename"
            inputid="seller_company_id"
            stateName="creinoxCompanyDropdown"
            tableName="company"
            actionName="get_disposable_dropdown"
            preConditions={{ id: "1046,1043", companyType: enums.companyType.internal }}
            onSelect = {handleSellerSelect}
          />
          {/* 这里是特殊的有限下拉选项，选的是内部对外贸易的公司 */}
        </Grid>

        <Grid item lg={6} md={6} xs={12}>
          <Inputs.MyInput inputid="buyerAddress" disabled={disabled}/>
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Inputs.MyInput inputid="sellerAddress" disabled={disabled}/>
        </Grid>
        <Grid item lg={2} md={2} xs={12}>
          <Inputs.MyInput inputid="code" disabled={disabled} onGetDefault={onGetDefaultCode}/>
        </Grid>
        <Grid item lg={2} md={2} xs={12}>
          <Inputs.MyInput inputid="invoiceCode" disabled={disabled} onGetDefault={onGetInvoiceCode}/>
        </Grid>
        <Grid item lg={2} md={2} xs={12}>
          <Inputs.MyInput inputid="orderNumber" disabled={disabled} />
        </Grid>
        <Grid item lg={2} md={2} xs={12}>
          <Inputs.MyDatePicker inputid="activeAt" disabled={disabled} />
        </Grid>
        <Grid item lg={2} md={2} xs={12}>
          <Inputs.MyDatePicker inputid="deliverAt" disabled={disabled} />
        </Grid>

        <Grid item lg={2} md={2} xs={12}>
          <Inputs.MyComboboxShippingType
            optionLabel="ename"
            inputid="shippingType_id"
            disabled={disabled}
          />
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyComboboxPricingTerm
          optionLabel="ename"
            inputid="pricingTerm_id"
            disabled={disabled}
          />
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyComboboxPaymentType
            optionLabel="ename"
            inputid="paymentType_id"
            disabled={disabled}
          />
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyRegionPicker inputid="region_id" disabled={disabled} />
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyComboboxFK
            inputid="departure_port_id"
            optionLabel="ename"
            tableName="port"
            stateName = "portDepartureDropdown"
            disabled={disabled}
            preConditions={{ isDeparture: 1 }}
          />
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyComboboxFK
            inputid="destination_port_id"
            optionLabel="ename"
            tableName="port"
            stateName = "portDestinationDropdown"
            disabled={disabled}
            preConditions={{ isDestination: 1 }}
          />
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyInputTT inputid="tt_packing" disabled={disabled} />
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyInputTT inputid="tt_shipmentDue" disabled={disabled} />
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyComboboxCurrency
            optionLabel="ename"
            inputid="currency_id"
            disabled={disabled}
          />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Inputs.MySwitch inputid="isTransport" disabled={disabled} />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Inputs.MySwitch inputid="isInBaches" disabled={disabled} />
        </Grid>

        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyInput inputid="shippingPrice" disabled={disabled} />
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyComboboxCurrency
            optionLabel="ename"
            inputid="shipping_currency_id"
            disabled={disabled}
          />
        </Grid>

        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MySelect
            options={enumsLabel.commissionType}
            hasDefault={false}
            inputid="commissionType"
            disabled={disabled}
          />
        </Grid>

        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyComboboxCommission
            inputid="commission_id"
            disabled={disabled}
          />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Inputs.MyInputTT inputid="tt_insurance" disabled={disabled} />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Inputs.MyInputTT inputid="tt_paymentCondition" disabled={disabled} />
        </Grid>

        <Grid item lg={12} md={12} xs={12}>
          <Inputs.MySwitch inputid="isDone" disabled={disabled || !authCheckUser(user, AUTHNAME_CONFORM)} />
        </Grid>

        <Grid item lg={12} md={12} xs={12}>
          <Inputs.MyInput inputid="order_memo" disabled={disabled} />
        </Grid>

        <Grid item lg={6} md={6} xs={12}>
          <Inputs.MyComboboxFK
            inputid="updateUser_id"
            stateName="updateUserDropdown"
            optionLabel="userName"
            tableName="user"
            disabled={true}
          />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Inputs.MyDatePicker inputid="updateAt" disabled={true} />
        </Grid>
      </>
    );
  };
  // ============================================= Redux

  function mapState(state) {
    return {
      dataById: state.sellcontractData.dataById,
      errorById: state.sellcontractData.errorById,
    };
  }

  const actionCreators = {
    onPostCreate: dataActions.post_create,
    onPutUpdate: dataActions.put_update,
    onGetById: dataActions.get_byId,
    onGetDefaultCode: dataActions.get_disposable_defaultCode,
    onGetInvoiceCode: dataActions.get_disposable_invoiceCode,

    onClear: dataActions._clear,
  };

  return connect(mapState, actionCreators)(CurrentPage);
};

export default withSellcontract();
