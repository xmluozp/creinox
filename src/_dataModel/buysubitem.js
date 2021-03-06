
import {_DATATYPES} from "_constants/_dataTypes"

export const buysubitemModel = {
    table: "buy_subitem",
    dataStore: "buysubitem",
    columns: {
        id :        {label:"ID",           type: _DATATYPES.INT },
        // sellerCode:   {label: "工厂货号",     type: _DATATYPES.VARCHAR},
        isReceipt:    {label: "是否开票",     type: _DATATYPES.BOOLEAN},

        amount:     {label: "数量",     type: _DATATYPES.INT}, 
        packAmount: {label: "包装数量",     type: _DATATYPES.INT}, 
        unitPrice:  {label: "单价",     type: _DATATYPES.MONEY},

        spec:       {label: "规格",     type: _DATATYPES.VARCHAR},   
        thickness:  {label: "厚度(mm)",     type: _DATATYPES.VARCHAR},    
        unitWeight: {label: "每只产品重量(KG)",     type: _DATATYPES.DECIMAL},   
        netWeight:  {label: "每箱净重(KGS)",     type: _DATATYPES.DECIMAL},   
        grossWeight:{label: "每箱毛重(KGS)",     type: _DATATYPES.DECIMAL},   

        outerPackL: {label: "外包装长(CM)",     type: _DATATYPES.DECIMAL},   
        outerPackW: {label: "宽(CM)",     type: _DATATYPES.DECIMAL},   
        outerPackH: {label: "高(CM)",     type: _DATATYPES.DECIMAL},   

        innerPackL: {label: "内包装长(CM)",     type: _DATATYPES.DECIMAL},   
        innerPackW: {label: "宽(CM)",     type: _DATATYPES.DECIMAL},   
        innerPackH: {label: "高(CM)",     type: _DATATYPES.DECIMAL},  

        fcl20:      {label: "20 FCL",     type: _DATATYPES.DECIMAL},   
        fcl40:      {label: "40 FCL",     type: _DATATYPES.DECIMAL},   
        pickuptimeAt:    {label: "提货时间",     type: _DATATYPES.DATETIME},   


        // 用来定位20 FCL, 40 FCL
        // 对应的是整个外贸子合同。这里显示外商货号这一栏。
        sell_subitem_id:      {label: "外商货号",       type: _DATATYPES.SELECT, ref:"sell_subitem", refLabel: ["buyerCode"]},     
        
        // 这里应该是联动，选了sell_subitem_id以后才知道这个对应的产品是什么
        product_id:           {label: "采购产品",     type: _DATATYPES.SELECT, ref:"product", refLabel: ["name"]},
        buy_contract_id:      {label: "采购合同",       type: _DATATYPES.SELECT, ref:"buy_contract", refLabel: ["code"]},     
        // sell_subitem_id:      {label: "外销子订单",     type: _DATATYPES.SELECT, ref:"sell_subitem", refLabel: ["name"]},
        unitType_id:          {label: "计量单位",     type: _DATATYPES.SELECT, ref:"common_item", refLabel: ["name"]},
        currency_id:          {label: "币种",         type: _DATATYPES.SELECT, ref:"common_item", refLabel: ["name"]},
        polishing_id:         {label: "抛光",         type: _DATATYPES.SELECT, ref:"common_item", refLabel: ["name"]},
        texture_id:           {label: "材质",         type: _DATATYPES.SELECT, ref:"common_item", refLabel: ["name"]},
        pack_id:              {label: "包装形式",     type: _DATATYPES.SELECT, ref:"common_item", refLabel: ["name"]},
     
        
        //---------------------------
        "product_id.row":     {label: "对应产品",     type: _DATATYPES.ROW},
        "buy_contract_id.row": {label: "采购合同",       type: _DATATYPES.ROW},
        // "unitType_id.row":      {label: "计量单位",         type: _DATATYPES.ROW},
        // "currency_id.row":      {label: "币种",         type: _DATATYPES.ROW},
        // "polishing_id.row":     {label: "抛光",         type: _DATATYPES.ROW},

        // "texture_id.row":       {label: "材质",         type: _DATATYPES.ROW},
        // "pack_id.row":          {label: "包装形式",     type: _DATATYPES.ROW}
    }
}