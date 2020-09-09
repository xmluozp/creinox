import React, { useEffect, useState } from "react";
import { ICONS } from "../_constants/icons";
import { MyModalForm } from "./Modal";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { Button } from "reactstrap";
import { RESTURL } from "../config";
import { connect } from "react-redux";
import { printActions as dataActions } from "../_actions";
import { h_download } from "../_helper";

const Print = ({
  dataModel,
  onGet,
  onGetPdf,
  onRender,
  data,
  id,
  isSearchResult = false,
}) => {
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

    // 是搜索还是单页
    if (isSearchResult) {
      const path = `${RESTURL}/api/${file.Path}_print/list/${file.Path}/${file.FileName}`;
      // 这里用redux是因为要显示进度条
      onGetPdf(path, dataModel.dataStore);
    } else {
      const path = `${RESTURL}/api/${file.Path}_print/${id}/${file.Path}/${file.FileName}`;
      onGetPdf(path);
    }
  };

  const handleOnDownload = (file) => {
    if (isSearchResult) {
      const path = `${RESTURL}/api/${file.Path}_print/list/${file.Path}/${file.FileName}`;
      h_download(path, dataModel.dataStore);
    } else {
      const path = `${RESTURL}/api/${file.Path}_print/${id}/${file.Path}/${file.FileName}`;
      h_download(path);
    }
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
          <hr />
          {data && data.rows
            ? data.rows.map((obj, idx) => {
                return (
                  <Button
                    key={obj.Name}
                    style={{ margin: "0px 0px 0px 3px" }}
                    className={`btn btn-lb btn-secondary`}
                    onClick={handleOnDownload.bind(null, obj)}
                  >
                    {ICONS.DOWNLOAD("mr-1")}
                    {obj.FileName}
                  </Button>
                );
              })
            : null}
        </Grid>
      </Grid>
    </>
  );

  let PrintButton;
  if (onRender) {
    const newProps = {
      onClick: handleOnOpen.bind(null, true),
    };
    PrintButton = React.cloneElement(onRender, newProps);
  } else {
    PrintButton = (
      <IconButton
        aria-label="打印按钮"
        size="small"
        title="打印"
        onClick={handleOnOpen.bind(null, true)}
      >
        {ICONS.PRINT()}
      </IconButton>
    );
  }

  return dataModel && dataModel.template ? (
    <Grid item>
      {/* 按钮 */}
      {PrintButton}

      {/* modal */}
      <MyModalForm
        title="从xlsx模板打印或下载"
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
  onGetPdf: dataActions.get_pdf,
};

export default connect(mapState, actionCreators)(Print);
