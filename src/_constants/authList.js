export const allAuthList = [
    "all",
    "setting",
    "user",
    "test",
    "region",
    "commonitem",
    "image",
    "companyinternal",
    "companyfactory",
    "companyoverseas",
    "companydomestic",
    "companyshipping",
    "product",
    "category",
    "productpurchase",
    "commodity",
    "port",
    "sellcontract",
    "buycontract",
    "mouldcontract"
  ];
    
  export const allAuthListLabel = [
    "所有权限(超级管理员用)",
    "系统",
    "用户",
    "测试",
    "国家地区",
    "通用选项",
    "图片",
    "内部公司",
    "工厂",
    "外贸客户",
    "内销客户",
    "船公司",
    "产品",
    "产品类别",
    "产品采购价",
    "商品",
    "港口",
    "销售合同",
    "采购合同",
    "产品开发合同"
  ];
  
  // 根据这个列表生成object用于下拉选项
  const getAuthList = () => {
    const returnValue = allAuthList.map((value, index) => {
        return {id: index, name:allAuthListLabel[index], value: value }
    });

    return returnValue;
  };

  export const authOptions = getAuthList();