import { PAYMENTREQUEST as CONST } from "_constants";
import { paymentrequestService as service } from "_services";
import {
  _am,
} from "./_actionsMaker";

const {
  get_bySearch,
  get_byId,
  post_create,
  put_update,
  _delete,
  _clear
} = _am(CONST, service);


export const paymentrequestActions = {
  get_bySearch,
  get_byId,
  post_create,
  put_update,
  _delete,
  _clear
};
