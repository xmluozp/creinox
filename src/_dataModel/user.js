
import {_DATATYPES} from "../_constants/_dataTypes"

export const userModel = {
    table: "user",
    columns: {
        id :        {label:"ID",        type: _DATATYPES.INT },
        userName:   {label: "用户名",   type: _DATATYPES.VARCHAR},
        fullName:   {label: "姓名",     type: _DATATYPES.VARCHAR},
        password:   {label: "密码",     type: _DATATYPES.VARCHAR},    
        ip:         {label: "IP地址",   type: _DATATYPES.VARCHAR},
        lastLogin:  {label: "上次登录", type: _DATATYPES.DATETIME},
        token:      {label: "令牌",     type: _DATATYPES.VARCHAR},
        memo:       {label: "备注",     type: _DATATYPES.TEXT},
        isActive:   {label: "可用",     type: _DATATYPES.BOOLEAN},
        role_id:    {label: "角色",     type: _DATATYPES.SELECT, ref:"role", refLabel: ["name"]},
    }
}