export * from './role'
export * from './user'
export * from './userLog'

export * from './company'

export * from './paymentrequest'
export * from './financialaccount'
export * from './financialledger'
export * from './financialtransaction'
export * from './financialvoucher'

export * from './region'
export * from './port'


export * from './sellcontract'
export * from './sellsubitem'
export * from './buycontract'
export * from './buysubitem'
export * from './mouldcontract'
export * from './expressorder'

export * from './category'
export * from './product'
export * from './productpurchase'
export * from './commodity'


export * from './rostercontact'
export * from './bankaccount'
export * from './commonitem'
export * from './image'





/*

format:
    nameModel = {
        table: [tableName]
        columnNames:
        {
        [xxColumnName1]: 
            {
            label:      "columnShownName", 
            type:       "Type in database", 
            ref:        "fk table name"
            refLabel:   ["label1", "label2"]    // 第一个用来显示的列名，如果还有更多，就是autocomplete的搜索条件.会显示在括号里
            },
        [xxColumnName2]:
            {
                ...
            }
        }
    }

type: 前端显示用
    int
    varchar
    datetime : 搜索选择范围，上传用日期控件
    boolean  : 列表显示
    select   : 提交统一用combobox，大列表和下拉文本里显示refLabel
 */