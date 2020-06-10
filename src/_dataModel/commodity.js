
import {_DATATYPES} from "_constants/_dataTypes"

export const commodityModel = {
    table: "commodity",
    columns: {
        id :        {label:"ID",        type: _DATATYPES.INT },
        name:       {label: "商品名称",     type: _DATATYPES.VARCHAR},       
        memo:       {label: "备注",     type: _DATATYPES.TEXT},     

        updateAt:   {label: "上次操作日期", type: _DATATYPES.DATETIME},
        createAt:   {label: "录入日期", type: _DATATYPES.DATETIME},
       
        isDelete:       {label: "是否删除",     type: _DATATYPES.BOOLEAN},
        updateUser_id:  {label: "上次操作人",     type: _DATATYPES.SELECT, ref:"user", refLabel: ["userName"]},

        // 从产品获取，而不是数据库
        code:       {label: "产品货号",     type: _DATATYPES.VARCHAR}, 
        category_id:      {label: "产品分类",     type: _DATATYPES.TREE, ref:"category", refLabel: ["name"]},
        
        // 从commodity_product表取isMeta的。如果没有就为空
        product_id:      {label: "产品",     type: _DATATYPES.TREE, ref:"product", refLabel: ["name"]},
        "product.rows":      {label: "产品列表",     type: _DATATYPES.LIST, ref:"product", refLabel: ["name"]},
        

        // 不属于数据库的表，从外部获取。图片来自于产品
        image_id:   {label: "图",   type: _DATATYPES.IMAGE,  ref:"image", refLabel: ["thumbnailPath"]},
        "image_id.row": {label: "图",   type: _DATATYPES.ROW},

        // 来自于销售价格表. commoditySell
        sellPrice:   {label: "参考售价",     type: _DATATYPES.MONEY},  
        currency_id:  {label: "币种",     type: _DATATYPES.TREE, ref:"common_item", refLabel: ["name"]},
 
        //============== 搜索用关联到外表的字段: 
        "companyDomesticCustomer.id": {label: "内销客户",  type: _DATATYPES.SELECT},
        "companyOverseasCustomer.id": {label: "外贸客户",  type: _DATATYPES.SELECT},
    }
}
