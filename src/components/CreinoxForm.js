import React from "react";
import _, { isPlainObject } from "lodash";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { ICONS } from "_constants/icons";
import { _DATATYPES } from "_constants/_dataTypes";
import Print from "./Print";

/**
 * actionSubmit: redux action passed from parent. When submitting, form will call: fn(data)
 * @param {
 *
 * disabled         整个锁定。
 * renewToggle      刷新用
 * dataModel=       input根据这个来取label
 * defaultValues=   编时的默认值，从数据库取
 * preConditions =  新建时的，前提条件。比如产品类别
 * preStates =      提交的时候用来强行覆盖用户修改的值，一般用不到
 * isFromEdit =     编辑还是新建
 * actionSubmit=    提交。param 是表单的values
 * isHideTool=      隐藏工具条(复制粘贴打印)
 * listener =       监听值 {key : (value, this.state)=>{//execute}}。 监听是强关联，任何数据修改都会触发
 * } props
 */

// ============================================ 主控件
export class CreinoxForm extends React.Component {
  constructor(props) {
    super(props);
    this.renderTool = this.renderTool.bind(this);
    this.formRef = React.createRef();
    this.submitForm = this.submitForm.bind(this);
    this.clearLocalState = this.clearLocalState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOnLoading_BeginValuePass = this.handleOnLoading_BeginValuePass.bind(
      this
    );
    this.handleOnLoaded_FinishValuePass = this.handleOnLoaded_FinishValuePass.bind(
      this
    );
    this.checkMonitorIfFinished = this.checkMonitorIfFinished.bind(this);

    this.onCopy = this.onCopy.bind(this);
    this.onPaste = this.onPaste.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onListen = this.onListen.bind(this);

    const initialValues = {};
    const loadingMonitor = new Set();

    // preConditions 是新增用的，是前提条件
    const { isFromEdit, preConditions, children } = this.props;

    // 根据所有的input生成一个空表单。
    recursiveMap(children, (item) => {
      if (item.props && item.props.inputid) {
        initialValues[item.props.inputid] = "";
      }
    });

    const intialStates = { ...initialValues, ...preConditions };

    // 如果是详情页，顺便生成加载监控器
    if (isFromEdit) {
      Object.keys(intialStates).map((k) => {
        loadingMonitor.add(k);
      });
    }

    this.state = {
      loadingStep1ValuesCacheReady: !isFromEdit, // 详情页的value加载到state里
      loadingStep2ChildrenComponentMounted: true, // 子组件加载完成. 暂时用不到
      loadingStep3ValuesPassedToComponents: !isFromEdit, // 详情页的value是否全部加载到控件里.
      loadingMonitor, // 监控value是否全部加载到子组件
      ...intialStates,
    };
  }

  // 提交表单
  submitForm(e) {
    e.preventDefault();
    if (typeof this.props.actionSubmit === "function") {
      // preStates放后面不然会被一大堆 key:"" 的覆盖
      const submitValues = { ...this.state, ...this.props.preStates };
      this.clearLocalState(submitValues); // 删掉内部自己用的state

      this.props.actionSubmit(submitValues);
    }
  }

  // 更新子组件的值
  handleChange(e, key, value, ...other) {
    // console.log(key,typeof(value), e.target.value)
    let columnKey = "";
    let columnValue = "";

    if (key && typeof value !== "undefined") {
      // 防止value本身是个boolean
      columnKey = key;
      columnValue = value;
    } else if (e && e.target && e.target.id) {
      // 如果不属于dataModel的input
      columnKey = e.target.id;
      columnValue = e.target.value;
    }

    if (columnKey) {
      this.setState({ [columnKey]: columnValue });

      // 因为监听是强关联，如果是listen的key，就强行触发监听
      this.onListen(columnKey, columnValue);
    }
  }

  // ***************** form自身的listener。根据state为key触发的事件
  onListen(key, value) {
    if (
      this.props.listener &&
      this.props.listener[key] &&
      typeof this.props.listener[key] === "function"
    ) {
      this.props.listener[key](value, this.state);
    }
  }

  clearLocalState(values) {
    delete values.loadingStep1ValuesCacheReady;
    delete values.loadingStep2ChildrenComponentMounted;
    delete values.loadingStep3ValuesPassedToComponents;
    delete values.loadingMonitor;
  }

  // ***************** 把默认值加载到子组件里

