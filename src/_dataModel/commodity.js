
import {_DATATYPES} from "../_constants/_dataTypes"

export const commodityModel = {
    table: "commodity",
    columns: {
        id :        {label:"ID",        type: _DATATYPES.INT },
        code:       {label: "商品货号",     type: _DATATYPES.VARCHAR},
        name:       {label: "商品名称",     type: _DATATYPES.VARCHAR},    
        ename:      {label: "英文名",     type: _DATATYPES.VARCHAR},    
        shortname:  {label: "简称",     type: _DATATYPES.VARCHAR},    
        eshortname: {label: "英文简称",     type: _DATATYPES.VARCHAR},   

        price:   {label: "售价",     type: _DATATYPES.MONEY},  

        updateAt:   {label: "上次操作日期", type: _DATATYPES.DATETIME},
        createAt:   {label: "录入日期", type: _DATATYPES.DATETIME},

        memo:       {label: "备注",     type: _DATATYPES.TEXT},          
        
        isDelete:       {label: "是否删除",     type: _DATATYPES.BOOLEAN},
        updateUser_id:  {label: "上次操作人",     type: _DATATYPES.SELECT, ref:"user", refLabel: ["userName"]},
        category_id:      {label: "所属产品分类",     type: _DATATYPES.TREE, ref:"category", refLabel: ["name"]},
        
        // 从commodity_product表取isMeta的。如果没有就为空
        product_id:      {label: "对应主要产品",     type: _DATATYPES.TREE, ref:"product", refLabel: ["name"]},
        "product.rows":      {label: "产品列表",     type: _DATATYPES.LIST, ref:"product", refLabel: ["name"]},
        

        // 不属于数据库的表，从产品表取
        image_id:   {label: "图",   type: _DATATYPES.INT,  ref:"image", refLabel: ["thumbnailPath"]},
        "image_id.row": {label: "图",   type: _DATATYPES.ROW},

        //============== 搜索用关联到外表的字段: 
        "companyDomesticCustomer.id": {label: "内销客户",  type: _DATATYPES.SELECT},
        "companyOverseasCustomer.id": {label: "外贸客户",  type: _DATATYPES.SELECT},
    }
}
