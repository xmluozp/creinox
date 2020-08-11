import React from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";

export const ToolBar = ({ buttons = [] }) => {
  return (
    <Box display="flex" justifyContent="flex-end" mb={1} mt={1}>
      {buttons.map((item, idx) => {
        const variables = {};

        variables.color = item.color;
        variables.disabled = item.disabled;
        if (item.url) {
          {/* variables["href"] = item.url; */}
        } else if (item.onClick) {
          variables["onClick"] = item.onClick;
        }

        const btn = (
          <Button
            {...variables}
            variant="outlined"
            className="ml-1"
            key={`toolbar_${idx}`}
          >
            {item.label}
          </Button>
        );

        if (item.url) {
            return <Link to={item.url}  key={`toolbar_${idx}`}>{btn}</Link>;
        } else if (item.onClick) {
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