  // --- 单个组件设置监控器
  handleOnLoading_BeginValuePass(columnName) {
    if (
      !(this.state.loadingMonitor && this.state.loadingMonitor.has(columnName))
    ) {
      this.setState((oldState) => {
        const { loadingMonitor } = oldState;
        const newLoadingMonitor = new Set(loadingMonitor);
        newLoadingMonitor.add(columnName);
        return { loadingMonitor: newLoadingMonitor };
      });
    }
  }

  // --- 单个组件加载完成删掉监控器
  handleOnLoaded_FinishValuePass(columnName) {
    const { loadingMonitor } = this.state;
    if (loadingMonitor && loadingMonitor.has(columnName)) {
      this.setState(
        (oldState) => {
          const { loadingMonitor } = oldState;
          const newLoadingMonitor = new Set([...loadingMonitor]);
          newLoadingMonitor.delete(columnName);
          return { loadingMonitor: newLoadingMonitor };
        },
        () => {
          this.checkMonitorIfFinished();
        }
      );
    }
  }

  // --- 如果所有监视完成. 加载完成
  checkMonitorIfFinished() {
    if (
      this.state.loadingMonitor &&
      this.state.loadingMonitor.size === 0 &&
      !this.state.loadingStep3ValuesPassedToComponents
    ) {
      this.setState({ loadingStep3ValuesPassedToComponents: true });
    }
  }

  //  ***************** 复制粘贴form的内容到localstorage
  // fid: unique name of form. 比如 sellcontract
  onCopy() {
    const { dataModel } = this.props;
    let newState = { ...this.state };
    this.clearLocalState(newState); // 删掉内部自己用的state

    // 图片类型和图库不参与复制粘贴
    Object.keys(dataModel.columns).map((value) => {
      if (
        newState.hasOwnProperty(value) &&
        (dataModel.columns[value].type === _DATATYPES.IMAGE ||
          dataModel.columns[value].type === _DATATYPES.GALLERY ||
          dataModel.columns[value].type === _DATATYPES.ROW) //因为图片展示时候会读到.row里面。这个不需要复制
      ) {
        delete newState[value];
      }
      return null;
    });

    copy(dataModel, newState)
  }

  onPaste() {
    const { dataModel } = this.props;

    let newState = JSON.parse(
      localStorage.getItem("form." + dataModel.dataStore)
    );

    if (newState) {
      this.setState(newState);
    }
  }

  onCancel() {
    let newState = this.props.defaultValues;

    if (newState) {
      this.setState(newState);
    }
  }

  // step 1/3: generate empty items ******************************************** Form自己加载完毕
  componentDidMount() {
    // preConditions 是新增用的，是前提条件
    const { onGetInjector, onGetRef } = this.props;

    // 设置外部injector
    if (typeof onGetInjector === "function") {
      onGetInjector(() => (injectItemFromOutside, callBack = () => {}) => {
        // 如果数据还没进入子组件，就不要允许任何外部修改
        if (!this.state.loadingStep3ValuesPassedToComponents) {
          return;
        }

        let newState = {};

        // 假如注入的是一个function
        if (typeof injectItemFromOutside === "function") {
          newState = injectItemFromOutside(this.state);
        } else if (
          injectItemFromOutside &&
          typeof injectItemFromOutside === "object"
        ) {
          Object.keys(injectItemFromOutside).map((key) => {
            // 20200811: 不知道为何之前要限制只能注入已有的，所以去掉了
            // if (this.state.hasOwnProperty(value)) {
            newState[key] = injectItemFromOutside[key];

            // 触发listener
            this.onListen(key, injectItemFromOutside[key]);
            // }

            return null;
          });
        }

        // 可以通过这样继续处理inject: inject(values, (newValues)=> { inject(xxx) })  callback hell，以后改进
        this.setState(newState, () => {
          if (typeof callBack === "function") {
            callBack(this.state);
          }
        });
      });
    }

    if (typeof onGetRef === "function") {
      onGetRef(() => {
        return this;
      });
    }
  }

  // 返回值会出现在下面的componentDidUpdate() 的参数 snapshot 里面. 用 renewToggle 来刷新用：
  getSnapshotBeforeUpdate(prevProps) {
    if (
      prevProps.renewToggle !== this.props.renewToggle &&
      this.props.defaultValues
    ) {
      const newState = this.props.defaultValues; // TODO: preConditions？
      return newState;
    }

    return null;
  }

  // step 2/3: generate empty items ********************************************
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { defaultValues, isFromEdit } = this.props;
    const { loadingStep1ValuesCacheReady } = this.state;

