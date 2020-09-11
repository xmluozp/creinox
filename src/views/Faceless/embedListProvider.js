import React, { useState } from "react";

//------redux
import { connect } from "react-redux";

import { ICONS } from "_constants";
import { h_confirm } from "_helper";

import {
  MyModalFormWithData,
  CreinoxTable,
  withDatatableStore
} from "components";

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
    onClear,
    errorById,
    dataById,
    rowButtons = [],
    modalFormCreateProps = {},
    modalFormEditProps = {},
    modalInputCreateProps = {},
    modalInputEditProps = {},
    onUpdate, // 任何修改的时候触发
    isBorder = false,
    onFilterSubmit, // 提交之前过滤用(比如图片没改动，就不提交)
    disabled = false,
    ...props
  }) => {
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
    const [currentPagination, setcurrentPagination] = useState()

    const [selectedRowId, setSelectedRowId] = useState();

    // ============================================= handles
    const handleOnDelete = (id, row, pagination, searchTerms) => {
      h_confirm("是否删除？").then(resolve => {
        if (resolve) onDelete(id, pagination, searchTerms, () => {
          if(typeof(onUpdate) === 'function') {onUpdate()}
        });
      });
    };

    // 打开关闭创建框
    const handleOnCreateOpen = pagination => {
      // 刷新的时候会用到
      setcurrentPagination(pagination)
      setIsModalCreateOpen(true);
    };

    const handleOnCreateClose = e => {
      setIsModalCreateOpen(false);
    };

    // 打开关闭编辑框
    const handleOnEditOpen = (id, row, pagination) => {
      // 刷新的时候会用到
      setcurrentPagination(pagination)
      setIsModalEditOpen(true);
      setSelectedRowId(id);
    };

    const handleOnEditClose = e => {
      setIsModalEditOpen(false);
    };

    const handleOnEditSubmit = values => {

      if(typeof(onFilterSubmit) ==='function') {
        // values, isFromEdit
        values = onFilterSubmit(values, true)
      }

      onPutUpdate({ ...preConditions, ...values }, () => {
        onGetBySearch(currentPagination, preConditions);
        if(typeof(onUpdate) === 'function') {onUpdate()}
        handleOnEditClose();
      });
    };

    const handleOnCreateSubmit = values => {

      if(typeof(onFilterSubmit) ==='function') {
        // values, isFromEdit
        values = onFilterSubmit(values, false)
      }

      onPostCreate({ ...preConditions, ...values }, () => {
        onGetBySearch(currentPagination, preConditions);
        if(typeof(onUpdate) === 'function') {onUpdate()}
        handleOnCreateClose();
      });
    };

    // ============================================= Table Settings
    const embedRowButtons = [
      {
        label: "详情",
        color: "primary",
        onClick: handleOnEditOpen,
        icon: ICONS.EDIT("mr-1")
      }
    ];

    if(!disabled) {
      embedRowButtons.push(
        {
          label: "删除",
          color: "danger",
          onClick: handleOnDelete,
          icon: ICONS.DELETE()
        }
      )
    }

    const toolbarButtons = !disabled && [
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
        {...props}
          tableTitle={pageName}
          headCells={headCells}
          dataModel={dataModel}
          preConditions={preConditions}
          rowButtons={[...rowButtons, ...embedRowButtons]}
          toolbarButtons={toolbarButtons}
          onRowDbClick={handleOnEditOpen}
          searchBar={searchBar}
          isBorder={isBorder}
        />

        <MyModalFormWithData
          disabled = {disabled}
          isOpen={isModalEditOpen}
          isFromEdit={true}
          dataModel={dataModel}
          onClose={handleOnEditClose}
          onSubmit={handleOnEditSubmit}
          rowId={selectedRowId}
          onGetById={onGetById}
          onClear={onClear}
          errorById={errorById}
          dataById={dataById}
          title={TITLE_EDIT}
          modalFormProps={modalFormEditProps}
          modalInputProps={modalInputEditProps}
          componentInputs={FormInputs}
        />

        {!disabled && <MyModalFormWithData
          isOpen={isModalCreateOpen}
          isFromEdit={false}
          dataModel={dataModel}
          onClose={handleOnCreateClose}
          onSubmit={handleOnCreateSubmit}
          rowId={null}
          onGetById={onGetById}
          onClear={onClear}
          errorById={errorById}
          title={TITLE_CREATE}
          modalFormProps={modalFormCreateProps}
          modalInputProps={modalInputCreateProps}
          componentInputs={FormInputs}
        />}
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
    onClear: dataActions._clear,
    onPostCreate: dataActions.post_create,
    onPutUpdate: dataActions.put_update
  };

  return connect(mapState, actionCreators)(CurrentPage);
};
