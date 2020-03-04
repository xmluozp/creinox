import React, { useEffect, useState } from "react";
import _ from "lodash";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { makeStyles } from "@material-ui/core/styles";

import { enums } from "../../_constants";
import { h_fkFetchOnce, h_fkFetchOnceAsync } from "../../_helper";

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
export const MySelect = React.memo(
  ({
    id,
    label = "请选择",
    options = [],
    value = "",
    onChange = () => {},
    hasDefault = true,
    disabled = false,
    fullWidth = true
  }) => {

    const handleOnChange = (e) => {
      onChange(e, id, parseInt(e.target.value))
    }

    return (
      <FormControl fullWidth={fullWidth} disabled={disabled} margin="dense">
        <InputLabel htmlFor="age-native-simple">{label}</InputLabel>
        <Select
          native
          value={value}
          onChange={handleOnChange}
          margin="dense"
          inputProps={{
            name: label,
            id: id
          }}
        >
          {hasDefault ? null : <option value="" />}
          {options.map((optionvalue, index) => {
            return (
              <option value={index} key={optionvalue}>
                {optionvalue}
              </option>
            );
          })}
        </Select>
      </FormControl>
    );
  }
);

// ================================================================================== Combobox
export const MyCombobox = React.memo(
  ({
    id,
    label = "请选择",
    optionLabel = "name",
    options = [],
    value = "",
    onChange = () => {},
    disabled = false,
    hasDefault = true,
    fullWidth = true,
    multiple = false,
    error = false,
    helperText = "",
    ...props
  }) => {
    const classes = useStyles();

    // 这个是专门为async准备的。MUI有BUG，一定要有默认值才能control。但async状态下又不能有默认值
    let optionsFix;

    let currentValue, getOptionLabel, handleOnChange, handleGetOptionSelected, handleRenderOption;

    // --------------------- 多选
    if(multiple) {
      optionsFix = options.map(item=> {
        return item.id
      })
      currentValue = value ? value.split(",") : [];

      getOptionLabel = option => {
        return (options[option] && options[option].name) || null;
      };

      handleOnChange = (e, items) => {
        const returnValue = items.join(",");
        onChange(e, id, returnValue);
      }

      handleGetOptionSelected = (item)=> {
        return currentValue.includes(item.toString())
      } 

      handleRenderOption = (option, {selected}) => {
        return `[${option}] ${options[option].name}`
      }

    // --------------------- 单选
    } else { 
      optionsFix = hasDefault && !multiple
      ? [{ id: 0, [optionLabel]: "无" }, ...options]
      : options;

      currentValue =
      _.find(optionsFix, ["id", value]) || (optionsFix && optionsFix[0]);

      getOptionLabel = option => {
        return option[optionLabel] || option || "--";
      };
  
      handleOnChange = (e, item) => {
        const returnValue = (item && item.id) || value;
        onChange(e, id, returnValue);
      }
      handleGetOptionSelected = (item,index )=> {
        return item.id === (currentValue && currentValue.id);
      }  
    }

    return (
        <Autocomplete
          autoSelect={true}
          multiple = {multiple}
          className={classes.root}
          disabled={disabled}
          filterSelectedOptions = {multiple} // autocomplete有bug，从选项选择会自动乱选。所以必须把已选项屏蔽
          disableCloseOnSelect={multiple}
          options={optionsFix}
          renderOption={handleRenderOption}
          getOptionLabel={getOptionLabel}
          onChange={disabled ? null: handleOnChange}
          id={id}
          getOptionSelected={handleGetOptionSelected}
          value={currentValue}
          renderInput={params => (
            <TextField
              {...params}
              label={label}
              margin="dense"
              fullWidth={fullWidth}
              onKeyDown={props.onKeyDown}
              error={!disabled && error}
              helperText={!disabled && helperText}
            />
          )}
          onInputChange={props.onInputChange}
        />
    );
  }
);
// ================================================================================== Combobox FK Async

