
import {_DATATYPES} from "_constants/_dataTypes"

export const financialledgerModel = {
    table: "financial_ledger",
    columns: {
        id :        {label: "ID",         type: _DATATYPES.INT },
        name:       {label: "名称",       type: _DATATYPES.VARCHAR}, 
        code:       {label: "代码",   type: _DATATYPES.VARCHAR},   
        isBuiltin:  {label: "是否系统内置",    type: _DATATYPES.BOOLEAN},
        memo:       {label: "简介",       type: _DATATYPES.TEXT},
        path:       {label: "路径",       type: _DATATYPES.VARCHAR},   
        auth:       {label: "权限",       type: _DATATYPES.VARCHAR},   
        isActive:   {label: "是否显示",    type: _DATATYPES.BOOLEAN},
   
        sorting:    {label: "排序",       type: _DATATYPES.INT},   
        parent_id:  {label: "父节点",      type: _DATATYPES.SELECT, ref:"region", refLabel: ["name"]},
    }
}