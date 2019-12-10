import React from 'react';
import { Formik } from 'formik';

/**
 * actionSubmit: redux action passed from parent. When submitting, form will call: fn(data)
 * @param {*} props 
 */
const CreinoxForm = (props) => {

    const { children, dataModel, defaultValues, actionSubmit } = props;


    // Formik 要求的提交函数
    const submitForm = (values, actions) => {

        if (typeof(actionSubmit) === 'function') {
            actionSubmit(values);
        }
        // actions.setSubmitting(true); 提交中
        // actions.resetForm(); 成功后清空
        // actions.setSubmitting(false); 无论成功与否，提交完成
    }

    const initialValues = {};

    // 这是根据modal生成
    // Object.keys(dataModel && dataModel.columns).map((key, index) => {
    //     initialValues[key] = defaultValues[key] || "";
    // })

    // 如果传进来的defaultValue有一个id，也藏入提交的states里

    if (defaultValues && defaultValues.hasOwnProperty("id")) {
        initialValues.id = defaultValues.id;
    }

    // depends on what input components passed in, generate initialValues. 根据输入控件，生成state
    recursiveMap(children, (item) => {
        if (item.props && item.props.id && dataModel && dataModel.columns.hasOwnProperty(item.props.id) && defaultValues) {
            initialValues[item.props.id] = defaultValues[item.props.id] || "" ;
        }
    })

    return (<Formik
        initialValues={initialValues}
        validate={values => {
            let errors = {};
            if (2 === 1) { errors.id = '测试错误'; }
            return errors;
        }}
        onSubmit={submitForm}>
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>

                
                {recursiveMap(children, (item) => {
                    return injectedInputs(
                        {
                            item: item,
                            isInput: item.props && item.props.id && initialValues.hasOwnProperty(item.props.id),
                            handleChange: handleChange,
                            dataModel: dataModel,
                            values: values,
                        }
                    )
                })}
            </form>
        )}
    </Formik>
    )

}


const injectedInputs = ({ item, isInput, handleChange, dataModel, values }) => {

    let returnValue = item;
    if (!isInput) return returnValue;

    const columnId = item.props.id

    // TODO: 判断类型
    if (dataModel.columns[columnId]) {
        returnValue = React.cloneElement(item, {
            key: item.props.id,
            label: dataModel.columns[columnId].label,
            value: values[columnId],
            onChange: handleChange,
            fullWidth: true,
        });
    }

    return returnValue;
}

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