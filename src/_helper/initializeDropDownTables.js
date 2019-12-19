import {userActions, roleActions} from '../_actions';
import store from './store';


export function h_initializeDropDownTables() {

    // trigger actions
    userActions.get_dropdown()(store.dispatch);
    roleActions.get_dropdown()(store.dispatch);    
}
