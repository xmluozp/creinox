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
      name: "财务记录",
      url: "#",
      icon: "icon-puzzle",
      authTag: "financial",
      children: [
        {
          name: "海外账户记录",
          url: "/financial/financialaccountsTransactions/1",
          authTag: "financial",
        },
        {
          name: "本地账户记录",
          url: "/financial/financialaccountsTransactions/2",
          authTag: "financial",
        },
        {
          name: "现金账户记录",
          url: "/financial/financialaccountsTransactions/3",
          authTag: "financial",
        },
        {
          name: "转账凭证记录",
          url: "/financial/financialvouchers",
          authTag: "financial",
        },
        {
          name: "申请付款",
          url: "",
          authTag: "financial",
        },
        {
          name: "审批付款",
          url: "",
          authTag: "financial",
        }

      ],
    },
    {
      name: "产品/商品",
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
          name: "通用选项集",
          url: "/commonitems/commonitemsList/0",
          authTag: "commonitem",
        },
        {
          name: "商品类别树",
          url: "/product/categories",
          authTag: "category",
        },
        {
          name: "港口",
          url: "/setting/ports",
          authTag: "port",
        },
        {
          name: "国家地区集",
          url: "/setting/regions",
          authTag: "region",
        },
      ],
    },
    {
      name: "用户与权限",
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
      name: "系统内部数据",
      url: "#",
      icon: "icon-puzzle",
      authTag: "setting",
      children: [
        {
          name: "已上传图片",
          url: "/image/images",
          authTag: "image",
        },
      ],
    },
  ],
};

export default navs;
