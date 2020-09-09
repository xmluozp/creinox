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

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiAutocomplete-inputRoot": {
      padding: 0,
    },
    "& .MuiAutocomplete-input": {
      padding: "5px !important",
    },
  },
}));
// ================================================================================== Select
export const MySelect = React.memo(
  ({
    id,
    label = "请选择",
    options = [],
    value = "",
    onChange = () => {},
    onLoaded = () => {},
    hasDefault = true,
    disabled = false,
    fullWidth = true,
  }) => {
    const handleOnChange = (e) => {
      onChange(e, id, parseInt(e.target.value));
    };

    // 通知外部组件，数据加载完成
    useEffect(() => {
      onLoaded(id);
    }, []);

    return (
      <FormControl fullWidth={fullWidth} disabled={disabled} margin="dense">
        <InputLabel htmlFor="age-native-simple">{label}</InputLabel>
        <Select
          native
          value={value === null ? "" : value}
          onChange={handleOnChange}
          margin="dense"
          inputProps={{
            name: label,
            id: id,
          }}
        >
          {hasDefault ? null : <option value="" />}
          {options
            .filter((v) => !!v)
            .map((optionvalue, index) => {
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
    onRenderOption,
    options = [],
    value = "",
    onChange = () => {}, // 外部form改数据用
    onLoaded = () => {},
    onSelect = () => {}, // 从用户手动选择触发
    // onLoad = () => {},   // 读出options的时候运行
    disabled = false,
    isDefaultOnSelect = false, // 读数据的时候是否自动触发onSelect (用来区分第一次加载和用户选择两种情况)
    fullWidth = true,
    multiple = false,
    error = false,
    helperText = "",
    isHidden = false,
    inputRef,
    ...props
  }) => {
    const classes = useStyles();

    // 通知外部组件，数据加载完成
    useEffect(() => {
      onLoaded(id);
    }, []);

    // 这个是专门为async准备的。MUI有BUG，一定要有默认值才能control。但async状态下又不能有默认值
    let optionsFix;

    let currentValue,
      getOptionLabel,
      handleOnChange,
      handleGetOptionSelected,
      handleRenderOption;

    // --------------------- 多选
    if (multiple) {
      optionsFix = options
        .filter((v) => !!v)
        .map((item) => {
          return item.id;
        });
      currentValue = value ? value.split(",") : [];

      getOptionLabel = (option) => {
        return (options[option] && options[option].name) || null;
      };

      handleOnChange = (e, items) => {
        if (disabled) return;
        const returnValue = items.join(",");
        onChange(e, id, returnValue);
      };

      handleGetOptionSelected = (item) => {
        return currentValue.includes(item.toString());
      };

      handleRenderOption = (option, { selected }) => {
        return `[${option}] ${options[option].name}`;
      };

      // --------------------- 单选
    } else {
      getOptionLabel = (option) => {
        // 如果外部有render方法，直接用外部的
        if (typeof onRenderOption === "function") return onRenderOption(option);

        // 否则如果option是文本或者数字直接返回
        if (typeof option === "string" || typeof option === "number") {
          return option;
        }

        // 如果是数组就取那个label
        if (
          (typeof option === "object" || Array.isArray(option)) &&
          option[optionLabel]
        ) {
          return option[optionLabel];
        }
        return "";
      };

      // 200329去掉hasDefault
      // optionsFix = hasDefault && !multiple

      optionsFix = [
        { id: 0, [optionLabel]: "-" },
        ...options.filter((v) => getOptionLabel(v) !== ""),
      ];

      currentValue =
        _.find(optionsFix, ["id", value]) || (optionsFix && optionsFix[0]);

      handleOnChange = (e, item) => {
        if (disabled) return;

        // 如果有id的话，返回id，否则假如有default就放空，否则返回value（为了搜索的时候可以输入内容）
        // 200329去掉hasDefault
        // const returnValue =  item && item.id >=0 ? item.id : hasDefault ? "": value;

        // 200814 如果没有item改成0。点叉的时候清空值用
        const returnValue = item && item.id >= 0 ? item.id : 0;
        // const returnValue =  item && item.id >=0 ? item.id : value;

        // 20200327: 多返回一个item本身. creinoxform用
        onChange(e, id, returnValue, item);
        // 20200331: 用来代替onChange，因为onChange被creinoxForm征用了

        // 如果是读取数据，只有读取了以后才会触发onSelect。否则会混淆"第一次读取"和"用户操作"(意外触发inject)
        // e 只有用户操作的时候才会有
        if (e || isDefaultOnSelect) {
          onSelect(item);
        }
      };

      handleGetOptionSelected = (item, index) => {
        return item.id === (currentValue && currentValue.id);
      };
    }

    const optionLength = (options && options.length) || 0;

    // useEffect(() => {
    //   // 20200810: 从内部移出来，因为第一次onload也需要触发
    //   if(optionLength > 0) {
    //     onLoad(options);
    //   }
    // }, [optionLength]);

    // 第一次加载option的时候，假如超过一个选项，直接填入
    useEffect(() => {
      // 有的情况下不自动选
      if (optionLength === 1) {
        const item = options[0];
        // 根据 isDefaultOnSelect 来决定要不要顺便触发onSelect
        handleOnChange(null, item);
      }
    }, [optionLength]);

    const handleOnInputChange = (e, value, reason) => {
      if (typeof props.onInputChange === "function" && reason === "input") {
        props.onInputChange(e, value, reason);
      }
      // if (reason === "clear") // 200904 原本要清文本框内容的，清不掉所以不要了
    };

    const style = isHidden ? { display: "none" } : {};

    return (
      <Autocomplete
        style={style}
        autoSelect={true}
        multiple={multiple}
        className={classes.root}
        disabled={disabled}
        filterSelectedOptions={multiple} // autocomplete有bug，从选项选择会自动乱选。所以必须把已选项屏蔽
        disableCloseOnSelect={multiple}
        options={optionsFix}
        renderOption={handleRenderOption}
        getOptionLabel={getOptionLabel}
        onChange={handleOnChange}
        id={id}
        getOptionSelected={handleGetOptionSelected}
        value={currentValue}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            margin="dense"
            fullWidth={fullWidth}
            onKeyDown={props.onKeyDown}
            inputRef={inputRef}
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

// preConditions 如果是“或”的好几种preConditions。就得多取几次

export const MyComboboxAsyncFK = React.memo(
  ({ onLoaded = () => {}, ...props }) => {
    // 表名称； reducer里面的名称，默认dropdown
    const {
      tableName = "",
      preConditions = {},
      actionName = "get_dropdown",
      onLoading = () => {}, // 通知外部开始加载详情页的value（只有详情页第一次加载value时用到）
      id,
    } = props;

    const [options, setoptions] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadedIsSubscribed, setLoadedIsSubscribed] = useState(true);

    // 200329用ref控制搜索，因为如果用setState，会导致一动就触发re-render，怎么输入都刷新成“无”
    const inputRef = useRef(null);

    // 第一次加载。根据 value 为id读出来一条记录，通知外部开始加载
    useEffect(() => {
      setLoadedIsSubscribed(true);

      if (!isLoaded) {
        initializeData();
      }

      return () => {
        setoptions([]);
        setLoadedIsSubscribed(false);
      };
    }, [id, props.value]);

    // 普通加载。根据根据id读出完整记录
    useEffect(() => {
      setLoadedIsSubscribed(true);

      loadData();

      return () => {
        setoptions([]);
        setLoadedIsSubscribed(false);
      };
    }, [id, props.value]);

    const initializeData = async () => {
      onLoading(id);
      await loadData();
      onLoaded(id);
      setIsLoaded(true);
    };

    const loadData = async () => {
      if (props.value) {
        // 这里搜索不应该搜索名字 （？？）
        // delete preConditions.name;

        // inputValue这里是keyword。根据id搜索的话不需要关键字
        try {
          const response = await h_fkFetchOnceAsync(
            tableName,
            ["", { id: props.value }],
            actionName
          );
          if (loadedIsSubscribed) {
            setoptions(response);
          }
        } catch (error) {
          console.log("下拉列表为空", props.id, props.value, error);
        }
      }
    };

    // 根据输入内容读记录
    const handleFetchData = async (e) => {
      if (e.key === "Enter") {
        const keyword = inputRef.current.value;

        e.preventDefault();

        try {
          const response = await h_fkFetchOnceAsync(
            tableName,
            [keyword, preConditions],
            actionName
          );
          setoptions(response);
        } catch (error) {
          console.log("下拉列表为空", error);
        }
      }
    };

    // 有value就有hasDefault
    return (
      <MyCombobox
        {...props}
        options={options}
        onKeyDown={handleFetchData}
        inputRef={inputRef}
        hasDefault={!!props.value}
        label={<>{props.label} [回车搜索关键词]</>}
      />
    );
  }
);
// ================================================================================== Combobox Cascade
export const MyComboboxCascade = React.memo(
  ({ onLoaded = () => {}, ...props }) => {
    // 表名称； reducer里面的名称，默认dropdown
    // listenConditions是从creinoxForm传来的。用来做结联。如果值变了，就更新.
    const {
      id,
      tableName = "",
      preConditions = {},
      listenConditions = {},
      actionName,
    } = props;

    const [options, setoptions] = useState([]);
    const [loadedIsSubscribed, setLoadedIsSubscribed] = useState(true);

    // 结联用。从form传来的父节点:父节点值的集合。拆出父节点的值，用来监听值的变化
    const listenValues = [];
    Object.keys(listenConditions).map((k) => {
      listenValues.push(listenConditions[k]);
    });

    // 第一此打开
    const loadData = async () => {
      if (props.value) {
        // inputValue这里是keyword。根据id搜索的话不需要关键字
        try {
          const response = await h_fkFetchOnceAsync(
            tableName,
            ["", { id: props.value }],
            actionName
          );
          if (response && response.length > 0 && loadedIsSubscribed) {
            setoptions(list => [...list, ...response]);
          }
        } catch (error) {
          console.log("下拉列表为空", props.id, props.value, error);
        }
      }
      // 无论有没有默认，都通知外部读数据结束
      onLoaded(id);
    };

    // 为了从外部调用  export async function h_fkFetch(table, params=[], actionName="get_dropdown") {
    const fetchDropDown = async (tableName, listenValues) => {
      // 如果所有listen的值都是空的，就是空选项
      let hasValue = false;
      for (let i = 0; i < listenValues.length; i++) {
        if (listenValues[i]) {
          hasValue = true;
          break;
        }
      }

      if (!hasValue) {
        setoptions([]);
        return;
      }

      try {
        // 条件里的第一个{}，是pagination，因为后台所有dropdown第一个参数都是pagination。所以传一个空的满足它
        const response = await h_fkFetchOnceAsync(
          tableName,
          [{}, { ...preConditions, ...listenConditions }],
          actionName
        );

        // 详情页加载的和后来加载的合起来
        if (loadedIsSubscribed) {
          setoptions(list => _h_merge(list, response));
        }
      } catch (error) {
        console.log("下拉列表为空", error);
      }
    };

    // 每次更新监听值时加载
    useEffect(() => {
      setLoadedIsSubscribed(true);
      fetchDropDown(tableName, listenValues);
      return () => {
        setoptions([]);
        setLoadedIsSubscribed(false);
      };
    }, [tableName, ...listenValues]);

    // 第一次加载
    useEffect(() => {
      setLoadedIsSubscribed(true);
      loadData();
      return () => {
        setoptions([]);
        setLoadedIsSubscribed(false);
      };
    }, []);

    return <MyCombobox {...props} options={options} />;
  }
);

// ================================================================================== Combobox FK
export const MyComboboxFK = React.memo(({ onLoaded = () => {}, ...props }) => {
  // 表名称； reducer里面的名称，默认dropdown
  const {
    id,
    tableName = "",
    preConditions = {},
    stateName = "dropdown",
    actionName,
  } = props;

  const [options, setoptions] = useState([]);
  const [loadedIsSubscribed, setLoadedIsSubscribed] = useState(true);
  // 为了从外部调用

  // 第一此打开
  const loadData = async () => {
    if (props.value) {
      // inputValue这里是keyword。根据id搜索的话不需要关键字
      try {
        const response = await h_fkFetchOnceAsync(
          tableName,
          [{}, { id: props.value }],
          actionName
        );

        if (response && response.length > 0 && loadedIsSubscribed) {
          setoptions(list => [...list, ...response]);
        }
      } catch (error) {
        console.log("下拉列表为空", props.id, props.value, error);
      }
    }

    fetchDropDown();
    // 无论有没有默认，都通知外部读数据结束
    onLoaded(id);
  };

  const fetchDropDown = async () => {
    // 条件的第一个是pagination因为后台所有dropdown第一个参数都是pagination
    try {
      const response = await h_fkFetchOnce(
        tableName,
        stateName,
        [{}, preConditions],
        actionName
      );

      if (loadedIsSubscribed) {
        setoptions(list => _h_merge(list, response));
      }
    } catch (error) {
      console.log("下拉列表为空", props.id);
    }
  };

  useEffect(() => {
    setLoadedIsSubscribed(true);
    fetchDropDown();
    return () => {
      setoptions([]);
      setLoadedIsSubscribed(false);
    };
  }, [tableName, stateName]);

  useEffect(() => {
    setLoadedIsSubscribed(true);
    loadData();
    return () => {
      setoptions([]);
      setLoadedIsSubscribed(false);
    };
  }, []);

  return <MyCombobox {...props} options={options} />;
});

export const MyComboboxPack = React.memo((props) => {
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
export const MyComboboxPolishing = React.memo((props) => {
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
export const MyComboboxTexture = React.memo((props) => {
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
export const MyComboboxUnitType = React.memo((props) => {
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
export const MyComboboxShippingType = React.memo((props) => {
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
export const MyComboboxPricingTerm = React.memo((props) => {
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
export const MyComboboxCurrency = React.memo((props) => {
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

export const MyComboboxPaymentType = React.memo((props) => {
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

export const MyComboboxCommission = React.memo((props) => {
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

export const MyComboboxExpressCompany = React.memo((props) => {
  const commonTypeName = "expressCompany";
  return (
    <MyComboboxFK
      tableName="commonitem"
      stateName={`dropdown_${commonTypeName}`}
      preConditions={{ commonType: enums.commonType[commonTypeName] }}
      {...props}
    />
  );
});

// ============== helper
const _h_includeId = (id, list) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i]["id"] === id) {
      return true;
    }
  }
  return false;
};

const _h_merge = (listA, listB) => {

  const map = new Map()

  const list = [...listA, ...listB]

  for (let i = 0; i < list.length; i++) {
    const el = list[i];  

    if(el["id"]) {
      map.set(el["id"], el)
    }
  }

  return [...map.values()]
}

const _h_getId = (id, list) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i]["id"] === id) {
      return list[i];
    }
  }
  return [];
};
