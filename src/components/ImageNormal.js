import React, {useEffect} from "react";
import {h_popfile} from '../_helper'

const imgStyle = {
  transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s"
};
const cont = {
  backgroundColor: "#eee",
  cursor: "pointer",
  overflow: "hidden",
  position: "relative"
};

export const ImageNormal = ({
  id,
  index,
  photo,
  margin,
  direction,
  top,
  left,
  onLoaded = () => {},
}) => {
  //calculate x,y scale

  // 通知外部组件，数据加载完成
  useEffect(() => {
    onLoaded(id);
  }, []);

  if (direction === "column") {
    cont.position = "absolute";
    cont.left = left;
    cont.top = top;
  }

  const handleOnClick = e => {  
      // window.open(photo.path, "_blank");
      h_popfile(photo.path)
  };


  return (
    <div>
      <div
        style={{ margin, height: photo.height, width: photo.width, ...cont }}
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
            backgroundColor: "rgba(0,0,0,0.6)",
            color: "white",
            zIndex: 2
          }}
        >
        {photo.title}
        </div>

        <img
          alt={photo.title}
          style={ { ...imgStyle }}
          {...photo}
          onClick={handleOnClick}
        />
        <style>{`.not-selected:hover{outline:2px solid #06befa}`}</style>
      </div>
    </div>
  );
};

export default ImageNormal;
