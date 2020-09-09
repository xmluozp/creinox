import React, {useState, useEffect} from "react";

import _ from "lodash";
// import { format } from 'date-fns'
// import TextField from "@material-ui/core/TextField";

//------redux
import { connect } from "react-redux";
import { ICONS, enumsLabel } from "_constants";
import { h_confirm, history } from "_helper";
import { CreinoxTable,Inputs, withDatatableStore } from "components";

// ******************************************************************* page setting
import { financialaccountActions as dataActions } from "_actions";
import { financialaccountModel as dataModel } from "_dataModel";

const DATASTORE = "financialaccountData";
const EDITURL = "/financial/financialtransactions"


export const withTablePage = () => {
  // inject data
  const MyTable = withDatatableStore(
    CreinoxTable, // tablecomponent
    { data: DATASTORE }, // data source
    dataActions.get_bySearch // fetch action
  );

  // ============================================= render cell

  const headCells = [
    { name: "id", disablePadding: true, className: "ml-2" },
    { name: "name" },
    { name: "originBalance" },
    { name: "balance" },
    { name: "currency_id" },
    { name: "memo" }
  ];

  // ============================================= Search Panel
  // 搜索框
  const searchBar = (
    <>
      <Inputs.MyInput inputid="name" />      
    </>
  );
  // ******************************************************************* page setting

  // **************************************************************************************************
  // **************************************************************************************************
  // ====================================== Component Render ==========================================
  // **************************************************************************************************
  // **************************************************************************************************

  /**
   * Basic page for list
   * @param {} param0
   */
  const CurrentPage = ({ onDelete, pageName, ...props }) => {

    const accountType = parseInt(_.get(props, "match.params.where")) || 0;
    const preConditions = {accountType: accountType }




    // 切换的时候刷新
    const [toggle, setToggle] = useState(false);
    useEffect(() => {  
      setToggle(prev => !prev)
    }, [accountType])

    // ============================================= handles
    // const handleOnDelete = (id, row, pagination, searchTerms) => {
    //   h_confirm("是否删除？").then(resolve => {
    //     if (resolve) onDelete(id, pagination, searchTerms);
    //   });
    // };

    const handleOnEdit = (id) => {
      history.push(`${EDITURL}/${id}`);
    };

    // ============================================= Table Settings
    const rowButtons = [
      {
        label: "转账记录",
        color: "primary",
        url: EDITURL,
        icon: ICONS.EDIT("mr-1")
      }
    ];

    // ============================================= Render
    return (
      <>
        <MyTable
        {...props}
          onRowDbClick={handleOnEdit}
          tableTitle={enumsLabel.accountType[accountType]}
          preConditions={preConditions}
          toggle = {toggle}
          headCells={headCells}
          dataModel={dataModel}
          rowButtons={rowButtons}
          searchBar={searchBar}
        />
      </>
    );
  };

  // ============================================= propTypes

  // ============================================= Redux
  const actionCreators = {
    onDelete: dataActions._delete
    // onAlertNotify: alertActions.dispatchNotify
  };

  return connect(null, actionCreators)(CurrentPage);
};

export default withTablePage();
