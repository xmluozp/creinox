// import React from "react";

// // import _ from "lodash";
// // import { format } from 'date-fns'
// // import TextField from "@material-ui/core/TextField";

// //------redux
// import { connect } from "react-redux";

// import { ICONS, enums } from "_constants";
// import { h_confirm, history } from "_helper";
// import {
//   CreinoxTable,
//   Inputs,
//   // TabVertical, // 第三级菜单用
//   withDatatableStore
// } from "components";

// // ******************************************************************* page setting
// import { sellcontractActions as dataActions } from "_actions";
// import { sellcontractModel as dataModel } from "_dataModel";

// // ******************************************************************* page setting

// export const withSellcontractList = (
//   EDITURL = "/contract/sellcontracts",
//   CREATEURL = "/contract/sellcontracts/add"
// ) => {
  
//   // inject data
//   const MyTable = withDatatableStore(
//     CreinoxTable, // tablecomponent
//     { data: "sellcontractData" }, // data source
//     dataActions.get_bySearch // fetch action
//   );

//   // =============================== render cell
//   const headCells = [
//     { name: "id", disablePadding: true, className: "ml-2" },
//     { name: "code" },
//     { name: "activeAt" },
//     { name: "deliverAt" },
//     { name: "buyer_company_id" },
//     { name: "totalPrice"},
//     { name: "follower_id" },
//   ];

//   // =============================== Search Panel
//   const searchBar = (
//     <>
//     <Inputs.MyInput  inputid="code"/>
//     <Inputs.MyDateRangePicker inputid="activeAt" />
//     <Inputs.MyInput  inputid="ename"/>
//     <Inputs.MyComboboxFK
//         inputid="buyer_company_id"
//         label="外贸客户"
//         optionLabel="name"
//         tableName="company"
//         stateName="dropdown_overseasCustomer"
//         preConditions={{ companyType: enums.companyType.overseasCustomer }}
//       />
//     <Inputs.MyComboboxFK
//       inputid="follower_id"
//       optionLabel="userName"
//       tableName="user"/>   
//     </>
//   );

//   // **************************************************************************************************
//   // **************************************************************************************************
//   // ====================================== Component Render ==========================================
//   // **************************************************************************************************
//   // **************************************************************************************************

//   const CurrentPage = ({ onDelete, pageName }) => {
//     // ============================================= handles
//     const handleOnDelete = (id, row, pagination, searchTerms) => {
//       h_confirm("是否删除？").then(resolve => {
//         if (resolve) onDelete(id, pagination, searchTerms);
//       });
//     };

//     const handleOnEdit = (id) => {
//       history.push(`${EDITURL}/${id}`);
//     };

//     // ============================================= Table Settings
//     const rowButtons = [
//       {
//         label: "详情",
//         color: "primary",
//         url: EDITURL,
//         icon: ICONS.EDIT("mr-1")
//       },
//       {
//         label: "删除",
//         color: "danger",
//         onClick: handleOnDelete,
//         icon: ICONS.DELETE()
//       }
//     ];

//     const toolbarButtons = [
//       { label: "Create", url: CREATEURL, color: "success", icon: ICONS.ADD() }
//     ];

//     // ============================================= Render
//     return (
//       <MyTable
//         onRowDbClick={handleOnEdit}
//         tableTitle={pageName}
//         headCells={headCells}
//         dataModel={dataModel}
//         rowButtons={rowButtons}
//         toolbarButtons={toolbarButtons}
//         searchBar={searchBar}
//       />
//     );
//   };

//   // ============================================= propTypes

//   // ============================================= Redux
//   const actionCreators = {
//     onDelete: dataActions._delete
//   };

//   return connect(null, actionCreators)(CurrentPage);
// };

// export default withSellcontractList();
