import React, { useRef } from "react";
import { CreinoxUploadButton } from "../CreinoxUploadButton";

// 思路：value默认是个image；上传以后变成是个file（如果onchange时不动它会导致form提交不对）
export const MyImage = ({ id, value, onChange, disabled }) => {
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
    reader.onload = function(e) {
      myImageDisplay.current.setAttribute("src", e.target.result);
      // $('#blah').attr('src', e.target.result);
    };
    reader.readAsDataURL(value);
  } else if(value){
    photo = {
      id: value.id,
      path: value.path,
      src: value.thumbnailPath,
      height: value.height,
      width: value.width,
      title: value.name
    };
  }

  const handleOnClick = e => {
    if (!isUploaded) {
      window.open(photo.path, "_blank");
    }
  };

  const handleOnSave = files => {
    if(typeof(onChange)==='function') {
      onChange(null, id, files[0]);
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
        <CreinoxUploadButton
          filesLimit={1}
          onSave={handleOnSave}
          style={{ margin: "auto", display: "block" }}
          className="mt-2 mb-2"
        />
      )}
    </div>
  );
};
