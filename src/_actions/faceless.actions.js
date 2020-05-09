import { withFacelessService } from "../_services";
import { constMaker } from "../_helper";
import {
  _am
} from "./_actionsMaker";

// facelessActions({xx,xx,xx})
export const withFacelessActions = (
  constPrefix = "FACELESS",
  tableName = "faceless",
  targetUrl = ""
) => {
  // 用function生成reducer用的const、 和后台交互用的service
  const CONST = constMaker(constPrefix);
  const service = withFacelessService(tableName, targetUrl);

  const {
    get_dropdown,
    get_bySearch,
    get_byId,
    post_create,
    put_update,
    _delete,
    _clear
  } = _am(CONST, service);

  return {
    get_dropdown,
    get_bySearch,
    get_byId,
    post_create,
    put_update,
    _delete,
    _clear
  };
};
