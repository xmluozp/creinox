import { FINANCIALTRANSACTION as CONST } from "_constants";
import { financialtransactionService as service } from "_services";
import {
  _am,
} from "./_actionsMaker";

const {
  get_dropdown,
  get_bySearch,
  get_byId,
  post_create,
  put_update,
  _delete,
  _clear
} = _am(CONST, service);


export const financialtransactionActions = {
  get_dropdown,
  get_bySearch,
  get_byId,
  post_create,
  put_update,
  _delete,
  _clear
};
