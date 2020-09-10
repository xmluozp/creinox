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
import {
  buycontractActions as dataActions,
  sellcontractActions,
} from "_actions";
import { buycontractModel as dataModel } from "_dataModel";
import { CreinoxForm, Inputs, TabPanel } from "components";
import { enumsLabel, enums } from "_constants";
import { history, h_fkFetch, authCheckUser } from "_helper";

import Buysubitems from "./Buysubitems";
const AUTHNAME_CONFORM = "confirm-payment"

export const withBuycontract = (EDITURL = "/contract/buycontracts") => {
  const CurrentPage = ({
    dataById,
    sc_dataById,
    errorById,
    onPostCreate,
    onPutUpdate,
    onGetById,
    onGetDefaultCode,
    onGetInvoiceCode,
    sc_onGetById,
    onClear,
    sc_onClear,
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

    // ******************************** injector: 用来读取最近一条合同
    const [injector, setInjector] = useState(null);

    // 响应listener监控，用来搜索对应公司下的报价
    const [sellCompanyId, setSellCompanyId] = useState(0)

    useEffect(() => {
      // if there is ID, fetch data
      if (id) {
        onGetById(id);
      }

      return () => {
        onClear();
      };
    }, [onGetById, id]);

    //******************************************** 获取上级订单(
    // 有3种可能获取上级订单：param，直接通过buyId读取对应的sellId，下拉选择sellContract
    // TODO: 0731 需要修改三种方式： param里面的上级的order_form_id, dataById里面的parent_id, 下拉选择的sellContract对应的 order_form_id
    const parm_sc_id =
      parseInt(_.get(props, "match.params.sell_contract_id")) || "";
    const read_sc_id =
      (dataById && dataById.row && dataById.row.sell_contract_id) ||
      parm_sc_id ||
      0;

    // 获取上级订单可能性 1: 从链接的Param
    // 2：isEdit时候读取
    useEffect(() => {
      if (read_sc_id && injector) {
        sc_onGetById(read_sc_id);
        injector({
          sell_contract_id: read_sc_id,
        });
      }

      return () => {
        sc_onClear();
      };
    }, [sc_onGetById, read_sc_id, injector]);

    // 获取上级订单可能性3：下拉框选择时候读取
    const handleOnSelect_sc = (item) => {
      if (item && item.id) {
        sc_onGetById(item.id);
      }
    };

    // 读取上级订单以后，放到store里面便于之后调用(buy_subitem需要用到)
    const sc_dataRow = (sc_dataById && sc_dataById.row) || null;

    // ******************************************** )获取上级订单

    const handleOnSubmit = (values) => {
      if (isFromEdit) {
        onPutUpdate(values, ()=> {
          onGetById(id); // 更新不返回 orderForm 所以手动更新一下
        });
      } else {
        // onPostCreate(values, history.location.pathname);
        onPostCreate(values, (id) => {
          history.push(EDITURL + "/" + id);
        });
      }
    };

    const handleOnRead = () => {
      h_fkFetch("buycontract", [], "get_last")
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

    let defaultData = isFromEdit && dataById && { ...dataById.row };
    const locked = defaultData && defaultData.isDone === true && !authCheckUser(user, AUTHNAME_CONFORM)
   
    // console.log("default", defaultData )
    return (
      <>
        {/* 主框架 */}
        <div className="animated fadeIn">
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <strong>
                    <i className="icon-info pr-1"></i>id: {id}
                    {dataById && dataById.row
                      ? "货款合计：" + formatCurrency(dataById.row.totalPrice)
                      : null}
                    {/* 外运编号就是客户订单号 */}
                    客户订单号： {sc_dataRow && sc_dataRow.orderNumber}
                  </strong>
                </CardHeader>

                <Tabs
                  value={tabSelect}
                  style={{ borderBottom: "1px solid #E0E0E0" }}
                  onChange={handleTabChange}
                  aria-label="tabs"
                >
                  <Tab label="基本信息" />
                  <Tab label="采购产品" disabled={!isFromEdit} />
                </Tabs>

                {/* main form */}
                {/* listener: subitem里取公司报价用 */}
                <TabPanel value={tabSelect} index={0}>
                  <CreinoxForm
                    defaultValues={defaultData}
                    errors={errorById}
                    isFromEdit={isFromEdit}
                    disabled = {disabled}
                    actionSubmit={handleOnSubmit}
                    dataModel={dataModel}
                    onGetInjector={f => setInjector(f)}
                    listener = {{seller_company_id: v => setSellCompanyId(v)}}
                  >
                    <Grid container spacing={2}>
                      {formInputs({
                        disabled,
                        isFromEdit,
                        parm_sc_id,
                        onSelect_sc: handleOnSelect_sc,
                        onGetDefaultCode: handleOnGetDefaultCode,
                        onGetInvoiceCode: handleOnGetInvoiceCode,
                        user
                      })}
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
                      {!isFromEdit && !locked  && (
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
                  <Buysubitems
                    onUpdate={() => {
                      onGetById(id);
                    }}
                    sellCompanyId = {sellCompanyId}
                    preConditions={{
                      buy_contract_id: id,
                      sell_contract_id: read_sc_id,
                    }}

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
  const formInputs = ({
    disabled,
    isFromEdit,
    parm_sc_id,
    onSelect_sc,
    onGetDefaultCode,
    onGetInvoiceCode,
    user
  }) => {
    return (
      <>
        {/* 假如从属性里获得了销售合同，就不允许手动选择 */}

        <Grid item lg={4} md={4} xs={12}>
          <Inputs.MyComboboxFK
            inputid="follower_id"
            stateName="followerDropdown"
            optionLabel="userName"
            tableName="user"
            disabled={disabled}
          />
        </Grid>

        <Grid item lg={4} md={4} xs={12}>
          <Inputs.MyComboboxFK
            disabled={disabled}
            inputid="buyer_company_id"
            tableName="company"
            stateName="creinoxCompanyDropdown"
            actionName="get_disposable_dropdown"
            preConditions={{ id: "1046,1043" ,companyType: enums.companyType.internal}}
          />
        </Grid>

        <Grid item lg={4} md={4} xs={12}>
          <Inputs.MyComboboxAsyncFK
            disabled={disabled}
            inputid="seller_company_id"
            stateName="allCompanyDropdown"
            tableName="company"
            actionName="get_disposable_dropdown"
            preConditions={
              {companyType: enums.companyType.all}
            }
          />
        </Grid>

        {/* 基本信息 */}

        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyInput
            inputid="code"
            disabled={disabled}
            onGetDefault={onGetDefaultCode}
          />
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyInput
            inputid="invoiceCode"
            disabled={disabled}
            onGetDefault={onGetInvoiceCode}
          />
        </Grid>

        <Grid item lg={6} md={6} xs={12}>
          <Inputs.MyComboboxAsyncFK
            disabled={isFromEdit || !!parm_sc_id}
            inputid="sell_contract_id"
            optionLabel="code"
            tableName="sellcontract"
            actionName="get_disposable_dropdown"
            onSelect={onSelect_sc}
          />
        </Grid>

        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyDatePicker inputid="activeAt" disabled={disabled} />
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyRegionPicker inputid="region_id" disabled={disabled} />
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyComboboxPaymentType
            inputid="paymentType_id"
            disabled={disabled}
          />
        </Grid>

        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyDatePicker inputid="deliverAt" disabled={disabled} />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Inputs.MyInputTT inputid="tt_quality" disabled={disabled} />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Inputs.MyInputTT inputid="tt_deliveryMethod" disabled={disabled} />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Inputs.MyInputTT inputid="tt_shippingTerm" disabled={disabled} />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Inputs.MyInputTT inputid="tt_loss" disabled={disabled} />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Inputs.MyInputTT inputid="tt_packingStandard" disabled={disabled} />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Inputs.MyInputTT
            inputid="tt_acceptanceCondition"
            disabled={disabled}
          />
        </Grid>

        <Grid item lg={12} md={12} xs={12}>
          <Inputs.MyInputTT inputid="tt_accessories" disabled={disabled} />
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <Inputs.MyInputTT inputid="tt_payment" disabled={disabled} />
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <Inputs.MyInputTT inputid="tt_breach" disabled={disabled} />
        </Grid>

        <Grid item lg={6} md={6} xs={12}>
          <Inputs.MyInputTT inputid="tt_dispute" disabled={disabled} />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Inputs.MyInputTT inputid="tt_memo" disabled={disabled} />
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
      dataById: state.buycontractData.dataById,
      errorById: state.buycontractData.errorById,
      sc_dataById: state.sellcontractData.dataById,
    };
  }

  const actionCreators = {
    onPostCreate: dataActions.post_create,
    onPutUpdate: dataActions.put_update,
    onGetById: dataActions.get_byId,
    onClear: dataActions._clear,
    onGetDefaultCode: dataActions.get_disposable_defaultCode,
    onGetInvoiceCode: dataActions.get_disposable_invoiceCode,

    sc_onGetById: sellcontractActions.get_byId,
    sc_onClear: sellcontractActions._clear,
  };

  return connect(mapState, actionCreators)(CurrentPage);
};

export default withBuycontract();
