import React, { useEffect, useState } from "react";
import _ from "lodash";

import { Row, Col, Card, CardHeader } from "reactstrap";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

//------redux
import { connect } from "react-redux";
import { companyActions as dataActions } from "../../_actions";
import { companyModel as dataModel } from "../../_dataModel";
import { CreinoxForm, Inputs, TabPanel, Gallery } from "../../components";
import { enumsLabel } from "../../_constants";
import { history } from "../../_helper";

import Contacts from "./Contacts"
import BankaccountsCompany from "../Bank/BankaccountsCompany"



export const withCompany = (companyType = 0, EDITURL="") => {
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

    const handleTabChange = (event, newValue) => {
      setTabSelect(newValue);
    };

    useEffect(() => {
      // if there is ID, fetch data
      if (id) {
        onGetById(id);
      }
    }, [onGetById, id]);

    // ********************************

    const handleOnSubmit = values => {
      if (isFromEdit) {
        onPutUpdate({ companyType: companyType, ...values });
      } else {
        // onPostCreate(values, history.location.pathname);
        onPostCreate(values, (id)=>{
          // not using async. because I want loading bar's codes put with callback codes
          history.push(EDITURL + "/" + id) 
        });
      }
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
                      dataModel={dataModel}
                      defaultValues={
                        isFromEdit && dataById && { ...dataById.row }
                      }
                      errors={errorById}
                      isFromEdit={isFromEdit}
                      actionSubmit={handleOnSubmit}
                    >
                      <Grid container spacing={2}>
                        <Grid item lg={8} md={8} xs={12}>
                          <Grid container spacing={2}>
                            {formInputs(disabled)}
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
                    <Gallery/>
                  </TabPanel>
                  <TabPanel value={tabSelect} index={2}>
                    <Contacts preConditions ={{company_id: id}}/>
                  </TabPanel>
                  <TabPanel value={tabSelect} index={3}>
                    <BankaccountsCompany preConditions ={{company_id: id}}/>
                  </TabPanel>

                
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  };

  const formInputs = disabled => {
    return (
      <>
        {/* 基本信息 */}
        <Grid item lg={12} md={12} xs={12}>
          <Inputs.MyInput inputid="name" disabled={disabled} />
        </Grid>
        <Grid item lg={4} md={4} xs={12}>
          <Inputs.MyInput inputid="shortname" disabled={disabled} />
        </Grid>
        <Grid item lg={8} md={8} xs={12}>
          <Inputs.MyInput inputid="code" disabled={disabled} />
        </Grid>
        <Grid item lg={8} md={8} xs={12}>
          <Inputs.MyInput inputid="ename" disabled={disabled} />
        </Grid>
        <Grid item lg={4} md={4} xs={12}>
          <Inputs.MyInput inputid="eshortname" disabled={disabled} />
        </Grid>
        <Grid item xs={12}>
          <Inputs.MyInput
            inputid="region"
            multiline
            rows={1}
            disabled={disabled}
          />
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
          <Inputs.MyDatePicker inputid="retriveTime" disabled={disabled} />
        </Grid>

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
        <Grid item xs={12}>
          <Inputs.MySwitch inputid="isActive" disabled={disabled} />
        </Grid>
      </>
    );
  };

  /*
                      <Grid item lg={4} md={4} xs={12}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            todo: imageLicense
                          </Grid>
                          <Grid item xs={12}>
                            todo: imageBizCard
                          </Grid>
                           <Grid item xs={12}>
                            todo: 图片列表
                          </Grid>
                        </Grid>
                      </Grid>


*/

  // ============================================= Redux

  function mapState(state) {
    return {
      dataById: state.companyData.dataById,
      errorById: state.companyData.errorById
    };
  }

  const actionCreators = {
    onPostCreate: dataActions.post_create,
    onPutUpdate: dataActions.put_update,
    onGetById: dataActions.get_byId
  };

  return connect(mapState, actionCreators)(CurrentPage);
};

export default withCompany();
