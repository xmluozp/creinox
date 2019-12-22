
import {_DATATYPES} from "../_constants/_dataTypes"

// 通用选项表
export const commonitemModel = {
    table: "common_item",
    columns: {
        id :            {label: "ID",         type: _DATATYPES.INT },
        name:           {label: "选项名",    type: _DATATYPES.VARCHAR},    
        ename:          {label: "英文名",        type: _DATATYPES.VARCHAR}, 
        memo:           {label: "备注",       type: _DATATYPES.TEXT},
        sorting:        {label: "排序",       type: _DATATYPES.INT},
        auth:           {label: "权限码",     type: _DATATYPES.VARCHAR}, 
        isActive:       {label: "是否启用",     type: _DATATYPES.BOOLEAN}, 
        isDelete:       {label: "是否删除",   type: _DATATYPES.BOOLEAN}, 
        commonType:     {label: "选项类型",     type: _DATATYPES.ENUM},
    }
}