export const MyComboboxAsyncFK = React.memo(props => {
  // 表名称； reducer里面的名称，默认dropdown
  const {
    tableName = "",
    preConditions = {},
    actionName = "get_dropdown",
    onChange = () => {},
    onLoad = () => {},
  } = props;

  const [options, setoptions] = useState([]);
  const [inputValue, setInputValue] = useState();

  const handleInputChange = (e, value) => {
 
    if(value) {
      setInputValue(value);
    }    
  };

  // 第一次加载，根据value为id读出来一条记录
  useEffect(() => {
    if (props.value) {
      let isSubscribed = true;

      h_fkFetchOnceAsync(tableName, [inputValue, {id: props.value, ...preConditions }], actionName)
        .then(response => {
          console.log("下拉列表1:", response, actionName);
          if (isSubscribed) {
            onLoad(response);
            setoptions(response);
          }
        })
        .catch(error => {
          console.log("下拉列表为空", error);
        });

      return () => {
        isSubscribed = false;
      };
    }
  }, []);

  const handleFetchData = e => {
    if (e.key === "Enter") {

      console.log("hit enter")
      e.preventDefault();
      h_fkFetchOnceAsync(tableName, [inputValue, preConditions], actionName)
        .then(response => {
          console.log("下拉列表2:", response, actionName);
          onLoad(response);
          setoptions(response);
        })
        .catch(error => {
          console.log("下拉列表为空", error);
        });
    }
  };

  return (
    <MyCombobox
      {...props}
      options={options}
      onKeyDown={handleFetchData}
      onInputChange={handleInputChange}
      onChange={onChange}
      hasDefault={!!props.value}
    />
  );
});

// ================================================================================== Combobox FK
export const MyComboboxFK = React.memo(props => {
  // 表名称； reducer里面的名称，默认dropdown
  const { tableName = "", stateName = "dropdown", preConditions = {} } = props;

  const [options, setoptions] = useState([]);

  useEffect(() => {
    let isSubscribed = true;
    h_fkFetchOnce(tableName, stateName, [preConditions])
      .then(response => {

        if (isSubscribed) {
          setoptions(response);
        }
      })
      .catch(error => {
        console.log("下拉列表为空", error);
      });

    return () => {
      isSubscribed = false;
    };
  }, [tableName, stateName]);

  return <MyCombobox {...props} options={options} />;
});

export const MyComboboxPack = React.memo(props => {
  const commonTypeName = "pack";
  return (
    <MyComboboxFK
      tableName="commonitem"
      stateName={`dropdown_${commonTypeName}`}
      preConditions={{ commonType: enums.commonType[commonTypeName] }}
      {...props}
    />
  );
});
export const MyComboboxPolishing = React.memo(props => {
  const commonTypeName = "polishing";
  return (
    <MyComboboxFK
      tableName="commonitem"
      stateName={`dropdown_${commonTypeName}`}
      preConditions={{ commonType: enums.commonType[commonTypeName] }}
      {...props}
    />
  );
});
export const MyComboboxTexture = React.memo(props => {
  const commonTypeName = "texture";
  return (
    <MyComboboxFK
      tableName="commonitem"
      stateName={`dropdown_${commonTypeName}`}
      preConditions={{ commonType: enums.commonType[commonTypeName] }}
      {...props}
    />
  );
});
export const MyComboboxUnitType = React.memo(props => {
  const commonTypeName = "unitType";
  return (
    <MyComboboxFK
      tableName="commonitem"
      stateName={`dropdown_${commonTypeName}`}
      preConditions={{ commonType: enums.commonType[commonTypeName] }}
      {...props}
    />
  );
});
export const MyComboboxShippingType = React.memo(props => {
  const commonTypeName = "shippingType";
  return (
    <MyComboboxFK
      tableName="commonitem"
      stateName={`dropdown_${commonTypeName}`}
      preConditions={{ commonType: enums.commonType[commonTypeName] }}
      {...props}
    />
  );
});
export const MyComboboxPricingTerm = React.memo(props => {
  const commonTypeName = "pricingTerm";
  return (
    <MyComboboxFK
      tableName="commonitem"
      stateName={`dropdown_${commonTypeName}`}
      preConditions={{ commonType: enums.commonType[commonTypeName] }}
      {...props}
    />
  );
});
export const MyComboboxCurrency = React.memo(props => {
  const commonTypeName = "currency";
  return (
    <MyComboboxFK
      tableName="commonitem"
      stateName={`dropdown_${commonTypeName}`}
      preConditions={{ commonType: enums.commonType[commonTypeName] }}
      {...props}
    />
  );
});
