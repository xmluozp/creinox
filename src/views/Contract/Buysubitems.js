import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";

import { embedListProvider } from "../Faceless/embedListProvider"; // to generate the Embed List Page with Modal
import { Inputs } from "components";
// import { enums } from "_constants";
import { h_fkFetch } from "_helper";

// ******************************************************************* page setting
import { buysubitemActions as dataActions } from "_actions";
import { buysubitemModel as dataModel } from "_dataModel";

const TITLE_EDIT = "编辑订单子项";
const TITLE_CREATE = "创建订单子项";
const DATA_STORE = "buysubitemData";

const renderSellsubitem = (content, row) => {
  // 如果不对应任何订单，显示无
  return row.sell_subitem_id? row["sell_subitem_id.row"].buyerCode : "无";
};

const renderProduct = (content, row) => {
  return `[${row["product_id.row"].code}] ${row["product_id.row"].name}`;
};

const renderPackAmount = (content, row) => {
  return `${row["packAmount"]} / ${row["unitType_id.row"].ename}`;
};

// ============================================= render cell
const headCells = [
  { name: "id", disablePadding: true, className: "ml-2" },
  { name: "sell_subitem_id", label: "对应外商货号", onShow: renderSellsubitem },
  {
    name: "product_id",
    label: "采购产品",
    onShow: renderProduct,
    minWidth: 250,
  },
  { name: "amount" },
  {
    name: "view_packAmount_unitType",
    label: "包装数量/单位",
    onShow: renderPackAmount,
  },
  { name: "unitPrice" },
];

// ============================================= Search Panel
const searchBar = (
  <>
    <Inputs.MyInput inputid="buyerCode" />
  </>
);
// ============================================= Modal inputs
const FormInputs = ({
  getSourceProductOnChange,
  getSubitemOnChange,
  onChangeSource,
  isFromSellSubitem,
  isFromEdit,
  dataById,
  disabled,
  ...props
}) => {
  //injectProduct

  const handleShowOuterVolume = (values) => {
    const { outerPackL, outerPackW, outerPackH } = values;
    return (outerPackL * outerPackW * outerPackH) / 1000000  || 0;
  };
  const handleShowInnerVolume = (values) => {
    const { innerPackL, innerPackW, innerPackH } = values;
    return (innerPackL * innerPackW * innerPackH) / 1000000  || 0;
  };

  const handleTotalNetWeight = (values) => {
    const { netWeight, amount } = values;
    return netWeight * amount || 0;
  };

  const handleTotalGrossWeight = (values) => {
    const { grossWeight, amount } = values;
    return grossWeight * amount || 0;
  };

  useEffect(() => {

    // 如果是新建，或者是从详情页进来，已经有订单号了，就从订单取产品
    if(!isFromEdit || (dataById && dataById.row && dataById.row.sell_subitem_id > 0)) {
      onChangeSource(null, null, true)
    } else {
      onChangeSource(null, null, false)
    }
    return () => {  }
  }, [dataById])

  // 如果从外贸订单找产品，注入的不但有product_id，还会有sell_subitem_id
  // 外贸订单找产品时候，下拉显示的是产品不是商品
  return (
    <>
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} xs={12}>
          <Inputs.MySwitch
            label=""
            labelTrue = "通过外商货号搜索相关产品"
            labelFalse = "通过关键词搜索产品"
            value={isFromSellSubitem}
            onChange={onChangeSource}
            disabled = {disabled}
          />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Inputs.MySwitch inputid="isReceipt" />
        </Grid>

        <Grid item lg={4} md={6} xs={12}>
          <Inputs.MyComboboxFK
            inputid="sell_subitem_id"
            optionLabel="buyerCode"
            tableName="sellsubitem"
            stateName="sellSubitemDropdown"
            preConditions={props.preConditions}
            onSelect={getSubitemOnChange}
            isDefaultOnSelect = {!isFromEdit}
            isHidden = {!isFromSellSubitem}
          />
        </Grid>
        {isFromSellSubitem?
          <Grid item lg={8} md={6} xs={12}>
          <Inputs.MyComboboxCascade
            inputid="product_id"
            listen={{"sell_subitem_id": "sell_subitem_id"}}
            tableName="product"
            optionLabel="name"
            actionName="get_dropdown_fromSellsubitem"
            onSelect={getSourceProductOnChange}
            isDefaultOnSelect = {!isFromEdit}/>
        </Grid>:
        <Grid item lg={12} md={6} xs={12}>
          <Inputs.MyComboboxAsyncFK
            inputid="product_id"
            tableName="product"
            preConditions={props.preConditions}
            actionName="get_disposable_dropdown"
            onSelect={getSourceProductOnChange}
            isDefaultOnSelect = {!isFromEdit}/>
        </Grid>
        }
{/* 
        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyInput inputid="sellerCode" />
        </Grid> */}
        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyInput inputid="amount" />
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyInput inputid="packAmount" />
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyComboboxUnitType
            inputid="unitType_id"
            optionLabel="ename"
          />
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
        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyInput inputid="spec" />
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
          <Inputs.MyDatePicker inputid="pickuptimeAt" />
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
          <Inputs.MyInput label="体积(m³)" onShow={handleShowOuterVolume} disabled={true}/>
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
          <Inputs.MyInput label="体积(m³)" onShow={handleShowInnerVolume} disabled={true}/>
        </Grid>

        <Grid item lg={4} md={6} xs={12}>
          <Inputs.MyInput inputid="netWeight" />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <Inputs.MyInput label="净重合计(KGS)" onShow={handleTotalNetWeight} disabled={true}/>
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <Inputs.MyInput inputid="fcl20" />
        </Grid>

        <Grid item lg={4} md={6} xs={12}>
          <Inputs.MyInput inputid="grossWeight" />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <Inputs.MyInput
            label="毛重合计(KG)"
            onShow={handleTotalGrossWeight}
            disabled={true}
          />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <Inputs.MyInput inputid="fcl40" />
        </Grid>
      </Grid>
    </>
  );
};

