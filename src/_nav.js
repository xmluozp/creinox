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
      name: '用户管理',
      url: '/base',
      icon: 'icon-puzzle',
      children: [
        {
          name: '用户列表',
          url: '/users/users',
        },
        {
          name: '用户新增',
          url: '/users/user',
        }
      ]
    }
  ]
};
