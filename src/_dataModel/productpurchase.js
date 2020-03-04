
import {_DATATYPES} from "../_constants/_dataTypes"

export const productpurchaseModel = {
    table: "product_purchase",
    columns: {
        id :        {label:"ID",        type: _DATATYPES.INT },
        activeAt:   {label: "报价日期", type: _DATATYPES.DATETIME},
        expireAt:   {label: "报价有效期", type: _DATATYPES.DATETIME},

        buyPrice:      {label: "采购单价",     type: _DATATYPES.MONEY},    
        isTax:      {label: "含税",     type: _DATATYPES.BOOLEAN},   
        isComponent:{label: "可作为配件生产",     type: _DATATYPES.BOOLEAN},   

        code:       {label: "工厂货号",     type: _DATATYPES.VARCHAR},

        spec1:      {label: "规格1",     type: _DATATYPES.VARCHAR},   
        spec2:      {label: "规格2",     type: _DATATYPES.VARCHAR},   
        spec3:      {label: "规格3",     type: _DATATYPES.VARCHAR},  
        thickness:  {label: "厚度(mm)",     type: _DATATYPES.DECIMAL},   
        
        unitWeight: {label: "单位重量(g)",     type: _DATATYPES.DECIMAL},   
        netWeight:  {label: "净重(g)",     type: _DATATYPES.DECIMAL},   
        grossWeight: {label: "毛重(g)",     type: _DATATYPES.DECIMAL},   

        moq:         {label: "最小订量",     type: _DATATYPES.INT},   
        packAmount:  {label: "包装数量",     type: _DATATYPES.INT},   
        outerPackL:  {label: "外包装长(CM)",     type: _DATATYPES.DECIMAL},   
        outerPackW:  {label: "宽",     type: _DATATYPES.DECIMAL},   
        outerPackH:  {label: "高",     type: _DATATYPES.DECIMAL},   

        innerPackL:  {label: "内包装长(CM)",     type: _DATATYPES.DECIMAL},   
        innerPackW:  {label: "宽",     type: _DATATYPES.DECIMAL},   
        innerPackH:  {label: "高",     type: _DATATYPES.DECIMAL},   


        updateAt:     {label: "最后操作时间", type: _DATATYPES.DATETIME},

        product_id:   {label: "对应产品",     type: _DATATYPES.TREE, ref:"product", refLabel: ["name"]},
        company_id:   {label: "工厂",     type: _DATATYPES.TREE, ref:"company", refLabel: ["name"]},
        currency_id:  {label: "币种",     type: _DATATYPES.TREE, ref:"common_item", refLabel: ["name"]},
        pack_id:      {label: "包装形式",     type: _DATATYPES.TREE, ref:"common_item", refLabel: ["name"]},
        unitType_id:  {label: "计量单位",     type: _DATATYPES.TREE, ref:"common_item", refLabel: ["name"]},

        polishing_id: {label: "抛光",     type: _DATATYPES.SELECT, ref:"common_item", refLabel: ["name"]},
        texture_id:   {label: "材质",     type: _DATATYPES.SELECT, ref:"common_item", refLabel: ["name"]},
        updateUser_id:{label: "上次操作人",     type: _DATATYPES.SELECT, ref:"user", refLabel: ["userName"]},
        
        //---------------------------
        "company_id.row":   {label: "工厂",   type: _DATATYPES.ROW},
        "currency_id.row":   {label: "币种",   type: _DATATYPES.ROW},
        "polishing_id.row":   {label: "抛光",   type: _DATATYPES.ROW},
        "texture_id.row":   {label: "材质",   type: _DATATYPES.ROW},
        "pack_id.row":   {label: "包装形式",   type: _DATATYPES.ROW},

    }
}