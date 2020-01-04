import { IMAGE as CONST } from "../_constants";
import { imageService as service } from "../_services";
import {
  _am
} from "./_actionsMaker";

const {
  get_dropdown,
  get_bySearch,
  get_byId,
  post_create,
  post_createMultiple,
  _delete,
  _deleteMultiple
} = _am(CONST, service);


// FETCH  ---------------------------------------------


export const imageActions = {
  get_dropdown,
  get_bySearch,
  get_byId,
  post_create,
  post_createMultiple,
  _delete,
  _deleteMultiple
};