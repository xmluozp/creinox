
import {_DATATYPES} from "_constants/_dataTypes"

export const imageModel = {
    table: "image",
    columns: {
        id :            {label: "ID",         type: _DATATYPES.INT },
        name:           {label: "名称",    type: _DATATYPES.VARCHAR},    
        height:         {label: "高",        type: _DATATYPES.INT},    
        width:          {label: "宽",     type: _DATATYPES.INT}, 
        sort:           {label: "排序",     type: _DATATYPES.INT}, 
        path:           {label: "地址",   type: _DATATYPES.VARCHAR}, 
        thumbnailPath:  {label: "缩略图",       type: _DATATYPES.VARCHAR},
        ext:            {label: "扩展名",     type: _DATATYPES.VARCHAR},
        createAt:       {label: "创建时间",     type: _DATATYPES.DATETIME},
        gallary_folder_id: {label: "所属图册",     type: _DATATYPES.SELECT, ref:"folder", refLabel: ["memo"]},
    }
}
