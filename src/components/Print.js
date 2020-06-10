import React, { useEffect, useState } from "react";
import { ICONS } from "../_constants/icons";
import { MyModalForm } from "./Modal";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { Button } from "reactstrap";
import { RESTURL } from "../config";
import { connect } from "react-redux";
import { printActions as dataActions } from "../_actions";
import {  h_download, h_popfile, h_pdf} from "../_helper"

const Print = ({ dataModel, onGet, data, id }) => {
  const [state, setstate] = useState({
    isOpen: false,
  });

  useEffect(() => {
    if (dataModel.template && state.isOpen) {
      onGet(dataModel.template);
    }
  }, [onGet, state.isOpen]);

  const handleOnOpen = (isOpen) => {
    setstate({ isOpen: isOpen });
  };

  const handleOnPrint = (file) => {

    const path = `${RESTURL}/api/${file.Path}_print/${id}/${file.Path}/${file.Name}`;
    h_pdf(path);
  };

  // 链接
  const component = (
    <>
      <Grid container spacing={2}>
        <Grid item>
          {data && data.rows
            ? data.rows.map((obj, idx) => {
                return (
                  <Button
                    key={obj.Name}
                    style={{ margin: "0px 0px 0px 3px" }}
                    className={`btn btn-lb btn-secondary`}
                    onClick={handleOnPrint.bind(null, obj)}
                  >
                    {ICONS.PRINT("mr-1")}
                    {obj.Name}
                  </Button>
                );
              })
            : null}
        </Grid>
      </Grid>
    </>
  );

  return dataModel && dataModel.template ? (
    <Grid item>
      {/* 按钮 */}
      <IconButton
        aria-label="expand row"
        size="small"
        onClick={handleOnOpen.bind(null, true)}
      >
        {ICONS.PRINT()}
      </IconButton>

      {/* modal */}
      <MyModalForm
        title="选择打印模板"
        isOpen={state.isOpen}
        onClose={handleOnOpen.bind(null, false)}
        component={component}
      ></MyModalForm>
    </Grid>
  ) : null;
};

// ============================================= Redux

function mapState(state) {
  return {
    data: state.printData.data,
  };
}

const actionCreators = {
  onGet: dataActions.get,
};

export default connect(mapState, actionCreators)(Print);
