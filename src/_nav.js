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
      name: '测试',
      url: '/test',
      icon: 'icon-speedometer',
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
          name: '用户',
          url: '/users/users',
          authTag:'user',
        },
        {
          name: '通用选项集',
          url: '/commonitems/commonitemsList/0',
          authTag:'commonitem',
        },
        {
          name: '商品类别树',
          url: '/product/categories',
          authTag:'categories',
        },
        {
          name: '国家地区集',
          url: '/setting/regions',
          authTag:'regions',
        },
        {
          name: '已上传图片',
          url: '/image/images',
          authTag:'image',
        },
      ]
    },

  ]
};


const authFilter = (navsList) => {

  const returnNav = navsList.items.filter((item) => {
    const returnItem =item
    // 确认item内部子元素权限
    const returnItemChildren = returnItem.children && returnItem.children.filter((childItem)=>{
      return authCheck(childItem.authTag)
    })
    returnItem.children = returnItemChildren;


    // 确认item本身权限，返回item
    return authCheck(returnItem.authTag);
  })
  navsList.items = returnNav;

  return navsList;
}


export default authFilter(navs)