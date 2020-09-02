import React, { useEffect, useState } from "react";
import _ from "lodash";

import { Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { history } from "_helper";

// import { authOptions } from "_constants";
// import {} from "_helpe"

//------redux
import { connect } from "react-redux";
import { paymentrequestActions as dataActions } from "_actions";
import { paymentrequestModel as dataModel } from "_dataModel";
import { CreinoxForm, Inputs } from "components";
import { enumsLabel, enums } from "_constants";

import { h_convertCurrency } from '_helper'
const EDITURL = "/dailyBusinesses/paymentRequests";

const CurrentPage = ({
  dataById,
  onPostCreate,
  onPutUpdate,
  onGetById,
  errorById,
  ...props
}) => {
  const id = parseInt(_.get(props, "match.params.id")) || "";
  const isFromEdit = Number.isInteger(id);
  const [disabled, setdisabled] = useState(isFromEdit);

  useEffect(() => {
    // if there is ID, fetch data
    if (id) {
      onGetById(id);
    }
  }, [onGetById, id]);

  // ********************************

  const handleOnSubmit = values => {
    if (isFromEdit) {
      // 把authOptions转成数字
      onPutUpdate(values);
    } else {
      onPostCreate(values, id => {
        history.push(EDITURL + "/" + id);
      });
    }
  };

  const handleRenderOrderformOptions = (option) => {
    if (option.id !== 0) {
      const order_memo = option.order_memo ? ` (${option.order_memo})` : "";

      return `[${enumsLabel.contractType[option.contractType]}] ${
        option.code
      }${order_memo}`;
    }

    return option.code;
  };

  const [textPayable, settextPayable] = useState("");
  const [injector, setInjector] = useState(null);
  const handleGetInjector = (inj) => {
    setInjector(inj);
  };

  // 选中合同触发的内容
  const handleOrderformOnSelect = (item) => {
    // 新增的时候才能选合同
    // if (isFromEdit) return;

    if (item && item.id) {
      settextPayable(`(合同款: ${item.payablePaid || 0}/${item.payable || 0})`);
    }

    injector({ "order_form_id.row": item }, (newValue) => {
      console.log(newValue)
      injector(injectOrderFormToTransaction(newValue));
    });
  };

  const injectOrderFormToTransaction = (oldValue) => {
    const orderFormItem = oldValue && oldValue["order_form_id.row"];

    let returnValue = {};

    // 如果非合同返回，如果是合同，下面还需要进一步判断是普通收付，还是合同款项
    if (!orderFormItem) return null;

    // 判断是买还是卖合同
    let inout = "";
    switch (orderFormItem.contractType) {
      case enums.contractType.sellContract:
        inout = "sell";
        break;
      case enums.contractType.buyContract:
      case enums.contractType.mouldContract:
        inout = "buy";
      default:
        break;
    }

    // 如果是应收应付款

    // 卖类合同不管（因为是收款）
    // if (inout === "sell") {}
    // 买类合同
    if (inout === "buy") {
      returnValue.tt_transUse = `支付${orderFormItem.code}货款`;
      returnValue.to_company_id = orderFormItem.seller_company_id;
      returnValue.amount = orderFormItem.payable
      returnValue.from_company_id = orderFormItem.buyer_company_id;
      returnValue.invoiceCode = orderFormItem.invoiceCode
    }

    return {
      ...returnValue,
    };
  };

  const handleChangeBank = (selectData) => {
    if (selectData && selectData.id) {
      injector({
        bankaccountName: selectData.bankName,
        bankaccountNo: selectData.accountNo,
        currency_id: selectData.currency_id
      });
    }
  };

  const handleToCompanyOnSelect = (selectData) => {
    if (selectData && selectData.id) {
      injector({
        to_companyName: selectData.name
      });
    }
  }

  // h_convertCurrency
  const handleConvertCurrency = (oldAmount) => {
    injector({
      temp_amount: h_convertCurrency(oldAmount)
    });   
  }

  return (
    <div className="animated fadeIn">
      <Row>
        <Col lg={12}>
          <Card>
            <CardHeader>
              <strong>
                <i className="icon-info pr-1"></i>id: {id}
              </strong>
            </CardHeader>
            <CreinoxForm
              dataModel={dataModel}
              defaultValues={isFromEdit && dataById && { ...dataById.row }}
              isFromEdit={isFromEdit}
              actionSubmit={handleOnSubmit}
              errors={errorById}
              onGetInjector={handleGetInjector}
              listener = {{amount: handleConvertCurrency}}
            >
              <CardBody>
                {/* form */}
                <Grid container spacing={2}>

                <Grid item lg={3} md={3} xs={12}>
                  <Inputs.MySelect options={enumsLabel.requestType} inputid="requestType" disabled={disabled} />
                </Grid>
                <Grid item lg={3} md={3} xs={12}>
                    <Inputs.MyDatePicker inputid="createAt" label="填写时间 (默认当前日期)" disabled={disabled} />
                </Grid>
                <Grid item lg={3} md={3} xs={12}>
                    <Inputs.MyComboboxFK
                      disabled={disabled}
                      inputid="from_company_id"
                      tableName="company"
                      actionName="get_disposable_dropdown"
                      preConditions={{ id: "1046,1043", companyType: enums.companyType.internal }}
                    />
                </Grid>
                <Grid item lg={3} md={3} xs={12}>
                    <Inputs.MyComboboxAsyncFK
                      disabled={disabled}
                      inputid="to_company_id"
                      tableName="company"
                      onSelect={handleToCompanyOnSelect}
                      onLoad={handleToCompanyOnSelect}
                      actionName="get_disposable_dropdown"
                      preConditions={{ companyType: enums.companyType.all }}
                    />
                </Grid>

                {/* 如果是合同 */}
                <Grid item lg={9} md={9} xs={12}>
                    <Inputs.MyComboboxAsyncFK
                      inputid="order_form_id"
                      label={<>合同(非必填) {textPayable}</>}
                      optionLabel="code"
                      tableName="orderform"
                      onRenderOption={handleRenderOrderformOptions}
                      onSelect={handleOrderformOnSelect}
                      onLoad={handleOrderformOnSelect}
                      actionName="get_disposable_dropdown"
                      disabled={disabled}
                    />
                  </Grid>
                  <Grid item lg={3} md={3} xs={12}>
                    <Inputs.MyInput inputid="invoiceCode" disabled={disabled} />
                  </Grid>

                  <Grid item lg={6} md={6} xs={12}>
                    <Inputs.MyInput inputid="to_companyName" disabled={disabled} />
                  </Grid>
                  <Grid item lg={2} md={2} xs={12}>
                    <Inputs.MyComboboxCascade
                      inputid="temp_bank"
                      disabled={disabled}
                      listen={{ to_company_id: "company_id" }}
                      tableName="bankaccount"
                      optionLabel="accountNo"
                      actionName="get_dropdown"
                      onLoad={handleChangeBank}
                      onSelect={handleChangeBank}
                    />
                  </Grid>
                  <Grid item lg={2} md={2} xs={12}>
                    <Inputs.MyInput inputid="bankaccountName" disabled={disabled} />
                  </Grid>
                  <Grid item lg={2} md={2} xs={12}>
                    <Inputs.MyInput inputid="bankaccountNo" disabled={disabled} />
                  </Grid>


                  <Grid item lg={3} md={3} xs={12}>
                    <Inputs.MyInput inputid="location" disabled={disabled} />
                  </Grid>
                  <Grid item lg={3} md={3} xs={12}>
                    <Inputs.MyComboboxPaymentType inputid="paymentType_id" disabled={disabled} />
                  </Grid>
                  <Grid item lg={6} md={6} xs={12}>
                    <Inputs.MyInputTT inputid="tt_transUse" disabled={disabled} />
                  </Grid>
                  <Grid item lg={3} md={3} xs={12}>
                    <Inputs.MyComboboxCurrency inputid="currency_id" disabled={disabled} />
                  </Grid>
                  <Grid item lg={3} md={3} xs={12}>
                    <Inputs.MyInput inputid="amount" disabled={disabled} />
                  </Grid>    
                  <Grid item lg={6} md={6} xs={12}>
                  <Inputs.MyInput inputid="temp_amount" disabled={true}/>
                  </Grid>                    
                  <Grid item xs={12}>
                    <Inputs.MyInput inputid="memo" disabled={disabled}/>
                  </Grid>  

                  <Grid item lg={4} md={4} xs={12}>
                    <Inputs.MyComboboxFK
                      inputid="applicantUser_id"
                      stateName="applicantUserDropdown"
                      optionLabel="userName"
                      tableName="user"
                      disabled={true}
                    />
                  </Grid>      
                  <Grid item lg={4} md={4} xs={12}>
                    <Inputs.MyComboboxFK
                      inputid="approveUser_id"
                      stateName="approveUserDropdown"
                      optionLabel="userName"
                      tableName="user"
                      disabled={true}
                    />
                  </Grid>

                  <Grid item lg={4} md={4} xs={12}>
                    <Inputs.MyDatePicker inputid="approveAt" disabled={true} />
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
              </CardBody>
            </CreinoxForm>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

// ============================================= Redux

function mapState(state) {
  return {
    dataById: state.paymentrequestData.dataById,
    errorById: state.paymentrequestData.errorById
  };
}

const actionCreators = {
  onPostCreate: dataActions.post_create,
  onPutUpdate: dataActions.put_update,
  onGetById: dataActions.get_byId
};

export default connect(mapState, actionCreators)(CurrentPage);
