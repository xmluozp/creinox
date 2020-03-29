
import {_DATATYPES} from "../_constants/_dataTypes"

export const portModel = {
    table: "port",
    columns: {
        id :    {label:"ID",      type: _DATATYPES.INT },
        name:   {label: "名称",   type: _DATATYPES.VARCHAR},
        ename:  {label: "英文名",   type: _DATATYPES.VARCHAR},
        isDeparture:   {label: "是否出发港",   type: _DATATYPES.BOOLEAN},
        isDestination:   {label: "是否到达港",   type: _DATATYPES.BOOLEAN},
    }
}