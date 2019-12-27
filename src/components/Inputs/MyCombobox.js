import React, { useEffect, useState } from "react";
import _ from "lodash";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { makeStyles } from "@material-ui/core/styles";

import { enums } from "../../_constants";
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
export const MySelect = React.memo(({
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
    { hasDefault ? null: <option value="" />}
      {
        options.map((optionvalue,index) => {
          return <option value={index} key={optionvalue}>{optionvalue}</option>
        })
      }
    </Select>
  </FormControl>)

})



// ================================================================================== Combobox
export const MyCombobox = React.memo(({
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
});

// ================================================================================== Combobox FK
export const MyComboboxFK = React.memo(props => {

  // 表名称； reducer里面的名称，默认dropdown
  const { tableName = "", stateName="dropdown", params=[] } = props;

  const [options, setoptions] = useState([]);

  useEffect(() => {
    let isSubscribed = true;
    h_fkFetchOnce(tableName, stateName, params).then(response => {
      if(isSubscribed) {setoptions(response);}      
    }).catch(error=> {
      console.log("下拉列表为空",error)
    });

    return ()=> {isSubscribed = false;}
  }, [tableName, stateName]);

  return options && options.length > 0 ? (
    <MyCombobox {...props} options={options} />
  ) : (
    <>...</>
  );
});

export const MyComboboxPack = React.memo(props => {
  const commonTypeName = 'pack'
  return <MyComboboxFK tableName="commonitem" stateName={`dropdown_${commonTypeName}`} params={{commonType: enums.commonType[commonTypeName]}}  {...props} />
})
export const MyComboboxPolishing = React.memo(props => {
  const commonTypeName = 'polishing'
  return <MyComboboxFK tableName="commonitem" stateName={`dropdown_${commonTypeName}`} params={{commonType: enums.commonType[commonTypeName]}}  {...props} />
})
export const MyComboboxTexture = React.memo(props => {
  const commonTypeName = 'texture'
  return <MyComboboxFK tableName="commonitem" stateName={`dropdown_${commonTypeName}`} params={{commonType: enums.commonType[commonTypeName]}}  {...props} />
})
export const MyComboboxUnitType = React.memo(props => {
  const commonTypeName = 'unitType'
  return <MyComboboxFK tableName="commonitem" stateName={`dropdown_${commonTypeName}`} params={{commonType: enums.commonType[commonTypeName]}}  {...props} />
})
export const MyComboboxShippingType = React.memo(props => {
  const commonTypeName = 'shippingType'
  return <MyComboboxFK tableName="commonitem" stateName={`dropdown_${commonTypeName}`} params={{commonType: enums.commonType[commonTypeName]}}  {...props} />
})
export const MyComboboxPricingTerm = React.memo(props => {
  const commonTypeName = 'pricingTerm'
  return <MyComboboxFK tableName="commonitem" stateName={`dropdown_${commonTypeName}`} params={{commonType: enums.commonType[commonTypeName]}}  {...props} />
})
export const MyComboboxCurrency = React.memo(props => {
  const commonTypeName = 'currency'
  return <MyComboboxFK tableName="commonitem" stateName={`dropdown_${commonTypeName}`} params={{commonType: enums.commonType[commonTypeName]}}  {...props} />
})