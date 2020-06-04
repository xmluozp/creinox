import React, { useEffect, useState } from "react";
import _ from "lodash";

import { Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { history } from "_helper";

import {authOptions} from '_constants'
// import {} from "_helpe"

//------redux
import { connect } from "react-redux";
import { roleActions as dataActions } from "_actions";
import { roleModel as dataModel } from "_dataModel";
import { CreinoxForm, Inputs } from "components";

// import { h_confirm } from '_helper'
const EDITURL = "/users/roles";

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
                  <Grid item lg={6} xs={12}>
                    <Inputs.MyInput inputid="name" disabled={disabled} />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Inputs.MyInput inputid="rank" disabled={disabled} />
                  </Grid>
                 
                  <Grid item lg={12} xs={12}>
                    <Inputs.MyCombobox
                      multiple={true}
                      inputid="auth"
                      options={authOptions}
                      disabled={disabled}
                    />
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
    dataById: state.roleData.dataById,
    errorById: state.roleData.errorById
  };
}

const actionCreators = {
  onPostCreate: dataActions.post_create,
  onPutUpdate: dataActions.put_update,
  onGetById: dataActions.get_byId
};

export default connect(mapState, actionCreators)(CurrentPage);
