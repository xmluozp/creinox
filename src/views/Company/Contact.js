import React, { useEffect } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import { rostercontactActions as dataActions } from "../../_actions";
import { rostercontactModel as dataModel } from "../../_dataModel";
import { MyModalForm, CreinoxForm, Inputs } from "../../components";

const Contact = ({
  isOpen,
  onClose,
  onSubmit,
  isFromEdit,
  title,
  selectedContactId = null,

  // redux
  onGetById,
  errorById,
  dataById
}) => {
  // 如果是编辑框，打开的时候读数据
  useEffect(() => {
    if (isFromEdit && isOpen && selectedContactId) {
      onGetById(selectedContactId);
    }
  }, [onGetById, isOpen, isFromEdit]);

  const formInputs = (
    <CreinoxForm
      dataModel={dataModel}
      defaultValues={selectedContactId && dataById && { ...dataById.row }}
      errors={errorById}
      isFromEdit={isFromEdit}
      actionSubmit={onSubmit}
    >
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} xs={12}>
          <Inputs.MyInput inputid="fullName" />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Inputs.MyInput inputid="eFullName" />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Inputs.MyInput inputid="phone1" />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Inputs.MyInput inputid="phone2" />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Inputs.MyInput inputid="skype" />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Inputs.MyInput inputid="email" />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Inputs.MyInput inputid="wechat" />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Inputs.MyInput inputid="whatsapp" />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Inputs.MyInput inputid="facebook" />
        </Grid>

        <Grid item lg={12} md={12} xs={12}>
          <Inputs.MyInput inputid="memo" multiline />
        </Grid>

        <Grid item lg={6} md={6} xs={12}>
          <Button type="submit" variant="contained" color="primary">
            保存
          </Button>
        </Grid>
      </Grid>
    </CreinoxForm>
  );

  return (
    <MyModalForm
      isOpen={isOpen}
      onClose={onClose}
      rowButtons={[]}
      component={formInputs}
      title={title}
    />
  );
};

// ============================================= Redux
function mapState(state) {
  return {
    dataById: state.rostercontactData.dataById,
    errorById: state.rostercontactData.errorById
  };
}

const actionCreators = {
  onGetById: dataActions.get_byId
};

export default connect(mapState, actionCreators)(Contact);
