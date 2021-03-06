export const allAuthList = [
    "all",                          // 0
    "setting",
    "user",
    "test",
    "region",
    "commonitem",
    "image",
    "companyinternal",
    "companyfactory",
    "companyoverseas",
    "companydomestic",              // 10
    "companyshipping",
    "product",
    "category",
    "productpurchase",
    "commodity",
    "port",
    "sellcontract",
    "buycontract",
    "mouldcontract",
    "financial",                    // 20
    "paymentRequest",
    "expressOrder",
    "userLog",
    "confirm-payment",
    "confirm-contract",
  ];
    
  export const allAuthListLabel = [
    "所有权限(超级管理员用)",
    "其他选项与分类",
    "用户",
    "测试(内部专用)",
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
    "产品开发合同",
    "财务管理",  
    "付款申请",
    "快递单",
    "系统用户操作日志",
    "审批付款",
    "确认合同",
  ];
  
  // 根据这个列表生成object用于下拉选项
  const getAuthList = () => {
    const returnValue = allAuthList.map((value, index) => {
        return {id: index, name:allAuthListLabel[index], value: value }
    });

    return returnValue;
  };

  export const authOptions = getAuthList();