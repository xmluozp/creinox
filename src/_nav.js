export default {
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
      name: '系统管理',
      url: '#',
      icon: 'icon-puzzle',
      children: [
        {
          name: '系统用户管理',
          url: '/users/users',
        },
      ]
    },
    {
      name: '业务基础数据',
      url: '#',
      icon: 'icon-puzzle',
      children: [
        {
          name: '公司列表',
          url: '/company/companies',
        },
        {
          name: '产品类别',
          url: '/product/categories',
        }
      ]
    },
    {
      name: '产品系统',
      url: '#',
      icon: 'icon-puzzle',
      children: [
        {
          name: '产品目录',
          url: '/product/products',
        }
      ]
    },

  ]
};
