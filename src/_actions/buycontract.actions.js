import { SELLCONTRACT as CONST } from "../_constants";
import { buycontractService as service } from "../_services";
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


export const buycontractActions = {
  get_dropdown,
  get_bySearch,
  get_byId,
  post_create,
  put_update,
  _delete
};
