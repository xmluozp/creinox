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
import { regionModel as dataModel } from "../../_dataModel";

// ******************************************************************* page setting
import { regionActions as dataActions } from "../../_actions";

const editModes = {
  none: 0,
  edit: 1,
  create: 2
};

// inject data
// ******************************************************************* page setting
const MyTreeview = withDatatableStore(
  CreinoxTreeview, // tablecomponent
  { data: "regionData" }, // data source
  dataActions.get_treeNotesById // fetch action
);

// **************************************************************************************************
// **************************************************************************************************
// ====================================== Component Render ==========================================
// **************************************************************************************************
// **************************************************************************************************v
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
  const [preConditions, setPreConditions] = useState({});
  const [labelOfCreate, setlabelOfCreate] = useState("");
  const [renewToggle, setrenewToggle] = useState(false);

  // ============================================= handles
  const handleOnDelete = id => {
    h_confirm("是否删除？").then(resolve => {
      if (resolve) onDelete(id);
    });
  };

  const handleOnSubmit = values => {
    if (formEditMode === editModes.edit) {
      onPutUpdate({ ...selectedNode, ...values });
    } else if (formEditMode === editModes.create) {
      onPostCreate({ ...preConditions, ...values });
    }
  };

  const handleOnSelect = node => {
    if (node) {
      onGetById(node.id);
      setformEditMode(editModes.edit); // 设置成编辑模式
      setSelectedNode(node);
    }
  };

  const handleSwitchToCreate = (id, path, label) => {
    setPreConditions({ parent_id: id, path: path }); // 因为是多级的所以preCondition需要在这里设置
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

  let defaultValues = dataById && dataById.row;
  // if (formEditMode === editModes.edit && dataById) {
  //   defaultValues = { ...dataById.row };
  // }

  // ============================================= Edit and Create Form:
  const childrenInputsEdit = (
    <>
      {FormInputs()}
      {selectedNode.id ? (
        <Button
          variant="contained"
          onClick={handleOnDelete.bind(null, selectedNode.id)}
          color="secondary"
          className="mt-3 mr-2"
        >
          删除
        </Button>
      ) : null}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className="mt-3"
      >
        保存修改
      </Button>
    </>
  );
  const childrenInputsCreate = (
    <>
      {FormInputs()}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className="mt-3"
      >
        保存新节点
      </Button>
    </>
  );

  return (
    <div className="animated fadeIn">
      {/* spacing会有个-8的margin导致双滚动条，不知道怎么解决只能绕过去 */}
      <Grid container spacing={2} style={{margin:0}}>
        <Grid item lg={6} md={6} xs={12}>
          <MyTreeview
            onSelect={handleOnSelect}
            initialNode={initialNode}
            selectedNode={selectedNode}
          />
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
                      defaultValues={defaultValues}
                      errors={errorById}
                      isFromEdit={formEditMode === editModes.edit}
                      actionSubmit={handleOnSubmit}
                      renewToggle={renewToggle}
                      dataModel={dataModel}
                    >
                      {childrenInputsEdit}
                    </CreinoxForm>
                  ) : null}
                  {formEditMode === editModes.create ? (
                    <CreinoxForm
                      preConditions={preConditions}
                      errors={errorById}
                      isFromEdit={false}
                      actionSubmit={handleOnSubmit}
                      renewToggle={renewToggle}
                      dataModel={dataModel}
                    >
                      {childrenInputsCreate}
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

const FormInputs = () => {
  return (
    <>
      <Inputs.MyInput inputid="name" />
      <Inputs.MyInput inputid="ename" />
      <Inputs.MyInput inputid="telPrefix" />
      <Inputs.MyInput inputid="code" />
      <Inputs.MyInput multiline inputid="memo" />
    </>
  );
};
// ============================================= propTypes

// ============================================= Redux
function mapState(state) {
  return {
    dataById: state.regionData.dataById,
    errorById: state.regionData.errorById
  };
}

const actionCreators = {
  onDelete: dataActions._delete_treeNode,
  onPutUpdate: dataActions.put_update,
  onPostCreate: dataActions.post_create,
  onGetById: dataActions.get_byId
};

export default connect(mapState, actionCreators)(CurrentPage);
