
import {_DATATYPES} from '_constants/_dataTypes'
// import Hello from 'views/'


export const categoryModel = {
    table: "category",
    dataStore: "category",
    columns: {
        id :        {label: "ID",         type: _DATATYPES.INT },
        name:       {label: "名称",       type: _DATATYPES.VARCHAR},    
        ename:      {label: "英文名",     type: _DATATYPES.VARCHAR},    
        prefix:     {label: "货号前缀",   type: _DATATYPES.VARCHAR},    
        currentCode:{label: "当前货号",   type: _DATATYPES.VARCHAR},    
        treeLock:   {label: "是否锁定",   type: _DATATYPES.BOOLEAN},    
        memo:       {label: "简介",       type: _DATATYPES.TEXT},
        ememo:      {label: "英文简介",   type: _DATATYPES.TEXT},
        path:       {label: "路径",       type: _DATATYPES.VARCHAR},    
        updateAt:   {label: "上次操作日期",type: _DATATYPES.DATETIME},
        createAt:   {label: "录入日期",    type: _DATATYPES.DATETIME},
        isDelete:   {label: "是否删除",    type: _DATATYPES.VARCHAR},
        parent_id:  {label: "父节点",      type: _DATATYPES.SELECT, ref:"category", refLabel: ["name"]},
    }
}
