import React, { useCallback } from "react";
import ImageSelectable from "./ImageSelectable";
import RPGallary from "react-photo-gallery";
// import {RESTURL} from '../config'

// tileData 格式：数据库的image表的model
export const ImageList = ({
  tileData,
  editMode = false,
  selectedImages = new Set(),
  onClick,
  onSelect
}) => {
  // 子图片: 可选择
  const imageRenderer = useCallback(
    ({ index, left, top, key, photo }) => (
      <ImageSelectable
        id={photo.id}
        isSelected={  selectedImages.has(photo.id) ? true : false}
        onSelect={onSelect}
        editMode={editMode}
        key={ key + photo.title + photo.id + index}
        onClick={onClick}
        margin={"2px"}
        index={index}
        photo={photo}
        left={left}
        top={top}
      />
    ),
    [editMode, selectedImages]
  );
  return (
     (tileData && tileData.length > 0) ? 
      <RPGallary
      photos={tileData.map(image => {
        return {
          id: image.id,
          path: image.path,
          src: image.thumbnailPath ? image.thumbnailPath : "/images/nopic.png" ,
          height: image.height || 200,
          width: image.width || 200,
          maxheight: image.height || 200,
          maxwidth: image.width || 200,
          title: image.name || "无图片"
        };
      })}
      renderImage={imageRenderer}
    /> : "暂无图片"

  );
};
