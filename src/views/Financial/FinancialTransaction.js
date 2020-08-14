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
import { financialtransactionActions as dataActions } from "_actions";
import { financialtransactionModel as dataModel } from "_dataModel";
import { CreinoxForm, Inputs } from "components";
import { enumsLabel, enums } from "_constants";

/*
  如果是添加，根据type来控制preConditions。
  因为从内部控制合同下拉列表的隐藏显示不方便。所以不允许修改“是否合同付款”
    合同的地方也是两个按钮：收付合同款，收付其他款。加上合同本身的类型，手动生成 :type

  如果从账户点进来，账户锁死。但从合同进来就可以选账户。
  合同进来选账户的时候，需要先选国内国外还是现金，再选账户。 ？？

  无论从合同还是从账户，还是从编辑进来，都有办法提前决定是收还是付。所以收付分开
*/

const CurrentPage = ({
  dataById,
  onPostCreate,
  onPutUpdate,
  onGetById,
  errorById,
  ...props
}) => {
  // ------------ 从账户入口，这里取账户
  const financialAccount_id =
    parseInt(_.get(props, "match.params.financialAccount_id")) || 0;

  // ------------ 从合同入口，这里取合同
  const order_form_id =
    parseInt(_.get(props, "match.params.order_form_id")) || 0;

  const preConditions = {
    financialAccount_id,
    order_form_id,
  };

  console.log(preConditions)

  // ------------ 是否针对合同，收还是付 (添加取param，编辑取数据库)
  let title = "收付款";

  // TODO: 考虑从合同入口
  const EDITURL = "/financial/financialtransactions/" + financialAccount_id;

  const id = parseInt(_.get(props, "match.params.id")) || "";
  const isFromEdit = Number.isInteger(id);
  const [disabled, setdisabled] = useState(isFromEdit);
  const [isIn, setisIn] = useState(false);

  const [textReceivable, settextReceivable] = useState("")
  const [textPayable, settextPayable] = useState("")

  useEffect(() => {
    // if there is ID, fetch data
    if (id) {
      onGetById(id);
    }
  }, [onGetById, id]);

  // ********************************

  const handleOnSubmit = (values) => {
    if (isFromEdit) {
      onPutUpdate(values);
    } else {
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

  // 切换收付款
  const handleTempIsIn = () => {
    setisIn((v) => !v);
    const injectValues = {};
    injectValues.temp_isIn = !isIn;
    if (isIn) {
      injectValues.amount_out = 0;
    } else {
      injectValues.amount_in = 0;
    }

    injector(() => injectValues);
  };

  // 罗列合同时用来render选项
  const handleRenderOrderformOptions = (option) => {
    if (option.id !== 0) {
      const order_memo = option.order_memo ? ` (${option.order_memo})` : "";

      return `[${enumsLabel.contractType[option.contractType]}] ${
        option.code
      }${order_memo}`;
    }

    return option.code;
  };

  const injectOrderFormToTransaction = (oldValue) => {
    const orderFormItem = oldValue && oldValue["order_form_id.row"];
    const isContractPayment = oldValue && oldValue.isContractPayment;

    // 如果非合同就不处理，如果是合同，下面还需要进一步判断是普通收付，还是合同款项
    if (!orderFormItem) return;

    let returnValue = {};

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
    if (isContractPayment && orderFormItem) {

      // 卖类合同
      if (inout === "sell") {
        returnValue.financialLedgerDebit_id =
          enums.financialLedgerType.ReceivablePayDebit;
        returnValue.financialLedgerCredit_id =
          enums.financialLedgerType.ReceivablePayCredit;
        returnValue.tt_transUse = `收到${orderFormItem.code}货款`;
        returnValue.temp_isIn = true
      }
      // 买类合同
      else if (inout === "buy") {
        returnValue.financialLedgerDebit_id =
          enums.financialLedgerType.PayablePayDebit;
        returnValue.financialLedgerCredit_id =
          enums.financialLedgerType.PayablePayCredit;

        returnValue.tt_transUse = `支付${orderFormItem.code}货款`;
        returnValue.temp_isIn = true
      }
    }

    if (inout === "sell") {
      returnValue.company_id = orderFormItem.seller_company_id;
    } else if (inout === "buy") {
      returnValue.company_id = orderFormItem.buyer_company_id;
    }

    // enums.financialLedgerType.

    return {
      memo: orderFormItem.order_memo,
      ...returnValue,
    };
  };

  // 选中合同触发的内容
  const handleOrderformOnSelect = (item) => {
    if(item && item.id) {
      settextReceivable(`收款金额 (已收: ${item.receivablePaid}/${item.receivable})`)
      settextPayable(`付款金额 (已付: ${item.payablePaid}/${item.payable})`)
    }   

    injector({ "order_form_id.row": item }, (newValue) => {
      injector(injectOrderFormToTransaction(newValue));
    });
  };

  const handleIsContractPaymentOnSwitch = (a, b, value) => {
    injector({ isContractPayment: value }, (newValue) => {
      injector(injectOrderFormToTransaction(newValue));
    });
  };

  const handleFinancialAccountOnSelect = (item) => {
    injector({
      currency_id: item && item.currency_id,
    });
  };

  // 根据客户的银行，读取名称和账号
  const handleChangeBank = (selectData) => {
    if (selectData && selectData.id) {
      injector({
        bankaccountName: selectData.accountName,
        bankaccountNo: selectData.accountNo,
      });
    }
  };

  // 显示财务科目
  const handleOnRenderFinancialLedger = (node, rows) => {
    if (!node) return "";

    const map = new Map();

    // 整棵树变成map
    for (let i = 0; i < rows.length; i++) {
      if (!rows[i].id) continue;
      map.set(rows[i].id.toString(), rows[i].name);
    }

    const pathArr = (node["path"] && node["path"].split(",")) || [];
    if (pathArr[0] === "0") pathArr.shift();

    for (let i = 0; i < pathArr.length; i++) {
      pathArr[i] = map.get(pathArr[i]);
    }
    pathArr.push(node["name"]);

    return pathArr.join("/");
  };

  return (
    <div className="animated fadeIn">
      <Row>
        <Col lg={12}>
          <Card>
            <CardHeader>
              <strong>
                <i className="icon-info pr-1"></i>id: {id}[{title}]
              </strong>
            </CardHeader>

            <CreinoxForm
              dataModel={dataModel}
              defaultValues={isFromEdit && dataById && { ...dataById.row }}
              preConditions={preConditions}
              isFromEdit={isFromEdit}
              actionSubmit={handleOnSubmit}
              errors={errorById}
              isHideTool={true}
              onGetInjector={handleGetInjector}
            >
              <CardBody>
                {/* form */}

                <Grid container spacing={2}>
                  <Grid item lg={6} md={6} xs={12}>
                    <Inputs.MySwitch
                      inputid="temp_isIn"
                      labelTrue="收款"
                      labelFalse="付款"
                      disabled={disabled || isFromEdit}
                      onChange={handleTempIsIn}
                    />
                  </Grid>

                  <Grid item lg={6} md={6} xs={12}>
                    <Inputs.MySwitch
                      inputid="isContractPayment"
                      disabled={disabled || isFromEdit}
                      onSwitch={handleIsContractPaymentOnSwitch}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} xs={12}>
                    <Inputs.MyComboboxAsyncFK
                      inputid="order_form_id"
                      optionLabel="code"
                      tableName="orderform"
                      onRenderOption={handleRenderOrderformOptions}
                      onSelect={handleOrderformOnSelect}
                      actionName="get_disposable_dropdown"
                      disabled={disabled}
                    />
                  </Grid>
                  <Grid item lg={3} md={3} xs={12}>
                    <Inputs.MyComboboxPaymentType
                      inputid="paymentType_id"
                      disabled={disabled}
                    />
                  </Grid>
                  <Grid item lg={3} md={3} xs={12}>
                    <Inputs.MyDatePicker
                      inputid="transdateAt"
                      disabled={disabled}
                    />
                  </Grid>

                  <Grid item lg={4} md={4} xs={12}>
                    <Inputs.MyInput
                      label = {textReceivable}
                      inputid="amount_in"
                      disabled={disabled || isFromEdit || isIn}
                    />
                  </Grid>

                  <Grid item lg={4} md={4} xs={12}>
                    <Inputs.MyInput
                      label = {textPayable}
                      inputid="amount_out"
                      disabled={disabled || isFromEdit || !isIn}
                    />
                  </Grid>

                  <Grid item lg={4} md={4} xs={12}>
                    <Inputs.MyInput
                      inputid="balance"
                      label="当前余额 (创建时自动生成)"
                      disabled={true}
                    />
                  </Grid>
                  <Grid item lg={4} md={4} xs={12}>
                    <Inputs.MyComboboxCurrency
                      inputid="currency_id"
                      disabled={disabled}
                    />
                  </Grid>

                  <Grid item lg={4} md={4} xs={12}>
                    <Inputs.MyComboboxFK
                      inputid="financialAccount_id"
                      optionLabel="name"
                      tableName="financialaccount"
                      actionName="get_dropdown"
                      disabled={!!(financialAccount_id || isFromEdit)}
                      onLoad={handleFinancialAccountOnSelect}
                      onSelect={handleFinancialAccountOnSelect}
                    />
                  </Grid>
                  <Grid item lg={4} md={4} xs={12}>
                    <Inputs.MyComboboxAsyncFK
                      disabled={disabled}
                      inputid="company_id"
                      tableName="company"
                      actionName="get_disposable_dropdown"
                    />
                  </Grid>

                  <Grid item lg={4} md={4} xs={12}>
                    {/* cascade 的监听，左边是监听的字段名，右边是bank_account表里的字段名 */}
                    <Inputs.MyComboboxCascade
                      inputid="temp_bank"
                      disabled={disabled}
                      listen={{ company_id: "company_id" }}
                      tableName="bankaccount"
                      optionLabel="accountName"
                      actionName="get_dropdown"
                      onSelect={handleChangeBank}
                    />
                  </Grid>

                  <Grid item lg={4} md={4} xs={12}>
                    <Inputs.MyInput
                      inputid="bankaccountName"
                      disabled={disabled}
                    />
                  </Grid>
                  <Grid item lg={4} md={4} xs={12}>
                    <Inputs.MyInput
                      inputid="bankaccountNo"
                      disabled={disabled}
                    />
                  </Grid>
                  <Grid item lg={4} md={4} xs={12}>
                    <Inputs.MyInputTT
                      inputid="tt_transUse"
                      disabled={disabled}
                    />
                  </Grid>

                  <Grid item lg={4} md={4} xs={12}>
                    <Inputs.MyFinancialLedgerPicker
                      inputid="financialLedgerDebit_id"
                      disabled={disabled}
                      onRender={handleOnRenderFinancialLedger}
                    />
                  </Grid>

                  <Grid item lg={4} md={4} xs={12}>
                    <Inputs.MyFinancialLedgerPicker
                      inputid="financialLedgerCredit_id"
                      disabled={disabled}
                      onRender={handleOnRenderFinancialLedger}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Inputs.MyInput inputid="memo" disabled={disabled} />
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
    dataById: state.financialtransactionData.dataById,
    errorById: state.financialtransactionData.errorById,
  };
}

const actionCreators = {
  onPostCreate: dataActions.post_create,
  onPutUpdate: dataActions.put_update,
  onGetById: dataActions.get_byId,
};

export default connect(mapState, actionCreators)(CurrentPage);
