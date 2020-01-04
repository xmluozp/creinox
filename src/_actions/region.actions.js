import { REGION as CONST } from "../_constants";
import { regionService as service } from "../_services";
import {
  _am
} from "./_actionsMaker";

const {
  get_dropdown,
  get_bySearch,
  get_treeNotesById,
  get_byId,
  post_create,
  put_update,
  _delete
} = _am(CONST, service);

// FETCH  ---------------------------------------------



export const regionActions = {
  get_dropdown,
  get_bySearch,
  get_byId,
  post_create,
  put_update,
  _delete,

  // customized
  get_treeNotesById
};