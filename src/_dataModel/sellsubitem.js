
import {_DATATYPES} from "../_constants/_dataTypes"

export const sellsubitemModel = {
    table: "sell_subitem",
    columns: {
        id :        {label:"ID",           type: _DATATYPES.INT },
        buyerCode:   {label: "外商货号",     type: _DATATYPES.VARCHAR},
        barCode:    {label: "BarCode",     type: _DATATYPES.VARCHAR},

        amount:     {label: "数量",     type: _DATATYPES.INT}, 
        packAmount: {label: "包装数量",     type: _DATATYPES.INT}, 
        unitPrice:  {label: "外销单价",     type: _DATATYPES.MONEY},

        spec:       {label: "规格",     type: _DATATYPES.VARCHAR},   
        thickness:  {label: "厚度(mm)",     type: _DATATYPES.DECIMAL},   
        unitWeight: {label: "单位重量(g)",     type: _DATATYPES.DECIMAL},   
        netWeight:  {label: "净重(g)",     type: _DATATYPES.DECIMAL},   
        grossWeight:{label: "毛重(g)",     type: _DATATYPES.DECIMAL},   

        outerPackL: {label: "外包装长(CM)",     type: _DATATYPES.DECIMAL},   
        outerPackW: {label: "宽",     type: _DATATYPES.DECIMAL},   
        outerPackH: {label: "高",     type: _DATATYPES.DECIMAL},   

        innerPackL: {label: "内包装长(CM)",     type: _DATATYPES.DECIMAL},   
        innerPackW: {label: "宽",     type: _DATATYPES.DECIMAL},   
        innerPackH: {label: "高",     type: _DATATYPES.DECIMAL},  

        fcl20:      {label: "20 FCL",     type: _DATATYPES.DECIMAL},   
        fcl40:      {label: "40 FCL",     type: _DATATYPES.DECIMAL},   


        commodity_id:           {label: "对应商品",     type: _DATATYPES.SELECT, ref:"commodity", refLabel: ["name"]},
        sell_contract_id:       {label: "采购单",       type: _DATATYPES.SELECT, ref:"sell_contract", refLabel: ["code"]},     

        unitType_id:            {label: "计量单位",     type: _DATATYPES.SELECT, ref:"common_item", refLabel: ["name"]},
        currency_id:            {label: "币种",         type: _DATATYPES.SELECT, ref:"common_item", refLabel: ["name"]},
        polishing_id:           {label: "抛光",         type: _DATATYPES.SELECT, ref:"common_item", refLabel: ["name"]},
        texture_id:             {label: "材质",         type: _DATATYPES.SELECT, ref:"common_item", refLabel: ["name"]},
        pack_id:                {label: "包装形式",     type: _DATATYPES.SELECT, ref:"common_item", refLabel: ["name"]},
     
        
        //---------------------------
        "commodity_id.row":     {label: "对应商品",     type: _DATATYPES.ROW},
        "sell_contract_id.row": {label: "外销合同",       type: _DATATYPES.ROW},
        // "unitType_id.row":      {label: "计量单位",         type: _DATATYPES.ROW},
        // "currency_id.row":      {label: "币种",         type: _DATATYPES.ROW},
        // "polishing_id.row":     {label: "抛光",         type: _DATATYPES.ROW},

        // "texture_id.row":       {label: "材质",         type: _DATATYPES.ROW},
        // "pack_id.row":          {label: "包装形式",     type: _DATATYPES.ROW}
    }
}