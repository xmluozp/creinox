
import {_DATATYPES} from "../_constants/_dataTypes"

export const rostercontactModel = {
    table: "rostercontact",
    columns: {
        id :        {label: "ID",         type: _DATATYPES.INT },
        fullName:       {label: "姓名",       type: _DATATYPES.VARCHAR},    
        eFullName:      {label: "英文名",     type: _DATATYPES.VARCHAR},    
        phone1:  {label: "国内电话",   type: _DATATYPES.VARCHAR}, 
        phone2:  {label: "国外电话",   type: _DATATYPES.VARCHAR}, 
        skype:  {label: "skype",   type: _DATATYPES.VARCHAR}, 
        email:  {label: "email",   type: _DATATYPES.VARCHAR}, 
        wechat:  {label: "微信",   type: _DATATYPES.VARCHAR}, 
        whatsapp:  {label: "whatsapp",   type: _DATATYPES.VARCHAR}, 
        facebook:  {label: "facebook",   type: _DATATYPES.VARCHAR}, 
        memo:       {label: "备注",       type: _DATATYPES.TEXT},
        company_id:  {label: "所属公司",      type: _DATATYPES.SELECT, ref:"company", refLabel: ["name"]},
    }
}