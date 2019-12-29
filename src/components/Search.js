import React from "react";
import { CreinoxForm } from "./CreinoxForm";

import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import FilterListIcon from "@material-ui/icons/FilterList";
import SearchIcon from "@material-ui/icons/Search";
// import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";

export default function Search({
  onSearch,
  dataModel,
  searchTerms,
  searchBar
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
    setOpen(prev => !prev);
  };
  const tipRef = React.useRef(null);

  const keyPressListener = ({ code }) => {
    if (code === "Escape") {
      setOpen(false);
    }
  };
  const memoizedListener = React.useMemo(() => keyPressListener, []);
  React.useEffect(() => {
    if (open) {
      document.addEventListener("keydown", memoizedListener);
    } else {
      document.removeEventListener("keydown", memoizedListener);
    }

    return () => {
      document.removeEventListener("keydown", memoizedListener);
    };
  }, [open]);

  return (
    <>
      <Tooltip title="Advanced Search" ref={tipRef}>
        <IconButton aria-label="Advanced Search" onClick={handleClick}>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
      {/* <ClickAwayListener onClickAway={e => {
                // 加个判断，看有没有点在开启按钮上。否则一打开就会瞬间关闭
                if (open && !tipRef.current.contains(e.target)) { setOpen(false) }
            }}> */}
      <Popper open={open} anchorEl={anchorEl} placement="bottom-end" transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper style={{ minWidth: "200pt", maxWidth: "80vw" }}>
              <CreinoxForm
                defaultValues={searchTerms}
                actionSubmit={onSearch}
                dataModel={dataModel}
              >
                <DialogContent>
                  <DialogContentText>搜索</DialogContentText>
                  {searchBar}
                </DialogContent>
                <DialogActions>
                  <IconButton type="submit" className="btn-primary">
                    <SearchIcon />
                  </IconButton>
                </DialogActions>
              </CreinoxForm>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
}
