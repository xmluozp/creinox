import React, { useState, useEffect } from "react";
// import _ from "lodash";
// import formatCurrency from "format-currency";

import DateFnsUtils from "@date-io/date-fns";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { ICONS } from "../../_constants";
import Input from "@material-ui/core/Input";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { _DATATYPES } from "../../_constants";

import {
  MyCombobox,
  MyComboboxAsyncFK,
  MyComboboxCascade,
  MyComboboxFK,
  MySelect,
  MyComboboxPack,
  MyComboboxPolishing,
  MyComboboxTexture,
  MyComboboxUnitType,
  MyComboboxShippingType,
  MyComboboxPricingTerm,
  MyComboboxCurrency,
  MyComboboxPaymentType,
  MyComboboxCommission,
  MyComboboxExpressCompany,
} from "./MyCombobox";

import { MyImage } from "./MyImage";
import { MyInputTT } from "./MyInputTT";

import {
  MyRegionPicker,
  MyCategoryPicker,
  MyFinancialLedgerPicker,
} from "./MyPicker";

// ==================================================================================Date picker
const MyDatePicker = React.memo(
  ({
    id,
    label = "选择日期",
    value,
    onChange = () => {},
    fullWidth = true,
    disabled = false,
    onLoaded = () => {},
  }) => {
    // 通知外部组件，数据加载完成
    useEffect(() => {
      onLoaded(id);
    }, []);

    const handleOnChange = (timeString, timeObject) => {
      if (typeof onChange === "function") {
        const newValue =
          Object.prototype.toString.call(timeObject) === "[object Date]"
            ? new Date(timeObject).toISOString()
            : timeString;
        onChange(null, id, newValue);
      }
    };

    return (
      <MuiPickersUtilsProvider
        utils={DateFnsUtils}
        style={{ marginTop: "0px" }}
      >
        <KeyboardDatePicker
          fullWidth={fullWidth}
          disabled={disabled}
          margin="dense"
          id={id}
          label={label}
          format="yyyy/MM/dd"
          placeholder="格式如:2020/12/31"
          value={value || null}
          emptyLabel=""
          onChange={handleOnChange}
          KeyboardButtonProps={{
            "aria-label": "select date",
          }}
        />
      </MuiPickersUtilsProvider>
    );
  }
);

const MyDateTimePicker = React.memo(
  ({
    id,
    label = "选择日期",
    value,
    onChange = () => {},
    onLoaded = () => {},
    fullWidth = true,
    disabled = false,
  }) => {
    // 通知外部组件，数据加载完成
    useEffect(() => {
      onLoaded(id);
    }, []);

    const handleOnChange = (timeString, timeObject) => {
      if (typeof onChange === "function") {
        // onChange(null, id, new Date(timeObject).toISOString());
        const newValue =
          Object.prototype.toString.call(timeObject) === "[object Date]"
            ? new Date(timeObject).toISOString()
            : timeString;
        onChange(null, id, newValue);
      }
    };

    // new Date(value).toISOString()

    return (
      <MuiPickersUtilsProvider
        utils={DateFnsUtils}
        style={{ marginTop: "0px" }}
      >
        <KeyboardDateTimePicker
          fullWidth={fullWidth}
          disabled={disabled}
          margin="dense"
          id={id}
          label={label}
          format="yyyy/MM/dd HH:mm:ss"
          value={value || null}
          emptyLabel=""
          onChange={handleOnChange}
          KeyboardButtonProps={{
            "aria-label": "select date",
          }}
        />
      </MuiPickersUtilsProvider>
    );
  }
);

