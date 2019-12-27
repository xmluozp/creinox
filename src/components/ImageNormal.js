import React from "react";

const imgStyle = {
  transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s"
};
const cont = {
  backgroundColor: "#eee",
  cursor: "pointer",
  overflow: "hidden",
  position: "relative"
};

const ImageNormal = ({
  id,
  index,
  photo,
  margin,
  direction,
  top,
  left,
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
      window.open(photo.path, "_blank");
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

export default ImageNormal;
