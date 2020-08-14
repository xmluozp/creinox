
import {_DATATYPES} from "_constants/_dataTypes"

export const roleModel = {
    table: "role",
    dataStore: "role",
    columns: {
        id :    {label:"ID",      type: _DATATYPES.INT },
        name:   {label: "名称",   type: _DATATYPES.VARCHAR},
        rank:   {label: "等级",   type: _DATATYPES.INT},
        auth:   {label: "权限",   type: _DATATYPES.TEXT},
    }
}