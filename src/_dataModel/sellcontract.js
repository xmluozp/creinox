
import {_DATATYPES} from "../_constants/_dataTypes"

export const sellcontractModel = {
    table: "sell_contract",
    columns: {
        id :        {label:"ID",        type: _DATATYPES.INT },
        code:       {label: "合同号码",     type: _DATATYPES.VARCHAR},
        orderNumber:    {label: "订单号",     type: _DATATYPES.VARCHAR},

        activeAt:   {label: "合同日期", type: _DATATYPES.DATETIME},
        deliverAt:  {label: "交货日期", type: _DATATYPES.DATETIME},
        updateAt: {label: "上次操作日期", type: _DATATYPES.DATETIME},

        isInBaches: {label: "可否分批",     type: _DATATYPES.BOOLEAN},   
        isTransport:{label: "可否转运",     type: _DATATYPES.BOOLEAN},   

        shippingPrice:  {label: "运费金额",     type: _DATATYPES.DECIMAL}, 
        comissionType:  {label: "佣金类型",   type: _DATATYPES.ENUM},

        tt_shipmentDue:         {label: "装运期限",   type: _DATATYPES.TT},
        tt_insurance:           {label: "保险",   type: _DATATYPES.TT},
        tt_paymentCondition:    {label: "付款条件",   type: _DATATYPES.TT},


        updateUser_id:          {label: "上次操作人",    type: _DATATYPES.SELECT, ref:"user", refLabel: ["userName"]},
        follower_id:            {label: "跟单员",     type: _DATATYPES.SELECT, ref:"user", refLabel: ["userName"]},
        seller_company_id:      {label: "外贸公司",     type: _DATATYPES.SELECT, ref:"company", refLabel: ["name"]},
        buyer_company_id:       {label: "客户",     type: _DATATYPES.SELECT, ref:"company", refLabel: ["name"]},
        shippingType_id:        {label: "运输方式",     type: _DATATYPES.SELECT, ref:"common_item", refLabel: ["name"]},
        pricingTerm_id:         {label: "价格条款",     type: _DATATYPES.SELECT, ref:"common_item", refLabel: ["name"]},

        paymentType_id:         {label: "付款方式",     type: _DATATYPES.SELECT, ref:"common_item", refLabel: ["name"]},
        commission_id:          {label: "佣金",     type: _DATATYPES.SELECT, ref:"common_item", refLabel: ["name"]},
        region_id:              {label: "签约地点",     type: _DATATYPES.TREE, ref:"region", refLabel: ["name"]},
        departure_port_id:      {label: "运输口岸",     type: _DATATYPES.SELECT, ref:"port", refLabel: ["name"]},
        destination_port_id:    {label: "目的口岸",     type: _DATATYPES.SELECT, ref:"port", refLabel: ["name"]},
        currency_id:            {label: "货币种类",     type: _DATATYPES.SELECT, ref:"common_item", refLabel: ["name"]},
        shipping_currency_id:   {label: "运费币种",     type: _DATATYPES.SELECT, ref:"common_item", refLabel: ["name"]},
        
        
        //--------------------------- 显示在列表里的时候需要（因为要取name）
        "follower_id.row":          {label: "跟单员",   type: _DATATYPES.ROW},
        // "seller_company_id.row":    {label: "外贸公司",   type: _DATATYPES.ROW},
        "buyer_company_id.row":     {label: "客户",   type: _DATATYPES.ROW},
        // "shippingType_id.row":      {label: "运输方式",   type: _DATATYPES.ROW},
        // "pricingTerm_id.row":       {label: "价格条款",   type: _DATATYPES.ROW},

        // "paymentType_id.row":       {label: "付款方式",   type: _DATATYPES.ROW},
        // "commission_id.row":        {label: "佣金",   type: _DATATYPES.ROW},
        // "region_id.row":            {label: "签约地点",   type: _DATATYPES.ROW},
        // "departure_port_id.row":    {label: "运输口岸",   type: _DATATYPES.ROW},
        // "destination_port_id.row":  {label: "目的口岸",   type: _DATATYPES.ROW},
        // "currency_id.row":          {label: "货币种类",   type: _DATATYPES.ROW},
        // "shipping_currency_id.row": {label: "运费币种",   type: _DATATYPES.ROW},
        "view_totalPrice" : {label: "货款合计",  type: _DATATYPES.MONEY},
    
    }
}