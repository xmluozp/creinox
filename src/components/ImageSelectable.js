import React from "react";
import {h_popfile} from '../_helper'


const Checkmark = ({ selected }) => (
  <div
    style={
      selected
        ? { left: "4px", top: "4px", position: "absolute", zIndex: "1" }
        : { display: "none" }
    }
  >
    <svg
      style={{ fill: "white", position: "absolute" }}
      width="24px"
      height="24px"
    >
      <circle cx="12.5" cy="12.2" r="8.292" />
    </svg>
    <svg
      style={{ fill: "#06befa", position: "absolute" }}
      width="24px"
      height="24px"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  </div>
);


const selectedImgStyle = {
  transform: "translateZ(0px) scale3d(0.9, 0.9, 1)",
  transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s"
};
const cont = {
  backgroundColor: "#eee",
  cursor: "pointer",
  overflow: "hidden",
  position: "relative"
};

const ImageSelectable = ({
  id,
  index,
  photo,
  onSelect,
  margin,
  direction,
  top,
  left,
  onClick,
  isSelected,
  editMode
}) => {
  //calculate x,y scale

  const sx = (100 - (30 / photo.width) * 100) / 100;
  const sy = (100 - (30 / photo.height) * 100) / 100;
  selectedImgStyle.transform = `translateZ(0px) scale3d(${sx}, ${sy}, 1)`;

  if (direction === "column") {
    cont.position = "absolute";
    cont.left = left;
    cont.top = top;
  }

  const handleOnClick = e => {

    if (editMode) {
      onSelect(id, isSelected);
    } else {
      if(typeof(onClick)==='function') {
        onClick.bind(null, id, photo)();
      } else {
        // window.open(photo.path, "_blank");
        // 权限限制
        h_popfile(photo.path)
      }
    }
  };

  const isDisplaySelect = isSelected && editMode;

  const imgStyle = {
    transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s",
    maxHeight: photo.maxheight * 2, 
    maxWidth: photo.maxwidth * 2
  };

  return (
    <div>
      <div
        style={{ margin, height: photo.height, width: photo.width,  maxHeight: photo.maxheight * 2, maxWidth: photo.maxwidth * 2, ...cont }}
        className={!isDisplaySelect ? "not-selected" : ""}
      >
        <div
          style={{
            position: "absolute",
            left: "0px",
            right: "0px",
            bottom: "0px",
            height: "auto",
            textAlign: "center",
            backgroundColor: "rgba(0,0,0,0.6)",
            color: "white",
            zIndex: 2
          }}
        >
        {photo.title}
        </div>
        <Checkmark selected={isDisplaySelect ? true : false} />
        <img
          alt={photo.title}
          style={
            isDisplaySelect
              ? { ...imgStyle, ...selectedImgStyle }
              : { ...imgStyle }
          }
          {...photo}
          onClick={handleOnClick}
        />
        <style>{`.not-selected:hover{outline:2px solid #06befa}`}</style>
      </div>
    </div>
  );
};

export default ImageSelectable;
