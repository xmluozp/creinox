import React, { useState, useRef, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import ButtonOL from "@material-ui/core/Button";

import { Button } from "reactstrap";

import _ from "lodash";
import { connect } from "react-redux";
import { ICONS } from "../../_constants";
import { h_confirm } from "_helper";
import { MyModalForm } from "../Modal";

import { texttemplateActions as dataActions } from "../../_actions";

// 基本的按钮，负责modal弹出
const InputTT = React.memo(
  ({
    id,
    value,
    templateName,
    label = "输入",
    onChange = () => {}, //
    onSelect = () => {},
    onLoaded = () => {},
    error = false,
    helperText = "",
    fullWidth = true,
    disabled = false,
    prefix,
    columnName = id,
    data,
    dataModeltableName,
    onGetBySearch, // 第一次打开获取数据
    onPostCreate,
    onPutUpdate,
    onDelete,
  }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [addLine, setaddLine] = useState([]);

    const inputRef = useRef(null);

    const targetTable = prefix || dataModeltableName;
    // 读取对应的模板
    // useEffect(() => {
    //   if (!data) {

    //   }
    //   return () => {};
    // }, [data, value]);

    // 通知外部组件，数据加载完成
    useEffect(() => {
      onLoaded(id);
    }, []);

    // 关闭弹出窗口
    const handleModalClose = () => {
      setIsModalOpen(false);
    };
    const handleModalOpen = () => {
      if (!disabled) {
        // searchTerms: 表格，columnName
        onGetBySearch({}, { targetTable, columnName });
        setIsModalOpen(true);
      }
    };

    const handleOnSelect = (selectedText) => {
      if (selectedText && typeof onChange === "function") {
        onChange(null, id, selectedText);
        handleModalClose();
      }
    };
    const handleOnSave = (selectedId, selectedText) => {
      // 没有内容不保存
      if (selectedText === "") return;

      // 如果有id就是保存，没有就是新建
      if (selectedId) {
        onPutUpdate(
          {
            targetTable,
            columnName,
            id: selectedId,
            content: selectedText,
          },
          () => {
            onGetBySearch({}, { targetTable, columnName });
            // handleModalClose();
          }
        );
      } else {
        handleOnCreate(selectedText);
        setaddLine([]);
      }
    };

    const handleOnCreate = (selectedText) => {
      if (targetTable) {
        onPostCreate(
          {
            name: targetTable + "/" + label,
            targetTable,
            columnName,
            content: selectedText,
          },
          () => {
            onGetBySearch({}, { targetTable, columnName });
          }
        );
      }
    };

    const handleOnDelete = (selectedId) => {
      if (selectedId) {
        onDelete(selectedId, {}, { targetTable, columnName });
      }
    };

    // ============== 本页操作
    const handleOnAddLine = () => {
      setaddLine([
        {
          id: 0,
          content: "",
          name: "",
        },
      ]);
    };

    const handleOnCancel = (selectedId) => {
      // 新增的时候点取消
      if (!selectedId) {
        setaddLine([]);
      }
    };

    // console.log("data:", data)
    const dataRows = data && data.rows ? data.rows : [];

    // 包括新增行
    const displayRows = [...addLine, ...dataRows];

    //
    const PopupModal = (
      <div>
        {/* 新增按钮，点击增加一行，保存后重新读取 */}

        {addLine.length === 0 ? (
          <Box mb={2} mt={0}>
            <Grid container>
              <Grid item lg={6} md={6} xs={12}>
                <h5 style={{ color: "rgb(193 195 165)" }}>
                  点击文字选择：
                </h5>
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <Box display="flex" justifyContent="flex-end">
                  <ButtonOL
                    color="default"
                    type="button"
                    variant="outlined"
                    onClick={handleOnAddLine}
                  >
                    {ICONS.ADD("mr-2")}
                    加一条选项
                  </ButtonOL>
                </Box>
              </Grid>
            </Grid>
          </Box>
        ) : null}

        {displayRows.length > 0 &&
          displayRows.map((item, index) => {
            return (
              <InputLine
                key={item.id}
                item={item}
                onSelect={handleOnSelect}
                onSave={handleOnSave}
                onDelete={handleOnDelete}
                onCancel={handleOnCancel}
              />
            );
          })}
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
          multiline={true}
          rows={1}
          rowsMax={10}
          helperText={!disabled && helperText}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" onClick={handleModalOpen}>
                <IconButton size="small" disabled={disabled}>
                  {ICONS.PICK()}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </>
    );
  }
);

function mapState(state) {
  return {
    data: state.texttemplateData.data,
  };
}

const actionCreators = {
  onGetBySearch: dataActions.get_bySearch_template,
  onDelete: dataActions._delete,
  onPostCreate: dataActions.post_create,
  onPutUpdate: dataActions.put_update,
};

export const MyInputTT = connect(mapState, actionCreators)(InputTT);

const InputLine = ({ item, onSelect, onSave, onDelete, onCancel }) => {
  // const inputRef = useRef(null);

  const [isEdit, setisEdit] = useState(false);
  const [defaultValue, setdefaultValue] = useState(item.content);
  const [currentValue, setcurrentValue] = useState(item.content);
  const [isMouseOver, setisMouseOver] = useState(false);

  // 可编辑状态： 编辑中，或者是没有id的新增时
  const editAble = (isEdit && item.id) || !item.id;

  const handleOnChange = (e) => {
    setcurrentValue(e.target.value);
  };

  const handleOnSelect = (e) => {
    if (!editAble) {
      e.stopPropagation();
      onSelect(currentValue);
    }
  };
  const handleOnSave = () => {
    setisEdit(false);
    onSave(item.id, currentValue);
  };
  const handleOnDelete = () => {
    h_confirm("是否删除？").then((resolve) => {
      if (resolve) onDelete(item.id);
    });
  };

  const handleOnCancel = () => {
    setisEdit(false);
    setcurrentValue(defaultValue);
    onCancel(item.id);
  };

  // useEffect(() => {}, []);

  // 如果item没有id，就是新建行。只有“保存”和“取消”
  return (
    <Grid container spacing={2}>
      <Grid item lg={9} md={9} xs={12}
          onMouseOver={setisMouseOver.bind(null, true)}
          onMouseOut={setisMouseOver.bind(null, false)}     
      >
        <TextField
          fullWidth={true}
          id={item.name + item.id}
          type="text"
          disabled={!editAble}
          value={currentValue}
          onClick={handleOnSelect}
          onChange={handleOnChange}
          multiline={true}
          rows={1}
          rowsMax={5}
          inputProps={
            editAble
              ? {}
              : {
                  style: { cursor: "pointer" },
                }
          }
          InputProps={
            isMouseOver && !editAble
              ? {
                  startAdornment: (
                    <InputAdornment position="start">
                      {ICONS.TRUE("ml-2 text-success")}
                    </InputAdornment>
                  ),
                }
              : {
                  startAdornment: (
                    <InputAdornment position="start">
                      {ICONS.BULLET("ml-2 text-secondary")}
                    </InputAdornment>
                  ),
                }
          }
        />
      </Grid>
      <Grid key={item.id} item lg={3} md={3} xs={12}>
        <Box display="flex" justifyContent="flex-end">
          {!editAble ? (
            <>
              <Button
                style={{ margin: "0px 0px 0px 3px" }}
                className={`btn btn-md btn-warning`}
                type="button"
                onClick={setisEdit.bind(null, true)}
              >
                {ICONS.PENCIL("mr-1")}
                修改
              </Button>
              <Button
                style={{ margin: "0px 0px 0px 3px" }}
                className={`btn btn-md btn-danger`}
                type="button"
                onClick={handleOnDelete}
              >
                {ICONS.DELETE("mr-1")}
                删除
              </Button>
            </>
          ) : (
            <>
              <Button
                style={{ margin: "0px 0px 0px 3px" }}
                className={`btn btn-md btn-secondary`}
                type="button"
                onClick={handleOnCancel}
              >
                {ICONS.CANCEL("mr-1")}
                取消
              </Button>
              <Button
                style={{ margin: "0px 0px 0px 3px" }}
                className={`btn btn-md btn-success`}
                type="button"
                onClick={handleOnSave}
              >
                {ICONS.SAVE("mr-1")}
                保存
              </Button>
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};
