import React from "react";
import Grid from "@material-ui/core/Grid";

import { embedListProvider } from "../Faceless/embedListProvider"; // to generate the Embed List Page with Modal
import { Inputs } from "../../components";
import { enums } from "../../_constants";

// ******************************************************************* page setting
import { productpurchaseActions as dataActions } from "../../_actions";
import { productpurchaseModel as dataModel } from "../../_dataModel";

const TITLE_EDIT = "编辑工厂报价信息";
const TITLE_CREATE = "创建工厂报价信息";
const DATA_STORE = "productpurchaseData";

// ============================================= render cell
const headCells = [
  { name: "id", disablePadding: true, className: "ml-2" },
  { name: "activeAt" },
  { name: "company_id" },
  { name: "buyPrice" },
  { name: "currency_id" },
  { name: "expireAt" },
  { name: "spec1" },
  { name: "texture_id" },
  { name: "thickness" },
  { name: "polishing_id" },
  { name: "pack_id" },
  { name: "packAmount" }
];

// ============================================= Search Panel
const searchBar = (
  <>
    <Inputs.MyInput inputid="code" />
  </>
);
// ============================================= Modal inputs
const FormInputs = ({onLoad}) => {

  const handleShowOuterVolume = (values) => {

    const {outerPackL, outerPackW, outerPackH} = values  
    return outerPackL * outerPackW * outerPackH
  }
  const handleShowInnerVolume = (values) => {

    const {innerPackL ,innerPackW, innerPackH} = values  
    return innerPackL * innerPackW * innerPackH
  }

  return (
    <>
      <Grid container spacing={2}>
      <Grid item lg={8} md={8} xs={12}>
          <Inputs.MyComboboxAsyncFK
            inputid="product_id"
            tableName="product"
            actionName="get_disposable_dropdown"
            onLoad = {onLoad}
          />
        </Grid>      
        <Grid item lg={8} md={8} xs={12}>
          <Inputs.MyComboboxAsyncFK
            inputid="company_id"
            tableName="company"
            actionName="get_disposable_dropdown"
            preConditions = {{companyType: enums.companyType.factory}}
          />
        </Grid>
        <Grid item lg={4} md={4} xs={12}>
          <Inputs.MyInput inputid="code" />
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyInput inputid="packAmount" />
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyComboboxUnitType inputid="unitType_id" />
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyInput inputid="buyPrice" />
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyComboboxCurrency inputid="currency_id" />
        </Grid>

        <Grid item lg={6} md={6} xs={12}>
          <Inputs.MySwitch inputid="isTax" />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Inputs.MySwitch inputid="isComponent" />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Inputs.MyDatePicker inputid="activeAt" />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Inputs.MyDatePicker inputid="expireAt" />
        </Grid>

        <Grid item lg={6} md={6} xs={12}>
          <Inputs.MyInput inputid="spec1" />
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyInput inputid="spec2" />
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyInput inputid="spec3" />
        </Grid>

        <Grid item lg={4} md={4} xs={12}>
          <Inputs.MyComboboxTexture inputid="texture_id" />
        </Grid>

        <Grid item lg={4} md={4} xs={12}>
          <Inputs.MyInput inputid="thickness" />
        </Grid>
        <Grid item lg={4} md={4} xs={12}>
          <Inputs.MyComboboxPolishing inputid="polishing_id" />
        </Grid>
        <Grid item lg={4} md={4} xs={12}>
          <Inputs.MyComboboxPack inputid="pack_id" />
        </Grid>
        <Grid item lg={2} md={4} xs={12}>
          <Inputs.MyInput inputid="moq" />
        </Grid>
        <Grid item lg={2} md={4} xs={12}>
          <Inputs.MyInput inputid="unitWeight" />
        </Grid>
        <Grid item lg={2} md={6} xs={12}>
          <Inputs.MyInput inputid="netWeight" />
        </Grid>
        <Grid item lg={2} md={6} xs={12}>
          <Inputs.MyInput inputid="grossWeight" />
        </Grid>

        <Grid item lg={3} md={6} xs={12}>
          <Inputs.MyInput inputid="outerPackL" />
        </Grid>
        <Grid item lg={3} md={6} xs={12}>
          <Inputs.MyInput inputid="outerPackW" />
        </Grid>
        <Grid item lg={3} md={6} xs={12}>
          <Inputs.MyInput inputid="outerPackH" />
        </Grid>
        <Grid item lg={3} md={6} xs={12}>
          <Inputs.MyInput label="体积(cm³)"  onShow={handleShowOuterVolume}/>
        </Grid>

        <Grid item lg={3} md={6} xs={12}>
          <Inputs.MyInput inputid="innerPackL" />
        </Grid>
        <Grid item lg={3} md={6} xs={12}>
          <Inputs.MyInput inputid="innerPackW" />
        </Grid>
        <Grid item lg={3} md={6} xs={12}>
          <Inputs.MyInput inputid="innerPackH" />
        </Grid>
        <Grid item lg={3} md={6} xs={12}>
          <Inputs.MyInput label="体积(cm³)" onShow={handleShowInnerVolume}/>
        </Grid>



        <Grid item lg={6} xs={12}>
          <Inputs.MyComboboxFK
            inputid="updateUser_id"
            optionLabel="userName"
            tableName="user"
            disabled={true}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <Inputs.MyDatePicker inputid="updateAt" disabled={true} />
        </Grid>
      </Grid>
    </>
  );
};

// ******************************************************************* page setting

const dataActionsHistory = {...dataActions, get_bySearch: dataActions.get_bySearch_history}
const dataActionsGroupBy = {...dataActions, get_bySearch: dataActions.get_bySearch_groupByCompany}



export const EmbedProductPurchaseHistory = embedListProvider(
  dataActionsHistory,
  dataModel,
  DATA_STORE,
  TITLE_EDIT,
  TITLE_CREATE,
  FormInputs,
  headCells,
  searchBar
);

export const EmbedProductPurchaseGroup = embedListProvider(
  dataActionsGroupBy,
  dataModel,
  DATA_STORE,
  TITLE_EDIT,
  TITLE_CREATE,
  FormInputs,
  headCells,
  searchBar
);