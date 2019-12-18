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
    Object.keys(dataState).map((value) => {
      const dataSource =  state[dataState[value]];
      if (dataSource) {
        dataStateNew[value] = dataSource.data;
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
