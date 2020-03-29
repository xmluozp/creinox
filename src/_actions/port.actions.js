import { PORT as CONST } from "../_constants";
import { portService as service } from "../_services";
import {
  _am,
} from "./_actionsMaker";

const {
  get_dropdown,
  get_bySearch,
  get_byId,
  post_create,
  put_update,
  _delete
} = _am(CONST, service);


export const portActions = {
  get_dropdown,
  get_bySearch,
  get_byId,
  post_create,
  put_update,
  _delete
};
