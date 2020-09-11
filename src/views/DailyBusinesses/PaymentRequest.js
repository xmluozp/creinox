import React, { useEffect, useState } from "react";
import _ from "lodash";

import { Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Button as SmallButton } from "reactstrap";
import { history } from "_helper";

// import { authOptions } from "_constants";
// import {} from "_helpe"

//------redux
import { connect } from "react-redux";
import { paymentrequestActions as dataActions } from "_actions";
import { paymentrequestModel as dataModel, financialtransactionModel } from "_dataModel";
import { CreinoxForm, Inputs } from "components";
import {copy} from "components/CreinoxForm"
import { enumsLabel, enums, ICONS } from "_constants";

import { h_convertCurrency, authCheckUser } from "_helper";
const EDITURL = "/dailyBusinesses/paymentRequests";
const AUTHNAME_CONFORM = "confirm-payment"

const CurrentPage = ({
  dataById,
  onPostCreate,
  onPutUpdate,
  onGetById,
  onClear,
  errorById,
  onPutApprove,
  onPutReject,
  user,
  ...props
}) => {
  const id = parseInt(_.get(props, "match.params.id")) || "";
  const isFromEdit = Number.isInteger(id);
  const [disabled, setdisabled] = useState(isFromEdit);
  const [renewToggle, setRenewToggle] = useState(false); // 审批以后刷新用

  useEffect(() => {
    setRenewToggle(v=>!v);
  }, [dataById, setRenewToggle]);

  useEffect(() => {
    // if there is ID, fetch data
    if (id) {
      onGetById(id);
    }

    return () => {
      onClear();
    };
  }, [onGetById, onClear, id]);

  // ********************************

  const handleOnSubmit = (values) => {
    if (isFromEdit) {
      // 把authOptions转成数字
      onPutUpdate(values);
    } else {
      onPostCreate(values, (id) => {
        history.push(EDITURL + "/" + id);
      });
    }
  };

  const handleApprove = () => {
    const newItem = {id}
    onPutApprove(newItem, () => {
      onGetById(id);
    });
  };

  const handleReject = () => {
    const newItem = {id}
    onPutReject(newItem, () => {
      onGetById(id);
    });
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
  const [amountRMB, setAmountRMB] = useState("");
  const handleGetInjector = (inj) => {
    setInjector(inj);
  };

  // 选中合同触发的内容
  const handleOrderformOnSelect = (item) => {
    // 新增的时候才能选合同
    // if (isFromEdit) return;

    if (item && item.id) {
      settextPayable(`(合同款: ${item.payablePaid || 0}/${item.payable || 0})`);

      injector(
        {
          order_form_id: item.id,
          "order_form_id.row": item,
        },
        (newValue) => {
          injector(injectOrderFormToTransaction(newValue));
        }
      );
    }
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
      returnValue.amount = orderFormItem.payable;
      returnValue.from_company_id = orderFormItem.buyer_company_id;
      returnValue.invoiceCode = orderFormItem.invoiceCode;
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
        currency_id: selectData.currency_id,
      });
    }
  };

  const handleToCompanyOnSelect = (selectData) => {
    if (selectData && selectData.id) {
      injector({
        to_companyName: selectData.name,
      });
    }
  };

  const handleCopy = () => {
    // 传入空值只是为了获取最新state
    injector({}, newState => {

      // 复制为转账记录
      const stateMapping = {
        temp_isIn: false,
        isContractPayment: false,
        transdateAt:newState.expiryAt,
        company_id: newState.to_company_id,
        order_form_id: newState.order_form_id,
        bankaccountName: newState.bankaccountName,
        bankaccountNo: newState.bankaccountNo,
        paymentType_id: newState.paymentType_id,
        tt_transUse: newState.tt_transUse,
        currency_id:newState.currency_id,
        amount_out:newState.amount,
        memo:newState.memo,
      }

      copy(financialtransactionModel, stateMapping)
    })
  }

  const status = (isFromEdit && dataById && dataById.row && dataById.row.status) || 0;
  const cardHeaderStyle = isFromEdit && dataById && dataById.row ? {backgroundColor:["blue", "green", "red"][status], color: "white", opacity: 0.5} : {}


  const toolbarButtons = status === 1 ? [
    <SmallButton 
    style={{color:"white", borderRadius: 0}} 
    className={`btn btn-sm btn-info`}
    onClick={handleCopy}>
      {ICONS.COPY("mr-1")}
      复制为转账记录</SmallButton>
  ] : []

  return (
    <div className="animated fadeIn">
      <Row>
        <Col lg={12}>
          <Card>
            <CardHeader style={cardHeaderStyle}>
              <div style={{display: "flex", justifyContent: "space-between"}}>
              <strong>
                <i className="icon-info pr-1"></i>id: {id}
              </strong>
              <span>审批状态： {enumsLabel.status[status]}</span>
              </div>

            </CardHeader>       
            <CreinoxForm
                  dataModel={dataModel}
                  defaultValues={isFromEdit && dataById && { ...dataById.row }}
                  isFromEdit={isFromEdit}
                  disabled = {disabled}
                  actionSubmit={handleOnSubmit}
                  errors={errorById}
                  toolBar = {{buttons: toolbarButtons}}
                  onGetInjector={handleGetInjector}
                  renewToggle={renewToggle}
                  listener={{ amount: v => setAmountRMB(h_convertCurrency(v)) }}
                >
              <CardBody>
                {/* form */}
                <Grid container spacing={2}>
                  <Grid item lg={3} md={3} xs={12}>
                    <Inputs.MySelect
                      options={enumsLabel.requestType}
                      inputid="requestType"
                      disabled={disabled}
                    />
                  </Grid>
                  <Grid item lg={3} md={3} xs={12}>
                    <Inputs.MyDatePicker
                      inputid="createAt"
                      label="填写时间 (默认当前日期)"
                      disabled={disabled}
                    />
                  </Grid>
                  <Grid item lg={3} md={3} xs={12}>
                    <Inputs.MyComboboxFK
                      disabled={disabled}
                      inputid="from_company_id"
                      tableName="company"
                      actionName="get_disposable_dropdown"
                      preConditions={{
                        id: "1046,1043",
                        companyType: enums.companyType.internal,
                      }}
                    />
                  </Grid>
                  <Grid item lg={3} md={3} xs={12}>
                    <Inputs.MyComboboxAsyncFK
                      disabled={disabled}
                      inputid="to_company_id"
                      tableName="company"
                      onSelect={handleToCompanyOnSelect}
                      actionName="get_disposable_dropdown"
                      isDefaultOnSelect={!isFromEdit}
                      preConditions={{ companyType: enums.companyType.all }}
                    />
                  </Grid>

                  {/* 如果是合同 
                    去掉onLoad是因为查看详情时，load会导致覆盖
                */}
                  <Grid item lg={9} md={9} xs={12}>
                    <Inputs.MyComboboxAsyncFK
                      inputid="order_form_id"
                      label={<>合同(非必填) {textPayable}</>}
                      optionLabel="code"
                      tableName="orderform"
                      onRenderOption={handleRenderOrderformOptions}
                      isDefaultOnSelect={!isFromEdit}
                      onSelect={handleOrderformOnSelect}
                      actionName="get_disposable_dropdown"
                      disabled={disabled}
                    />
                  </Grid>
                  <Grid item lg={3} md={3} xs={12}>
                    <Inputs.MyInput inputid="invoiceCode" disabled={disabled} />
                  </Grid>

                  <Grid item lg={6} md={6} xs={12}>
                    <Inputs.MyInput
                      inputid="to_companyName"
                      disabled={disabled}
                    />
                  </Grid>
                  <Grid item lg={2} md={2} xs={12}>
                    <Inputs.MyComboboxCascade
                      inputid="temp_bank"
                      disabled={disabled}
                      listen={{ to_company_id: "company_id" }}
                      tableName="bankaccount"
                      optionLabel="bankName"
                      actionName="get_dropdown"
                      isDefaultOnSelect={!isFromEdit}
                      onSelect={handleChangeBank}
                    />
                  </Grid>
                  <Grid item lg={2} md={2} xs={12}>
                    <Inputs.MyInput
                      inputid="bankaccountName"
                      disabled={disabled}
                    />
                  </Grid>
                  <Grid item lg={2} md={2} xs={12}>
                    <Inputs.MyInput
                      inputid="bankaccountNo"
                      disabled={disabled}
                    />
                  </Grid>

                  <Grid item lg={3} md={3} xs={12}>
                    <Inputs.MyInput inputid="location" disabled={disabled} />
                  </Grid>
                  <Grid item lg={3} md={3} xs={12}>
                    <Inputs.MyComboboxPaymentType
                      inputid="paymentType_id"
                      disabled={disabled}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} xs={12}>
                    <Inputs.MyInputTT
                      inputid="tt_transUse"
                      disabled={disabled}
                    />
                  </Grid>
                  <Grid item lg={3} md={3} xs={12}>
                    <Inputs.MyComboboxCurrency
                      inputid="currency_id"
                      disabled={disabled}
                    />
                  </Grid>
                  <Grid item lg={3} md={3} xs={12}>
                    <Inputs.MyInput inputid="amount" disabled={disabled} />
                  </Grid>
                  <Grid item lg={6} md={6} xs={12}>
                    <Inputs.MyInput disabled={true} value={amountRMB} />
                  </Grid>
                  <Grid item xs={12}>
                    <Inputs.MyInput inputid="memo" disabled={disabled} />
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
                  {isFromEdit  && status === 0 && ( // only show edit button when update
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

                  {isFromEdit && authCheckUser(user, AUTHNAME_CONFORM) && status === 0 && (
                    <>
                      <Grid item>
                        <Button
                          type="button"
                          variant="outlined"
                          style={{ color: "green" }}
                          onClick={handleApprove}
                        >
                          {ICONS.TRUE("mr-2")}通过付款申请
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          type="button"
                          variant="outlined"
                          style={{ color: "red" }}
                          onClick={handleReject}
                        >
                          {ICONS.FALSE("mr-2")}驳回付款申请
                        </Button>
                      </Grid>
                    </>
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
    errorById: state.paymentrequestData.errorById,
  };
}

const actionCreators = {
  onPostCreate: dataActions.post_create,
  onPutUpdate: dataActions.put_update,
  onGetById: dataActions.get_byId,
  onClear: dataActions._clear,
  onPutApprove: dataActions.put_approve,
  onPutReject: dataActions.put_reject,

};

export default connect(mapState, actionCreators)(CurrentPage);
