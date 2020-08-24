import React from 'react'


export const ICONS = {

    BULLET: (className) => <i className={`fa fa-angle-right icons ${className}`}></i>, 
    DELETE: (className) => <i className={`cui-trash icons ${className}`}></i>,
    EDIT: (className) => <i className={`cui-settings icons ${className}`}></i>,
    ADD: (className) => <i className={`icon-plus icons ${className}`}></i>,
    SEARCH: (className) => <i className={`cui-search icons ${className}`}></i>,
    CHECK: (className) => <i className={`cui-check icons ${className}`}></i>,
    REFRESH: (className) => <i className={`fa fa-refresh icons ${className}`}></i>,
    TRUE: (className) => <i className={`fa fa-check icons ${className}`}></i>,
    FALSE: (className) => <i className={`fa fa-times-circle icons ${className}`}></i>,
    PICK: (className) => <i className={`icon-list icons ${className}`}></i>,
    TREE: (className) => <i className={`icon-share icons ${className}`}></i>,
    IMAGE: (className) => <i className={`icon-picture icons ${className}`}></i>,
    LIST: (className) => <i className={`icon-list icons ${className}`}></i>,
    HISTORY: (className) => <i className={`icon-book-open icons ${className}`}></i>,
    COPY: (className) => <i className={`fa fa-copy icons ${className}`}></i>,
    PASTE: (className) => <i className={`fa fa-paste icons ${className}`}></i>,
    PRINT:(className) => <i className={`fa fa-print icons ${className}`}></i>,
    CANCEL:(className) => <i className={`fa cui-action-undo icons ${className}`}></i>,
    PENCIL:(className) => <i className={`fa cui-pencil  icons ${className}`}></i>,
    SAVE:(className) => <i className={`fa fa-save icons ${className}`}></i>,

   
    


    MONEY:(className) => <i className={`fa fa-money icons ${className}`}></i>,
    SHOPPING:(className) => <i className={`fa fa-shopping-bag icons ${className}`}></i>,

    DOWNLOAD:(className) => <i className={`fa fa-download icons ${className}`}></i>,
    
    ACTIVE: (className) => <i className={`cui-settings icons ${className}`}></i>,
  }