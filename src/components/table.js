import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { Button } from 'reactstrap';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

// 表头，包含排序
function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells, isButtons } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all items' }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={
              headCell.alignRight ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        {isButtons ? <TableCell align='center'>操作</TableCell> : null}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  headCells: PropTypes.array.isRequired
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
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

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected, tableTitle } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle">
            {tableTitle}
        </Typography>
        )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

// 所有pagination信息都从data来而不是本地
export const CreinoxTable = ({ headCells, tableTitle, data, onReadAll, buttons = [] }) => {

  // 默认数据（如果是页面，则从params里取）
  const defaultPagination = {
    page: 0,
    perPage: 20,
    totalCount: 0,
    totalPage: 0,
    order: 'desc',
    orderBy: 'id',
  }

  const isData = data && data.pagination

  // 本页用来显示的数据。唯一可信数据来源是从store传下来的data
  const dataPagination = {
    page: (isData && data.pagination.page) || defaultPagination.page,
    perPage: (isData && data.pagination.perPage) || defaultPagination.perPage,
    totalCount: (isData && data.pagination.totalCount) || defaultPagination.totalCount,
    totalPage: (isData && data.pagination.totalPage) || defaultPagination.totalPage,
    order: (isData && data.pagination.order) || defaultPagination.order,
    orderBy: (isData && data.pagination.orderBy) || defaultPagination.orderBy,
  }

  // 以下信息是用来提交pagination请求的，不涉及页面显示；页面如何显示完全来自于data
  const [page, setPage] = React.useState(dataPagination.page);
  const [perPage, setPerPage] = React.useState(dataPagination.perPage);

  const [order, setOrder] = React.useState(dataPagination.order);
  const [orderBy, setOrderBy] = React.useState(dataPagination.orderBy);


  // ---------------HOOKS
  const classes = useStyles();
  const [selected, setSelected] = React.useState([]);

  React.useEffect(() => {

    // TODO: 如果isPage === true，就从url读信息。否则就直接read all
    // 防止用户点到别的页面又返回：如果store有数据就不从远程抓数据，除非点刷新
    // (目前因为没有后台，请求到的data永远是第一页所以没效果)
    if (!data) { onReadAll(getPaginationString()) }
    return () => { };
  }, [])

  React.useEffect(() => {
    onReadAll(getPaginationString());
  }, [page, perPage, order, orderBy])

  // --------------- onReadAll(pagination) EVENTS
  const getPaginationString = () => {

    // 当前页面的state里的数据
    const pg = { page, perPage, order, orderBy }
    var queryString = Object.keys(pg).map(key => key + '=' + pg[key]).join('&');
    return queryString
  }

  // ----------------------- handle for query
  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // ----------------------- handle for table component
  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = data.rows.map(n => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  // --------------- DISPLAY
  const isSelected = name => selected.indexOf(name) !== -1;

  const dataRows = data && data.rows ? data.rows : [];
  const rowLength = data && data.rows ? data.rows.length : 0;
  const emptyRows = dataPagination.perPage - Math.min(dataPagination.perPage, dataPagination.totalCount - page * dataPagination.perPage);



  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} tableTitle={tableTitle} />
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="small"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={dataPagination.order}
              orderBy={dataPagination.orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rowLength}
              headCells={headCells}
              isButtons={buttons.length > 0}
            />
            <TableBody>
              {dataRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;
                const rowId = row.id;
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox" onClick={event => handleClick(event, row.id)}>
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      {row["id"]}
                    </TableCell>
                    {
                      // 普通格子
                      headCells.map((value, index) => {
                        let insideValue
                        if (value.lookup) {
                          insideValue = value.lookup[row[value.id]]
                        } else {
                          insideValue = row[value.id] ? row[value.id] : ""
                        }

                        return index > 0
                          && index < headCells.length
                          && <TableCell key={`${rowId}_${index}`}>{insideValue}</TableCell>
                      })}
                    { // 操作按钮
                      buttons ? <TableCell align="right">
                        {
                          buttons.map((value, index) => <ActionButton key={"button" + index} {...value} id={row.id} getPaginationString = {getPaginationString} />)
                        }
                      </TableCell> : null
                    }
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 33 * emptyRows }}>
                  <TableCell colSpan={headCells.length + 1} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[20, 100, { label: 'All', value: -1 }]}
          component="div"
          count={dataPagination.totalCount}
          rowsPerPage={dataPagination.perPage}
          page={dataPagination.page}
          SelectProps={{
            inputProps: { 'aria-label': 'rows per page' },
            native: true,
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </Paper>
    </div>
  );
}


export const TABLE_ICONS = {
  delete: <i className="cui-trash icons mr-1"></i>,
  edit: <i className="cui-settings icons mr-1"></i>,
}


// ============================================================右边按钮. 给button传入pagination因为删除后, 页面刷新
const ActionButton = ({ id, label, onClick, color, getPaginationString,  url, icon }) => { 

  let returnValue = label;
  if(onClick){
    returnValue= ( <Button color={color} style={{margin: "0px 0px 0px 3px"}} className="btn btn-sm "
        onClick={() => { 
          onClick(getPaginationString(), id)
          }}> {icon}{label}</Button>)
  } else if(url){
    returnValue= <Link to={`${url}/${id}`} color={color} className={`btn btn-sm btn-${color}`} role="button" style={{margin: "0px 0px 0px 3px"}} aria-pressed="true">{icon}{label}</Link>
  }

  return returnValue
}