import React, { useEffect, useState } from "react";
import _ from "lodash";
import useCancelableTimeout from "use-cancelable-timeout";

import { Row, Col, Card, CardHeader } from "reactstrap";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

//------redux
import { connect } from "react-redux";
import { companyActions as dataActions } from "_actions";
import { companyModel as dataModel } from "_dataModel";
import { CreinoxForm, Inputs, TabPanel, Gallery } from "components";
import { enumsLabel } from "_constants";
import {
  history,
  h_filterImage,
  h_is_all_letters,
  h_code_plus_one,
} from "_helper";

import Contacts from "./Contacts";
import BankaccountsCompany from "../Bank/EmbedBankaccountsCompany";

export const withCompany = (companyType = 0, EDITURL = "") => {
  const CurrentPage = ({
    dataById,
    errorById,
    onPostCreate,
    onPutUpdate,
    onGetById,
    onGetCode,
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
        // console.log("fetch new data:", id)
      }
    }, [onGetById, id]);

    // ********************************

    const handleOnSubmit = (values) => {
      if (isFromEdit) {
        // 如果没有新的图片，就不上传图片
        values = h_filterImage(values, "imageLicense_id.row");
        values = h_filterImage(values, "imageBizCard_id.row");

        // 因为有图片，所以需要刷新一下，好显示图片的thumbnail
        onPutUpdate({ companyType: companyType, ...values }, (res) => {
          injector(res.row);
        });
      } else {
        // onPostCreate(values, history.location.pathname);
        onPostCreate({ companyType: companyType, ...values }, (id) => {
          // not using async. because I want loading bar's codes put with callback codes
          history.push(EDITURL + "/" + id);
        });
      }
    };

    // ============================================================= 延时取code (
    // 因为延时控件不支持传值只好这样
    const [currentCode, setcurrentCode] = useState("");

    const getLastCode = async () => {
      try {
        const value = currentCode;
        const itemOfMaxCode = await onGetCode(companyType, value);
        if (itemOfMaxCode && itemOfMaxCode.row) {
          const code = h_code_plus_one(itemOfMaxCode.row["code"]);
          const region_id = itemOfMaxCode.row["region_id"];
          injector({
            code,
            region_id,
          });
        }
      } catch (error) {
        console.log("取不到公司code", error);
      }

      // 无论有没有取到，停止延时
      cancelGetLastCode();
    };
    const [onGetLastCode, cancelGetLastCode] = useCancelableTimeout(
      getLastCode,
      1000
    );

    const handleCodeOnChange = (null1, null2, value) => {
      // 延时判断
      if (companyType && value && h_is_all_letters(value)) {
        setcurrentCode(value);
        onGetLastCode();
      }
    };
    // ============================================================= 延时取code )

    // ******************************** injector:update the form. otherwise, form is separated from store(input and output)
    const [injector, setInjector] = useState(null);
    const handleGetInjector = (inj) => {
      setInjector(inj);
    };

    const folder_id =
      dataById && dataById.row && dataById.row.gallary_folder_id;
    // const imageLicense_id =
    //   dataById && dataById.row && dataById.row.imageLicense_id; // 删除用
    // const imageBizCard_id =
    //   dataById && dataById.row && dataById.row.imageBizCard_id;

    return (
      <>
        {/* 主框架 */}
        <div className="animated fadeIn">
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <strong>
                    <i className="icon-info pr-1"></i>
                    {enumsLabel.companyType[companyType]} id: {id}
                  </strong>
                </CardHeader>

                <Tabs
                  value={tabSelect}
                  style={{ borderBottom: "1px solid #E0E0E0" }}
                  onChange={handleTabChange}
                  aria-label="tabs"
                >
                  <Tab label="基本信息" />
                  <Tab label="图册" disabled={!isFromEdit} />
                  <Tab label="联系人名册" disabled={!isFromEdit} />
                  <Tab label="银行账户" disabled={!isFromEdit} />
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
                          {formInputs(disabled, handleCodeOnChange)}
                        </Grid>
                      </Grid>
                      <Grid item lg={4} md={4} xs={12}>
                        <Grid container spacing={2}>
                          <Inputs.MyImage
                            inputid="imageLicense_id.row"
                            disabled={disabled}
                          />
                          <Inputs.MyImage
                            inputid="imageBizCard_id.row"
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
                  <Gallery
                    folder_id={folder_id}
                    folder_structure={{
                      memo: "company/" + id,
                      RefSource: "company.gallary_folder_id",
                      RefId: id,
                      folderType: 1,
                      tableName: "company",
                      columnName: "gallary_folder_id",
                    }}
                  />
                </TabPanel>
                <TabPanel value={tabSelect} index={2}>
                  <Contacts preConditions={{ company_id: id }} />
                </TabPanel>
                <TabPanel value={tabSelect} index={3}>
                  <BankaccountsCompany preConditions={{ company_id: id }} />
                </TabPanel>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  };

  // 1: 内部公司
  const formInputs = (disabled, handleCodeOnChange) => {
    return (
      <>
        {companyType === 1
          ? template_1(disabled)
          : templateCommon(disabled, handleCodeOnChange)}
        <Grid item lg={4} xs={12}>
          <Inputs.MyDatePicker inputid="updateAt" disabled={true} />
        </Grid>
        <Grid item lg={4} xs={12}>
          <Inputs.MyDatePicker inputid="createAt" disabled={true} />
        </Grid>
        <Grid item xs={12}>
          <Inputs.MySwitch inputid="isActive" disabled={disabled} />
        </Grid>
      </>
    );
  };

  // ======================================= 公司资料模板 //不同类型的公司需要填的内容不一样，所以需要用不同模板区分 =======================================
  const templateCommon = (disabled, handleCodeOnChange) => (
    <>
      {/* 基本信息 */}
      <Grid item lg={8} md={8} xs={12}>
        <Inputs.MyInput
          inputid="code"
          disabled={disabled}
          onChangeSideEffect={handleCodeOnChange}
        />
      </Grid>
      <Grid item lg={4} md={4} xs={12}>
        <Inputs.MyRegionPicker inputid="region_id" disabled={disabled} />
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
      <Grid item lg={8} md={8} xs={12}>
        <Inputs.MyInput
          inputid="address"
          multiline
          rows={1}
          disabled={disabled}
        />
      </Grid>
      <Grid item lg={4} md={4} xs={12}>
        <Inputs.MyInput inputid="postcode" disabled={disabled} />
      </Grid>
      {/* 联系信息 */}
      <Grid item lg={4} md={4} xs={12}>
        <Inputs.MyInput inputid="phone1" disabled={disabled} />
      </Grid>
      <Grid item lg={4} md={4} xs={12}>
        <Inputs.MyInput inputid="phone2" disabled={disabled} />
      </Grid>
      <Grid item lg={4} md={4} xs={12}>
        <Inputs.MyInput inputid="phone3" disabled={disabled} />
      </Grid>
      <Grid item lg={4} md={4} xs={12}>
        <Inputs.MyInput inputid="fax1" disabled={disabled} />
      </Grid>
      <Grid item lg={4} md={4} xs={12}>
        <Inputs.MyInput inputid="fax2" disabled={disabled} />
      </Grid>
      <Grid item lg={4} md={4} xs={12}>
        <Inputs.MyInput inputid="website" disabled={disabled} />
      </Grid>
      <Grid item lg={4} md={4} xs={12}>
        <Inputs.MyInput inputid="email1" disabled={disabled} />
      </Grid>
      <Grid item lg={4} md={4} xs={12}>
        <Inputs.MyInput inputid="email2" disabled={disabled} />
      </Grid>
      {/* 税务信息 */}
      <Grid item xs={12}>
        <Inputs.MyInput inputid="memo" multiline disabled={disabled} />
      </Grid>
      <Grid item xs={12}>
        <Inputs.MyInput inputid="gsfj" disabled={disabled} />
      </Grid>
      <Grid item xs={12}>
        <Inputs.MyInput inputid="fjdz" disabled={disabled} />
      </Grid>
      <Grid item lg={4} md={4} xs={6}>
        <Inputs.MyInput inputid="fjyb" disabled={disabled} />
      </Grid>
      <Grid item lg={8} md={8} xs={6}>
        <Inputs.MyInput inputid="taxcode" disabled={disabled} />
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
        <Inputs.MyDatePicker inputid="retrieveTime" disabled={disabled} />
      </Grid>
      <Grid item lg={4} xs={12}>
        <Inputs.MyComboboxFK
          inputid="updateUser_id"
          optionLabel="userName"
          tableName="user"
          disabled={true}
        />
      </Grid>
    </>
  );

  const template_1 = (disabled) => (
    <>
      {/* 基本信息 */}

      <Grid item lg={6} md={6} xs={12}>
        <Inputs.MyInput inputid="code" disabled={disabled} />
      </Grid>

      <Grid item lg={6} md={6} xs={12}>
        <Inputs.MyRegionPicker inputid="region_id" disabled={disabled} />
      </Grid>
      <Grid item lg={12} md={12} xs={12}>
        <Inputs.MyInput inputid="name" disabled={disabled} />
      </Grid>
      <Grid item xs={12}>
        <Inputs.MyInput inputid="ename" disabled={disabled} />
      </Grid>
      <Grid item xs={12}>
        <Inputs.MyInput
          inputid="address"
          multiline
          rows={1}
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={12}>
        <Inputs.MyInput
          inputid="eaddress"
          multiline
          rows={1}
          disabled={disabled}
        />
      </Grid>
      {/* 联系信息 */}
      <Grid item lg={4} md={4} xs={12}>
        <Inputs.MyInput inputid="phone1" disabled={disabled} />
      </Grid>
      <Grid item lg={4} md={4} xs={12}>
        <Inputs.MyInput inputid="phone2" disabled={disabled} />
      </Grid>
      <Grid item lg={4} md={4} xs={12}>
        <Inputs.MyInput inputid="fax1" disabled={disabled} />
      </Grid>
      {/* 税务信息 */}
      <Grid item lg={4} md={4} xs={12}>
        <Inputs.MyInput inputid="zsl" disabled={disabled} />
      </Grid>
      <Grid item lg={4} md={4} xs={12}>
        <Inputs.MyInput inputid="hl" disabled={disabled} />
      </Grid>
      <Grid item lg={4} md={4} xs={6}>
        <Inputs.MyInput inputid="tsl" disabled={disabled} />
      </Grid>
      <Grid item xs={12}>
        <Inputs.MyInput inputid="taxcode" disabled={disabled} />
      </Grid>
      {/* 资料责任人信息 */}
      <Grid item lg={4} xs={12}>
        <Inputs.MyComboboxFK
          inputid="updateUser_id"
          optionLabel="userName"
          tableName="user"
          disabled={true}
        />
      </Grid>
    </>
  );

  // ============================================= Redux

  function mapState(state) {
    return {
      dataById: state.companyData.dataById,
      errorById: state.companyData.errorById,
    };
  }

  const actionCreators = {
    onPostCreate: dataActions.post_create,
    onPutUpdate: dataActions.put_update,
    onGetById: dataActions.get_byId,
    onGetCode: dataActions.get_code,
  };

  return connect(mapState, actionCreators)(CurrentPage);
};

export default withCompany();
