import {authCheck} from './_helper';

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
      name: '系统管理',
      url: '#',
      icon: 'icon-puzzle',
      authTag:'system',
      children: [
        {
          name: '系统用户管理',
          url: '/users/users',
          authTag:'user',
        },
      ]
    },
    {
      name: '业务基础数据',
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
      name: '产品系统',
      url: '#',
      icon: 'icon-puzzle',
      children: [
        {
          name: '产品类别',
          url: '/product/categories',
          authTag:'product',
        },
        {
          name: '产品目录',
          url: '/product/products',
          authTag:'product',
        }
      ]
    },

  ]
};


const authFilter = (navsList) => {

  const returnNav = navsList.items.map((item) => {
    const returnItem =item
    // 确认item内部子元素权限
    const returnItemChildren = returnItem.children && returnItem.children.filter((childItem)=>{
      return authCheck(childItem.authTag)
    })
    returnItem.children = returnItemChildren;


    // 确认item本身权限，返回item
    return authCheck(returnItem.authTag) ? returnItem : null;
  })
  navsList.items = returnNav;

  return navsList;
}


export default authFilter(navs)