import { constMaker } from "_helper/facelessMaker";
//================================================= user
export const AUTH = {
    LOGIN: 'LOGIN',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    LOGOUT: 'LOGOUT',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    LOGOUT_FAILURE: 'LOGOUT_FAILURE'
}

export const USER = constMaker("USER")
export const PORT = constMaker("PORT")

export const ROLE = constMaker("ROLE")
// {
//     CREATE_SUCCESS: 'ROLE_CREATE_SUCCESS',
//     CREATE_FAILURE: 'ROLE_CREATE_FAILURE',

//     UPDATE_SUCCESS: 'ROLE_UPDATE_SUCCESS',
//     UPDATE_FAILURE: 'ROLE_UPDATE_FAILURE',

//     GET:            'ROLE_GET',
//     GET_SUCCESS: 'ROLE_GET_SUCCESS',
//     GETBYSEARCH_SUCCESS: 'ROLE_GETBYSEARCH_SUCCESS',
//     GETDROPDOWN_SUCCESS: 'ROLE_GETDROPDOWN_SUCCESS',

//     DELETE_SUCCESS: 'ROLE_DELETE_SUCCESS',
//     DELETE_FAILURE: 'ROLE_DELETE_FAILURE'    
// }

export const COMMONITEM = constMaker("COMMONITEM")
export const TEXTTEMPLATE = constMaker("TEXTTEMPLATE")

//================================================= image
export const IMAGE = constMaker("IMAGE")


//================================================= company
export const COMPANY = constMaker("COMPANY")
export const REGION = constMaker("REGION")
//================================================= contract
export const SELLCONTRACT = constMaker("SELLCONTRACT")
export const SELLSUBITEM = constMaker("SELLSUBITEM")

export const BUYCONTRACT = constMaker("BUYCONTRACT")
export const BUYSUBITEM = constMaker("BUYSUBITEM")

export const MOULDCONTRACT = constMaker("MOULDCONTRACT")

//================================================= product
export const PRODUCT = constMaker("PRODUCT")
export const CATEGORY = constMaker("CATEGORY")
export const PRODUCTPURCHASE = constMaker("PRODUCTPURCHASE")

//================================================= COMMODITY

export const COMMODITY = {
    ...constMaker("COMMODITY"),
    GETBYSEARCH_GETCOMMODITY_SUCCESS: 'COMMODITY_GETBYSEARCH_GETCOMMODITY_SUCCESS',
    GETBYSEARCH_GETPRODUCT_SUCCESS: 'COMMODITY_GETBYSEARCH_GETPRODUCT_SUCCESS',
}

export const ALERT = {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
    INFO: 'INFO',
    NOTIFY: 'NOTIFY',
    CLEAR: 'CLEAR',
}

export const LOADING = {
    LOADING: 'LOADING',
    SUCCESS: 'LOADING_SUCCESS',
    FAILURE: 'LOADING_FAILURE',
    CLEAR: 'LOADING_CLEAR'
}

export const PRINT = {
    GET :'PRINT_GET',
    GET_SUCCESS: 'PRINT_GET_SUCCESS',
}

// rostercontact, bankaccount, 
export const FACELESS =  constMaker("FACELESS")
// {
//     FACELESS_SUCCESS: 'FACELESS_CREATE_SUCCESS',
//     FACELESS_FAILURE: 'CATEGORY_CREATE_FAILURE',

//     UPDATE_SUCCESS: 'FACELESS_UPDATE_SUCCESS',
//     UPDATE_FAILURE: 'FACELESS_UPDATE_FAILURE',

//     GET: 'FACELESS_GET',
//     GET_SUCCESS: 'FACELESS_GET_SUCCESS',
//     GETBYSEARCH_SUCCESS: 'FACELESS_GETBYSEARCH_SUCCESS',
//     GETDROPDOWN_SUCCESS: 'FACELESS_GETDROPDOWN_SUCCESS',   

//     DELETE_SUCCESS: 'FACELESS_DELETE_SUCCESS',
//     DELETE_FAILURE: 'FACELESS_DELETE_FAILURE'    
// }