import React from './node_modules/react';
import {CreinoxForm} from '../CreinoxForm'

import DialogActions from './node_modules/@material-ui/core/DialogActions';
import DialogContent from './node_modules/@material-ui/core/DialogContent';
import DialogContentText from './node_modules/@material-ui/core/DialogContentText';


import IconButton from './node_modules/@material-ui/core/IconButton';
import Tooltip from './node_modules/@material-ui/core/Tooltip';

import FilterListIcon from './node_modules/@material-ui/icons/FilterList';
import SearchIcon from './node_modules/@material-ui/icons/Search';
import ClickAwayListener from './node_modules/@material-ui/core/ClickAwayListener';

import Popper from './node_modules/@material-ui/core/Popper';
import Fade from './node_modules/@material-ui/core/Fade';
import Paper from './node_modules/@material-ui/core/Paper';

export default function Search({ onSearch, dataModel, searchTerms, searchBar }) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
        setOpen(prev => !prev);
    };
    const tipRef = React.useRef(null)

    return (
        <>
            <Tooltip title="Advanced Search" ref={tipRef}>
                <IconButton aria-label="Advanced Search" onClick={handleClick}>
                    <FilterListIcon />
                </IconButton>
            </Tooltip>
            <ClickAwayListener onClickAway={e => {
                // 加个判断，看有没有点在开启按钮上。否则一打开就会瞬间关闭
                if (open && !tipRef.current.contains(e.target)) { setOpen(false) }
            }}>
                <Popper open={open} anchorEl={anchorEl} placement="bottom-end" transition>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Paper style={{minWidth: "200pt", maxWidth: "80vw"}}>
                                <CreinoxForm dataModel={dataModel} defaultValues={searchTerms} actionSubmit={onSearch}>
                                    <DialogContent>
                                        <DialogContentText>
                                            搜索
                                    </DialogContentText>
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
            </ClickAwayListener>
        </>
    )
}