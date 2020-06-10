
import {_DATATYPES} from "_constants/_dataTypes"

export const buycontractModel = {
    table: "buy_contract",
    template: "buycontract",
    columns: {
        id :        {label:"ID",        type: _DATATYPES.INT },
        code:       {label: "采购合同号",     type: _DATATYPES.VARCHAR},

        activeAt:   {label: "合同日期", type: _DATATYPES.DATE},
        deliverAt:  {label: "交货日期", type: _DATATYPES.DATE},

        tt_quality:         {label: "质量要求",   type: _DATATYPES.TT},
        tt_deliveryMethod:  {label: "交货地点、方式",   type: _DATATYPES.TT},
        tt_shippingTerm:    {label: "运输条款",   type: _DATATYPES.TT},
        tt_loss:            {label: "合理损耗和计算方式",   type: _DATATYPES.TT},

        tt_packingStandard: {label: "包装标准",   type: _DATATYPES.TT},
        tt_acceptanceCondition:     {label: "验收条件",   type: _DATATYPES.TT},
        tt_accessories:             {label: "随机品、配件工具工具数量及其供应方式",   type: _DATATYPES.TT},
        tt_payment:                 {label: "结算方式及期限",   type: _DATATYPES.TT},
        tt_breach:                  {label: "违约责任",   type: _DATATYPES.TT},
        tt_dispute:                 {label: "解决合同纠纷方式",   type: _DATATYPES.TT},
        tt_memo:                    {label: "其他约定事项",   type: _DATATYPES.TT},
        updateAt:                   {label: "上次操作日期", type: _DATATYPES.DATETIME},

        region_id:              {label: "签约地点",     type: _DATATYPES.TREE, ref:"region", refLabel: ["name"]},
        sell_contract_id:       {label: "销售合同",     type: _DATATYPES.SELECT, ref:"sell_contract", refLabel: ["code"]},     
        paymentType_id:         {label: "付款方式",     type: _DATATYPES.SELECT, ref:"common_item", refLabel: ["name"]},
        follower_id:            {label: "跟单员",       type: _DATATYPES.SELECT, ref:"user", refLabel: ["userName"]},
        updateUser_id:          {label: "上次操作人",    type: _DATATYPES.SELECT, ref:"user", refLabel: ["userName"]},

        // 从order form 读出来的内容
        totalPrice:             {label: "总金额",  type: _DATATYPES.MONEY},
        paidPrice:              {label: "已支付",  type: _DATATYPES.MONEY},
        seller_company_id:      {label: "乙方",    type: _DATATYPES.SELECT, ref:"company", refLabel: ["name"]},
        buyer_company_id:       {label: "甲方",    type: _DATATYPES.SELECT, ref:"company", refLabel: ["name"]},
        isDone:                 {label: "合同是否完成", type: _DATATYPES.SELECT, ref:"company", refLabel: ["name"]},
        order_memo:             {label: "管理员备注",   type: _DATATYPES.VARCHAR},

        //--------------------------- 显示在列表里的时候需要（因为要取name）
        "follower_id.row":          {label: "跟单员",   type: _DATATYPES.ROW},
        "buyer_company_id.row":     {label: "甲方",   type: _DATATYPES.ROW},
        "seller_company_id.row":     {label: "乙方",   type: _DATATYPES.ROW},
        
    }
}

// Type              nulls.Int     `json:"type"`

// IsDone            nulls.Bool    `json:"isDone"`
// Order_memo        nulls.String  `json:"memo"`