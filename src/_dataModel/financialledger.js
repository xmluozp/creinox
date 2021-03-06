
import {_DATATYPES} from "_constants/_dataTypes"

export const financialledgerModel = {
    table: "financial_ledger",
    dataStore: "financialledger",
    columns: {
        id :        {label: "ID",         type: _DATATYPES.INT },
        name:       {label: "科目名称",       type: _DATATYPES.VARCHAR},  // 直接显示的名称
        ledgerName: {label: "科目名称",       type: _DATATYPES.VARCHAR},  // 用aa/bb/cc的格式显示的路径名
        code:       {label: "代码(检索用)",   type: _DATATYPES.VARCHAR},   
        isBuiltin:  {label: "是否系统内置",    type: _DATATYPES.BOOLEAN},
        memo:       {label: "备注",       type: _DATATYPES.TEXT},
        path:       {label: "路径",       type: _DATATYPES.VARCHAR},   
        auth:       {label: "权限",       type: _DATATYPES.VARCHAR},   
        isActive:   {label: "是否显示",    type: _DATATYPES.BOOLEAN},
   
        sorting:    {label: "排序",       type: _DATATYPES.INT},   
        parent_id:  {label: "父节点",      type: _DATATYPES.SELECT, ref:"region", refLabel: ["name"]},
    }
}