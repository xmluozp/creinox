import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { lighten, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import Search from './Search';


const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  rootNoBorder: {
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
    paddingTop: theme.spacing(0),
    minHeight: 0,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
}));

const TableToolbarWrapper = ({
  numSelected,
  selectBox,
  selectOnAction,
  tableTitle,
  onRefresh,
  dataModel,
  searchTerms,
  searchBar,
  onSearch,
  toolbarButtons,
  getPaginationFromState,
  isBorder = true, }) => {

  const classes = useToolbarStyles();

  // 是否加高
  const classesWithBorder = isBorder?classes.root:classes.rootNoBorder;

  return (
    <Toolbar
      className={clsx(classesWithBorder, {
        [classes.highlight]: numSelected > 0,
      })}>
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1">
          {numSelected > 0 && selectBox && 
          <Tooltip title={selectBox.title}>
            <IconButton aria-label={selectBox.title} onClick = {selectOnAction.bind(null, getPaginationFromState())} className="mr-2">
              {selectBox.icon}
            </IconButton>
          </Tooltip>}
          {numSelected} selected
          </Typography>
      ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle">
            <span className="mr-2">{tableTitle}</span>
            <Tooltip title="Reload">
            <IconButton aria-label="refresh" className="text-secondary" size="small" onClick={onRefresh}>
              <i className="icon-reload" />
            </IconButton>
            </Tooltip>
          </Typography>
        )}

          <>
                {/* const SolveRef = React.forwardRef((props, ref) => <div {...props} ref={ref}><ToolbarButton {...item} getPaginationFromState= {getPaginationFromState }/></div>); */}
                {/* return <Tooltip title={item.label} key={index} ><SolveRef/></Tooltip>; */}
            {
              toolbarButtons && toolbarButtons.map((item, index) => <ToolbarButton {...item} key={index} getPaginationFromState= {getPaginationFromState }/>)
            }
            {searchBar?<Search dataModel={dataModel} searchTerms={searchTerms} searchBar={searchBar} onSearch={onSearch} />:null}
          </>
        
    </Toolbar>
  );
};

TableToolbarWrapper.propTypes = {
  numSelected: PropTypes.number.isRequired,
};


// ============================================================ 除了搜索框以外的按钮（主要是新增按钮）
const ToolbarButton = ({ label, onClick, color, url, icon, getPaginationFromState,  }) => {

  let returnValue = label;

  // if there is onClick, pass pagination and id back (in case need to refresh)
  let propsOnClick = null;
  // propsOnClick = onClick ? onClick = () => { onClick(getPaginationFromState()) } : null;

  if (typeof(onClick) === 'function') {
    propsOnClick = onClick.bind(null, getPaginationFromState());
  }
  
  returnValue = (<IconButton className={`text-${color}`} aria-label={label} onClick={propsOnClick} >
    {icon}</IconButton>)

  // if there url, wrap it with Link
  if (url) { returnValue = <Link to={url} style={{ textDecoration: 'none' }} aria-pressed="true">{returnValue}</Link> }

  return returnValue
}

export default TableToolbarWrapper;