// ==================================================================================Date picker for range
const MyDateRangePicker = React.memo(
  ({
    id,
    label,
    value, // in case of endless loop, only used for default
    onChange,
    onLoaded = () => {},
    fullWidth = true,
    disabled = false,
  }) => {
    // divide two dates by ","
    // const getDateArray = combineDate => {
    //   if (combineDate) {
    //     const separateDate = combineDate.split(",");
    //     return separateDate;
    //   } else return [new Date(), new Date()];
    // };

    // first load get default values
    // const [startDate, setStartDate] = useState(getDateArray(value)[0]);
    // const [endDate, setEndDate] = useState(getDateArray(value)[1]);

    // changed: dont use default
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // 通知外部组件，数据加载完成
    useEffect(() => {
      onLoaded(id);
    }, []);

    // otherwise only submit
    const handleChangeStart = (timeString, timeObject) => {
      const newCombineDate = `${timeObject},${endDate}`;
      if (typeof onChange === "function") onChange(null, id, newCombineDate);
      setStartDate(timeObject);
    };
    const handleChangeEnd = (timeString, timeObject) => {
      const newCombineDate = `${startDate},${timeObject}`;
      if (typeof onChange === "function") onChange(null, id, newCombineDate);
      setEndDate(timeObject);
    };

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils} margin="dense">
        <Grid container>
          <Grid item xs={6}>
            <KeyboardDatePicker
              fullWidth={fullWidth}
              disabled={disabled}
              margin="dense"
              id={`${id}_start`}
              label={`${label || ""} 从`}
              format="yyyy/MM/dd"
              value={startDate}
              emptyLabel=""
              onChange={handleChangeStart}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <KeyboardDatePicker
              fullWidth={fullWidth}
              disabled={disabled}
              margin="dense"
              id={`${id}_end`}
              label="到"
              format="yyyy/MM/dd"
              value={endDate}
              emptyLabel=""
              onChange={handleChangeEnd}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Grid>
        </Grid>
      </MuiPickersUtilsProvider>
    );
  }
);

// ================================================================================== regular text
const MyInput = React.memo(
  ({
    id,
    label = "输入",
    value = "",
    onChange = () => {},
    onLoaded = () => {},
    onGetDefault,
    error = false,
    dataType = _DATATYPES.VARCHAR,
    helperText = "",
    fullWidth = true,
    disabled = false,
    multiline = false,
    isNumberNullable = false, // 如果是数字，放空的时候是null还是0
    rows,
    rowsMax = 5,
    buttons = [],
    InputProps
  }) => {
    // ============= 修饰显示格式
    let inputStyle = {};
    let displayValue = value;
    let isNumber = false;

    // 通知外部组件，数据加载完成
    useEffect(() => {
      onLoaded(id);
    }, []);

    if (
      dataType === _DATATYPES.INT ||
      dataType === _DATATYPES.DECIMAL ||
      dataType === _DATATYPES.MONEY
    ) {
      inputStyle = { textAlign: "right" };
      isNumber = true;
    }

    if (dataType === _DATATYPES.MONEY && !isNaN(value)) {
      // displayValue = formatCurrency(displayValue);
      isNumber = true;
    }

    const handleOnChange = (e) => {
      value = e.target.value;
      if (isNumber) {
        value = !isNaN(value) ? Number(value) : 0;
      }

      onChange(null, id, value);
    };

    const handleGetDefault = async (e) => {
      if (typeof onGetDefault === "function") {
        const defaultValue = await onGetDefault();
        onChange(null, id, defaultValue);
      }
    };

    return (
      <TextField
        fullWidth={fullWidth}
        error={!disabled && error}
        disabled={disabled}
        id={id}
        type={isNumber ? "number" : "text"}
        label={label}
        onChange={handleOnChange}
        margin="dense"
        value={displayValue || (isNumber && !isNumberNullable ? 0 : "")}
        helperText={!disabled && helperText}
        multiline={
          multiline ||
          dataType === _DATATYPES.TEXT ||
          dataType === _DATATYPES.TT
        }
        rows={rows}
        rowsMax={rowsMax}
        inputProps={{step: 0.01,
          style: { ...inputStyle },
        }}


        InputProps={ InputProps ||
           {
            endAdornment: onGetDefault && <InputAdornment position="end" onClick={handleGetDefault}>
                <IconButton size="small" edge="end">
                  {" "}
                  {ICONS.ADD()}
                </IconButton>
              </InputAdornment>
          }
        }
      />
    );
  }
);