    if (snapshot) {
      // 如果是从toggle触发的更新，就用defaultValues覆盖state. 忽略cache
      this.readValues(snapshot);
    }
    // 第一次加载的时候，如果是详情页，还未cache，有默认值，就把defaultValues给cache到state里
    else if (
      isFromEdit &&
      !loadingStep1ValuesCacheReady &&
      !_.isEmpty(defaultValues)
    ) {
      // 设置默认值，触发更新，更新前查 loadingStep1ValuesCacheReady 。如果还没加载过就把默认值塞进state
      this.readValues(defaultValues);
    }
  }

  // 如果是详情页则运行以下代码：加载详情页数据，放在state里
  readValues(defaultValues) {
    const { dataModel } = this.props;
    const newState = {};

    // 查看默认值列表。如果有对应的key，就赋值
    Object.keys(defaultValues).map((key) => {
      if (this.state.hasOwnProperty(key)) {
        newState[key] = defaultValues[key];
      }

      // 因为监听是强关联，如果是listen的key，就强行触发监听
      this.onListen(key, defaultValues[key]);

      // 如果是row，顺便记录源id
      if (
        dataModel &&
        dataModel["columns"][key] &&
        dataModel["columns"][key].type === _DATATYPES.ROW
      ) {
        const sourceIdName = key.split(".")[0];
        newState[sourceIdName] = defaultValues[sourceIdName];
      }

      return null;
    });

    if (defaultValues && defaultValues.hasOwnProperty("id")) {
      newState.id = defaultValues.id;
    }

    this.setState({
      loadingStep1ValuesCacheReady: true,
      ...newState,
    });
  }

  renderTool() {
    const { dataModel, toolBar, isFromEdit, disabled } = this.props;
    const isHideTool = toolBar && toolBar.isHidding;
    const buttons = toolBar && toolBar.buttons;

    const renderButtons = [];

    // if(buttons && buttons.length > 0) {
    //   for (let i = 0; i < buttons.length; i++) {
    //     const el = buttons[i];
    //     renderButtons.push( i => el)
    //   }
    // }

    if(buttons && buttons.length > 0) {
      for (let i = 0; i < buttons.length; i++) {
        const el = buttons[i];
          renderButtons.push(
            el
          )
      }
    }

    // 复制按钮
    if (!isHideTool && dataModel) {
      renderButtons.push(<IconButton
            aria-label="expand row"
            size="small"
            title="复制"
            onClick={this.onCopy}
          >
            {ICONS.COPY()}
          </IconButton>);
    }

    // 粘贴按钮
    if (!isHideTool && dataModel && !disabled) {
      renderButtons.push(<IconButton
            aria-label="expand row"
            size="small"
            title="粘贴"
            onClick={this.onPaste}
          >
            {ICONS.PASTE()}
          </IconButton>);
    }

    if (!isHideTool && dataModel && !disabled && isFromEdit) {
      renderButtons.push(<IconButton
            aria-label="expand row"
            size="small"
            title="刷新"
            onClick={this.onCancel}
          >
            {ICONS.REFRESH()}
          </IconButton>);
    }

    // 打印按钮
    if (dataModel && dataModel.template) {
      renderButtons.push( <Print dataModel={dataModel} id={this.state.id} />);
    }

    if(renderButtons.length === 0) return null

    // 工具条
    return (
      <div
        style={{
          margin: 5,
          marginBottom: 10,
        }}
      >
        <Grid
          mb={5}
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
          style={{
            backgroundColor: "#f0f3f5",
            border: "1px solid #c5d2db",
            borderRadius: 15,
          }}
        >  {renderButtons.map((item,i)=> {
            return <Grid item style={{ marginRight: 10 }} key={"toolbar"+i}>
              {item}
            </Grid>})}


        </Grid>
      </div>
    );
  }

  render() {
    const {
      children,
      dataModel,
      errors,
      isHideTool,
      isEnglish,
      isFromEdit,
      disabled,
    } = this.props;
    const values = this.state;
    const handleChange = this.handleChange;

    // 如果defaultValues cache完毕，或者如果不是编辑模式。否则显示读取中
    if (isFromEdit && !this.state.loadingStep1ValuesCacheReady) {
      return "loading";
    } else {
      return (
        <form
          ref={this.formRef}
          onSubmit={this.submitForm}
          onKeyDown={(e) => {
            if (e.ctrlKey && e.which === 83) {
              this.submitForm(e);
            }

            if (e.target.type !== "textarea" && e.which === 13 /* Enter */) {
              e.preventDefault();
            }
          }}
        >
          {this.renderTool()}

          {recursiveMap(children, (item) => {
            // 遍历所有的components
            const isInput =
              item.props && this.state.hasOwnProperty(item.props.inputid); // 是否输入控件
            const isFiltered =
              item.props && typeof item.props.onShow === "function"; // 是否有onshow方法

            const disabledItem = item.props.disabled || disabled;

            if (isInput) {
              const isListen = item.props && item.props.listen;

              // 结联 ============== cascade用
              const listenConditions = {};
              // 如果监听对象数组不为空，就把监听对象的键值对的数组传进控件。控制更新在控件内部做
              // 20200518 监听不应该是数组，而是键值对，键是源控件的column名，值是搜目标表格用的column名
              const listen = isListen ? item.props.listen : {};
              const listenList = Object.keys(listen);
              if (listenList.length > 0) {
                for (let i = 0; i < listenList.length; i++) {
                  const key = listenList[i];
                  if (values.hasOwnProperty(key)) {
                    listenConditions[listen[key]] = values[key];
                  }
                }
              }
              // ===================

              // 如果是控件就注入，否则原样返回
              const columnId = item.props.inputid;
              const isError =
                errors &&
                errors.message &&
                errors.message.hasOwnProperty(columnId);
              const errorMessage =
                errors && errors.message && errors.message[columnId];

              const injectProps = {
                item,
                isError,
                errorMessage, // 从props取到的返回错误信息
                handleChange,
                dataModel,
                value: values[columnId],
                isEnglish,
                parent: this,
                disabled: disabledItem,
              };

              if (isListen) injectProps.listenConditions = listenConditions;

              // 传入整体的值
              injectProps.values = values;

              return injectedInputs(injectProps);
            } else if (isFiltered) {
              // 有onShow方法，显示的值直接用onShow方法来
              return injectedInputs({
                item: item,
                value: item.props.onShow(values),
                parent: this,
                disabled: disabledItem,
              });
            } else {
              return item;
            }
          })}
        </form>
      );
    }
  }
}

