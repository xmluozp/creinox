import React, { useEffect, useState, useCallback } from "react";
import { Button } from "reactstrap";
import RPGallary from "react-photo-gallery";
import { connect } from "react-redux";

import { ICONS } from "../_constants";
import ImageSelectable from "./ImageSelectable";
import {CreinoxUploadButton} from "./CreinoxUploadButton";

import { imageActions as dataActions } from "../_actions";


const GalleryNoData = ({data, onGetBySearch, onDeleteMultiple, onPostCreateMultiple, preConditions}) => {

  useEffect(() => {
    onGetBySearch({}, preConditions);
    return () => {
    };
  }, [])


  // 图片选择和删除
  const [selectedImages, setSelectedImages] = useState(new Set([]));
  const [editMode, setEditMode] = useState(false);


  const tileData = data && data.rows ? data.rows : [];

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
    onPostCreateMultiple(files)
  }

  // 删除
  const deleteSelected = () => {
    onDeleteMultiple({}, Array.from(selectedImages));
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
            <CreinoxUploadButton onSave={handleImageSave} className="mr-2"/>
        ) : null}

        
      </p>
      <RPGallary
        photos={tileData.map(image => {
          return {
            id: image.id,
            path: image.path,
            src: image.thumbnailPath,
            height: image.height,
            width: image.width,
            title: image.name
          };
        })}
        renderImage={imageRenderer}
      />
    </div>
  );
};


  // ============================================= Redux

  function mapState(state) {
    return {
      data: state.imageData.data
    };
  }

  const actionCreators = {
    onPostCreate: dataActions.post_create,
    onPostCreateMultiple: dataActions.post_createMultiple,
    onDeleteMultiple: dataActions._deleteMultiple,
    onGetBySearch: dataActions.get_bySearch
  };

  export const Gallery = connect(mapState, actionCreators)(GalleryNoData);
