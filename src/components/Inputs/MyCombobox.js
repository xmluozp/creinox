import React, { useEffect, useState } from "react";
import _ from "lodash";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { makeStyles } from "@material-ui/core/styles";


import { h_fkFetchOnce } from "../../_helper";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiAutocomplete-inputRoot": {
      padding: 0
    },
    "& .MuiAutocomplete-input": {
      padding: "5px !important"
    }
  }
}));
// ================================================================================== Select
export const MySelect = ({
  id,
  label = "请选择",
  options = [],
  value = "",
  onChange = () => {},
  hasDefault = true,
  disabled = false,
  fullWidth = true
}) => {
  return (      <FormControl fullWidth={fullWidth} disabled={disabled} margin="dense">
    <InputLabel htmlFor="age-native-simple">{label}</InputLabel>
    <Select
      native
      value={value}
      onChange={onChange}
      margin="dense"
      inputProps={{
        name: label,
        id: id,
      }}
    >
      { hasDefault && <option value="" />}
      {
        options.map((optionvalue,index) => {
          return <option value={index} key={optionvalue}>{optionvalue}</option>
        })
      }
    </Select>
  </FormControl>)

}



// ================================================================================== Combobox
export const MyCombobox = ({
  id,
  label = "请选择",
  optionLabel = "name",
  options = [],
  value = "",
  onChange = () => {},
  disabled = false,
  fullWidth = true
}) => {
  const classes = useStyles();
  const defaultItem = _.find(options, ["id", value]);
  const [selectedValue, setselectedValue] = useState(defaultItem);

  const getOptionLabel = option => {
    return option[optionLabel] || option || "--";
  };

  return (
    <Autocomplete
      className={classes.root}
      disabled={disabled}
      options={options}
      getOptionLabel={getOptionLabel}
      onChange={(e, item) => {
        setselectedValue(item);
        const returnValue = (item && item.id) || value;
        onChange(e, id, returnValue);
      }}
      id={id}
      getOptionSelected={item => {
        return item.id === selectedValue.id;
      }}
      value={selectedValue}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          margin="dense"
          fullWidth={fullWidth}
        />
      )}
    />
  );
};

// ================================================================================== Combobox FK
export const MyComboboxFK = props => {
  const { tableName = "" } = props;

  const [options, setoptions] = useState([]);

  useEffect(() => {
    h_fkFetchOnce(tableName).then(response => {
      setoptions(response);
    });
  }, [tableName]);

  return options && options.length > 0 ? (
    <MyCombobox {...props} options={options} />
  ) : (
    <>...</>
  );
};
