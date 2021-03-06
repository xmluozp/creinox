
import {_DATATYPES} from "_constants/_dataTypes"

export const productModel = {
    table: "product",
    dataStore: "product",
    columns: {
        id :        {label:"ID",        type: _DATATYPES.INT },
        code:       {label: "产品货号",     type: _DATATYPES.VARCHAR},
        name:       {label: "产品名称",     type: _DATATYPES.VARCHAR},    
        ename:      {label: "英文名",     type: _DATATYPES.VARCHAR},    
        shortname:  {label: "简称",     type: _DATATYPES.VARCHAR},    
        eshortname: {label: "英文简称",     type: _DATATYPES.VARCHAR},   


        spec1:      {label: "规格1",     type: _DATATYPES.VARCHAR},   
        spec2:      {label: "规格2",     type: _DATATYPES.VARCHAR},   
        spec3:      {label: "规格3",     type: _DATATYPES.VARCHAR},   
        barcode:    {label: "条码",     type: _DATATYPES.VARCHAR},   
        thickness:  {label: "厚度(mm)",     type: _DATATYPES.VARCHAR},   
        unitWeight: {label: "单位重量(g)",     type: _DATATYPES.DECIMAL},   

        retrieveTime:{label: "找回日期", type: _DATATYPES.DATE},
        updateAt:   {label: "上次操作日期", type: _DATATYPES.DATETIME},
        createAt:   {label: "录入日期", type: _DATATYPES.DATETIME},
        memo:       {label: "备注",     type: _DATATYPES.TEXT},   

        isOEM:       {label: "是否OEM",     type: _DATATYPES.BOOLEAN},   
        isSemiProduct: {label: "是否最终产品",     type: _DATATYPES.BOOLEAN},   
        isEndProduct:  {label: "是否作为组件",     type: _DATATYPES.BOOLEAN},   

        isDelete:       {label: "是否删除",     type: _DATATYPES.BOOLEAN},

        polishing_id:   {label: "抛光",     type: _DATATYPES.SELECT, ref:"common_item", refLabel: ["name"]},
        texture_id:  {label: "材质",     type: _DATATYPES.SELECT, ref:"common_item", refLabel: ["name"]},
        retriever_id:   {label: "找回人",     type: _DATATYPES.SELECT, ref:"user", refLabel: ["userName"]},
        updateUser_id:  {label: "上次操作人",     type: _DATATYPES.SELECT, ref:"user", refLabel: ["userName"]},
        category_id:      {label: "产品分类",     type: _DATATYPES.TREE, ref:"category", refLabel: ["name"]},

        image_id:   {label: "图",   type: _DATATYPES.IMAGE,  ref:"image", refLabel: ["thumbnailPath"]},
        "image_id.row": {label: "图",   type: _DATATYPES.ROW},


        //============== 纯粹显示用，数据来源：最新一条productpurchase
        buyPrice:   {label: "最新采购价",     type: _DATATYPES.MONEY},    
        currency_id:  {label: "币种",     type: _DATATYPES.TREE, ref:"common_item", refLabel: ["name"]},

        temp_product: { label: "产品", type:_DATATYPES.SELECT  },
        //============== 搜索用关联到外表的字段
        "comodity.code": {label: "客户货号",  type: _DATATYPES.VARCHAR},
        "companyFactory.id": {label: "工厂",  type: _DATATYPES.SELECT},

        //============== 新建时候是否生成对应商品。非数据库字段
        "isCreateCommodity" : {label: "设置为商品 (注：设为商品后，才可以在销售合同选择)",  type: _DATATYPES.BOOLEAN},
    }
}