// ******************************************************************* page setting

const EmbedBuysubitem = embedListProvider(
  dataActions,
  dataModel,
  DATA_STORE,
  TITLE_EDIT,
  TITLE_CREATE,
  FormInputs,
  headCells,
  searchBar
);

// 加了一层component为了处理injection
export default ({sellCompanyId, disabled, ...props}) => {
  const [productInjector, setProductInjector] = useState(null);
  const [isFromSellSubitem, setisFromSellSubitem] = useState(true);

  const handleChangeSource = (e, n, newValue) => {
    setisFromSellSubitem(newValue);
  };

  const handleGetInjector = (inj) => {
    setProductInjector(inj);
  };

  // 如果是从有子订单转为无子订单，删掉对应子订单
  const handleFilterSubmit = values => {

    const newValues = {...values}
    if(!isFromSellSubitem) {
      newValues.sell_subitem_id = 0
    }

    return newValues
  }

  // 选择子订单自动填入信息
  const handleGetSubitemOnChange = (item) => {

    if (item) {
      const newValues = {
        sell_subitem_id: item.id,
        amount: item.amount,
        packAmount: item.packAmount,
        spec: item.spec,
        thickness: item.thickness,
        unitWeight: item.unitWeight,
        netWeight: item.netWeight,
        grossWeight: item.grossWeight,
        outerPackL: item.outerPackL,
        outerPackW: item.outerPackW,
        outerPackH: item.outerPackH,
        innerPackL: item.innerPackL,
        innerPackW: item.innerPackW,
        innerPackH: item.innerPackH,
        fcl20: item.fcl20,
        fcl40: item.fcl40,
        unitType_id: item.unitType_id,
        polishing_id: item.polishing_id,
        texture_id: item.texture_id,
        pack_id: item.pack_id,
      }
      productInjector(newValues);
    }
  };

  // 选择产品自动填入信息
  const handleGetSourceProductOnChange = async item => {
    
    const product_id = item ? item.id : 0;

    // 直接取产品， 可以取到：规格，厚度, 单位重量, 材质，抛光
    if (item && product_id) {

      const newProductValues = {
        product_id: product_id,
        spec: item.spec1,
        thickness: item.thickness,
        unitWeight: item.unitWeight,
        texture_id: item.texture_id,
        polishing_id: item.polishing_id,
      }
      let newProductPurchaseValues = {}
      try {
        const response = await h_fkFetch("productpurchase", [product_id, sellCompanyId], "get_disposable_byProductId")
        if (response && response.id) { 
          newProductPurchaseValues = {
            spec: response.spec1,
            // sellerCode: response.code,
            thickness: response.thickness,
            unitWeight: response.unitWeight,
            netWeight: response.netWeight,
            grossWeight: response.grossWeight,
            packAmount: response.packAmount,
            outerPackL: response.outerPackL,
            outerPackW: response.outerPackW,
            outerPackH: response.outerPackH,
            unitPrice: response.buyPrice,
            currency_id: response.currency_id,
            innerPackL: response.innerPackL,
            innerPackW: response.innerPackW,
            innerPackH: response.innerPackH,
            unitType_id: response.unitType_id,
            polishing_id: response.polishing_id,
            texture_id: response.texture_id,
            pack_id: response.pack_id
          }
        }    
      } catch (error) {
        console.log("搜索不到对应产品", error);
      }

      productInjector({...newProductValues, ...newProductPurchaseValues});

      // // 然后根据产品的报价取其他信息
      // h_fkFetch("productpurchase", [product_id, sellCompanyId], "get_disposable_byProductId")
      //   .then((response) => {
      //     if (response && response.id) {

      //       // 从产品取, 有部分字段覆盖上面的，因为虽然产品里也有相同的字段。但报价里的肯定是比较新的
      //       productInjector({

      //       });
      //     }
      //   })
      //   .catch((error) => {
      //     console.log("搜索不到对应产品", error);
      //   });
    }

    // TODO:从报价表里取？ get_disposable_byProductId?
  };

  return (
    <EmbedBuysubitem
      isBorder={true}
      disabled = {disabled}
      onFilterSubmit = {handleFilterSubmit}
      {...props}
      modalFormCreateProps={{ onGetInjector: handleGetInjector }}
      modalInputCreateProps={{
        getSourceProductOnChange: handleGetSourceProductOnChange,
        getSubitemOnChange: handleGetSubitemOnChange,
        onChangeSource: handleChangeSource,
        isFromSellSubitem,
        preConditions: props.preConditions,

      }}
      modalFormEditProps={{ 
        onGetInjector: handleGetInjector,
      }}
      modalInputEditProps={{
        getSourceProductOnChange: handleGetSourceProductOnChange,
        getSubitemOnChange: handleGetSubitemOnChange,
        onChangeSource: handleChangeSource,
        isFromSellSubitem,
        preConditions: props.preConditions,
      }}
    />
  );
};
