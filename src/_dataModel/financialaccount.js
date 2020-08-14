
import {_DATATYPES} from "_constants/_dataTypes"

export const financialaccountModel = {
    table: "financial_account",
    dataStore: "financialaccount",
    columns: {
        id :            {label: "ID",         type: _DATATYPES.INT },
        name:           {label: "名称",    type: _DATATYPES.VARCHAR},
        memo:           {label: "备注",        type: _DATATYPES.VARCHAR},    
        balance:        {label: "当前余额",     type: _DATATYPES.MONEY}, 
        originBalance:  {label: "原始余额",     type: _DATATYPES.MONEY}, 
        accountType:    {label: "账户类型",   type: _DATATYPES.INT}, 
        currency_id:    {label: "币种",     type: _DATATYPES.SELECT, ref:"common_item", refLabel: ["name"]},
    }
}