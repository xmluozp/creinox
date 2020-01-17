import React, { useEffect, useState } from "react";
import _ from "lodash";

import { Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { history } from "../../_helper";

//------redux
import { connect } from "react-redux";
import { commonitemActions as dataActions } from "../../_actions";
import { commonitemModel as dataModel } from "../../_dataModel";
import { CreinoxForm, Inputs } from "../../components";
import { enumsLabel } from "../../_constants";

// import { h_confirm } from '../../_helper'
const CurrentPage = ({
  dataById,
  onPostCreate,
  onPutUpdate,
  onGetById,
  errorById,
  ...props
}) => {
  const EDITURL = "/commonitems/commonitemsList"; // 编辑完毕跳转用
  const id = parseInt(_.get(props, "match.params.id")) || "";
  const commonType = parseInt(_.get(props, "match.params.commonType")) || 0;
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
      onPostCreate(values, () => {
        history.push(EDITURL + "/" + commonType);
      });
    }
  };

  const defaultValues = isFromEdit && dataById && { ...dataById.row };
  const preConditions = { commonType: commonType };

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
              defaultValues={defaultValues}
              preConditions={preConditions}
              isFromEdit={isFromEdit}
              actionSubmit={handleOnSubmit}
              dataModel={dataModel}
              errors={errorById}
            >
              <CardBody>
                {/* form */}

                <Grid container spacing={2}>
                  <Grid item lg={6} xs={12}>
                    <Inputs.MySelect
                      inputid="commonType"
                      options={enumsLabel.commonType}
                      hasDefault={true}
                      disabled={true}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Inputs.MyInput inputid="sorting" disabled={disabled} />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Inputs.MyInput inputid="name" disabled={disabled} />
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Inputs.MyInput inputid="ename" disabled={disabled} />
                  </Grid>
                  <Grid item xs={12}>
                    <Inputs.MyInput
                      inputid="memo"
                      multiline
                      disabled={disabled}
                    />
                  </Grid>
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
    dataById: state.commonitemData.dataById,
    errorById: state.commonitemData.errorById
  };
}

const actionCreators = {
  onPostCreate: dataActions.post_create,
  onPutUpdate: dataActions.put_update,
  onGetById: dataActions.get_byId
};

export default connect(mapState, actionCreators)(CurrentPage);
