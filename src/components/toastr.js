import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { connect } from 'react-redux'
import { alertActions } from '../_actions'

// modified from coreUI
class Toastr extends Component {
    constructor(props) {
        super(props);

        this.notify = this.notify.bind(this);
        this.error = this.error.bind(this);
        this.success = this.success.bind(this);
        this.info = this.info.bind(this);
        this.warn = this.warn.bind(this);
        this.clear = this.clear.bind(this);
    }

    notify(message) {
        // default type
        return toast(message);
    }
    error(message) {
        // add type: 'error' to options
        return toast.error(message);
    }
    success(message) {
        // add type: 'success' to options
        // positioning: https://github.com/fkhadra/react-toastify#positioning-toast
        return toast.success(message);
    }
    info(message) {
        // add type: 'info' to options
        return toast.info(message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: false

        });
    }

    warn(message) {
        // add type: 'warning' to options
        return toast.warn(message);
    }
    clear() {
        // Remove all toasts !
        return toast.dismiss();
    }
    componentDidUpdate () {

        const { alertStatus, alertMessage } = this.props;

        switch (alertStatus) {
            case 'notify':
                this.notify(alertMessage || "");
                break;
            case 'error':
                this.error(alertMessage || "");
                break;
            case 'success':
                this.success(alertMessage || "");
                break;
            case 'info':
                this.info(alertMessage || "");
                break;
            case 'warn':
                this.warn(alertMessage || "");
                break;
            default:
                break;
        }

    }

    render() {
        const containerStyle = {
            zIndex: 1999
        };

        return (
            <div className="animated">
                <ToastContainer position="top-right" autoClose={5000} style={containerStyle} />
            </div>
        );
    }
}
// ============================================= Redux
function mapState(state) {
    return {
        alertStatus: state.alertData.status,
        alertMessage: state.alertData.message,
        alertToggle: state.alertData.toggle,
    };
}

const actionCreators = {
    onClear: alertActions.clear,
};

export default connect(mapState, actionCreators)(Toastr);