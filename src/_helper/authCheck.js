const allAuthList = [
  "setting",
  "user",
  "test",
  "regions",
  "commonitem",
  "image",
  "companyinternal",
  "companyfactory",
  "companyoverseas",
  "companydomestic",
  "companyshipping",
  "product",
  "categories",
  "productpurchase",
];
// const testAuthList = 'system,company,product'

export const authCheck = authTag => {
  // 如果没有权限标签，直接放行
  if (!authTag) return true;

  // console.log(authTag)
  // if(authTag==='user') return false

  const autharray = allAuthList; //allAuthList.split(',')
  const isPass = autharray.includes(authTag);

  return isPass;

  // 最后判断通过
  // return true
};
