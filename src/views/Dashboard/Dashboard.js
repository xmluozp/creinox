import React from 'react';
import {h_datetimeToJs_long} from '_helper'


const Dashboard = ({user, ...props}) => {

  console.log(user)

  const {fullName, lastLogin} = user
  const roleName = user && user['role_id.row'] && user['role_id.row'].name || ""


  return (
    <div className="animated fadeIn">
      你好，{fullName}，欢迎使用 Creinox 操作系统！
      <div>
        你上次登录时间是：{h_datetimeToJs_long(lastLogin)} <br/>
        你的角色是： {roleName}
      </div>
    </div>
  );

}

export default Dashboard;