// 处理所有属于dataModel的控件
const injectedInputs = ({
  item,
  handleChange,
  dataModel,
  value,
  isError,
  errorMessage = "",
  listenConditions,
  isEnglish,
  values, // 取其他值用
  parent,
  disabled,
}) => {
  let returnValue = item;
  const columnId = item.props && item.props.inputid;
  let newProps;
  // 判断类型，进行注入

  let onChangeFunc;
  let onChange;

  if (item.props.onChange && typeof item.props.onChange === "function") {
    onChangeFunc = item.props.onChange;
  } else {
    onChangeFunc = handleChange;
  }

  // 如果有伴生的onChange，在执行onChange后执行它
  if (
    item.props.onChangeSideEffect &&
    typeof item.props.onChangeSideEffect === "function"
  ) {
    onChange = (...params) => {
      onChangeFunc(...params);
      item.props.onChangeSideEffect(...params);
    };
  } else {
    // 外部的onChange比默认的优先级更高
    onChange = onChangeFunc;
  }

  // 不是model的；非控制的控件也通用的属性
  newProps = {
    value,
    fullWidth: true,
    disabled,
  };

  // 只有model的；专有的属性： 如果id 和model对得上号;
  if (dataModel && dataModel.columns[columnId]) {
    // TODO: 判断component类型。不同类型注入不同的东西
    newProps = {
      ...newProps,
      id: columnId,
      key: columnId,
      label: item.props.label
        ? item.props.label
        : isEnglish && dataModel.columns[columnId].elabel
        ? dataModel.columns[columnId].elabel
        : dataModel.columns[columnId].label, // 判断是否显示英文版的label
      dataType: dataModel.columns[columnId].type,
      dataModeltableName: dataModel.table,
      error: isError,
      helperText: errorMessage,
      onChange,
      listenConditions,
    };

    // 如果是ROW类型，注入源columnName以后备用。
    if (newProps.dataType === _DATATYPES.ROW) {
      newProps.sourceId = item.props.sourceId || values[columnId.split(".")[0]];
    }

    // 子组件用以通知此组件数据是否加载完成
    newProps.onLoading = parent.handleOnLoading_BeginValuePass;
    newProps.onLoaded = parent.handleOnLoaded_FinishValuePass;
  }

  returnValue = React.cloneElement(item, newProps);

  return returnValue;
};

// literate all children
function recursiveMap(children, fn) {
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      return child;
    }

    if (child.props.children) {
      child = React.cloneElement(child, {
        children: recursiveMap(child.props.children, fn),
      });
    }

    return fn(child);
  });
}

