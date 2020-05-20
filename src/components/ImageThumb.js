import React from "react";
// import {RESTURL} from '../config'

export const ImageThumb = ({path, alt}) => {
    return (<img src={path ? path:  "/images/nopic.png" } height={100} alt={alt || path}/>);

}

export const ImageThumbLink = ({image, alt}) => {
    return (<a href={image.path} rel="noopener noreferrer" target="_blank"><img src={image.thumbnailPath ?image.thumbnailPath :"/images/nopic.png"  } height={100} alt={alt || image.name}/></a>);

}
