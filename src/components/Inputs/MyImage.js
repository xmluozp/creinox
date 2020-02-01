import React, { useRef } from "react";
import { CreinoxUploadButton } from "../CreinoxUploadButton";
import IconButton from "@material-ui/core/IconButton";
import { imageActions as dataActions } from "../../_actions";

import { ICONS } from "../../_constants";
import store from '../../_helper/store';


// 思路：value默认是个image；上传以后变成是个file（如果onchange时不动它会导致form提交不对）
export const MyImage = ({ id, value, onChange, disabled, label, imageId }) => {
  const myImageDisplay = useRef(null);
  // check if going to upload a new picture to over old one
  const isUploaded = Object.prototype.toString.call(value) === "[object File]";

  let photo = {
    id: 0,
    path: "",
    src: "",
    height: "",
    width: "",
    title: ""
  };

  if (isUploaded) {
    var reader = new FileReader();

    // 如果用户上传图片
    reader.onload = function(e) {
      if(myImageDisplay.current) {
        myImageDisplay.current.setAttribute("src", e.target.result);
      }      
      // $('#blah').attr('src', e.target.result);
    };
    reader.readAsDataURL(value);

    // 如果是从数据库传的图片
  } else if(value){
    photo = {
      id: value.id,
      path: value.path,
      src: value.thumbnailPath,
      title: value.name
    };
  }

  // 查看原图
  const handleOnClick = e => {
    if (!isUploaded) {
      window.open(photo.path, "_blank");
    }
  };

  // 保存
  const handleOnSave = files => {
    if(typeof(onChange)==='function') {
      onChange(null, id, files[0]);
    }    
  };

  // 删除
  const handleOnRemove = () => {

    if(typeof(onChange)==='function') {
      // const originalColumn = id && id.split(".")[0]
      // onChange(null, originalColumn, -1);
      onChange(null, id, null);

      // 直接调用action，因为外键的关系fk会自动被清空
      dataActions._delete(imageId)(store.dispatch)

    }    
  };

  return (
    <div style={{ margin: "auto", display: "block" }} className="mb-2">
      <div
        style={{
          margin: "auto",
          display: "block",
          backgroundColor: "#555555",
          height: photo.height,
          width: "100%",
          position: "relative"
        }}
        className="not-selected"
      >
        <div
          style={{
            position: "absolute",
            left: "0px",
            right: "0px",
            bottom: "0px",
            height: "auto",
            textAlign: "center",
            backgroundColor: isUploaded
              ? "rgba(255,150,0,0.6)"
              : "rgba(0,0,0,0.6)",
            color: "white",
            zIndex: 2
          }}
        >
          {photo.title} {isUploaded ? "此处仅是预览，保存表单后方可更新到数据库" : null}
        </div>

        <img
          alt={photo.title}
          style={{ margin: "auto", display: "block", maxWidth: "100%" }}
          {...photo}
          onClick={handleOnClick}
          ref={myImageDisplay}
        />
      </div>
      {!disabled && (
        <div className="mt-2 mb-2" style={{display: "flex", justifyContent: "space-between"}}>
          <div style={{display:"inline-block"}}>
          <CreinoxUploadButton
          filesLimit={1}
          label = {label}
          onSave={handleOnSave}
          style={{ margin: "auto", display: "inline-block" }}/>
          </div>
          <div style={{display:"inline-block"}}>
          <IconButton onClick={handleOnRemove} style={{fontSize: "12pt"}}>
            {ICONS.DELETE("btn-md")}
          </IconButton>  
          </div>
        </div>
      )}
    </div>
  );
};
