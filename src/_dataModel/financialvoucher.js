
import {_DATATYPES} from "_constants/_dataTypes"

export const financialvoucherModel = {
    table: "financial_voucher",
    dataStore: "financialvoucher",
    template: "financialVoucher",
    columns: {
        id :            {label: "ID",         type: _DATATYPES.INT },
        word:           {label: "字",    type: _DATATYPES.VARCHAR},
        number:         {label: "号",    type: _DATATYPES.VARCHAR},
        debit:          {label: "借",     type: _DATATYPES.MONEY},        
        credit:         {label: "贷",     type: _DATATYPES.MONEY}, 

        memo:           {label: "摘要",        type: _DATATYPES.VARCHAR},    

        createAt:       {label: "日期", type: _DATATYPES.DATETIME},

        financialAccount_id:   {label: "我方账户",     type: _DATATYPES.SELECT, ref:"financial_account", refLabel: ["name"]},
        financialLedger_id:    {label: "财务科目",     type: _DATATYPES.SELECT, ref:"financial_account", refLabel: ["name"]},
        updateUser_id:         {label: "上次操作人",     type: _DATATYPES.SELECT, ref:"user", refLabel: ["userName"]},

        "financialAccount_id.row":{label: "我方账户",       type: _DATATYPES.ROW},
        "financialLedger_id.row": {label: "财务科目",       type: _DATATYPES.ROW},
        "updateUser_id.row":      {label: "上次操作人",       type: _DATATYPES.ROW},
    }
}