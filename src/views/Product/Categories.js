import React, { useState, useEffect } from "react";

import _ from "lodash";
// import { format } from 'date-fns'

import { Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import Grid from "@material-ui/core/Grid";
// import { DialogTitle } from "@material-ui/core";
import Button from "@material-ui/core/Button";

//------redux
import { connect } from "react-redux";
// import { ICONS } from "../../_constants";
import { h_confirm } from "../../_helper";
import {
  CreinoxTreeview,
  Inputs,
  CreinoxForm,
  withDatatableStore
} from "../../components";
import { categoryModel as dataModel } from "../../_dataModel";

// ******************************************************************* page setting
import { categoryActions as dataActions } from "../../_actions";

const editModes = {
  none: 0,
  edit: 1,
  create: 2
};

// inject data
// ******************************************************************* page setting
const MyTreeview = withDatatableStore(
  CreinoxTreeview, // tablecomponent
  { data: "categoryData" }, // data source
  dataActions.get_byCategory // fetch action
);

const CurrentPage = ({
  onDelete,
  onPostCreate,
  onPutUpdate,
  onGetById,
  pageName,
  dataById,
  errorById
}) => {
  const initialNode = { id: 0, name: "根节点" };
  const [selectedNode, setSelectedNode] = useState(initialNode);
  const [formEditMode, setformEditMode] = useState(editModes.none);
  const [initialCreateValues, setinitialCreateValues] = useState({});
  const [labelOfCreate, setlabelOfCreate] = useState("");
  const [renewToggle, setrenewToggle] = useState(false);

  // ============================================= handles
  const handleOnDelete = (id) => {
    h_confirm("是否删除？").then(resolve => {
      if (resolve) onDelete({}, id);
    });
  };

  const handleOnSubmit = values => {
    if (formEditMode === editModes.edit) {
      onPutUpdate({ ...selectedNode, ...values });
    } else if (formEditMode === editModes.create) {
      onPostCreate({ ...initialCreateValues, ...values });
    }
  };

  const handleOnSelect = node => {
    onGetById(node.id);
    setformEditMode(editModes.edit); // 设置成编辑模式
    setSelectedNode(node);
  };

  const handleSwitchToCreate = (id, path, label) => {
    setinitialCreateValues({ parent_id: id, path: path });
    setformEditMode(editModes.create); // 设置成新建模式
    setlabelOfCreate(label); // 修改提示
  };

  const handleSwitchToEdit = e => {
    setformEditMode(editModes.edit); // 设置成新建模式
  };

  useEffect(() => {
    setrenewToggle(!renewToggle);
  }, [dataById, setrenewToggle, formEditMode]);

  // ============================================= Render

  let defaultValues = {};
  if (formEditMode === editModes.edit && dataById) {
    defaultValues = { ...dataById.row };
  }

  return (
    <div className="animated fadeIn">
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} xs={12}>
          <MyTreeview onSelect={handleOnSelect} initialNode={initialNode} />
        </Grid>

        <Grid item lg={6} md={6} xs={12}>
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader
                  style={
                    formEditMode === editModes.create
                      ? { backgroundColor: "rgb(255, 255, 185)" }
                      : {}
                  }
                >
                  <strong>目前选中: {selectedNode && selectedNode.name}</strong>{" "}
                  {formEditMode === editModes.create ? labelOfCreate : null}
                </CardHeader>
                <CardBody>
                  <Grid container spacing={1}>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        disabled={
                          _.isEmpty(selectedNode) ||
                          _.isEqual(initialNode, selectedNode) ||
                          formEditMode === editModes.create
                        }
                        onClick={handleSwitchToCreate.bind(
                          null,
                          selectedNode.parent_id,
                          selectedNode.path,
                          `(添加同级节点中...)`
                        )}
                      >
                      添加同级
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        disabled={
                          _.isEmpty(selectedNode) ||
                          formEditMode === editModes.create
                        }
                        onClick={handleSwitchToCreate.bind(
                          null,
                          selectedNode.id,
                          selectedNode.path
                            ? selectedNode.path +
                                "," +
                                selectedNode.id.toString()
                            : "0",
                          `(添加子节点中...)`
                        )}
                      >
                      添加下级
                      </Button>
                    </Grid>
                    {formEditMode === editModes.create && (
                      <Grid item>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={handleSwitchToEdit}
                        >
                          取消
                        </Button>
                      </Grid>
                    )}
                  </Grid>

                  {/* 树编辑表单 */}
                  {formEditMode === editModes.edit ? (
                    <CreinoxForm
                      dataModel={dataModel}
                      defaultValues={defaultValues}
                      errors={errorById}
                      isFromEdit={formEditMode === editModes.edit}
                      actionSubmit={handleOnSubmit}
                      renewToggle={renewToggle}
                    >
                      {FormInputs()}
                      { selectedNode.id ? <Button variant="contained" 
                      onClick={handleOnDelete.bind(null, selectedNode.id)}
                      color="secondary" className="mt-3 mr-2">删除</Button> : null}
                     <Button type="submit" variant="contained" color="primary" className="mt-3">
                      保存修改
                      </Button>

                    </CreinoxForm>
                  ) : null}
                  {formEditMode === editModes.create ? (
                    <CreinoxForm
                      dataModel={dataModel}
                      defaultValues={initialCreateValues}
                      errors={errorById}
                      isFromEdit={false}
                      actionSubmit={handleOnSubmit}
                      renewToggle={renewToggle}
                    >
                      {FormInputs()}
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className="mt-3">
                    保存新节点
                    </Button>
                    </CreinoxForm>
                  ) : null}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Grid>
      </Grid>
    </div>
  );
};
// ============================================= propTypes

const FormInputs = () => {
  return (
    <>
      <Inputs.MyInput inputid="name" />
      <Inputs.MyInput inputid="ename" />
      <Inputs.MyInput inputid="startCode" />
      <Inputs.MyInput multiline inputid="memo" />
      <Inputs.MyInput multiline inputid="ememo" />
    </>
  );
};

// ============================================= Redux
function mapState(state) {
  return {
    dataById: state.categoryData.dataById,
    errorById: state.categoryData.errorById
  };
}

const actionCreators = {
  onDelete: dataActions._delete,
  onPutUpdate: dataActions.put_update,
  onPostCreate: dataActions.post_create,
  onGetById: dataActions.get_byId
};

export default connect(mapState, actionCreators)(CurrentPage);
