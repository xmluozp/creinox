import {userActions, roleActions, commonitemActions} from '../_actions';
import {enums} from '../_constants'
import store from './store';

// run from App.js
export function h_initializeDropDownTables() {

    // trigger actions
    userActions.get_dropdown()(store.dispatch);
    roleActions.get_dropdown()(store.dispatch);
    commonitemActions.get_dropdown({commonType:enums.commonType.currency})(store.dispatch);
    commonitemActions.get_dropdown({commonType:enums.commonType.pack})(store.dispatch);
    commonitemActions.get_dropdown({commonType:enums.commonType.polishing})(store.dispatch);
    commonitemActions.get_dropdown({commonType:enums.commonType.pricingTerm})(store.dispatch);
    commonitemActions.get_dropdown({commonType:enums.commonType.shippingType})(store.dispatch);
    commonitemActions.get_dropdown({commonType:enums.commonType.texture})(store.dispatch);
    commonitemActions.get_dropdown({commonType:enums.commonType.unitType})(store.dispatch);
    commonitemActions.get_dropdown({commonType:enums.commonType.paymentType})(store.dispatch);
    commonitemActions.get_dropdown({commonType:enums.commonType.paymentTypeE})(store.dispatch);
    commonitemActions.get_dropdown({commonType:enums.commonType.commission})(store.dispatch);


}
