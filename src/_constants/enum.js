export const enumsLabel = {
    companyType: ["全部","内部公司", "工厂", "外贸客户", "内销客户", "船公司"],
    bankType: ["","国内银行","国外银行"],
    folderType: ["","图库"],
    log_type: ["","登录", "创建", "读取", "编辑", "删除"],
    commissionType:["","无佣金", "预付", "后付"],
    commonType:["包装类别","抛光","材质","计量单位","运输方式","价格条款","币种", "付款方式", "佣金","快递公司"],
    accountType: ["", "海外账户", "本地账户" , "现金账户"],
    contractType: ["", "销售合同", "采购合同", "产品开发合同"],
    direction: ["寄件", "收件"],  
    expressType: ["文件", "包裹"],
    requestType: ["合同付款", "业务付款"],
    status: ["待审批", "通过", "拒绝"]
}


export const  enums = {
    companyType: {all:0, internal:1, factory:2, overseasCustomer:3, domesticCustomer:4,shippingCompany:5},
    bankType: {Domestic:1, Overseas:2},
    folderType:{gallary:1},
    log_type:{  sign:1, create:2,read:3,update:4,delete:5},
    commissionType:{noPay:1, prePay:2, postPay:3},
    commonType:{pack:0,polishing:1,texture:2,unitType:3,shippingType:4,pricingTerm:5,currency:6, paymentType:7, commission:8, expressCompany:9},
    accountType:{Overseas:1,Domestic:2,Cash:3},
    contractType: {sellContract:1,buyContract:2,mouldContract:3},
    financialLedgerType: {
        UnDecided:           6,
        PayableDebit:        11,
        PayableCredit:       8,
        ReceivableDebit:     7,
        ReceivableCredit:    9,
        PayablePayDebit:     8,
        PayablePayCredit:    10,
        ReceivablePayDebit:  10,
        ReceivablePayCredit: 7},
        direction: {send:0, receive:1},
    expressType: {document:0, package: 1},
}

export const enumLogType = {
    "sell_contract":    "销售合同",
    "sell_subitem":     "销售合同商品",
    "buy_contract":     "采购合同",
    "buy_subitem":      "采购合同商品",  
    "mould_contract":   "产品开发合同"
}