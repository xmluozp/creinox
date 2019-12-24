import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { withCreinoxForm } from "./index";

export const MyModalForm = ({
  isOpen,
  title = "",
  onClose,
  rowButtons = [],
  className,
  component,
  FormWrapper = () => null
}) => {
  const pageId = 0;

  return (
    <Modal isOpen={isOpen} toggle={onClose} className={"modal-lg " + className}>
      <ModalHeader toggle={onClose}>{title}</ModalHeader>
      {!component ? (
        <FormWrapper />
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

  const FormWrapper = () => {

    const childrenInputs = (<><ModalBody>{componentInputs()}</ModalBody>
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
    </ModalFooter></>)

    const CreinoxForm = withCreinoxForm({
      dataModel:dataModel,
      childrenInputs:childrenInputs
    })

    return (
      <CreinoxForm
        defaultValues={rowId && dataById && { ...dataById.row }}
        errors={errorById}
        isFromEdit={isFromEdit}
        actionSubmit={onSubmit}/>
    );
  };

  return (
    <MyModalForm
      isOpen={isOpen}
      onClose={onClose}
      rowButtons={[]}
      title={title}
      FormWrapper={FormWrapper}
    />
  );
};
