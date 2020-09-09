
import {allAuthList} from '_constants'
// const testAuthList = 'system,company,product'

// authString: 用逗号隔开的数字。 authTag 某个权限英文名
export const authCheck = (authString = "", authTag) => {

  // 如果没有权限标签，直接放行
  if (!authTag) return true;
  if(!authString) {return false}
  // auth list取的是authlist里的


  const authList = authString.split(",");
  const autharray = authList.length > 0 ? authList.map((authIndex)=>{
    return allAuthList[authIndex]
  }): [];

  // const autharray = allAuthList;
  const isPass = autharray.includes(authTag) || autharray.includes("all");

  return isPass;

  // 最后判断通过
  // return true
};

export function authCheckUser(user, authTag) {

  if(user && user["role_id.row"] && user["role_id.row"] && user["role_id.row"].auth) {
      const authString = user["role_id.row"].auth
      return authCheck(authString, authTag)
  } 
  
  return false
}