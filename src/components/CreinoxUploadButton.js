import React, { useState } from "react";
import { Button } from "reactstrap";
import { DropzoneDialog } from "material-ui-dropzone";

import { ICONS } from "../_constants";

export const CreinoxUploadButton = ({
  filesLimit = 10,
  onSave = () => {}, // 在外部处理。规范：如果是批量保存，直接保存。如果是单图，显示预览
  className,
  label,
  ...props
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = status => {
    setIsModalOpen(status);
  };

  const handleOnSave = files => {
    onSave(files);
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        className={`${className} btn btn-md btn-success`}
        onClick={handleModalOpen.bind(null, true)}
        {...props}
      >
        {ICONS.ADD("mr-1")}上传{label}
      </Button>
      <DropzoneDialog
        fullWidth
        open={isModalOpen}
        onSave={handleOnSave}
        acceptedFiles={["image/*"]}
        showPreviews={true}
        filesLimit={filesLimit}
        showFileNames
        dropzoneText={`把图片拖入，或者单击后选择(最多${filesLimit}张, 最大5mb)`}
        maxFileSize={5000000}
        dialogTitle="上传图片"
        onClose={handleModalOpen.bind(null, false)}
        cancelButtonText="取消"
        submitButtonText="保存"
      />
    </>
  );
};
