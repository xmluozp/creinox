import React, { useState } from "react";

//------redux
import { connect } from "react-redux";

import { ICONS } from "../../_constants";
import { h_confirm } from "../../_helper";

import {
  MyModalFormWithData,
  CreinoxTable,
  withDatatableStore
} from "../../components";

export const embedListProvider = (
  dataActions,
  dataModel,
  DATA_STORE,
  TITLE_EDIT,
  TITLE_CREATE,
  FormInputs,
  headCells,
  searchBar
) => {
  // inject data
  const MyTable = withDatatableStore(
    CreinoxTable, // tablecomponent
    { data: DATA_STORE }, // data source
    dataActions.get_bySearch // fetch action
  );

  // ******************************************************************* Component
  const CurrentPage = ({
    onDelete,
    pageName,
    preConditions,
    onGetBySearch,
    onPostCreate,
    onPutUpdate,
    onGetById,
    errorById,
    dataById
  }) => {
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

    const [selectedRowId, setSelectedRowId] = useState();

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
      setSelectedRowId(id);
    };

    const handleOnEditClose = e => {
      setIsModalEditOpen(false);
    };

    const handleOnEditSubmit = values => {
      onPostCreate({ ...preConditions, ...values });
      onGetBySearch({}, preConditions);
      handleOnEditClose();
    };

    const handleOnCreateSubmit = values => {
      onPutUpdate({ ...preConditions, ...values });
      onGetBySearch({}, preConditions);
      handleOnCreateClose();
    };

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
          onRowDbClick={handleOnEditOpen}
          searchBar={searchBar}
          isBorder={false}
        />

        <MyModalFormWithData
          isOpen={isModalEditOpen}
          isFromEdit={true}
          dataModel={dataModel}
          onClose={handleOnEditClose}
          onSubmit={handleOnEditSubmit}
          rowId={selectedRowId}
          onGetById={onGetById}
          errorById={errorById}
          dataById={dataById}
          title={TITLE_EDIT}
          componentInputs={FormInputs}
        />

        <MyModalFormWithData
          isOpen={isModalCreateOpen}
          isFromEdit={false}
          dataModel={dataModel}
          onClose={handleOnCreateClose}
          onSubmit={handleOnCreateSubmit}
          rowId={null}
          onGetById={onGetById}
          errorById={errorById}
          title={TITLE_CREATE}
          componentInputs={FormInputs}
        />
      </>
    );
  };

  // ============================================= propTypes

  // ============================================= Redux
  function mapState(state) {
    const dataById = state[DATA_STORE].dataById;
    const errorById = state[DATA_STORE].errorById;
    return {
      dataById: dataById,
      errorById: errorById
    };
  }

  const actionCreators = {
    onDelete: dataActions._delete,
    onGetBySearch: dataActions.get_bySearch,
    onGetById: dataActions.get_byId,
    onPostCreate: dataActions.post_create,
    onPutUpdate: dataActions.put_update
  };

  return connect(mapState, actionCreators)(CurrentPage);
};
