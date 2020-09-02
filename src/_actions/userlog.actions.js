import { USERLOG as CONST } from "_constants";
import { userlogService as service } from "_services";
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


export const userlogActions = {
  get_bySearch,
  get_byId,
  post_create,
  put_update,
  _delete,
  _clear
};
