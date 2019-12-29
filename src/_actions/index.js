// withFacelessActions("FACELESS", "faceless", {get_bySearch_url: "./dataset/xxxx.json"}). 
// have also handled services
import { withFacelessActions } from "./faceless.actions";

export * from "./alert.actions";
export * from "./loading.actions";
export * from "./commonitem.actions";
export * from "./image.actions";

export * from "./role.actions";
export * from "./user.actions";

export * from "./company.actions";
export * from "./region.actions";

export * from "./product.actions";
export * from "./category.actions";

// faceless pages
export const productpurchaseActions = withFacelessActions(
  "PRODUCTPURCHASE",
  "productpurchase",
  { get_bySearch_url: "./dataset/productpurchasedata.json", get_byId_url: "./dataset/productpurchasedata_byId.json" }
);

export const rostercontactActions = withFacelessActions(
  "ROSTERCONTACT",
  "rostercontact",
  { get_bySearch_url: "./dataset/rostercontact.json", get_byId_url: "./dataset/rostercontact_byId.json" }
);

export const bankaccountActions = withFacelessActions(
  "BANKACCOUNT",
  "bankaccount",
  { get_bySearch_url: "./dataset/bankaccount.json", get_byId_url: "./dataset/bankaccount_byId.json" }
);
