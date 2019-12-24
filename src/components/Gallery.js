import React, { useState, useCallback } from "react";
import { Button } from "reactstrap";
import RPGallary from "react-photo-gallery";

import { ICONS } from "../_constants";
import ImageSelectable from "./ImageSelectable";
import {CreinoxUploadButton} from "./CreinoxUploadButton";

// import tileData from './tileData';

const UPLOADFOLDER = "./uploads";

const tileData = [
  {
    id: 1,
    path: "001.jpg",
    thumbnailPath: "001_thumb.jpg",
    title: "Image",
    height: 333,
    width: 250,
    author: "author"
  },
  {
    id: 2,
    path: "002.jpg",
    thumbnailPath: "002_thumb.jpg",
    title: "Image",
    height: 333,
    width: 250,
    author: "author"
  },
  {
    id: 3,
    path: "003.jpg",
    thumbnailPath: "003_thumb.jpg",
    title: "Image",
    height: 333,
    width: 250,
    author: "author"
  },
  {
    id: 4,
    path: "005.jpg",
    thumbnailPath: "005_thumb.jpg",
    title: "Image",
    height: 333,
    width: 250,
    author: "author"
  },
  {
    id: 5,
    path: "004.jpg",
    thumbnailPath: "004_thumb.jpg",
    title: "Image",
    height: 333,
    width: 250,
    author: "author"
  },
  {
    id: 6,
    path: "006.jpg",
    thumbnailPath: "006_thumb.jpg",
    title: "Image",
    height: 333,
    width: 250,
    author: "author"
  }
];

export const Gallery = () => {
  // 图片选择和删除
  const [selectedImages, setSelectedImages] = useState(new Set([]));
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // 切换单个是否选中
  const handleOnToggleSelect = (id, isSelected) => {
    const newSet = new Set(selectedImages);
    if (isSelected) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }

    setSelectedImages(newSet);
  };

  // 全选
  const handleSelectAll = () => {
    if ([...selectedImages].length === tileData.length) {
      // 假如选中的image的set转成数组的长度和原数组长度一致
      setSelectedImages(new Set([]));
    } else {
      const newSet = new Set(tileData.map(photo => photo.id));
      setSelectedImages(newSet);
    }
  };

  const handleImageSave = (files) => {
      console.log("todo, save:", files)
    // todo: 保存图片
  }

  // 删除
  const deleteSelected = () => {
    alert(Array.from(selectedImages));
  };

  // 子图片: 可选择
  const imageRenderer = useCallback(
    ({ index, left, top, key, photo }) => (
      <ImageSelectable
        id={photo.id}
        isSelected={selectedImages.has(photo.id) ? true : false}
        onSelect={handleOnToggleSelect}
        editMode={editMode}
        key={key}
        margin={"2px"}
        index={index}
        photo={photo}
        left={left}
        top={top}
        editMode={editMode}
      />
    ),
    [editMode, selectedImages]
  );

  // Edit mode; Browse mode; select all; delete; upload
  return (
    <div>
      <p>
        <Button
          className={`mr-2 btn btn-md btn-${editMode ? "info" : "warning"}`}
          onClick={toggleEditMode}
        >
          {ICONS.EDIT("mr-1")}
          {editMode ? "回到浏览" : "图片管理"}
        </Button>

        {editMode ? (
          <Button
            className="mr-2 btn btn-md btn-primary"
            onClick={handleSelectAll}
          >
            全选
          </Button>
        ) : null}

        {editMode && [...selectedImages].length > 0 ? (
          <Button
            className="mr-2 btn btn-md btn-danger"
            onClick={deleteSelected}
          >
            {ICONS.DELETE("mr-1")}删除选项
          </Button>
        ) : null}
        {!editMode ? (
            <CreinoxUploadButton onSave={handleImageSave}/>
        ) : null}

        
      </p>
      <RPGallary
        photos={tileData.map(image => {
          return {
            id: image.id,
            path: UPLOADFOLDER + "/" + image.path,
            src: UPLOADFOLDER + "/" + image.thumbnailPath,
            height: image.height,
            width: image.width,
            title: image.title
          };
        })}
        renderImage={imageRenderer}
      />
    </div>
  );
};


