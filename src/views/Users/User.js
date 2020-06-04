import React, { useEffect, useState } from "react";
import _ from "lodash";

import { Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { history } from "_helper";

//------redux
import { connect } from "react-redux";
import { userActions as dataActions } from "_actions";
import { userModel as dataModel } from "_dataModel";
import { CreinoxForm, Inputs } from "components";

// import { h_confirm } from '_helper'
const EDITURL = "/users/users";

const CurrentPage = ({
  dataById,
  onPostCreate,
  onPutUpdate,
  onGetById,
  errorById,
  ...props
}) => {
  // const id = _.get(props, "match.params.id");
  // const isFromEdit = id ? true : false;
  // const [disabled, setdisabled] = useState(isFromEdit && true);

  const id = parseInt(_.get(props, "match.params.id")) || "";
  const isFromEdit = Number.isInteger(id) ? true : false;
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
      onPutUpdate({ ...values });
    } else {
      onPostCreate(values, id => {
        history.push(EDITURL + "/" + id);
      });
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
              isFromEdit={isFromEdit}
              actionSubmit={handleOnSubmit}
              errors={errorById}
            >
              <CardBody>
                {/* form */}

                <Grid container spacing={2}>
                  <Grid item lg={4} xs={12}>
                    <Inputs.MyInput inputid="userName" disabled={isFromEdit} />
                  </Grid>
                  <Grid item lg={4} xs={12}>
                    <Inputs.MyInputPassword
                      inputid="password"
                      disabled={disabled}
                    />
                  </Grid>
                  <Grid item lg={4} xs={12}>
                    <Inputs.MyInput inputid="fullName" disabled={disabled} />
                  </Grid>
                  <Grid item lg={4} xs={12}>
                    <Inputs.MyInput inputid="ip" disabled={true} />
                  </Grid>
                  <Grid item lg={4} xs={12}>
                    <Inputs.MyComboboxFK
                      inputid="role_id"
                      optionLabel="name"
                      tableName="role"
                      disabled={disabled}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Inputs.MyInput
                      inputid="memo"
                      multiline
                      rows={3}
                      disabled={disabled}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item lg={4} xs={12}>
                    <Inputs.MyDateTimePicker inputid="lastLogin" disabled={true} />
                  </Grid>
                  <Grid item lg={4} xs={12}>
                    <Inputs.MyDateTimePicker inputid="createAt" disabled={true} />
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
    dataById: state.userData.dataById,
    errorById: state.userData.errorById
  };
}

const actionCreators = {
  onPostCreate: dataActions.post_create,
  onPutUpdate: dataActions.put_update,
  onGetById: dataActions.get_byId
};

export default connect(mapState, actionCreators)(CurrentPage);
