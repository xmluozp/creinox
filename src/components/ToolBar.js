import React from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";

export const ToolBar = ({ buttons = [] }) => {
  return (
    <Box display="flex" justifyContent="flex-end" mb={1} mt={1}>
      {buttons.map((item, idx) => {

        const {onRender, onClick, url, label, color, disabled} = item

        if(onRender) return onRender(`toolbar_${idx}`)
        const variables = {};

        variables.color = color;
        variables.disabled = disabled;
        if (url) {
          {/* variables["href"] = item.url; */}
        } else if (onClick) {
          variables["onClick"] = onClick;
        }

        const btn = (
          <Button
            {...variables}
            variant="outlined"
            className="ml-1"
            key={`toolbar_${idx}`}
          >
            {label}
          </Button>
        );

        if (url) {
            return <Link to={url}  key={`toolbar_${idx}`}>{btn}</Link>;
        } else if (onClick) {
            return btn;
        }
      })}
    </Box>
  );
};

// <Button href="#text-buttons" color="primary">
//   Link
// </Button>

//import { Link } from 'react-router-dom'; <Link to={url}>
