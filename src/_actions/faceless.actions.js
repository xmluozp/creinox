import { withFacelessService } from "../_services";
import { constMaker } from "../_helper";
import {
  _am
} from "./_actionsMaker";

// facelessActions({xx,xx,xx})
export const withFacelessActions = (
  constPrefix = "FACELESS",
  tableName = "faceless",
  targetUrl = {
    get_bySearch_url: "",
    get_byId_url: "",
    post_create_url: "",
    put_update_url: "",
    _delete_url: ""
  }
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
    _delete
  } = _am(CONST, service);

  return {
    get_dropdown,
    get_bySearch,
    get_byId,
    post_create,
    put_update,
    _delete
  };
};
