import React, { useState, useRef } from "react";
import TextField from "@material-ui/core/TextField";
import _ from "lodash";
import InputAdornment from "@material-ui/core/InputAdornment";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { ICONS } from "../../_constants";

import { MyModalForm } from "../Modal";

import { texttemplateActions as dataActions} from "../../_actions";

// 基本的按钮，负责modal弹出
const InputTT = React.memo(
  ({
    id,
    value,
    templateName,
    label = "输入",
    onChange = () => {}, //
    onSelect = () => {},
    error = false,
    helperText = "",
    fullWidth = true,
    disabled = false,
    prefix,
    columnName= id,
    data,
    dataModeltableName,
    onGetBySearch, // 第一次打开获取数据
    onPostCreate,
    onPutUpdate,
    onDelete
  }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const inputRef = useRef(null);

    const targetTable = prefix || dataModeltableName
    // 读取对应的模板
    // useEffect(() => {
    //   if (!data) {

    //   }
    //   return () => {};
    // }, [data, value]);

    // 关闭弹出窗口
    const handleModalClose = () => {
      setIsModalOpen(false);
    };
    const handleModalOpen = () => {
      if (!disabled) {
        // searchTerms: 表格，columnName
        onGetBySearch({}, {targetTable, columnName});
        setIsModalOpen(true);
      }
    };
    const handleOnSelect = selectedText => {
      if (selectedText && typeof onChange === "function") {

        onChange(null, id, selectedText);
        handleModalClose();

      }
    };
    const handleOnSave = (selectedId, selectedText) => {
        if (selectedText) {
          onPutUpdate({
              targetTable,
              columnName,
              id: selectedId, 
              content: selectedText
            }, () => {
                onGetBySearch({}, {targetTable, columnName});
                // handleModalClose();
            })
        }
    };

    const handleOnCreate = (selectedText) => {
        if (targetTable) {
            onPostCreate({
                name: targetTable +"/" + label,
                targetTable,
                columnName,
                content: selectedText
            }, () => {
                onGetBySearch({}, {targetTable, columnName});
            })            
        }
    }

    const handleOnDelete = (selectedId) => {
        if (selectedId) {
          onDelete(selectedId, {}, {targetTable, columnName})
        }
    };

    // console.log("data:", data)
    const dataRows = data && data.rows

    //
    const PopupModal = (
      <div>
        {dataRows &&
          dataRows.length > 0 &&
          dataRows.map((item, index) => {
            return <InputLine
                key={item.id} 
                item = {item}
                onSelect = {handleOnSelect}
                onSave = {handleOnSave}
                onDelete = {handleOnDelete}
            />;
          })}
        {/* 读取列表, textarea和选择，保存，删除按钮。 */}
        {/* 新增按钮，点击增加一行，保存后重新读取 */}
        <Button
            color="default"
            type="button"
            variant="contained"
            onClick={handleOnCreate.bind(null, "")}>
          加一条
        </Button>
      </div>
    );

    return (
      <>
        <MyModalForm
          isOpen={isModalOpen}
          title={label}
          onClose={handleModalClose}
          component={PopupModal}
        />
        <TextField
          fullWidth={fullWidth}
          error={!disabled && error}
          disabled={disabled}
          id={id}
          label={label}
          margin="dense"
          value={value || ""}
          onChange={onChange}
          inputRef={inputRef}
          helperText={!disabled && helperText}
          InputProps={{
            endAdornment: (
              
              <InputAdornment position="end" onClick={handleModalOpen}>
                {ICONS.PICK()}
              </InputAdornment>
            )
          }}
        />
      </>
    );
  }
);

function mapState(state) {
  return {
    data: state.texttemplateData.data
  };
}

const actionCreators = {
  onGetBySearch: dataActions.get_bySearch_template,
  onDelete: dataActions._delete,
  onPostCreate: dataActions.post_create,
  onPutUpdate: dataActions.put_update
};

export const MyInputTT = connect(mapState, actionCreators)(InputTT);


const InputLine = ({
    item,
    onSelect,
    onSave,
    onDelete
}) => {

    const inputRef = useRef(null)
    const handleOnSelect = () => {
        onSelect(inputRef.current.value)
    }
    const handleOnSave = () => {
        onSave(item.id, inputRef.current.value)
    }
    const handleOnDelete = () => {
        onDelete(item.id)
    }




    return (
    <Grid container spacing={2}>
        <Grid item lg={8} md={8} xs={12}>
          <TextField
            fullWidth={true}
            id={item.name + item.id}
            type={"text"}
            inputRef = {inputRef}
            defaultValue = {item.content || ""}
            margin="dense"
            multiline={true}
            rows={2}
            rowsMax={5}
          />
        </Grid>
        <Grid key={item.id} item lg={4} md={4} xs={12}>
          <Button
            color="default"
            type="button"
            variant="contained"
            onClick={handleOnSelect}
          >选择
          </Button>
          <Button
            color="default"
            type="button"
            variant="contained"
            onClick={handleOnSave}
          >保存
          </Button>
          <Button
            color="default"
            type="button"
            variant="contained"
            onClick={handleOnDelete}
          >删除
          </Button>
        </Grid>
      </Grid>)
}