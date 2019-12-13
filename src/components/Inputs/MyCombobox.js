import React, { useEffect, useState } from "react";
import _ from "lodash";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
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
    return option[optionLabel] || "--";
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
  }, []);

  return options.length > 0 ? (
    <MyCombobox {...props} options={options} />
  ) : (
    <>...</>
  );
};
