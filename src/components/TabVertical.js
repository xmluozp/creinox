import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import useMediaQuery from "@material-ui/core/useMediaQuery";

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: "flex",
    height: "auto",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}));

//{value, onChange}
export const TabVertical = ({ options = [], onSelect, value }) => {
  const classes = useStyles();
  const theme = useTheme();

  const handleChange = (e, newValue) => {
    onSelect(newValue);
  };

  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <div className={classes.root}>
      <Tabs
        orientation={isLarge ? "vertical" : "horizontal"}
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Tabs"
        className={classes.tabs}
      >
        {options.map((item, index) => {
          return (
            <Tab
              key={item.label}
              label={item.label}
              value={item.value ? item.value : index}
              {...a11yProps(index)}
            />
          );
        })}
      </Tabs>
    </div>
  );
};
