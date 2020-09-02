
import {_DATATYPES} from "_constants/_dataTypes"

export const userlogModel = {
    table: "userLog",
    dataStore: "userlog",
    columns: {
        id :            {label:"ID",        type: _DATATYPES.INT },
        createAt:       {label: "时间",   type: _DATATYPES.DATETIME},
        memo:           {label: "备注",     type: _DATATYPES.TEXT},
        snapshotBefore: {label: "修改前",     type: _DATATYPES.TEXT},
        snapshotAfter:  {label: "修改后",     type: _DATATYPES.TEXT},

        updateUser_id:  {label: "操作人",     type: _DATATYPES.SELECT, ref:"user", refLabel: ["userName"]},
        "updateUser_id.row": {label: "操作人",   type: _DATATYPES.ROW},
    }
}