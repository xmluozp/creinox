const navs = {
  items: [
    {
      name: '主页',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },    
    {
      name: '测试',
      url: '/test',
      icon: 'icon-speedometer',
    },   
    {
      name: '合同管理',
      url: '#',
      icon: 'icon-puzzle',
      children: [
        {
          name: '销售合同',
          url: '/contract/allcontracts',
          authTag:'sellcontract',
        },       
        {
          name: '采购合同',
          url: '/contract/buycontracts',
          authTag:'buycontract',
        },       
        {
          name: '产品开发合同',
          url: '/contract/mouldcontracts',
          authTag:'mouldcontract',
        }
      ]
    },
    {
      name: '产品/商品',
      url: '#',
      icon: 'icon-puzzle',
      children: [
        {
          name: '产品/工厂报价',
          url: '/product/products',
          authTag:'product',
        },        
        {
          name: '商品/成套商品',
          url: '/commodity/commodities',
          authTag:'commodity',
        }
      ]
    },
    {
      name: '业务(公司)',
      url: '#',
      icon: 'icon-puzzle',
      children: [
        {
          name: '内部公司',
          url: '/companyinternal/companies',
          authTag:'companyinternal',
        },
        {
          name: '工厂',
          url: '/companyfactory/companies',
          authTag:'companyfactory',
        },
        {
          name: '外贸客户',
          url: '/companyoverseas/companies',
          authTag:'companyoverseas',
        },
        {
          name: '内销客户',
          url: '/companydomestic/companies',
          authTag:'companydomestic',
        },
        {
          name: '船公司',
          url: '/companyshipping/companies',
          authTag:'companyshipping',
        },
      ]
    },
    {
      name: '系统',
      url: '#',
      icon: 'icon-puzzle',
      authTag:'setting',
      children: [
        {
          name: '通用选项集',
          url: '/commonitems/commonitemsList/0',
          authTag:'commonitem',
        },
        {
          name: '商品类别树',
          url: '/product/categories',
          authTag:'category',
        },
        {
          name: '港口',
          url: '/setting/ports',
          authTag:'port',
        },
        {
          name: '国家地区集',
          url: '/setting/regions',
          authTag:'region',
        },
        {
          name: '已上传图片',
          url: '/image/images',
          authTag:'image',
        },
        {
          name: '用户',
          url: '/users/users',
          authTag:'user',
        },
        {
          name: '角色权限',
          url: '/users/roles',
          authTag:'user',
        }
      ]
    },

  ]
};



export default navs