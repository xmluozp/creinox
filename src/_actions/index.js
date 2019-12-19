// withFacelessActions("FACELESS", "faceless", {get_bySearch_url: "./dataset/xxxx.json"})
import { withFacelessActions } from "./faceless.actions";

export * from "./alert.actions";
export * from "./loading.actions";

export * from "./role.actions";
export * from "./user.actions";

export * from "./company.actions";

export * from "./product.actions";
export * from "./category.actions";

export const rostercontactActions = withFacelessActions(
  "ROSTERCONTACT",
  "rostercontact",
  { get_bySearch_url: "./dataset/rostercontact.json", get_byId_url: "./dataset/rostercontact_byId.json" }
);

export const bankaccountActions = withFacelessActions(
  "BANKACCOUNT",
  "bankaccount",
  { get_bySearch_url: "", get_byId_url: "" }
);
