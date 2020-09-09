import React, { useEffect, useState } from "react";
import _ from "lodash";

import { Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { history } from "_helper";

import { enumsLabel, enums } from "_constants";
// import { authOptions } from "_constants";
// import {} from "_helpe"

//------redux
import { connect } from "react-redux";
import { expressorderActions as dataActions } from "_actions";
import { expressorderModel as dataModel } from "_dataModel";
import { CreinoxForm, Inputs } from "components";

// import { h_confirm } from '_helper'
const EDITURL = "/dailyBusinesses/expressOrders";

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

  const [direction, setDirection] = useState(0)

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
              disabled = {disabled}
              actionSubmit={handleOnSubmit}
              errors={errorById}
              toolBar={{isHidding: true}}
              listener = {{direction: v=>setDirection(v)}}
            >
              <CardBody>
                {/* form */}

                <Grid container spacing={2}>
                  <Grid item lg={4} md={4} xs={12}>
                    <Inputs.MyInput inputid="code" disabled={disabled} />
                  </Grid>              
                  <Grid item lg={4} md={4} xs={12}>
                    <Inputs.MySelect options={enumsLabel.direction} inputid="direction" disabled={disabled} />
                  </Grid>
                  <Grid item lg={4} md={4} xs={12}>
                    <Inputs.MySelect options={enumsLabel.expressType} inputid="expressType" disabled={disabled} />
                  </Grid>

                  <Grid item lg={4} md={4} xs={12}>
                    <Inputs.MyDatePicker inputid="expressAt" disabled={disabled} />
                  </Grid>

                  <Grid item lg={4} md={4} xs={12}>
                    <Inputs.MyDatePicker inputid="createAt" label="录入日期 (默认当前日期)" disabled={disabled} />
                  </Grid>
                  <Grid item lg={4} md={4} xs={12}>
                    <Inputs.MyInput inputid="memo" disabled={disabled} />
                  </Grid>
                  <Grid item lg={4} md={4} xs={12}>
                    <Inputs.MyComboboxFK
                      disabled={disabled}
                      inputid="internal_company_id"
                      label= 
                      {<span style={{fontWeight: "bold"}} 
                          className={direction === 0? "text-success": "text-danger"}>
                        [{direction === 0? "寄件方": "收件方"}] 我方公司
                        </span>}
                      tableName="company"
                      actionName="get_disposable_dropdown"
                      preConditions={{ id: "1046,1043", companyType: enums.companyType.internal }}
                    />
                  </Grid>
                  <Grid item lg={4} md={4} xs={12}>
                    <Inputs.MyComboboxAsyncFK
                      disabled={disabled}
                      inputid="external_company_id"
                      label= 
                      {<span style={{fontWeight: "bold"}} 
                        className={direction === 1? "text-success": "text-danger"}>
                        [{direction === 1? "寄件方": "收件方"}] 对方公司
                        </span>}
                      tableName="company"
                      actionName="get_disposable_dropdown"
                      preConditions={{ companyType: enums.companyType.all }}
                    />
                  </Grid>
                  <Grid item lg={4} md={4} xs={12}>
                    <Inputs.MyComboboxExpressCompany inputid="expressCompany_id" disabled={disabled} />
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
    dataById: state.expressorderData.dataById,
    errorById: state.expressorderData.errorById
  };
}

const actionCreators = {
  onPostCreate: dataActions.post_create,
  onPutUpdate: dataActions.put_update,
  onGetById: dataActions.get_byId
};

export default connect(mapState, actionCreators)(CurrentPage);
