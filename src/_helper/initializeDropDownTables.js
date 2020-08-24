import {userActions, roleActions, portActions, commonitemActions} from '../_actions';
import {enums} from '_constants'
import store from './store';

// run from App.js
export function h_initializeDropDownTables() {

    // trigger actions
    userActions.get_dropdown()(store.dispatch);
    roleActions.get_dropdown()(store.dispatch);

    // portActions.get_dropdown()(store.dispatch); // 因为有两种port，不能在这里事先加载
    // commonitemActions.get_dropdown({commonType:enums.commonType.currency})(store.dispatch);
    // commonitemActions.get_dropdown({commonType:enums.commonType.pack})(store.dispatch);
    // commonitemActions.get_dropdown({commonType:enums.commonType.polishing})(store.dispatch);
    // commonitemActions.get_dropdown({commonType:enums.commonType.pricingTerm})(store.dispatch);
    // commonitemActions.get_dropdown({commonType:enums.commonType.shippingType})(store.dispatch);
    // commonitemActions.get_dropdown({commonType:enums.commonType.texture})(store.dispatch);
    // commonitemActions.get_dropdown({commonType:enums.commonType.unitType})(store.dispatch);
    // commonitemActions.get_dropdown({commonType:enums.commonType.paymentType})(store.dispatch);
    // commonitemActions.get_dropdown({commonType:enums.commonType.commission})(store.dispatch);
}

// 上面那个方法单独运行用
export function h_initializeDropDown(dpName) {
    commonitemActions.get_dropdown({commonType:enums.commonType[dpName]})(store.dispatch);
}