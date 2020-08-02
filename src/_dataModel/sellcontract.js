
import {_DATATYPES} from "_constants/_dataTypes"

export const sellcontractModel = {
    table: "sell_contract",
    template: "sellcontract",
    columns: {
        id :        {label:"ID",        type: _DATATYPES.INT },
        code:       {label: "合同号码",     type: _DATATYPES.VARCHAR},
        orderNumber:{label: "订单号",     type: _DATATYPES.VARCHAR},

        activeAt:   {label: "合同日期", type: _DATATYPES.DATE},
        deliverAt:  {label: "交货日期", type: _DATATYPES.DATE},
        updateAt:   {label: "上次操作日期", type: _DATATYPES.DATETIME},

        isInBaches: {label: "可否分批",     type: _DATATYPES.BOOLEAN},   
        isTransport:{label: "可否转运",     type: _DATATYPES.BOOLEAN},   

        shippingPrice:  {label: "运费金额",     type: _DATATYPES.DECIMAL}, 
        commissionType:  {label: "佣金类型",   type: _DATATYPES.ENUM},

        tt_packing:             {label: "包装",   type: _DATATYPES.TT},
        tt_shipmentDue:         {label: "装运期限",   type: _DATATYPES.TT},
        tt_insurance:           {label: "保险",   type: _DATATYPES.TT},
        tt_paymentCondition:    {label: "付款条件",   type: _DATATYPES.TT},

        updateUser_id:          {label: "上次操作人",    type: _DATATYPES.SELECT, ref:"user", refLabel: ["userName"]},
        follower_id:            {label: "跟单员",     type: _DATATYPES.SELECT, ref:"user", refLabel: ["userName"]},
        shippingType_id:        {label: "运输方式",     type: _DATATYPES.SELECT, ref:"common_item", refLabel: ["name"]},
        pricingTerm_id:         {label: "价格条款",     type: _DATATYPES.SELECT, ref:"common_item", refLabel: ["name"]},

        paymentType_id:         {label: "付款方式",     type: _DATATYPES.SELECT, ref:"common_item", refLabel: ["name"]},
        commission_id:          {label: "佣金",     type: _DATATYPES.SELECT, ref:"common_item", refLabel: ["name"]},
        region_id:              {label: "签约地点",     type: _DATATYPES.TREE, ref:"region", refLabel: ["name"]},
        departure_port_id:      {label: "运输口岸",     type: _DATATYPES.SELECT, ref:"port", refLabel: ["name"]},
        destination_port_id:    {label: "目的口岸",     type: _DATATYPES.SELECT, ref:"port", refLabel: ["name"]},
        currency_id:            {label: "货币种类",     type: _DATATYPES.SELECT, ref:"common_item", refLabel: ["name"]},
        shipping_currency_id:   {label: "运费币种",     type: _DATATYPES.SELECT, ref:"common_item", refLabel: ["name"]},
  
        // 从order form 读出来的内容
        invoiceCode:            {label: "发票号",  type: _DATATYPES.VARCHAR},
        totalPrice:             {label: "总金额",  type: _DATATYPES.MONEY},
        paidPrice:              {label: "已支付",  type: _DATATYPES.MONEY},
        seller_company_id:      {label: "乙方",    type: _DATATYPES.SELECT, ref:"company", refLabel: ["name"]},
        buyer_company_id:       {label: "甲方",    type: _DATATYPES.SELECT, ref:"company", refLabel: ["name"]},
        isDone:                 {label: "合同是否完成", type: _DATATYPES.SELECT, ref:"company", refLabel: ["name"]},
        order_memo:             {label: "管理员备注",   type: _DATATYPES.TEXT},


        //--------------------------- 显示在列表里的时候需要（因为要取name）
        "follower_id.row":          {label: "跟单员",   type: _DATATYPES.ROW},
        // "seller_company_id.row":    {label: "外贸公司",   type: _DATATYPES.ROW},
        "buyer_company_id.row":     {label: "甲方",   type: _DATATYPES.ROW},
        "seller_company_id.row":     {label: "乙方",   type: _DATATYPES.ROW},
    }
}