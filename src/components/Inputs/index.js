import React, { useEffect, useState } from "react";
import _ from "lodash";

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

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import {MyCombobox, MyComboboxFK} from './MyCombobox';

// ==================================================================================Date picker
const MyDatePicker = ({
  id,
  label = "选择日期",
  value,
  onChange = () => {},
  fullWidth = true,
  disabled = false
}) => {

  const handleOnChange = (timeString,timeObject) => {

    if (typeof(onChange)==='function'){
      onChange(null, id, timeObject)
    }
  }

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
};

// ==================================================================================Date picker for range
const MyDateRangePicker = ({
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
  useEffect(() => {
    const newCombineDate = `${startDate},${endDate}`;
    if (typeof onChange === "function") onChange(null, id, newCombineDate);
  }, [startDate, endDate, onChange]);

  const handleChangeStart = date => {
    setStartDate(date);
  };
  const handleChangeEnd = date => {
    setEndDate(date);
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
            onChange={date => handleChangeStart(date)}
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
            onChange={date => handleChangeEnd(date)}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

// ================================================================================== regular text
const MyInput = ({
  id,
  label = "输入",
  value = "",
  onChange = () => {},
  error = false,
  helperText = "",
  fullWidth = true,
  disabled = false,
  multiline = false,
  rows = 1
}) => {
  return (
    <TextField
      fullWidth={fullWidth}
      error={error}
      disabled={disabled}
      id={id}
      label={label}
      onChange={onChange}
      margin="dense"
      value={value}
      helperText={helperText}
      multiline={multiline}
      rows={rows}
    />
  );
};

// ================================================================================== password text
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  }
}));

const MyInputPassword = ({
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
      error={error}
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
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

// ================================================================================== switch
const MySwitch = ({
  id,
  label = "",
  value = false,
  onChange = () => {},
  disabled = false
}) => {
  const isChecked = value === true || value === "true";
  const handleOnChange = (e, value) => {
    onChange(e, id, value);
  }

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
};


export const Inputs = {
  MyCombobox,
  MyComboboxFK,
  MyDatePicker,
  MyDateRangePicker,
  MyInput,
  MyInputPassword,
  MySwitch
};