// ================================================================================== range number text
const MyInputRange = React.memo(
  ({
    id,
    value = "",
    label = "输入",
    onChange = () => {},
    onLoaded = () => {},
    onGetDefault,
    helperText = "",
    ...props
  }) => {

    // changed: dont use default
    const [startNum, setStartNum] = useState(null);
    const [endNum, setEndNum] = useState(null);
    const [isSearch, setIsSearch] = useState(false)

    // 通知外部组件，数据加载完成
    useEffect(() => {
      onLoaded(id);
    }, []);

    // otherwise only submit
    const handleChangeStart = (x1, x2, newValue) => {
      const newCombine = `${newValue},${endNum}`;
      if (typeof onChange === "function") onChange(null, id, newCombine);
      setStartNum(newValue);
    };


    const handleChangeEnd = (x1, x2, newValue) => {
      const newCombine = `${startNum},${newValue}`;
      if (typeof onChange === "function") onChange(null, id, newCombine);
      setEndNum(newValue);
    };

    const taggleIsSearch = (is) => {
      setIsSearch(is)
      onChange(null, id, "");
    }

    return isSearch ? <Grid container>
          <Grid item xs={5}>
          <MyInput
            {...props}
            id={`${id}_start`}
            label={`${label || ""} 从`}
            value={startNum}
            emptyLabel=""
            onChange={handleChangeStart}
            helperText = {helperText}
            multiline = {false}    
            isNumberNullable = {true}
          />
        </Grid>
        <Grid item xs={7}>
          <MyInput
            {...props}
            id={`${id}_end`}
            label="到"
            value={endNum}
            emptyLabel=""
            onChange={handleChangeEnd}
            multiline = {false}
            isNumberNullable = {true}
            InputProps = {{endAdornment: <InputAdornment position="end" onClick={() => taggleIsSearch(false)}>
                <IconButton size="small" edge="end" className="ml-2">
                  {ICONS.FALSE()}
                </IconButton>
              </InputAdornment>}}
          />
        </Grid>
        </Grid>
        : <Grid container><Grid item xs={12} className="mb-2 mt-2">
          <Button variant="outlined" color="primary" onClick= {() => taggleIsSearch(true)}>输入{label || ""}范围</Button></Grid></Grid>
  }
);
// ================================================================================== password text
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
}));

const MyInputPassword = React.memo(
  ({
    id,
    label = "密码",
    value = "",
    onChange = () => {},
    onLoaded = () => {},
    error = false,
    helperText = "",
    fullWidth = true,
    disabled = false,
  }) => {
    const classes = useStyles();
    const [showPassword, setshowPassword] = useState(false);

    // 通知外部组件，数据加载完成
    useEffect(() => {
      onLoaded(id);
    }, []);

    const handleClickShowPassword = () => {
      setshowPassword(!showPassword);
    };
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    return (
      <FormControl
        className={clsx(classes.margin, classes.textField)}
        margin="dense"
        error={!disabled && error}
        fullWidth={fullWidth}
      >
        <InputLabel htmlFor="standard-adornment-password">{label}</InputLabel>
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                disabled={disabled}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          disabled={disabled}
        />
        <FormHelperText>{!disabled && helperText}</FormHelperText>
      </FormControl>
    );
  }
);

// ================================================================================== switch
const MySwitch = React.memo(
  ({
    id,
    label = "",
    value = false,
    onChange = () => {},
    onLoaded = () => {},
    onSwitch = () => {},
    disabled = false,
    labelTrue = "是",
    labelFalse = "否",
  }) => {
    // 通知外部组件，数据加载完成
    useEffect(() => {
      onLoaded(id);
    }, []);

    const isChecked = value === true || value === "true";
    const handleOnChange = (e, value) => {
      onChange(e, id, value);

      // onChange被creinoxForm征用了。这个外部用
      onSwitch(e, id, value);
    };

    return (
      <FormControlLabel
        control={
          <Switch
            id={id}
            checked={isChecked}
            onChange={handleOnChange}
            value={value ? true : false}
            disabled={disabled}
            color="primary"
          />
        }
        label={` [${isChecked ? labelTrue : labelFalse}] ${label}`}
      />
    );
  }
);

// ================================================================================== switch
const MyEditButton = React.memo(
  ({ disabled = false, setdisabled = () => {} }) => {
    // 通知外部组件，数据加载完成
    return (
      <>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            setdisabled(!disabled);
          }}
        >
          {disabled ? "进入编辑模式" : "回到浏览模式"}
        </Button>
      </>
    );
  }
);

export const Inputs = {
  MyCombobox,
  MyComboboxFK,
  MyComboboxCascade,
  MyComboboxAsyncFK,
  MyComboboxPack,
  MyComboboxPolishing,
  MyComboboxTexture,
  MyComboboxUnitType,
  MyComboboxShippingType,
  MyComboboxPricingTerm,
  MyComboboxCurrency,
  MyComboboxPaymentType,
  MyComboboxCommission,
  MyComboboxExpressCompany,
  MySelect,
  MyDatePicker,
  MyDateTimePicker,
  MyDateRangePicker,
  MyEditButton,
  MyInput,
  MyInputRange,
  MyInputTT,
  MyInputPassword,
  MySwitch,
  MyImage,
  MyRegionPicker,
  MyCategoryPicker,
  MyFinancialLedgerPicker,
};
