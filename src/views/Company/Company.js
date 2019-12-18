import React, { useEffect, useState } from "react";
import _ from "lodash";

import { Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

//------redux
import { connect } from "react-redux";
import { companyActions as dataActions } from "../../_actions";
import { companyModel as dataModel } from "../../_dataModel";
import { CreinoxForm, Inputs } from "../../components";
import { enumsLabel } from "../../_constants";

export const withCompany = (companyType = 0) => {

  const CurrentPage = ({
    dataById,
    errorById,
    onPostCreate,
    onPutUpdate,
    onGetById,
    ...props
  }) => {
    const id = _.get(props, "match.params.id");
    const isFromEdit = id ? true : false;
    const [disabled, setdisabled] = useState(id && true);

    useEffect(() => {
      // if there is ID, fetch data
      if (!dataById && id) {
        onGetById(id);
      }
    }, [onGetById, dataById, id]);

    // ********************************

    const handleOnSubmit = values => {
      if (isFromEdit) {
        onPutUpdate(values);
      } else {
        onPostCreate(values);
      }
    };

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
                errors={errorById}
                isFromEdit={isFromEdit}
                actionSubmit={handleOnSubmit}
              >
                <CardBody>
                  {/* form */}
                  <Grid container spacing={2}>
                    <Grid item lg={8} md={8} xs={12}>
                      <Grid container spacing={2}>
                        <Grid item lg={4} md={4} xs={12}>
                          <Inputs.MySelect
                            inputid="companyType"
                            hasDefault={false}
                            options={enumsLabel.companyType}
                            disabled={true}
                          />
                        </Grid>
                        <Grid item lg={8} md={8} xs={12}>
                          <Inputs.MyInput inputid="code" disabled={disabled} />
                        </Grid>
                        {/* 基本信息 */}
                        <Grid item lg={8} md={8} xs={12}>
                          <Inputs.MyInput inputid="name" disabled={disabled} />
                        </Grid>
                        <Grid item lg={4} md={4} xs={12}>
                          <Inputs.MyInput
                            inputid="shortname"
                            disabled={disabled}
                          />
                        </Grid>
                        <Grid item lg={8} md={8} xs={12}>
                          <Inputs.MyInput inputid="ename" disabled={disabled} />
                        </Grid>
                        <Grid item lg={4} md={4} xs={12}>
                          <Inputs.MyInput
                            inputid="eshortname"
                            disabled={disabled}
                          />
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
                          <Inputs.MyInput
                            inputid="postcode"
                            disabled={disabled}
                          />
                        </Grid>

                        {/* 联系信息 */}
                        <Grid item lg={4} md={4} xs={12}>
                          <Inputs.MyInput
                            inputid="phone1"
                            disabled={disabled}
                          />
                        </Grid>
                        <Grid item lg={4} md={4} xs={12}>
                          <Inputs.MyInput
                            inputid="phone2"
                            disabled={disabled}
                          />
                        </Grid>
                        <Grid item lg={4} md={4} xs={12}>
                          <Inputs.MyInput
                            inputid="phone3"
                            disabled={disabled}
                          />
                        </Grid>
                        <Grid item lg={4} md={4} xs={12}>
                          <Inputs.MyInput inputid="fax1" disabled={disabled} />
                        </Grid>
                        <Grid item lg={4} md={4} xs={12}>
                          <Inputs.MyInput inputid="fax2" disabled={disabled} />
                        </Grid>
                        <Grid item lg={4} md={4} xs={12}>
                          <Inputs.MyInput
                            inputid="website"
                            disabled={disabled}
                          />
                        </Grid>
                        <Grid item lg={4} md={4} xs={12}>
                          <Inputs.MyInput
                            inputid="email1"
                            disabled={disabled}
                          />
                        </Grid>
                        <Grid item lg={4} md={4} xs={12}>
                          <Inputs.MyInput
                            inputid="email2"
                            disabled={disabled}
                          />
                        </Grid>

                        {/* 税务信息 */}
                        <Grid item xs={12}>
                          <Inputs.MyInput
                            inputid="memo"
                            multiline
                            disabled={disabled}
                          />
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
                          <Inputs.MyInput
                            inputid="taxcode"
                            disabled={disabled}
                          />
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
                          <Inputs.MyDatePicker
                            inputid="retriveTime"
                            disabled={disabled}
                          />
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
                          <Inputs.MyDatePicker
                            inputid="updateAt"
                            disabled={true}
                          />
                        </Grid>
                        <Grid item lg={4} xs={12}>
                          <Inputs.MyDatePicker
                            inputid="createAt"
                            disabled={true}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item lg={4} md={4} xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          todo: 联系人
                        </Grid>
                        <Grid item xs={12}>
                          todo: 银行账户
                        </Grid>
                        <Grid item xs={12}>
                          todo: 图片列表
                        </Grid>
                        <Grid item xs={12}>
                          todo: imageLicense
                        </Grid>
                        <Grid item xs={12}>
                          todo: imageBizCard
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Inputs.MySwitch inputid="isActive" disabled={disabled} />
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