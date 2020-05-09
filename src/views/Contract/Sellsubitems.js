import React from "react";
import Grid from "@material-ui/core/Grid";

import { embedListProvider } from "../Faceless/embedListProvider"; // to generate the Embed List Page with Modal
import { Inputs } from "../../components";
// import { enums } from "../../_constants";
import { h_fkFetch } from "../../_helper";

// ******************************************************************* page setting
import { sellsubitemActions as dataActions } from "../../_actions";
import { sellsubitemModel as dataModel } from "../../_dataModel";

const TITLE_EDIT = "编辑订单子项";
const TITLE_CREATE = "创建订单子项";
const DATA_STORE = "sellsubitemData";


const renderCommodity = (content, row) => {
  return `[${row["commodity_id.row"].code}] ${row["commodity_id.row"].name}`
}

const renderPackAmount = (content, row) => {
  return `${row["packAmount"]} / ${row["unitType_id.row"].ename}`
}

// ============================================= render cell
const headCells = [
  { name: "id", disablePadding: true, className: "ml-2" },
  { name: "commodity_id", label: "商品", onShow: renderCommodity, minWidth: 250},
  { name: "buyerCode" },
  { name: "amount" },
  { name: "view_packAmount_unitType", label:"包装数量/单位", onShow: renderPackAmount },
  { name: "unitPrice" }  
];

// ============================================= Search Panel
const searchBar = (
  <>
    <Inputs.MyInput inputid="buyerCode" />
  </>
);
// ============================================= Modal inputs
const FormInputs = ({onLoad, getSourceProductOnChange}) => {
//injectProduct

  const handleShowOuterVolume = (values) => {

    const {outerPackL, outerPackW, outerPackH} = values  
    return outerPackL * outerPackW * outerPackH || 0
  }
  const handleShowInnerVolume = (values) => {

    const {innerPackL ,innerPackW, innerPackH} = values  
    return innerPackL * innerPackW * innerPackH || 0
  }

  const handleTotalNetWeight = (values) => {

    const {netWeight, amount} = values  
    return netWeight * amount || 0
  }

  const handleTotalGrossWeight = (values) => {

    const {grossWeight, amount} = values  
    return grossWeight * amount || 0
  }

  return (
    <>
      <Grid container spacing={2}>
      <Grid item lg={6} md={6} xs={12}>
          <Inputs.MyComboboxAsyncFK
            inputid="commodity_id"
            tableName="commodity"
            actionName="get_disposable_dropdown"
            onChange={getSourceProductOnChange}
            onLoad = {onLoad}/>
        </Grid>      
        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyInput inputid="buyerCode" />
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyInput inputid="barCode" />
        </Grid>

        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyInput inputid="amount" />
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyInput inputid="packAmount" />
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyComboboxUnitType inputid="unitType_id" optionLabel="ename" />
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyComboboxTexture inputid="texture_id" />
        </Grid>


        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyInput inputid="unitPrice" />
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyComboboxCurrency inputid="currency_id" />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Inputs.MyInput inputid="spec" />
        </Grid>


        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyInput inputid="thickness" />
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyComboboxPolishing inputid="polishing_id" />
        </Grid>

        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyComboboxPack inputid="pack_id" />
        </Grid>

        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyInput inputid="unitWeight" />
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
          <Inputs.MyInput label="体积(cm³)" onShow={handleShowOuterVolume}/>
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

        <Grid item lg={4} md={6} xs={12}>
          <Inputs.MyInput inputid="netWeight" />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <Inputs.MyInput label="净重合计(KG)" onShow={handleTotalNetWeight}/>
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <Inputs.MyInput inputid="fcl20" />
        </Grid>

        <Grid item lg={4} md={6} xs={12}>
          <Inputs.MyInput inputid="grossWeight" />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <Inputs.MyInput label="毛重合计(KG)" onShow={handleTotalGrossWeight}/>
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <Inputs.MyInput inputid="fcl40" />
        </Grid>


      </Grid>
    </>
  );
};

// ******************************************************************* page setting

const EmbedSellsubitem = embedListProvider(
  dataActions,
  dataModel,
  DATA_STORE,
  TITLE_EDIT,
  TITLE_CREATE,
  FormInputs,
  headCells,
  searchBar,
);

// 加了一层component为了处理injection
export default props => {

  const [productInjector, setProductInjector] = React.useState(null);

  const handleGetInjector = inj => {
    setProductInjector(inj);
  }
  const handleGetSourceProductOnChange = (e, element, id, item) => { 
    const product_id = item ? item.product_id : 0

    // 根据商品id取产品， 可以取到：规格，厚度, 单位重量, 材质，抛光
    if(item && product_id) {
      h_fkFetch("product", [product_id], "get_disposable_byId")
        .then(response => {
          if (response && response.id) {

            // 从产品取
            productInjector ({
              commodity_id: item.id,
              spec: response.spec1,
              thickness: response.thickness,
              unitWeight: response.unitWeight,
              texture_id: response.texture_id,
              polishing_id: response.polishing_id
            })
          }
        })
        .catch(error => {
          console.log("搜索不到对应产品", error);
        });

        h_fkFetch("productpurchase", [product_id], "get_disposable_byProductId")
        .then(response => {
          if (response && response.id) {
            // 从产品取, 有部分字段覆盖上面的，因为虽然产品里也有相同的字段。但报价里的肯定是比较新的
            // 有的产品没有报价，所以上面取那一次也是必要的
            productInjector ({
              spec: response.spec1,
              thickness: response.thickness,
              unitWeight: response.unitWeight,
              netWeight: response.netWeight,
              grossWeight: response.grossWeight,
              packAmount: response.packAmount,
              outerPackL: response.outerPackL,
              outerPackW: response.outerPackW,
              outerPackH: response.outerPackH,

              innerPackL: response.innerPackL,
              innerPackW: response.innerPackW,
              innerPackH: response.innerPackH,
              unitType_id: response.unitType_id,
              polishing_id: response.polishing_id,
              texture_id: response.texture_id,
              pack_id:response.pack_id
            })
          }
        })
        .catch(error => {
          console.log("搜索不到对应产品", error);
        });

    } 

    // 从报价表里取？ get_disposable_byProductId?
  }

  return (
    <EmbedSellsubitem 
      isBorder={true} {...props} 
      modalFormCreateProps = {{onGetInjector: handleGetInjector}}     
      modalInputCreateProps = {{getSourceProductOnChange: handleGetSourceProductOnChange}}

      modalFormEditProps = {{onGetInjector: handleGetInjector}}     
      modalInputEditProps = {{getSourceProductOnChange: handleGetSourceProductOnChange}}     
    />
  );
};
