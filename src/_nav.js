const navs = {
  items: [
    {
      name: "主页",
      url: "/dashboard",
      icon: "icon-speedometer",
      badge: {
        variant: "info",
        text: "NEW",
      },
    },
    // {
    //   name: "测试",
    //   url: "/test",
    //   icon: "icon-speedometer",
    // },
    {
      divider: true,
    },
    {
      title: true,
      name: "日常业务",
    },
    {
      name: "合同管理",
      url: "#",
      icon: "icon-puzzle",
      children: [
        {
          name: "销售合同",
          url: "/contract/sellcontracts",
          authTag: "sellcontract",
        },
        {
          name: "采购合同",
          url: "/contract/buycontracts",
          authTag: "buycontract",
        },
        {
          name: "产品开发合同",
          url: "/contract/mouldcontracts",
          authTag: "mouldcontract",
        },
      ],
    },
    {
      name: "转账与凭证",
      url: "#",
      icon: "icon-puzzle",
      authTag: "financial",
      children: [
        {
          name: "海外账户转账记录",
          url: "/financial/financialaccountsTransactions/1",
          authTag: "financial",
        },
        {
          name: "本地账户转账记录",
          url: "/financial/financialaccountsTransactions/2",
          authTag: "financial",
        },
        {
          name: "现金账户转账记录",
          url: "/financial/financialaccountsTransactions/3",
          authTag: "financial",
        },
        {
          name: "转账凭证",
          url: "/financial/financialvouchers",
          authTag: "financial",
        },
      ],
    },
    {
      name: "其他业务",
      url: "#",
      icon: "icon-puzzle",
      children: [
        {
          name: "付款通知单",
          url: "/dailyBusinesses/paymentRequests",
          authTag: "paymentRequest",
        },
        {
          name: "快递单",
          url: "/dailyBusinesses/expressOrders",
          authTag: "expressOrder",
        },
      ],
    },
    {
      name: "产品/商品录入",
      url: "#",
      icon: "icon-puzzle",
      children: [
        {
          name: "产品/工厂报价",
          url: "/product/products",
          authTag: "product",
        },
        {
          name: "商品/商品组合",
          url: "/commodity/commodities",
          authTag: "commodity",
        },
      ],
    },
    {
      divider: true,
    },
    {
      title: true,
      name: "基础设置",
    },
    {
      name: "公司名录",
      url: "#",
      icon: "icon-puzzle",
      children: [
        {
          name: "内部公司",
          url: "/companyinternal/companies",
          authTag: "companyinternal",
        },
        {
          name: "工厂",
          url: "/companyfactory/companies",
          authTag: "companyfactory",
        },
        {
          name: "外贸客户",
          url: "/companyoverseas/companies",
          authTag: "companyoverseas",
        },
        {
          name: "内销客户",
          url: "/companydomestic/companies",
          authTag: "companydomestic",
        },
        {
          name: "船公司",
          url: "/companyshipping/companies",
          authTag: "companyshipping",
        },
      ],
    },
    {
      name: "财务账户设置",
      url: "#",
      icon: "icon-puzzle",
      authTag: "financial",
      children: [
        {
          name: "海外账户设置",
          url: "/financial/financialaccounts/1",
          authTag: "financial",
        },
        {
          name: "本地账户设置",
          url: "/financial/financialaccounts/2",
          authTag: "financial",
        },
        {
          name: "现金账户设置",
          url: "/financial/financialaccounts/3",
          authTag: "financial",
        },
        {
          name: "科目设置",
          url: "/financial/financialledgers",
          authTag: "financial",
        },

        
      ],
    },
    {

      name: "其他选项与分类",
      url: "#",
      icon: "icon-puzzle",
      authTag: "setting",
      children: [
        {
          name: "产品类别树",
          url: "/product/categories",
          authTag: "category",
        },
        {
          name: "港口",
          url: "/setting/ports",
          authTag: "port",
        },
        {
          name: "国家地区",
          url: "/setting/regions",
          authTag: "region",
        },
        {
          name: "通用选项集",
          url: "/commonitems/commonitemsList/0",
          authTag: "commonitem",
        },

      ],
    },
    {
      name: "用户权限",
      url: "#",
      icon: "icon-puzzle",
      authTag: "setting",
      children: [
        {
          name: "用户",
          url: "/users/users",
          authTag: "user",
        },
        {
          name: "角色权限",
          url: "/users/roles",
          authTag: "user",
        },
      ],
    },
    {
      name: "内部数据",
      url: "#",
      icon: "icon-puzzle",
      authTag: "setting",
      children: [
        {
          name: "已上传图片",
          url: "/image/images",
          authTag: "image",
        },        {
          name: "操作日志",
          url: "/users/userLogs",
          authTag: "userLog",
        },

      ],
    },
  ],
};

export default navs;
