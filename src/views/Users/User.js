import React, { useEffect, useState } from "react";
import _ from "lodash";

import { Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

//------redux
import { connect } from "react-redux";
import { userActions } from "../../_actions";
import { userModel as dataModel } from "../../_dataModel";
import { CreinoxForm, Inputs } from "../../components";

// import { h_confirm } from '../../_helper'

const User = ({ dataById, onPostCreate, onPutUpdate, onGetById, ...props }) => {
  const id = _.get(props, "match.params.id");
  const [disabled, setdisabled] = useState(id && true);
  // const [disabled, setdisabled] = useState( false )

  useEffect(() => {
    // if there is ID, fetch data
    if (!dataById && id) {
      onGetById(id);
    }
    console.log(dataById && dataById.row);
  }, [onGetById, dataById, id]);

  // ********************************

  const handleOnSubmit = values => {
    console.log("submit:", values);
  };

  return (
    <div className="animated fadeIn">
      <Row>
        <Col lg={12}>
          <Card>
            <CardHeader>
              <strong>
                <i className="icon-info pr-1"></i>User id: {id}
              </strong>
            </CardHeader>
            <CreinoxForm
              dataModel={dataModel}
              defaultValues={dataById && { ...dataById.row }}
              actionSubmit={handleOnSubmit}
            >
              <CardBody>
                {/* form */}

                <Grid container spacing={2}>
                  <Grid item lg={4} xs={12}>
                    <Inputs.MyInput inputid="userName" disabled={disabled} />
                  </Grid>
                  <Grid item lg={4} xs={12}>
                    <Inputs.MyInputPassword
                      inputid="password"
                      disabled={disabled}
                    />
                  </Grid>
                  <Grid item lg={4} xs={12}>
                    <Inputs.MyInput inputid="role_id" disabled={disabled} />
                  </Grid>
                  <Grid item lg={4} xs={12}>
                    <Inputs.MyInput inputid="fullName" disabled={disabled} />
                  </Grid>
                  <Grid item lg={4} xs={12}>
                    <Inputs.MyInput inputid="ip" disabled={disabled} />
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
                    <Inputs.MyDatePicker
                      inputid="lastLogin"
                      disabled={disabled}
                    />
                  </Grid>
                  <Grid item lg={4} xs={12}>
                    <Inputs.MyDatePicker
                      inputid="createAt"
                      disabled={disabled}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Inputs.MySwitch inputid="isActive" disabled={disabled} />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <MySubmitButton disabled={disabled} setdisabled={setdisabled}  />
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

const MySubmitButton = ({ disabled = false, setdisabled = () => {}, onSbumit }) => {
  return (
    <>
      <Grid item>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            setdisabled(!disabled);
          }}
        >
          {disabled ? "进入编辑模式" : "回到浏览模式"}
        </Button>
      </Grid>
      {disabled ? null : (
        <Grid item>
          <Button type="submit" variant="contained" color="primary">
            保存
          </Button>
        </Grid>
      )}
    </>
  );
};

function mapState(state) {
  return {
    dataById: state.userData.dataById
  };
}

const actionCreators = {
  onPostCreate: userActions.post_create,
  onPutUpdate: userActions.put_update,
  onGetById: userActions.get_byId
};

export default connect(mapState, actionCreators)(User);
