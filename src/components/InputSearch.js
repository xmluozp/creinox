import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "0px 4px",
    marginBottom: "10pt",
    display: "flex",
    alignItems: "center"
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  }
}));

export const InputSearch = ({ style, onSearch = () => {} }) => {
  const [value, setvalue] = useState("");
  const classes = useStyles();

  const handleOnChange = e => {
    setvalue(e.target.value);
  };

  const handleKeyDown = e => {
    if(e.key==='Enter') {
        onSearch(value)
    }
  }

  return (
    <Paper component="form" className={classes.root} style={style}>
      <InputBase
        className={classes.input}
        placeholder="搜索"
        inputProps={{ "aria-label": "search google maps" }}
        value={value}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        className={classes.iconButton}
        aria-label="search"
        onClick={onSearch.bind(null, value)}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};
