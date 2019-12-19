export const enumsLabel = {
    companyType: ["内部公司", "工厂", "外贸客户", "内销客户", "船公司"],
    bankType: ["国内银行","国外银行"],
    folderType: ["图库"],
    log_type: ["登录", "创建", "读取", "编辑", "删除"],
    commisionType:["无佣金", "预付", "后付"],
}


export const  enums = {
    companyType: {internal:0, factory:1, overseasCustomer:2, domesticCustomer:3,shippingCompany:4},
    bankType: {Overseas:0, Domestic:1},
    folderType:{gallary:0},
    log_type:{  sign:0, create:1,read:2,update:3,delete:4},
    commisionType:{noPay:0, prePay:1, postPay:2},
}
