
import {_DATATYPES} from "_constants/_dataTypes"

export const expressorderModel = {
    table: "expressOrder",
    dataStore: "expressorder",
    columns: {
        id :            {label:"ID",        type: _DATATYPES.INT },
        code:           {label: "单号",     type: _DATATYPES.VARCHAR},
        direction:      {label: "寄或收",   type: _DATATYPES.ENUM}, // 0 寄件 1 收件
        expressType:    {label: "快递内容",   type: _DATATYPES.ENUM}, // 0 文件，1包裹
        createAt:       {label: "录入日期", type: _DATATYPES.DATE},
        expressAt:      {label: "交货日期", type: _DATATYPES.DATE},
        memo:           {label: "备注",   type: _DATATYPES.TT},

        internal_company_id:       {label: "我方公司",     type: _DATATYPES.SELECT, ref:"company", refLabel: ["name"]},
        external_company_id:       {label: "对方公司",     type: _DATATYPES.SELECT, ref:"company", refLabel: ["name"]},     
        expressCompany_id:         {label: "快递公司",     type: _DATATYPES.SELECT, ref:"common_item", refLabel: ["name"]},
 
        //--------------------------- 显示在列表里的时候需要（因为要取name）
        "internal_company_id.row":     {label: "我方公司",   type: _DATATYPES.ROW},
        "external_company_id.row":     {label: "对方公司",   type: _DATATYPES.ROW},
        "expressCompany_id.row":       {label: "快递公司",   type: _DATATYPES.ROW},
    }
}