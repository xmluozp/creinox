
import {_DATATYPES} from "../_constants/_dataTypes"

export const texttemplateModel = {
    table: "text_template",
    columns: {
        id :    {label:"ID",      type: _DATATYPES.INT },
        name:   {label: "名称",   type: _DATATYPES.VARCHAR},
        targetTable:  {label: "表名",   type: _DATATYPES.VARCHAR},
        columnName:  {label: "列名",   type: _DATATYPES.VARCHAR},
        content:  {label: "内容",   type: _DATATYPES.TEXT},
        updateAt: {label: "更新时间",   type: _DATATYPES.DATETIME}
    }
}