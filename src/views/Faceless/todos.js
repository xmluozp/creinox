// import React from "react";

// import _ from "lodash";
// // import { format } from 'date-fns'
// import TextField from "@material-ui/core/TextField";

// //------redux
// import { connect } from "react-redux";
// import { ICONS } from "../../_constants";
// import { h_confirm } from "../../_helper";
// import { CreinoxTable } from "../../components";
// import {withDatatableStore} from "../../components";

// // ******************************************************************* page setting
// import { userActions as dataActions, alertActions } from "../../_actions";
// import { userModel as dataModel } from "../../_dataModel";

// const TABLETITLE = "用户列表";
// const EDITURL = "/users/user";
// const CREATEURL = "/users/user";

// // inject data
// const MyTable = withDatatableStore(
//   CreinoxTable,               // tablecomponent
//   { data: "userData" },       // data source
//   dataActions.get_bySearch    // fetch action
// );
// // ******************************************************************* page setting


// /**
//  * Basic page for list
//  * @param {} param0
//  */
// const CurrentPage = ({ onDelete, onAlertNotify }) => {

//   // ============================================= handles
//   const handleOnDelete = (pagination, id) => {
//     h_confirm("是否删除？").then(resolve => {
//       if (resolve) onDelete(pagination, id);
//     });
//   };
//   const handleSelectAction = list => {
//     onAlertNotify(`选中了 ${list.join(",")}`);
//   };

//   const selectBox = {
//     icon: ICONS.ACTIVE(),
//     title: "批量启用",
//     onAction: handleSelectAction
//   };

//   // ============================================= render cell
//   const renderOnShowRole = (content, row) => {
//     return `[${row.role_id}] ${content}`;
//   };
//   const renderOnShowMemo = content => {
//     return <span title={content}>{_.truncate(content, { length: 10 })}</span>;
//   };

//   const headCells = [
//     { name: "id", disablePadding: true, className: "ml-2" },
//     { name: "role_id", onShow: renderOnShowRole },
//     { name: "userName" },
//     { name: "fullName" },
//     { name: "ip" },
//     { name: "lastLogin" },
//     { name: "memo", onShow: renderOnShowMemo },
//     {
//       name: "isActive",
//       align: "center",
//       label: "状态",
//       className: { true: "text-success", false: "text-danger" },
//       lookup: { true: ICONS.TRUE("mr-4"), false: ICONS.FALSE("mr-4") }
//     }
//   ];

//   // ============================================= Table Settings
//   const rowButtons = [
//     { label: "修改", color: "primary", url: EDITURL, icon: ICONS.EDIT("mr-1") },
//     {
//       label: "删除",
//       color: "danger",
//       onClick: handleOnDelete,
//       icon: ICONS.DELETE()
//     }
//   ];

//   const toolbarButtons = [
//     { label: "Create", url: CREATEURL, color: "success", icon: ICONS.ADD() }
//   ];

//   // ============================================= Render
//   return (
//     <>
//       <MyTable
//         tableTitle={TABLETITLE}
//         headCells={headCells}
//         dataModel={dataModel}
//         rowButtons={rowButtons}
//         toolbarButtons={toolbarButtons}
//         searchBar={searchBar}
//         selectBox={selectBox}
//       />
//     </>
//   );
// };

// // ============================================= Search Panel
// // 搜索框
// const searchBar = (
//   <>
//     <TextField autoFocus margin="dense" id="userName" type="text" inputid= "userName" />
//     <TextField margin="dense" id="fullName" type="text" inputid= "fullName"/>
//   </>
// );

// // ============================================= propTypes

// // ============================================= Redux
// const actionCreators = {
//   onDelete: dataActions._delete,
//   onAlertNotify: alertActions.dispatchNotify
// };

// export default connect(null, actionCreators)(CurrentPage);
