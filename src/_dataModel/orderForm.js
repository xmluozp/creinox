
import {_DATATYPES} from "_constants/_dataTypes"

export const orderformModel = {
    table: "order_form",
    columns: {
        id :                {label:"ID",        type: _DATATYPES.INT },
        contractType:       {label: "合同类型",     type: _DATATYPES.VARCHAR},  
        code:               {label: "合同号",     type: _DATATYPES.TEXT},   

        // 从order form 读出来的内容
        invoiceCode:            {label: "发票号",  type: _DATATYPES.VARCHAR}, 
        totalPrice:             {label: "总金额",  type: _DATATYPES.MONEY}, // 前端需要转成中文大写显示 https://juejin.im/post/5e1331046fb9a0482f7a37e0
        paidPrice:              {label: "已支付",  type: _DATATYPES.MONEY},
        seller_company_id:      {label: "乙方",    type: _DATATYPES.SELECT, ref:"company", refLabel: ["name"]},
        buyer_company_id:       {label: "甲方",    type: _DATATYPES.SELECT, ref:"company", refLabel: ["name"]},
        order_memo :        {label: "备注",    type: _DATATYPES.TEXT},
    }
}