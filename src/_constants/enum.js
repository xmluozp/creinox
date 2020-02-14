export const enumsLabel = {
    companyType: ["","内部公司", "工厂", "外贸客户", "内销客户", "船公司"],
    bankType: ["","国内银行","国外银行"],
    folderType: ["","图库"],
    log_type: ["","登录", "创建", "读取", "编辑", "删除"],
    commisionType:["","无佣金", "预付", "后付"],
    commonType:["包装类别","抛光","材质","计量单位","运输方式","价格条款","币种"],
}


export const  enums = {
    companyType: {internal:1, factory:2, overseasCustomer:3, domesticCustomer:4,shippingCompany:5},
    bankType: {Domestic:1, Overseas:2},
    folderType:{gallary:1},
    log_type:{  sign:1, create:2,read:3,update:4,delete:5},
    commisionType:{noPay:1, prePay:2, postPay:3},
    commonType:{pack:0,polishing:1,texture:2,unitType:3,shippingType:4,pricingTerm:5,currency:6 },
}