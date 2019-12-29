import React from 'react'
import EmbedProductPurchase from './EmbedProductPurchase'

export default () => {

    const handleLoad = (values) => {
        if(Array.isArray(values) && values.length > 0) {
            const row = values[0];
            console.log("handleload", row)

            // todo: inject row when create
        }
    }


    return <EmbedProductPurchase isBorder={true} modalInputCreateProps={{onLoad : handleLoad}} modalFormCreateProps={{preConditions: {product_id:2}}}/>

}