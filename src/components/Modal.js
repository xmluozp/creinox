import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { CreinoxForm } from "./index";

export const MyModalForm = ({
  isOpen,
  title = "",
  onClose,
  rowButtons = [],
  className,
  component,
  ...props
}) => {
  const pageId = 0;
  return (
    <Modal isOpen={isOpen} toggle={onClose} className={"modal-lg " + className}>
      <ModalHeader toggle={onClose}>{title}</ModalHeader>
      {!component ? (
        <>
          {props.children}
        </>
      ) : (
        <>
          <ModalBody>{component}</ModalBody>
          <ModalFooter>
            {rowButtons.map((buttonObj, index) => (
              <ActionButton
                key={`button_${pageId}_${index}`}
                {...buttonObj}
                id={pageId}
              />
            ))}
          </ModalFooter>
        </>
      )}
    </Modal>
  );
};

const ActionButton = ({ id, label, onClick, color, url, icon }) => {
  let returnValue = label;
  if (url) {
    returnValue = (
      <Link
        to={`${url}/${id}`}
        className={`btn btn-sm btn-${color}`}
        role="button"
        style={{ margin: "0px 0px 0px 3px" }}
        aria-pressed="true"
      >
        {icon}
        {label}
      </Link>
    );
  } else {
    const propsOnClick =
      typeof onClick === "function" ? onClick.bind(null, id) : null;

    returnValue = (
      <Button
        style={{ margin: "0px 0px 0px 3px" }}
        className={`btn btn-sm btn-${color}`}
        onClick={propsOnClick}
      >
        {" "}
        {icon}
        {label}
      </Button>
    );
  }

  return returnValue;
};

export const MyModalFormWithData = ({
  isOpen,
  onClose,
  onSubmit,
  isFromEdit,
  title,
  rowId = null,
  componentInputs,
  modalFormProps = {},
  modalInputProps = {},

  // redux
  dataModel,
  onGetById,
  errorById,
  dataById
}) => {
  // 如果是编辑框，打开的时候读数据
  useEffect(() => {
    if (isFromEdit && isOpen && rowId) {
      onGetById(rowId);
    }
  }, [onGetById, isOpen, isFromEdit]);

  return (
    <MyModalForm
      isOpen={isOpen}
      onClose={onClose}
      rowButtons={[]}
      title={title}
    >
      <CreinoxForm
        defaultValues={rowId && dataById && { ...dataById.row }}
        errors={errorById}
        isFromEdit={isFromEdit}
        actionSubmit={onSubmit}
        dataModel={dataModel}
        {...modalFormProps}
      >
        <ModalBody>{componentInputs(modalInputProps)}</ModalBody>
        <ModalFooter>
          <Button
            type="button"
            onClick={onClose}
            variant="contained"
            color="secondary"
          >
            取消
          </Button>
          <Button type="submit" variant="contained" color="primary">
            保存
          </Button>
        </ModalFooter>
      </CreinoxForm>
    </MyModalForm>
  );
};
