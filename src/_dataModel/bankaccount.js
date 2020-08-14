
import {_DATATYPES} from "_constants/_dataTypes"

export const bankaccountModel = {
    table: "bankaccount",
    dataStore: "bankaccount",
    columns: {
        id :            {label: "ID",         type: _DATATYPES.INT },
        accountName:    {label: "账户名/姓名",    type: _DATATYPES.VARCHAR},    
        accountNo:      {label: "账号",        type: _DATATYPES.VARCHAR},    
        bankName:       {label: "银行名称",     type: _DATATYPES.VARCHAR}, 
        address:        {label: "银行地址",     type: _DATATYPES.VARCHAR}, 
        swiftCode:      {label: "swiftcode",   type: _DATATYPES.VARCHAR}, 
        memo:           {label: "备注",       type: _DATATYPES.TEXT},
        bankType:       {label: "银行类型",     type: _DATATYPES.ENUM},
        currency_id:    {label: "币种",     type: _DATATYPES.SELECT, ref:"common_item", refLabel: ["name"]},
        company_id:     {label: "所属公司",     type: _DATATYPES.SELECT, ref:"company", refLabel: ["name"]},
    }
}