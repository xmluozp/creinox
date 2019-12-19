import React, { useState } from "react";

// import _ from "lodash";

//------redux
import { connect } from "react-redux";

import { ICONS } from "../../_constants";
import { h_confirm } from "../../_helper";
import { CreinoxTable, Inputs, withDatatableStore } from "../../components";

// ******************************************************************* page setting
import { rostercontactActions as dataActions} from "../../_actions";
import { rostercontactModel as dataModel } from "../../_dataModel";

import Contact from "./Contact";

// ******************************************************************* page setting

export const withContactList = () => {
  // inject data
  const MyTable = withDatatableStore(
    CreinoxTable, // tablecomponent
    { data: "rostercontactData" }, // data source
    dataActions.get_bySearch // fetch action
  );

  const CurrentPage = ({ onDelete, pageName, companyId, onGetBySearch, onPostCreate, onPutUpdate }) => {

    const preConditions = { company_id: companyId };

    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);


    
    const [selectedContactId, setSelectedContactId] = useState();

    // ============================================= handles
    const handleOnDelete = (pagination, id) => {
      h_confirm("是否删除？").then(resolve => {
        if (resolve) onDelete(pagination, id);
      });
    };

    // 打开关闭创建框
    const handleOnCreateOpen = pagination => {
        setIsModalCreateOpen(true);
    };

    const handleOnCreateClose = e => {
        setIsModalCreateOpen(false);
    };

    // 打开关闭编辑框
    const handleOnEditOpen = (pagination, id) => {
        setIsModalEditOpen(true);
        setSelectedContactId(id)
    };

    const handleOnEditClose = e => {
        setIsModalEditOpen(false);
    };

    const handleOnEditSubmit = values => {
        onPostCreate({...preConditions, ...values})
        onGetBySearch({}, preConditions);
        handleOnEditClose();
    }

    const handleOnCreateSubmit = values => {
        onPutUpdate({ ...preConditions, ...values });
        onGetBySearch({}, preConditions);
        handleOnCreateClose();
    }  


    // ============================================= render cell
    const headCells = [
      { name: "id", disablePadding: true, className: "ml-2" },
      { name: "fullName" },
      { name: "eFullName" },
      { name: "phone1" },
      { name: "phone2" },
      { name: "skype" },
      { name: "email" },
      { name: "wechat" },
      { name: "whatsapp" },
      { name: "facebook" }
    ];

    // ============================================= Table Settings
    const rowButtons = [
      {
        label: "修改",
        color: "primary",
        onClick: handleOnEditOpen,
        icon: ICONS.EDIT("mr-1")
      },
      {
        label: "删除",
        color: "danger",
        onClick: handleOnDelete,
        icon: ICONS.DELETE()
      }
    ];

    const toolbarButtons = [
      {
        label: "Create",
        onClick: handleOnCreateOpen,
        color: "success",
        icon: ICONS.ADD()
      }
    ];

    // ============================================= Render
    return (
      <>
        <MyTable
          tableTitle={pageName}
          headCells={headCells}
          dataModel={dataModel}
          preConditions={preConditions}
          rowButtons={rowButtons}
          toolbarButtons={toolbarButtons}
          onRowDbClick ={handleOnEditOpen}
          searchBar={searchBar}
          isBorder={false}
        />

        <Contact
          isOpen={isModalEditOpen}
          isFromEdit = {true}
          onClose={handleOnEditClose}
          onSubmit = {handleOnEditSubmit}
          selectedContactId={selectedContactId}
          title="编辑联系人"

        />

        <Contact
          isOpen={isModalCreateOpen}
          isFromEdit={false}
          onClose={handleOnCreateClose}
          onSubmit = {handleOnCreateSubmit}
          selectedContactId={null}
          title="创建联系人"
        />

      </>
    );
  };

  // ============================================= Search Panel
  // 搜索框
  const searchBar = (
    <>
      <Inputs.MyInput inputid="fullName" />
      <Inputs.MyInput inputid="eFullName" />
    </>
  );

  // ============================================= propTypes

  // ============================================= Redux

  const actionCreators = {
    onDelete: dataActions._delete,
    onGetBySearch: dataActions.get_bySearch,
    onPostCreate: dataActions.post_create,
    onPutUpdate: dataActions.put_update,

  };

  return connect(null, actionCreators)(CurrentPage);
};

export default withContactList();
