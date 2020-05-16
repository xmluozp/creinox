import React from "react";
import _ from "lodash";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { ICONS } from "../_constants/icons";

/**
 * actionSubmit: redux action passed from parent. When submitting, form will call: fn(data)
 * @param {
 *
 * dataModel=       input根据这个来取label
 * defaultValues=   编时的默认值，从数据库取
 * preConditions =  新建时的，前提条件。比如产品类别
 * isFromEdit =     编辑还是新建
 * actionSubmit=    提交。param 是表单的values
 * } props
 */

// ============================================ 主控件
export class CreinoxForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isComponentLoaded: false,
    };
    this.renderTool = this.renderTool.bind(this);

    this.formRef = React.createRef();
    this.submitForm = this.submitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onCopy = this.onCopy.bind(this);
    this.onPaste = this.onPaste.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onPrint = this.onPrint.bind(this);


    
  }

  // 提交函数
  submitForm(e) {
    e.preventDefault();
    if (typeof this.props.actionSubmit === "function") {
      // preStates放后面不然会被一大堆 key:"" 的覆盖
      const submitValues = { ...this.state, ...this.props.preStates };
      delete submitValues.isComponentLoaded;
      this.props.actionSubmit(submitValues);
    }
  }

  // when change value
  handleChange(e, key, value, ...other) {
    // console.log(key,typeof(value), e.target.value)
    if (key && typeof value !== "undefined") {
      // 防止value本身是个boolean
      this.setState({ [key]: value });
    } else if (e.target && e.target.id) {
      this.setState({ [e.target.id]: e.target.value });
    }
  }

  //  ***************** 复制粘贴form的内容到localstorage
  // fid: unique name of form. 比如 sellcontract
  onCopy() {
    const { dataModel } = this.props;
    let newState = { ...this.state };
    delete newState.isComponentLoaded;
    localStorage.setItem("form." + dataModel.table, JSON.stringify(newState));
  }

  onPaste() {
    const { dataModel } = this.props;

    let newState = JSON.parse(localStorage.getItem("form." + dataModel.table));

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

  onPrint() {

    const { dataModel } = this.props;
    console.log("print", dataModel.printTemplate)
  }

  // step 1/3: generate empty items ********************************************
  componentDidMount() {
    // preConditions 是新增用的，是前提条件
    const { isFromEdit, preConditions, onGetInjector, onGetRef } = this.props;

    // set initial Values (empty)
    const initialValues = {};

    // 根据所有的input生成一个空表单
    const { children } = this.props;

    recursiveMap(children, (item) => {
      if (item.props && item.props.inputid) {
        initialValues[item.props.inputid] = "";
      }
    });

    this.setState({
      isComponentLoaded: !isFromEdit, // 如果表单是空的，直接显示加载完毕，否则等待加载
      ...initialValues,
      ...preConditions,
    });

    if (typeof onGetInjector === "function") {
      onGetInjector(() => (newValues) => {
        const newState = {};
        Object.keys(newValues).map((value) => {
          if (this.state.hasOwnProperty(value)) {
            newState[value] = newValues[value];
          }
          return null;
        });
        this.setState(newState);
      });
    }

    if (typeof onGetRef === "function") {
      onGetRef(() => {
        return this;
      });
    }
  }

  getSnapshotBeforeUpdate(prevProps) {
    // 如果是编辑模式
    if (
      prevProps.renewToggle !== this.props.renewToggle &&
      this.props.defaultValues &&
      this.props.isFromEdit
    ) {
      const newState = this.props.defaultValues;
      return newState;
    }

    // 如果是新建模式
    if (
      prevProps.renewToggle !== this.props.renewToggle &&
      this.props.defaultValues &&
      !this.props.isFromEdit
    ) {
      const newState = this.props.defaultValues;
      return newState;
    }

    return null;
  }

  // step 2/3: generate empty items ********************************************
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!this.state.isComponentLoaded && !_.isEmpty(this.props.defaultValues)) {
      // 默认表单不为空。表示加载完毕
      this.readValues();
    }

    if (snapshot) {
      this.setState({
        isComponentLoaded: true,
        ...snapshot,
      });
    }
  }

  readValues() {
    const { defaultValues } = this.props;
    if (!this.state.isComponentLoaded) {
      const newState = {};

      // 查看默认值列表。如果有对应的key，就赋值
      Object.keys(defaultValues).map((value) => {
        if (this.state.hasOwnProperty(value)) {
          newState[value] = defaultValues[value];
        }
        return null;
      });

      if (defaultValues && defaultValues.hasOwnProperty("id")) {
        newState.id = defaultValues.id;
      }

      this.setState({
        isComponentLoaded: true,
        ...newState,
      });
    }
  }

  renderTool() {
    const { dataModel, isHideTool, isFromEdit } = this.props;

    return (
      <Box mb={2}>
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
          spacing={2}
        >
          {/* 如果需要显示copytool，就在这里显示 */}
          {!isHideTool ? (
            <>
              <Grid item>
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={this.onCopy}
                >
                  {ICONS.COPY()}
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={this.onPaste}
                >
                  {ICONS.PASTE()}
                </IconButton>
              </Grid>
              {isFromEdit ? (
                <Grid item>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={this.onCancel}
                  >
                    {ICONS.REFRESH()}
                  </IconButton>
                </Grid>
              ) : null}
            </>
          ) : null}
          {dataModel && dataModel.printTemplate ? (
            <Grid item>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={this.onPrint}
              >
                {ICONS.PRINT()}
              </IconButton>
            </Grid>
          ) : null}
        </Grid>
      </Box>
    );
  }

  render() {
    const { children, dataModel, errors, isHideTool } = this.props;
    const values = this.state;
    const handleChange = this.handleChange;

    if (!this.state.isComponentLoaded) {
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
          {(!isHideTool && dataModel) || dataModel.printTemplate
            ? this.renderTool()
            : null}

          {recursiveMap(children, (item) => {
            // 遍历所有的components
            const isInput =
              item.props && this.state.hasOwnProperty(item.props.inputid); // 是否输入控件
            const isFiltered =
              item.props && typeof item.props.onShow === "function";

            // 结联 ==============
            const listenConditions = {}
            // 如果监听对象数组不为空，就把监听对象的键值对的数组传进控件。控制更新在控件内部做
            const listen = item.props && item.props.listen ? item.props.listen : []
            if(listen.length > 0) {
              for (let i = 0; i < listen.length; i++) {
                const listenColumnName = listen[i]
                if(values.hasOwnProperty(listenColumnName)) {
                  listenConditions[listenColumnName] = values[listenColumnName]
                }                
              }
            }
            // ===================

            if (isInput) {
              // 如果是控件就注入，否则原样返回
              const columnId = item.props.inputid;
              const isError =
                errors &&
                errors.message &&
                errors.message.hasOwnProperty(columnId);
              const errorMessage =
                errors && errors.message && errors.message[columnId];

              return injectedInputs({
                item: item,
                isError: isError,
                errorMessage: errorMessage, // 从props取到的返回错误信息
                handleChange: handleChange,
                dataModel: dataModel,
                value: values[columnId],
                listenConditions: listenConditions,
              });
            } else if (isFiltered) {
              return injectedInputs({
                item: item,
                value: item.props.onShow(values),
                listenConditions: listenConditions,
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

const injectedInputs = ({
  item,
  handleChange,
  dataModel,
  value,
  isError,
  errorMessage = "",
  listenConditions,
}) => {
  let returnValue = item;
  const columnId = item.props && item.props.inputid;

  // 判断类型，进行注入

  // 如果id 和model对得上号;
  if (dataModel && dataModel.columns[columnId]) {
    // 外部的onChange比默认的优先级更高
    const onChange = item.props.onChange ? item.props.onChange : handleChange;

    // TODO: 判断component类型。不同类型注入不同的东西
    returnValue = React.cloneElement(item, {
      id: columnId,
      key: columnId,
      label: dataModel.columns[columnId].label,
      dataType: dataModel.columns[columnId].type,
      error: isError,
      helperText: errorMessage,
      value: value,
      onChange: onChange,
      fullWidth: true,
      listenConditions: listenConditions
    });
  } else {
    // 不是model的；非控制的控件
    returnValue = React.cloneElement(item, {
      value: value,
      fullWidth: true,
      listenConditions: listenConditions
    });
  }

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

// export class CreinoxForm extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       isComponentLoaded: false
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
//       isComponentLoaded: !isFromEdit, // 如果表单是空的，直接显示加载完毕，否则等待加载
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
//       !this.state.isComponentLoaded &&
//       !_.isEmpty(this.props.defaultValues)
//     ) {
//       // 默认表单不为空。表示加载完毕
//       this.readValues();
//     }

//     if (snapshot) {
//       this.setState({
//         isComponentLoaded: true,
//         ...snapshot
//       });
//     }
//   }

//   readValues() {
//     const { defaultValues } = this.props;

//     if (!this.state.isComponentLoaded) {
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
//         isComponentLoaded: true,
//         ...newState
//       });
//     }
//   }

//   render() {
//     const { children, dataModel, errors } = this.props;

//     const values = this.state;
//     const handleChange = this.handleChange.bind();

//     if (!this.state.isComponentLoaded) {
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
