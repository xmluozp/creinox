import React from "react";
import Grid from "@material-ui/core/Grid";

import { embedListProvider } from "../Faceless/embedListProvider"; // to generate the Embed List Page with Modal
import { Inputs } from "components";
import { enumsLabel } from "_constants";

// ******************************************************************* page setting
import { bankaccountActions as dataActions } from "_actions";
import { bankaccountModel as dataModel } from "_dataModel";


const TITLE_EDIT = "编辑账户";
const TITLE_CREATE = "创建账户";
const DATA_STORE = "bankaccountData";

// ============================================= render cell
const headCells = [
  { name: "id", disablePadding: true, className: "ml-2" },
  { name: "accountName" },
  { name: "accountNo" },
  { name: "bankName" },
  { name: "swiftCode" },
  { name: "bankType" },
  { name: "currency_id" },
  { name: "memo" },
];

// ============================================= Search Panel
const searchBar = (
  <>
    <Inputs.MyInput inputid="accountName" />
    <Inputs.MyInput inputid="memo" />
  </>
);
// ============================================= Modal inputs
const FormInputs = () => {
  return (<>
      <Grid container spacing={2}>
      <Grid item lg={6} md={6} xs={12}>
        <Inputs.MyComboboxCurrency inputid="currency_id" />

        </Grid>   
        <Grid item lg={6} md={6} xs={12}>
          <Inputs.MySelect options={enumsLabel.bankType} hasDefault={true} inputid="bankType" />
        </Grid>  
        <Grid item lg={6} md={6} xs={12}>
          <Inputs.MyInput inputid="accountName" />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Inputs.MyInput inputid="accountNo" />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Inputs.MyInput inputid="bankName" />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Inputs.MyInput inputid="address" />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Inputs.MyInput inputid="swiftCode" />
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
