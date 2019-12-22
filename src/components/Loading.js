import React from "react";
import { connect } from "react-redux";
import { loadingActions } from "../_actions";
import nprogress from "nprogress";
import "nprogress/nprogress.css";

// will initialize dropdown tables, but only those tables with few data.

const Loading = ({ loadingBar }) => {
  React.useEffect(() => {
    switch (loadingBar) {
      case "loading":
        nprogress.start();
        break;

      default:
        nprogress.done();
        break;
    }
  }, [loadingBar]);

  return null;
};


// 从reducer来的
function mapState(state) {
  return { loadingBar: state.loadingData.status };
}

const mapDispatchToProps = {
  clearLoading: loadingActions.clear
};

export default connect(mapState, mapDispatchToProps)(Loading);
