
import {_DATATYPES} from "_constants/_dataTypes"

export const financialtransactionModel = {
    table: "financial_transaction",
    dataStore: "financialtransaction",
    template: "financialTransaction",
    columns: {
        id :            {label: "ID",         type: _DATATYPES.INT },
        transdateAt:    {label: "收/付款日期",    type: _DATATYPES.DATETIME},
        amount_out:     {label: "付款金额",     type: _DATATYPES.MONEY},        
        amount_in:      {label: "收款金额",     type: _DATATYPES.MONEY}, 
        balance:        {label: "当前余额",     type: _DATATYPES.MONEY}, 

        tt_transUse:    {label: "用途/摘要",   type: _DATATYPES.TT},
        isContractPayment:  {label: "是否属于合同货款",     type: _DATATYPES.BOOLEAN},
        bankaccountName: {label: "对方账户",    type: _DATATYPES.VARCHAR},
        bankaccountNo:   {label: "对方账号",    type: _DATATYPES.VARCHAR},

        memo:            {label: "备注",    type: _DATATYPES.VARCHAR},

        updateAt: {label: "上次操作日期", type: _DATATYPES.DATETIME},

 
        order_form_id:          {label: "对应合同",     type: _DATATYPES.SELECT, ref:"order_form", refLabel: ["code"]},
        paymentType_id:         {label: "付款方式",     type: _DATATYPES.SELECT, ref:"common_item", refLabel: ["name"]},
        financialAccount_id:    {label: "我方账户",     type: _DATATYPES.SELECT, ref:"financial_account", refLabel: ["name"]},
        financialLedgerDebit_id:     {label: "财务科目(借)",     type: _DATATYPES.SELECT, ref:"financial_ledger", refLabel: ["name"]},
        financialLedgerCredit_id:     {label: "财务科目(贷)",     type: _DATATYPES.SELECT, ref:"financial_ledger", refLabel: ["name"]},
        currency_id:            {label: "币种",     type: _DATATYPES.SELECT, ref:"common_item", refLabel: ["name"]},
        company_id:             {label: "对方公司",     type: _DATATYPES.SELECT, ref:"company", refLabel: ["name"]},
        updateUser_id:          {label: "上次操作人",     type: _DATATYPES.SELECT, ref:"user", refLabel: ["userName"]},

        "order_form_id.row":    {label: "对应合同",       type: _DATATYPES.ROW},
        "paymentType_id.row":   {label: "付款方式",       type: _DATATYPES.ROW},
        "financialAccount_id.row": {label: "我方账户",       type: _DATATYPES.ROW},
        "financialLedgerDebit_id.row":  {label: "财务科目(借)",       type: _DATATYPES.ROW},
        "financialLedgerCredit_id.row":  {label: "财务科目(贷)",       type: _DATATYPES.ROW},
        "currency_id.row":      {label: "币种",       type: _DATATYPES.ROW},
        "company_id.row":       {label: "对方公司",       type: _DATATYPES.ROW},
        "updateUser_id.row":    {label: "上次操作人",       type: _DATATYPES.ROW},
 
        temp_bank:              {label: "对方银行检索",    type: _DATATYPES.SELECT},
        temp_isIn:              {label: "属于收款还是付款",    type: _DATATYPES.SELECT},
 
    }
}