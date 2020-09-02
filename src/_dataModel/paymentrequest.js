
import {_DATATYPES} from "_constants/_dataTypes"

export const paymentrequestModel = {
    table: "paymentRequest",
    dataStore: "paymentrequest",
    columns: {
        id :                {label:"ID",           type: _DATATYPES.INT },
        amount:             {label: "付款金额",     type: _DATATYPES.MONEY},   
        requestType:        {label: "付款种类",     type: _DATATYPES.ENUM},  // 0:合同付款 1: 业务付款
        invoiceCode:        {label: "发票号",       type: _DATATYPES.VARCHAR}, // 客户要改成输入的，不判定唯一性
        to_companyName:     {label: "对方单位",     type: _DATATYPES.VARCHAR},
        bankaccountName:    {label: "对方银行",     type: _DATATYPES.VARCHAR},
        bankaccountNo:      {label: "对方账号",     type: _DATATYPES.VARCHAR},
        tt_transUse:        {label: "用途",         type: _DATATYPES.TT},
        location:           {label: "汇入地点",     type: _DATATYPES.VARCHAR},
        createAt:           {label: "填写时间",     type: _DATATYPES.DATE},
        expressAt:          {label: "寄件日期",     type: _DATATYPES.DATE},
        expiryAt:           {label: "到期付款日",   type: _DATATYPES.DATE},
        approveAt:          {label: "审批时间",     type: _DATATYPES.DATE},
        status:             {label: "审批状态",     type: _DATATYPES.ENUM},  // 0, 申请， 1，通过， 2，拒绝
        memo:               {label: "备注",         type: _DATATYPES.TT},


        order_form_id:      {label: "合同",     type: _DATATYPES.SELECT,     ref:"order_form", refLabel: ["name"]},
        applicantUser_id:   {label: "申请人",       type: _DATATYPES.SELECT, ref:"user", refLabel: ["name"]},
        approveUser_id:     {label: "审批人",       type: _DATATYPES.SELECT, ref:"user", refLabel: ["name"]},
        from_company_id:    {label: "外贸公司",     type: _DATATYPES.SELECT, ref:"company", refLabel: ["name"]},
        to_company_id:      {label: "对方单位",     type: _DATATYPES.SELECT, ref:"company", refLabel: ["name"]},
        paymentType_id:     {label: "付款方式",     type: _DATATYPES.SELECT, ref:"common_item", refLabel: ["name"]},
        currency_id:        {label: "币种",         type: _DATATYPES.SELECT, ref:"common_item", refLabel: ["name"]},     
  
        //--------------------------- 显示在列表里的时候需要（因为要取name）
        "order_form_id.row":    {label: "合同",     type: _DATATYPES.ROW},
        "applicantUser_id.row": {label: "申请人",   type: _DATATYPES.ROW},
        "approveUser_id.row":   {label: "审批人",   type: _DATATYPES.ROW},
        "from_company_id.row":  {label: "外贸公司", type: _DATATYPES.ROW},
        "to_company_id.row":    {label: "对方单位", type: _DATATYPES.ROW},
        "paymentType_id.row":   {label: "付款方式", type: _DATATYPES.ROW},
        "currency_id.row":      {label: "币种",     type: _DATATYPES.ROW},
    
        "temp_amount":  {label: "人民币大写",     type: _DATATYPES.ROW},

        "temp_bank":   {label: "银行快捷选择",     type: _DATATYPES.ROW},
    }
}