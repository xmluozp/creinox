import React, { useEffect, useState, useRef } from "react";
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
          value={ value === null? "" : value }
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
    onSelect = () => {},
    disabled = false,
    hasDefault = true,
    fullWidth = true,
    multiple = false,
    error = false,
    helperText = "",
    inputRef,
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
      // 200329去掉hasDefault
      // optionsFix = hasDefault && !multiple
      optionsFix =  [{ id: 0, [optionLabel]: "无" }, ...options];

      currentValue = 
      _.find(optionsFix, ["id", value]) || (optionsFix && optionsFix[0]);

      getOptionLabel = option => {

        // 如果option是文本或者数字直接返回
        if(typeof(option) === "string" || typeof(option) === "number") {
          return option
        }

        // 如果是数组就取那个label
        if( (typeof(option) === "object" || Array.isArray(option)) && option[optionLabel]) {
          return option[optionLabel]
        }
        
        return "--";
      };
  
      handleOnChange = (e, item) => {

        // 如果有id的话，返回id，否则假如有default就放空，否则返回value（为了搜索的时候可以输入内容）
        // 200329去掉hasDefault
        // const returnValue =  item && item.id >=0 ? item.id : hasDefault ? "": value;
        const returnValue =  item && item.id >=0 ? item.id : value;
        // const returnValue =  item && item.id >=0 ? item.id : value;

        // 20200327: 多返回一个item本身
        onChange(e, id, returnValue, item);

        // 20200331: 用来代替onChange，因为onChange被creinoxForm征用了
        onSelect(item)
      }
      handleGetOptionSelected = (item,index )=> {
        return item.id === (currentValue && currentValue.id);
      }  
    }

    const handleOnInputChange = (e, value, reason) => {

      if (typeof(props.onInputChange) === 'function' && reason === 'input') {
        // console.log("value", value)
          props.onInputChange(e, value, reason)    
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
              inputRef = {inputRef}
              error={!disabled && error}
              helperText={!disabled && helperText}
            />
          )}
          onInputChange={handleOnInputChange}
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

  // 200329用ref控制搜索，因为如果用setState，会导致一动就触发re-render，怎么输入都刷新成“无”
  const inputRef = useRef(null);


  // 第一次加载，根据value为id读出来一条记录
  useEffect(() => {
    loadData()
  }, [props.value]);

  const loadData = () => {

    if (props.value ) {
      let isSubscribed = true;

      // 这里搜索不应该搜索名字
      delete preConditions.name

      // inputValue这里是keyword。根据id搜索的话不需要关键字

      h_fkFetchOnceAsync(tableName, ["", {id: props.value, ...preConditions }], actionName)
        .then(response => {
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
  }

  // 根据输入内容读记录
  const handleFetchData = e => {
    if (e.key === "Enter") {

      const keyword = inputRef.current.value;

      e.preventDefault();
      h_fkFetchOnceAsync(tableName, [keyword, preConditions], actionName)
        .then(response => {
          // console.log("下拉列表2:", response, actionName);
          onLoad(response);
          setoptions(response);
        })
        .catch(error => {
          console.log("下拉列表为空", error);
        });
    }
  };

  // 有value就有hasDefault
  return (
    <MyCombobox
      {...props}
      options={options}
      onKeyDown={handleFetchData}
      inputRef = {inputRef}
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

export const MyComboboxPaymentType = React.memo(props => {
  const commonTypeName = "paymentType";
  return (
    <MyComboboxFK
      tableName="commonitem"
      stateName={`dropdown_${commonTypeName}`}
      preConditions={{ commonType: enums.commonType[commonTypeName] }}
      {...props}
    />
  );
});
export const MyComboboxPaymentTypeE = React.memo(props => {
  const commonTypeName = "paymentTypeE";
  return (
    <MyComboboxFK
      tableName="commonitem"
      stateName={`dropdown_${commonTypeName}`}
      preConditions={{ commonType: enums.commonType[commonTypeName] }}
      {...props}
    />
  );
});
export const MyComboboxCommission = React.memo(props => {
  const commonTypeName = "commission";
  return (
    <MyComboboxFK
      tableName="commonitem"
      stateName={`dropdown_${commonTypeName}`}
      preConditions={{ commonType: enums.commonType[commonTypeName] }}
      {...props}
    />
  );
});

