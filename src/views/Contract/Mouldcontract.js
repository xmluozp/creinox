import React, { useEffect, useState } from "react";
import _ from "lodash";

import { Row, Col, Card, CardHeader } from "reactstrap";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
// import formatCurrency from "format-currency";

//------redux
import { connect } from "react-redux";
import { mouldcontractActions as dataActions } from "_actions";
import { mouldcontractModel as dataModel } from "_dataModel";
import { CreinoxForm, Inputs, TabPanel, Gallery } from "components";
import { enumsLabel, enums } from "_constants";
import { history, h_fkFetch } from "_helper";

export const withMouldcontract = (EDITURL = "/contract/mouldcontracts") => {
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

    const folder_id =
      dataById && dataById.row && dataById.row.gallary_folder_id;

    const handleOnRead = () => {
      h_fkFetch("mouldcontract", [], "get_last")
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
                  </strong>
                </CardHeader>

                <Tabs
                  value={tabSelect}
                  style={{ borderBottom: "1px solid #E0E0E0" }}
                  onChange={handleTabChange}
                  aria-label="tabs"
                >
                  <Tab label="基本信息" />
                  <Tab label="图片" disabled={!isFromEdit} />
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
                        injector,
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
                            复制最近一张合同的内容
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
                  <Gallery
                    folder_id={folder_id}
                    folder_structure={{
                      memo: "mould_contract/" + id,
                      RefSource: "mould_contract.gallary_folder_id",
                      RefId: id,
                      folderType: 1,
                      tableName: "mould_contract",
                      columnName: "gallary_folder_id",
                    }}
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
    disabled,
    injector,
    onGetDefaultCode,
    OnGetInvoiceCode
  ) => {
    const handleChangeSellerBank = (selectData) => {
      if (selectData && selectData.id) {
        injector({
          seller_accountName: selectData.accountName,
          seller_accountNo: selectData.accountNo,
          seller_bankName: selectData.bankName,
        });
      }
    };

    const handleChangeBuyerBank = (selectData) => {
      if (selectData && selectData.id) {
        injector({
          buyer_accountName: selectData.accountName,
          buyer_accountNo: selectData.accountNo,
          buyer_bankName: selectData.bankName,
        });
      }
    };

    const handleChangeProduct = (selectData) => {
      if (selectData && selectData.id) {
        injector({
          spec: selectData.spec1,
        });
      }
    };

    return (
      <>
        {/* 基本信息 */}

        <Grid item lg={6} md={6} xs={12}>
          <Inputs.MyComboboxAsyncFK
            inputid="product_id"
            tableName="product"
            actionName="get_disposable_dropdown"
            onSelect={handleChangeProduct}
          />
        </Grid>
        <Grid item lg={2} md={2} xs={12}>
          <Inputs.MyComboboxFK
            inputid="follower_id"
            stateName="followerDropdown"
            optionLabel="userName"
            tableName="user"
            disabled={disabled}
          />
        </Grid>
        <Grid item lg={2} md={2} xs={12}>
          <Inputs.MyInput
            inputid="code"
            disabled={disabled}
            onGetDefault={onGetDefaultCode}
          />
        </Grid>
        <Grid item lg={2} md={2} xs={12}>
          <Inputs.MyInput
            inputid="invoiceCode"
            disabled={disabled}
            onGetDefault={OnGetInvoiceCode}
          />
        </Grid>
        <Grid item lg={2} md={2} xs={12}>
          <Inputs.MyRegionPicker inputid="region_id" disabled={disabled} />
        </Grid>

        <Grid item lg={2} md={2} xs={12}>
          <Inputs.MyInput inputid="totalPrice" disabled={disabled} />
        </Grid>
        <Grid item lg={2} md={2} xs={12}>
          <Inputs.MyInput inputid="unitPrice" disabled={disabled} />
        </Grid>
        <Grid item lg={2} md={2} xs={12}>
          <Inputs.MyInput inputid="prepayPercentage" disabled={disabled} />
        </Grid>
        <Grid item lg={2} md={2} xs={12}>
          <Inputs.MyInput inputid="prepayPrice" disabled={disabled} />
        </Grid>
        <Grid item lg={2} md={2} xs={12}>
          <Inputs.MyComboboxCurrency
            inputid="currency_id"
            disabled={disabled}
          />
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <Inputs.MyInput inputid="spec" disabled={disabled} />
        </Grid>

        <Grid item lg={2} md={2} xs={12}>
          <Inputs.MyDatePicker inputid="activeAt" disabled={disabled} />
        </Grid>
        <Grid item lg={2} md={2} xs={12}>
          <Inputs.MyDatePicker inputid="prepayAt" disabled={disabled} />
        </Grid>
        <Grid item lg={2} md={2} xs={12}>
          <Inputs.MyDatePicker inputid="scheduleAt" disabled={disabled} />
        </Grid>
        <Grid item lg={2} md={2} xs={12}>
          <Inputs.MyDatePicker inputid="deliverAt" disabled={disabled} />
        </Grid>
        <Grid item lg={2} md={2} xs={12}>
          <Inputs.MyInput inputid="deliverDueDays" disabled={disabled} />
        </Grid>
        <Grid item lg={2} md={2} xs={12}>
          <Inputs.MyInput inputid="confirmDueDays" disabled={disabled} />
        </Grid>

        {/* 客户要求默认限制广州钰诚 */}
        <Grid item lg={6} md={6} xs={12}>
          <Inputs.MyComboboxAsyncFK
            disabled={disabled}
            inputid="buyer_company_id"
            tableName="company"
            actionName="get_disposable_dropdown"
            preConditions={{ id: "1043", companyType: enums.companyType.internal }}
          />
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyInput inputid="buyer_signer" disabled={disabled} />
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyDatePicker inputid="buyer_signAt" disabled={disabled} />
        </Grid>

        <Grid item lg={6} md={6} xs={12}>
          <Inputs.MyComboboxAsyncFK
            disabled={disabled}
            inputid="seller_company_id"
            tableName="company"
            actionName="get_disposable_dropdown"
            preConditions={{ companyType: enums.companyType.factory }}
          />
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyInput inputid="seller_signer" disabled={disabled} />
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyDatePicker inputid="seller_signAt" disabled={disabled} />
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyComboboxCascade
            inputid="temp_buyerbank"
            disabled={disabled}
            listen={{ buyer_company_id: "company_id" }}
            tableName="bankaccount"
            optionLabel="accountNo"
            actionName="get_dropdown"
            onSelect={handleChangeBuyerBank}
          />
        </Grid>

        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyInput inputid="buyer_accountName" disabled={disabled} />
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyInput inputid="buyer_accountNo" disabled={disabled} />
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyInput inputid="buyer_bankName" disabled={disabled} />
        </Grid>

        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyComboboxCascade
            inputid="temp_sellerbank"
            disabled={disabled}
            listen={{ seller_company_id: "company_id" }}
            tableName="bankaccount"
            optionLabel="accountNo"
            actionName="get_dropdown"
            onSelect={handleChangeSellerBank}
          />
        </Grid>

        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyInput inputid="seller_accountName" disabled={disabled} />
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyInput inputid="seller_accountNo" disabled={disabled} />
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyInput inputid="seller_bankName" disabled={disabled} />
        </Grid>

        <Grid item lg={12} md={12} xs={12}>
          <Inputs.MyInputTT inputid="tt_memo" disabled={disabled} />
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
      dataById: state.mouldcontractData.dataById,
      errorById: state.mouldcontractData.errorById,
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

export default withMouldcontract();
