
import {_DATATYPES} from "../_constants/_dataTypes"

export const mouldcontractModel = {
    table: "mould_contract",
    printTemplate: ["aaa.xslx"],
    columns: {
        id :                {label:"ID",        type: _DATATYPES.INT },
        code:               {label: "产品开发合同号",     type: _DATATYPES.VARCHAR},
       
        spec:               {label: "规格尺寸",     type: _DATATYPES.VARCHAR},   
        unitPrice:          {label: "单价",     type: _DATATYPES.MONEY},

        prepayPercentage:   {label: "预付比例(%)",     type: _DATATYPES.DECIMAL},
        prepayPrice:        {label: "预付价",     type: _DATATYPES.MONEY},

        // 几个日期相关
        prepayAt:           {label: "预付日期", type: _DATATYPES.DATE},
        activeAt:           {label: "签约日期", type: _DATATYPES.DATE},
        scheduleAt:         {label: "预定交付期", type: _DATATYPES.DATE},
        deliverAt:          {label: "实际交付期", type: _DATATYPES.DATE},        
        buyer_signAt:       {label: "甲方签字日期", type: _DATATYPES.DATE},
        seller_signAt:      {label: "乙方签字日期", type: _DATATYPES.DATE},

        deliverDueDays:     {label: "交付期限(天)", type: _DATATYPES.INT},
        confirmDueDays:     {label: "验收期限(天)", type: _DATATYPES.INT},

        buyer_signer:       {label: "甲方代表",     type: _DATATYPES.VARCHAR},   
        seller_signer:      {label: "乙方代表",     type: _DATATYPES.VARCHAR},

        buyer_accountName:  {label: "甲方账户名",     type: _DATATYPES.VARCHAR},   
        buyer_accountNo:    {label: "甲方账号",     type: _DATATYPES.VARCHAR},   
        buyer_bankName:     {label: "甲方银行",     type: _DATATYPES.VARCHAR},   
        seller_accountName: {label: "乙方账户名",     type: _DATATYPES.VARCHAR},   
        seller_accountNo:   {label: "乙方账号",     type: _DATATYPES.VARCHAR},   
        seller_bankName:    {label: "乙方银行",     type: _DATATYPES.VARCHAR},   


        tt_memo:               {label: "合同备注(打印时显示)",   type: _DATATYPES.TT},
        updateAt: {label: "上次操作日期", type: _DATATYPES.DATETIME},


        product_id:         {label: "对应产品",     type: _DATATYPES.SELECT, ref:"product", refLabel: ["name"]},
        region_id:          {label: "签约地点",     type: _DATATYPES.TREE, ref:"region", refLabel: ["name"]},
        currency_id:        {label: "币种",         type: _DATATYPES.SELECT, ref:"common_item", refLabel: ["name"]},
        updateUser_id:      {label: "上次操作人",    type: _DATATYPES.SELECT, ref:"user", refLabel: ["userName"]},
        follower_id:        {label: "跟单员",       type: _DATATYPES.SELECT, ref:"user", refLabel: ["userName"]},

        gallary_folder_id:  {label: "图库",     type: _DATATYPES.GALLERY},

        // 从order form 读出来的内容
        totalPrice:             {label: "总金额",  type: _DATATYPES.MONEY}, // 前端需要转成中文大写显示 https://juejin.im/post/5e1331046fb9a0482f7a37e0
        paidPrice:              {label: "已支付",  type: _DATATYPES.MONEY},
        seller_company_id:      {label: "乙方",    type: _DATATYPES.SELECT, ref:"company", refLabel: ["name"]},
        buyer_company_id:       {label: "甲方",    type: _DATATYPES.SELECT, ref:"company", refLabel: ["name"]},
        isDone:                 {label: "合同是否完成", type: _DATATYPES.SELECT, ref:"company", refLabel: ["name"]},
        order_memo:             {label: "管理员备注",   type: _DATATYPES.VARCHAR},


        //--------------------------- 显示在列表里的时候需要（因为要取name）
        // "buyer_company_id.row":     {label: "甲方公司",   type: _DATATYPES.ROW},
        // "seller_company_id.row":    {label: "乙方公司",   type: _DATATYPES.ROW},
       
        // 实验性使用view
        "view_follower" :   {label: "跟单员",  type: _DATATYPES.VARCHAR},
        "view_productCode":        {label: "产品货号",     type: _DATATYPES.VARCHAR},
        "view_image_thumbnail":  {label: "图",  type: _DATATYPES.VARCHAR},
        "view_buyer_company_name" : {label: "甲方公司",  type: _DATATYPES.VARCHAR},
        "view_seller_company_name" : {label: "乙方公司",  type: _DATATYPES.VARCHAR},
    }
}