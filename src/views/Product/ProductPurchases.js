import React from "react";
import { EmbedProductPurchaseHistory } from "./EmbedProductPurchase";
import _ from 'lodash'

export default props => {

  // product/productpurchases/:product_id/:company_id/:pack_id
  const productpurchase_id = parseInt(_.get(props, "match.params.productpurchase_id")) || "";
  const isFromHistory = Number.isInteger(productpurchase_id)

//   const product_id = parseInt(_.get(props, "match.params.product_id")) || "";
//   const company_id = parseInt(_.get(props, "match.params.company_id")) || "";
//   const pack_id = parseInt(_.get(props, "match.params.pack_id")) || "";

//   const isFromHistory =
//     Number.isInteger(product_id) &&
//     Number.isInteger(company_id) &&
//     Number.isInteger(pack_id)

//   const handleLoad = values => {
//     if (Array.isArray(values) && values.length > 0) {
//       const row = values[0];
//       console.log("handleload", row);

//       // todo: inject row when create
//     }
//   };

  const preConditions = { productpurchase_id };

  return (
    <EmbedProductPurchaseHistory
      preConditions = {isFromHistory && preConditions}
      isBorder={true}
      // modalInputCreateProps={{ onLoad: handleLoad }}
      modalFormCreateProps={{ preConditions: preConditions }}
    />
  );
};
