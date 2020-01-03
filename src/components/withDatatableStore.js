import React from "react";
import { connect } from "react-redux";


export const withDatatableStore = (
  Component, 
  dataState = {},
  fetchAction
  ) => {

  const WrappedComponent = props => {
    return <Component {...props}/>
  };

  // ============================================= Redux
  const actionCreators = {
    onGetBySearch: fetchAction, 
  };

  const mapState = state => {
    const dataStateNew = {}
    Object.keys(dataState).map((key) => {

      const paramValues = dataState[key].split(".")
      const dataSource =  state[paramValues[0]];
      const dataSourceKey = paramValues[1] || key;

      
      if (dataSource) {
        dataStateNew[key] = dataSource[dataSourceKey];
      }
      return null; 
    })    
    return dataStateNew;
  };

  const newComp = connect(
    mapState,
    actionCreators
  )(WrappedComponent);

  return newComp;
};
