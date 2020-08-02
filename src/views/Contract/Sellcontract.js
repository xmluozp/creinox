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
import { history, h_fkFetch } from "_helper";

import Sellsubitems from "./Sellsubitems";

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
                  <Tab label="对应商品" disabled={!isFromEdit} />
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
                      {formInputs(
                        disabled,
                        handleOnGetDefaultCode,
                        handleOnGetInvoiceCode
                      )}
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
                      {!isFromEdit && (
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
  const formInputs = (disabled, onGetDefaultCode, OnGetInvoiceCode) => {
    return (
      <>
        {/* 基本信息 */}
        <Grid item lg={2} md={2} xs={12}>
          <Inputs.MyComboboxFK
            inputid="follower_id"
            optionLabel="userName"
            tableName="user"
            disabled={disabled}
          />
        </Grid>
        <Grid item lg={5} md={5} xs={12}>
          <Inputs.MyComboboxAsyncFK
            disabled={disabled}
            inputid="buyer_company_id"
            tableName="company"
            actionName="get_disposable_dropdown"
            preConditions={{ companyType: enums.companyType.overseasCustomer }}
          />
        </Grid>
        <Grid item lg={5} md={5} xs={12}>
          <Inputs.MyComboboxAsyncFK
            disabled={disabled}
            inputid="seller_company_id"
            tableName="company"
            actionName="get_disposable_dropdown"
            preConditions={{ companyType: enums.companyType.internal }}
          />
        </Grid>
        <Grid item lg={2} md={2} xs={12}>
          <Inputs.MyInput inputid="code" disabled={disabled} onGetDefault={onGetDefaultCode}/>
        </Grid>
        <Grid item lg={2} md={2} xs={12}>
          <Inputs.MyInput inputid="invoiceCode" disabled={disabled} onGetDefault={OnGetInvoiceCode}/>
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
            inputid="shippingType_id"
            disabled={disabled}
          />
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyComboboxPricingTerm
            inputid="pricingTerm_id"
            disabled={disabled}
          />
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyComboboxPaymentTypeE
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
            optionLabel="name"
            tableName="port"
            disabled={disabled}
            preConditions={{ isDeparture: 1 }}
          />
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyComboboxFK
            inputid="destination_port_id"
            optionLabel="name"
            tableName="port"
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
          <Inputs.MySwitch inputid="isDone" disabled={disabled} />
        </Grid>

        <Grid item lg={12} md={12} xs={12}>
          <Inputs.MyInput inputid="order_memo" disabled={disabled} />
        </Grid>

        <Grid item lg={6} md={6} xs={12}>
          <Inputs.MyComboboxFK
            inputid="updateUser_id"
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
