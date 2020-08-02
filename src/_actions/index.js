// withFacelessActions("FACELESS", "faceless", {get_bySearch_url: "./dataset/xxxx.json"}). 
// have also handled services
import { withFacelessActions } from "./faceless.actions";

export * from "./alert.actions";
export * from "./loading.actions";
export * from "./texttemplate.actions";
export * from "./commonitem.actions";
export * from "./image.actions";

export * from "./role.actions";
export * from "./user.actions";
export * from "./print.actions";

export * from "./sellcontract.actions";
export * from "./sellsubitem.actions";
export * from "./buycontract.actions";
export * from "./buysubitem.actions";
export * from "./mouldcontract.actions";

export * from "./company.actions";
export * from "./region.actions";
export * from "./port.actions";

export * from "./financialaccount.actions";

export * from "./product.actions";
export * from "./category.actions";
export * from "./productpurchase.actions"

export * from "./commodity.actions";

// faceless pages
// export const productpurchaseActions = withFacelessActions(
//   "PRODUCTPURCHASE",
//   "productpurchase",
//   { get_bySearch_url: "./dataset/productpurchasedata.json", get_byId_url: "./dataset/productpurchasedata_byId.json" }
// );

export const rostercontactActions = withFacelessActions(
  "ROSTERCONTACT",
  "rostercontact",
  "/api/rostercontact"
);

export const bankaccountActions = withFacelessActions(
  "BANKACCOUNT",
  "bankaccount",
  "/api/bankaccount"
);
