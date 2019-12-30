import React, { useCallback } from "react";
import ImageSelectable from "./ImageSelectable";
import RPGallary from "react-photo-gallery";


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
        key={key}
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
    <RPGallary
      photos={tileData.map(image => {
        return {
          id: image.id,
          path: image.path,
          src: image.thumbnailPath,
          height: image.height,
          width: image.width,
          maxheight: image.height,
          maxwidth: image.width,
          title: image.name
        };
      })}
      renderImage={imageRenderer}
    />
  );
};