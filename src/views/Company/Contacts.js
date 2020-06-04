import React from "react";
import Grid from "@material-ui/core/Grid";

import { embedListProvider } from "../Faceless/embedListProvider"; // to generate the Embed List Page with Modal
import { Inputs } from "components";

// ******************************************************************* page setting
import { rostercontactActions as dataActions } from "_actions";
import { rostercontactModel as dataModel } from "_dataModel";


const TITLE_EDIT = "编辑联系人";
const TITLE_CREATE = "创建联系人";
const DATA_STORE = "rostercontactData";

// ============================================= render cell
const headCells = [
  { name: "id", disablePadding: true, className: "ml-2" },
  { name: "fullName" },
  { name: "eFullName" },
  { name: "phone1" },
  { name: "phone2" },
  { name: "skype" },
  { name: "email" },
  { name: "wechat" },
  { name: "whatsapp" },
  { name: "facebook" }
];

// ============================================= Search Panel
const searchBar = (
  <>
    <Inputs.MyInput inputid="fullName" />
    <Inputs.MyInput inputid="eFullName" />
  </>
);
// ============================================= Modal inputs
const FormInputs = () => {
  return (<>
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
      </Grid>
  </>)

}

// ******************************************************************* page setting

export default embedListProvider(
  dataActions,
  dataModel,
  DATA_STORE,
  TITLE_EDIT,
  TITLE_CREATE,
  FormInputs,
  headCells,
  searchBar
);
