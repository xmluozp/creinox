import React from "react";
import { Formik } from "formik";
import _ from "lodash";

/**
 * actionSubmit: redux action passed from parent. When submitting, form will call: fn(data)
 * @param {*} props
 */
export const CreinoxForm = props => {
  const { children, dataModel, defaultValues, actionSubmit, hasDefault = false } = props;

  // Formik 要求的提交函数
  const submitForm = (values, actions) => {
    if (typeof actionSubmit === "function") {
      actionSubmit(values);
    }
    // actions.setSubmitting(true); 提交中
    // actions.resetForm(); 成功后清空
    // actions.setSubmitting(false); 无论成功与否，提交完成
  };

  const initialValues = {};
  const isLoaded = !hasDefault || !_.isEmpty(defaultValues); // 没有默认值，或者默认值不为空

  // 这是根据modal生成
  // Object.keys(dataModel && dataModel.columns).map((key, index) => {
  //     initialValues[key] = defaultValues[key] || "";
  // })

  // 如果传进来的defaultValue有一个id，也藏入提交的states里
  if (defaultValues && defaultValues.hasOwnProperty("id")) {
    initialValues.id = defaultValues.id;
  }

  // depends on what input components passed in, generate initialValues. 根据输入控件，生成state
  // use "inputid" in case of name conflict with "id"

  if(isLoaded){
    recursiveMap(children, item => {
        if (
          item.props &&
          item.props.inputid &&
          dataModel &&
          dataModel.columns.hasOwnProperty(item.props.inputid)
        ) {
          initialValues[item.props.inputid] =
            (defaultValues && defaultValues[item.props.inputid]) || "";
        }
      });
  }



  if (!isLoaded) {
    return "loading";
  } else{
    return (
      <Formik
        initialValues={initialValues}
        validate={values => {
          let errors = {};
          if (2 === 1) {
            errors.id = "测试错误";
          }
          return errors;
        }}
        onSubmit={submitForm}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <form onSubmit={handleSubmit}>
            {recursiveMap(children, item => {
              const isInput =
                item.props && initialValues.hasOwnProperty(item.props.inputid);

              return isInput
                ? injectedInputs(
                    // 如果有id就注入，否则原样返回
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
        )}
      </Formik>
    );
  }
};

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

export default CreinoxForm;
