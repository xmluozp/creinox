
import {allAuthList} from '../_constants'
// const testAuthList = 'system,company,product'

export const authCheck = (authString = "", authTag) => {

  // 如果没有权限标签，直接放行
  if (!authTag) return true;

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
