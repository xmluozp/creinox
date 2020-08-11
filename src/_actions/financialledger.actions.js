import { FINANCIALLEDGER as CONST } from "_constants";
import { financialledgerService as service } from "_services";
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
  _delete_treeNode,
  _clear
} = _am(CONST, service);

// FETCH  ---------------------------------------------



export const financialledgerActions = {
  get_dropdown,
  get_bySearch,
  get_byId,
  post_create,
  put_update,
  _delete_treeNode,
  _clear,

  // customized
  get_treeNotesById
};