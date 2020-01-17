import React, { useState } from "react";
// import _ from "lodash";
import formatCurrency from 'format-currency';

import DateFnsUtils from "@date-io/date-fns";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import {_DATATYPES} from "../../_constants"

import {
  MyCombobox,
  MyComboboxAsyncFK,
  MyComboboxFK,
  MySelect,
  MyComboboxPack,
  MyComboboxPolishing,
  MyComboboxTexture,
  MyComboboxUnitType,
  MyComboboxShippingType,
  MyComboboxPricingTerm,
  MyComboboxCurrency
} from "./MyCombobox";

import {
  MyImage
} from "./MyImage";

import {
  MyRegionPicker,
  MyCategoryPicker
} from "./MyPicker";

// ==================================================================================Date picker
const MyDatePicker = React.memo(({
  id,
  label = "选择日期",
  value,
  onChange = () => {},
  fullWidth = true,
  disabled = false
}) => {
  const handleOnChange = (timeString, timeObject) => {
    if (typeof onChange === "function") {
      onChange(null, id, timeObject);
    }
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} style={{ marginTop: "0px" }}>
      <KeyboardDatePicker
        fullWidth={fullWidth}
        disabled={disabled}
        margin="dense"
        id={id}
        label={label}
        format="yyyy/MM/dd"
        value={value || new Date()}
        onChange={handleOnChange}
        KeyboardButtonProps={{
          "aria-label": "select date"
        }}
      />
    </MuiPickersUtilsProvider>
  );
});

// ==================================================================================Date picker for range
const MyDateRangePicker = React.memo(({
  id,
  label,
  value, // in case of endless loop, only used for default
  onChange,
  fullWidth = true,
  disabled = false
}) => {
  // divide two dates by ","
  const getDateArray = combineDate => {
    if (combineDate) {
      const separateDate = combineDate.split(",");
      return separateDate;
    } else return [new Date(), new Date()];
  };

  // first load get default values
  const [startDate, setStartDate] = useState(getDateArray(value)[0]);
  const [endDate, setEndDate] = useState(getDateArray(value)[1]);

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
            onChange={handleChangeStart}
            KeyboardButtonProps={{
              "aria-label": "change date"
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
            onChange={handleChangeEnd}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
});

// ================================================================================== regular text
const MyInput = React.memo(({
  id,
  label = "输入",
  value = "",
  onChange = () => {},
  error = false,
  dataType = _DATATYPES.VARCHAR,
  helperText = "",
  fullWidth = true,
  disabled = false,
  multiline = false,
  rows,
  rowsMax = 5
}) => {

  // ============= 修饰显示格式
  let inputStyle = {}
  let displayValue = value;
  let isNumber = false

  if(dataType === _DATATYPES.INT || dataType === _DATATYPES.DECIMAL || dataType === _DATATYPES.MONEY)
  {
    inputStyle = {textAlign: "right"}
    isNumber = true
  } 
  
  if(dataType === _DATATYPES.MONEY && !isNaN(value))
  {
    displayValue = formatCurrency(displayValue)
    isNumber = true
  }

  const handleOnChange = (e) => {

    value = e.target.value;
    if(isNumber && !isNaN(value)) {
      value = Number(value)
    }

    onChange(null, id, value)
  }

  return (
    <TextField
      fullWidth={fullWidth}
      error={!disabled && error}
      disabled={disabled}
      id={id}
      type={isNumber?"number":"text"}
      label={label}
      onChange={handleOnChange}
      margin="dense"
      value={displayValue}
      helperText={!disabled && helperText}
      multiline={multiline}
      rows={rows}
      rowsMax={rowsMax}
      inputProps={{
        style: {...inputStyle }
      }}
    />
  );
});

// ================================================================================== password text
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  }
}));

const MyInputPassword = React.memo(({
  id,
  label = "密码",
  value = "",
  onChange = () => {},
  error = false,
  helperText = "",
  fullWidth = true,
  disabled = false
}) => {
  const classes = useStyles();
  const [showPassword, setshowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setshowPassword(!showPassword);
  };
  const handleMouseDownPassword = event => {
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
});

// ================================================================================== switch
const MySwitch = React.memo(({
  id,
  label = "",
  value = false,
  onChange = () => {},
  disabled = false
}) => {
  const isChecked = value === true || value === "true";
  const handleOnChange = (e, value) => {
    onChange(e, id, value);
  };

  return (
    <FormControlLabel
      control={
        <Switch
          id={id}
          checked={isChecked}
          onChange={handleOnChange}
          value={value}
          disabled={disabled}
          color="primary"
        />
      }
      label={`${label} : ${isChecked ? "是" : "否"}`}
    />
  );
});

// ================================================================================== switch
const MyEditButton = React.memo(({ disabled = false, setdisabled = () => {} }) => {
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
});

export const Inputs = {
  MyCombobox,
  MyComboboxFK,
  MyComboboxAsyncFK,
  MyComboboxPack,
  MyComboboxPolishing,
  MyComboboxTexture,
  MyComboboxUnitType,
  MyComboboxShippingType,
  MyComboboxPricingTerm,
  MyComboboxCurrency,
  MySelect,
  MyDatePicker,
  MyDateRangePicker,
  MyEditButton,
  MyInput,
  MyInputPassword,
  MySwitch,
  MyImage,
  MyRegionPicker,
  MyCategoryPicker
};
