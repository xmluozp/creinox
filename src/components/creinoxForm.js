import React from "react";
import _ from "lodash";


/**
 * actionSubmit: redux action passed from parent. When submitting, form will call: fn(data)
 * @param {*} props
 */
export class CreinoxForm extends React.Component {
  constructor() {
    super();

    this.state = {
      isComponentLoaded: false
    };

    this.submitForm = this.submitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // 提交函数
  submitForm(e) {
    e.preventDefault();
    if (typeof this.props.actionSubmit === "function") {
      this.props.actionSubmit(this.state);
    }
  }

  // when change value
  handleChange(e, key, value, ...other) {
    if (key && typeof(value) !== 'undefined' ) { // 防止value本身是个boolean
      this.setState({ [key]: value });
    } else if (e.target && e.target.id) {
      this.setState({ [e.target.id]: e.target.value });
    }
  }

  // step 1/3: generate empty items ********************************************
  componentDidMount() {
    // set initial Values (empty)
    const initialValues = {};
    // 如果传进来的defaultValue有一个id，也藏入提交的states里
    const { children, defaultValues } = this.props;

    if (defaultValues && defaultValues.hasOwnProperty("id")) {
      initialValues.id = defaultValues.id;
    }

    recursiveMap(children, item => {
      if (item.props && item.props.inputid) {
        initialValues[item.props.inputid] = "";
      }
    });
    this.setState({
      isComponentLoaded: !this.props.hasDefault, // 如果表单是空的，直接显示加载完毕，否则等待加载
      ...initialValues
    });
  }

  // step 2/3: generate empty items ********************************************
  componentDidUpdate() {
    if (!this.state.isComponentLoaded && !_.isEmpty(this.props.defaultValues)) {
      // 默认表单不为空。表示加载完毕
      this.readValues();
    }
  }

  readValues() {
    const { defaultValues } = this.props;

    if (!this.state.isComponentLoaded) {
      const newState = {};

      // 查看默认值列表。如果有对应的key，就赋值
      Object.keys(defaultValues).map(value => {
        if (this.state.hasOwnProperty(value)) {
          newState[value] = defaultValues[value];
        }
        return null;
      });

      this.setState({
        isComponentLoaded: true,
        ...newState
      });
    }
  }

  render() {
    const { children, dataModel } = this.props;

    const values = this.state;
    const handleChange = this.handleChange.bind();

    if (!this.state.isComponentLoaded) {
      return "loading";
    } else {
      return (
        <form onSubmit={this.submitForm}>
          {recursiveMap(children, item => {
            const isInput =
              item.props && this.state.hasOwnProperty(item.props.inputid); // 是否输入控件
            return isInput
              ? injectedInputs(
                  // 如果是控件就注入，否则原样返回
                  {
                    item: item,
                    handleChange: handleChange,
                    dataModel: dataModel,
                    values: values
                  }
                )
              : item;
          })}
        </form>
      );
    }
  }
}

const injectedInputs = ({ item, handleChange, dataModel, values }) => {
  let returnValue = item;
  const columnId = item.props.inputid;

  // 判断类型，进行注入

  // 如果id 和model对得上号;
  if (dataModel.columns[columnId]) {
    // TODO: 判断component类型。不同类型注入不同的东西
    returnValue = React.cloneElement(item, {
      id: item.props.inputid,
      key: item.props.inputid,
      label: dataModel.columns[columnId].label,
      value: values[columnId],
      onChange: handleChange,
      fullWidth: true
    });
  }

  return returnValue;
};

// literate all children
function recursiveMap(children, fn) {
  return React.Children.map(children, child => {
    if (!React.isValidElement(child)) {
      return child;
    }

    if (child.props.children) {
      child = React.cloneElement(child, {
        children: recursiveMap(child.props.children, fn)
      });
    }

    return fn(child);
  });
}
