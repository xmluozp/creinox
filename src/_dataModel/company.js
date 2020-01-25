
import {_DATATYPES} from "../_constants/_dataTypes"

export const companyModel = {
    table: "company",
    columns: {
        id :        {label:"ID",        type: _DATATYPES.INT },
        companyType:{label: "公司类型",   type: _DATATYPES.ENUM},
        code:       {label: "代码",     type: _DATATYPES.VARCHAR},
        name:       {label: "公司名",     type: _DATATYPES.VARCHAR},    
        ename:      {label: "英文名",     type: _DATATYPES.VARCHAR},    
        shortname:  {label: "简称",     type: _DATATYPES.VARCHAR},    
        eshortname: {label: "英文简称",     type: _DATATYPES.VARCHAR},    
        address:    {label: "地址",   type: _DATATYPES.VARCHAR},
        postcode:   {label: "邮编",   type: _DATATYPES.VARCHAR},
        phone1:     {label: "电话1",   type: _DATATYPES.VARCHAR},
        phone2:     {label: "电话2",   type: _DATATYPES.VARCHAR},
        phone3:     {label: "电话3",   type: _DATATYPES.VARCHAR},
        fax1:       {label: "传真1",   type: _DATATYPES.VARCHAR},
        fax2:       {label: "传真2",   type: _DATATYPES.VARCHAR},
        email1:     {label: "email1",   type: _DATATYPES.VARCHAR},
        email2:     {label: "email2",   type: _DATATYPES.VARCHAR},
        website:    {label: "网址",   type: _DATATYPES.VARCHAR},
        memo:       {label: "经营范围",     type: _DATATYPES.TEXT},
        isActive:   {label: "可用",     type: _DATATYPES.BOOLEAN},

        retrieveTime:{label: "找回日期", type: _DATATYPES.DATE},
        updateAt:   {label: "上次操作日期", type: _DATATYPES.DATETIME},
        createAt:   {label: "录入日期", type: _DATATYPES.DATETIME},

        gsfj:       {label: "国税分局",   type: _DATATYPES.VARCHAR},
        fjdz:       {label: "分局地址",   type: _DATATYPES.VARCHAR},
        fjyb:       {label: "分局邮编",   type: _DATATYPES.VARCHAR},
        taxcode:    {label: "统一税号",     type: _DATATYPES.VARCHAR},
        isDelete:       {label: "是否删除",     type: _DATATYPES.VARCHAR},

        retriever_id:   {label: "找回人",     type: _DATATYPES.SELECT, ref:"user", refLabel: ["userName"]},
        updateUser_id:  {label: "上次操作人",     type: _DATATYPES.SELECT, ref:"user", refLabel: ["userName"]},
        region_id:      {label: "地区",     type: _DATATYPES.TREE, ref:"region", refLabel: ["name"]},

        imageLicense_id:   {label: "工厂证照",   type: _DATATYPES.INT,  ref:"image", refLabel: ["thumbnailPath"]},
        "imageLicense_id.row":   {label: "工厂证照",   type: _DATATYPES.ROW},

        imageBizCard_id:   {label: "名片",   type: _DATATYPES.INT,  ref:"image", refLabel: ["thumbnailPath"]},
        "imageBizCard_id.row": {label: "名片",   type: _DATATYPES.ROW},


        gallary_folder_id:  {label: "图库",     type: _DATATYPES.GALLERY},
    }
}