export function copy(dataModel, newState) {

  localStorage.setItem(
    "form." + dataModel.dataStore,
    JSON.stringify(newState)
  );
}


// export class CreinoxForm extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       loadingStep1ValuesCacheReady: false
//     };

//     this.submitForm = this.submitForm.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//   }

//   // 提交函数
//   submitForm(e) {
//     e.preventDefault();
//     if (typeof this.props.actionSubmit === "function") {
//       this.props.actionSubmit({ ...this.state, ...this.props.preStates });
//     }
//   }

//   // when change value
//   handleChange(e, key, value, ...other) {
//     if (key && typeof value !== "undefined") {
//       // 防止value本身是个boolean
//       this.setState({ [key]: value });
//     } else if (e.target && e.target.id) {
//       this.setState({ [e.target.id]: e.target.value });
//     }
//   }

//   // step 1/3: generate empty items ********************************************
//   componentDidMount() {
//     // preConditions 是新增用的，是前提条件
//     const { isFromEdit, preConditions } = this.props;

//     // set initial Values (empty)
//     const initialValues = {};

//     // 根据所有的input生成一个空表单
//     const { children } = this.props;

//     recursiveMap(children, item => {
//       if (item.props && item.props.inputid) {
//         initialValues[item.props.inputid] = "";
//       }
//     });

//     this.setState({
//       loadingStep1ValuesCacheReady: !isFromEdit, // 如果表单是空的，直接显示加载完毕，否则等待加载
//       ...initialValues,
//       ...preConditions
//     });
//   }

//   getSnapshotBeforeUpdate(prevProps) {

//     // console.log("renew?")
//     // 如果是编辑模式
//     if (
//       prevProps.renewToggle !== this.props.renewToggle &&
//       this.props.defaultValues &&
//       this.props.isFromEdit
//     ) {
//       const newState = this.props.defaultValues;
//       return newState;
//     }

//     // 如果是新建模式
//     if (
//       prevProps.renewToggle !== this.props.renewToggle &&
//       this.props.defaultValues &&
//       !this.props.isFromEdit
//     ) {
//       const newState = this.props.defaultValues;
//       return newState;
//     }

//     return null;
//   }

//   // step 2/3: generate empty items ********************************************
//   componentDidUpdate(prevProps, prevState, snapshot) {
//     if (
//       !this.state.loadingStep1ValuesCacheReady &&
//       !_.isEmpty(this.props.defaultValues)
//     ) {
//       // 默认表单不为空。表示加载完毕
//       this.readValues();
//     }

//     if (snapshot) {
//       this.setState({
//         loadingStep1ValuesCacheReady: true,
//         ...snapshot
//       });
//     }
//   }

//   readValues() {
//     const { defaultValues } = this.props;

//     if (!this.state.loadingStep1ValuesCacheReady) {
//       const newState = {};

//       // 查看默认值列表。如果有对应的key，就赋值
//       Object.keys(defaultValues).map(value => {
//         if (this.state.hasOwnProperty(value)) {
//           newState[value] = defaultValues[value];
//         }
//         return null;
//       });

//       if (defaultValues && defaultValues.hasOwnProperty("id")) {
//         newState.id = defaultValues.id;
//       }

//       this.setState({
//         loadingStep1ValuesCacheReady: true,
//         ...newState
//       });
//     }
//   }

//   render() {
//     const { children, dataModel, errors } = this.props;

//     const values = this.state;
//     const handleChange = this.handleChange.bind();

//     if (!this.state.loadingStep1ValuesCacheReady) {
//       return "loading";
//     } else {
//       return (
//         <form onSubmit={this.submitForm}>
//           {recursiveMap(children, item => {
//             // 遍历所有的components
//             const isInput =
//               item.props && this.state.hasOwnProperty(item.props.inputid); // 是否输入控件

//             if (isInput) {
//               // 如果是控件就注入，否则原样返回
//               const columnId = item.props.inputid;
//               const isError = errors && errors.hasOwnProperty(columnId);
//               const errorMessage = errors && errors[columnId];

//               return injectedInputs({
//                 item: item,
//                 isError: isError,
//                 errorMessage: errorMessage, // 从props取到的返回错误信息
//                 handleChange: handleChange,
//                 dataModel: dataModel,
//                 value: values[columnId]
//               });
//             } else {
//               return item;
//             }
//           })}
//         </form>
//       );
//     }
//   }
// }
