import React from 'react';
import _ from 'lodash'
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';


import TableHeadWrapper from './tableHeadWrapper'
import TableToolbarWrapper from './tableToolbarWrapper'
import TablePaginationWrapper from './tablePaginationWrapper'


// 所有pagination信息都从data来而不是本地
export const CreinoxTable = ({ headCells, searchBar, tableTitle, data, onGetAll, onGetBySearch, dataModel, rowButtons = [], selectBox, toolbarButtons = [] }) => {

  // 默认数据（如果是页面，则从params里取）
  const defaultPagination = {
    page: 0,
    perPage: 20,
    totalCount: 0,
    totalPage: 0,
    order: 'desc',
    orderBy: 'id',
  }

  // const isData = data && data.pagination

  // 本页用来显示的数据。唯一可信数据来源是从store传下来的data
  const dataPagination = {
    page: _.get(data, "pagination.page") || defaultPagination.page,
    perPage: _.get(data, "pagination.perPage") || defaultPagination.perPage,
    totalCount: _.get(data, "pagination.totalCount") || defaultPagination.totalCount,
    totalPage: _.get(data, "pagination.totalPage") || defaultPagination.totalPage,
    order: _.get(data, "pagination.order") || defaultPagination.order,
    orderBy: _.get(data, "pagination.orderBy") || defaultPagination.orderBy,
  }

  // 以下信息是用来提交pagination请求的，不涉及页面显示；页面如何显示完全来自于data
  const [page, setPage] = React.useState(dataPagination.page);
  const [perPage, setPerPage] = React.useState(dataPagination.perPage);
  const [order, setOrder] = React.useState(dataPagination.order);
  const [orderBy, setOrderBy] = React.useState(dataPagination.orderBy);
  const [listOnShow, setListOnShow] = React.useState([])
  const classes = useStyles();
  const [selected, setSelected] = React.useState([]);
  // --------------- DISPLAY
  const isSelected = name => selected.indexOf(name) !== -1;

  // 这些数据是不会跟进的
  const dataRows = data && data.rows ? data.rows : [];
  const rowLength = data && data.rows ? data.rows.length : 0;
  const dataSearchTerms = data && data.searchTerms ? data.searchTerms : {};
  const emptyRows = dataPagination.perPage - Math.min(dataPagination.perPage, dataPagination.totalCount - page * dataPagination.perPage);

  const p_fetchData = () => {
    console.log("p_fetchData")
    onGetAll(getPaginationString());
  }

  React.useEffect(() => {

    // 数据预处理。防止每次render都调用一遍
    const listOnShowTemp = []
    dataRows.map((row) => {
      const rowObj = {}
      headCells.map((column) => {
        let columnContent
        const columnName = column.name;
        let originalContent = row[columnName];

        rowObj.id = row.id

        // 如果是外键，就取 外键.labelName 的字段。这个数据API预生成
        const refLabel = _.get(dataModel,["columns", columnName, "refLabel"]);
        if (refLabel) {
          originalContent = row[`${columnName}.${refLabel}`];
        } 
        // 如果是callBak，预先生成结果
        if (typeof (column.onShow) === "function") columnContent = column.onShow(originalContent, row);
        // 如果是lookup预先翻译内容。但样式要在下面取
        else if (column.lookup) {
          columnContent = column.lookup[originalContent]
        } 
        else columnContent = originalContent || "";

        rowObj[column.name] = columnContent;
        return null
      });
      listOnShowTemp.push(rowObj);
      return null;
    })

    setListOnShow(listOnShowTemp);
  }, [data])

  React.useEffect(() => {

    // TODO: 如果isPage === true，就从url读信息。否则就直接read all
    // 防止用户点到别的页面又返回：如果store有数据就不从远程抓数据，除非点刷新
    // (目前因为没有后台，请求到的data永远是第一页所以没效果)

    if (!data) { p_fetchData();}
    return () => { };
  }, [])

  React.useEffect(() => {
    p_fetchData();
  }, [page, perPage, order, orderBy])

  // --------------- onGetAll(pagination) EVENTS
  const getPaginationString = () => {

    // 当前页面的state里的数据
    const pg = { page, perPage, order, orderBy }
    const queryString = Object.keys(pg).map(key => key + '=' + pg[key]).join('&');
    return queryString
  }

  const handleOnRefresh = e => {
    p_fetchData();
  }
  const handleOnSearch = (data) => {

    // 搜索是GET数据。其实不需要pagination。这里只是以防万一后面要用
    const searchTermsString = Object.keys(data).map(key => key + '=' + data[key]).join('&');

    onGetBySearch(getPaginationString(), searchTermsString);
  }

  // ----------------------- handle for query
  const handleRequestSort = (e, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = e => {
    setPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };


  // ----------------------- handle for table component
  const handleSelectAllClick = e => {
    if (e.target.checked) {
      const newSelecteds = data.rows.map(n => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleSelectOnAction = (e) => {
    selectBox && selectBox.onAction(selected);
  }

  const handleClick = (e, name) => {
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

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>

        {/* -------------------toolbar (search; select submit)----------------- */}
        <TableToolbarWrapper
          searchTerms={dataSearchTerms}
          searchBar={searchBar}
          selectBox={selectBox}
          selectOnAction = {handleSelectOnAction}
          numSelected={selected.length}
          tableTitle={tableTitle}
          onRefresh={handleOnRefresh}
          onSearch={handleOnSearch}
          dataModel={dataModel}
          toolbarButtons={toolbarButtons}
          getPaginationString={getPaginationString}
        />

        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby={tableTitle}
            stickyHeader={false}
            size="small"
            aria-label={tableTitle}
          >
            {/* -------------------head (on select; headCells)----------------- */}
            <TableHeadWrapper
              classes={classes}
              numSelected={selected.length}
              selectBox={selectBox}

              order={dataPagination.order}
              orderBy={dataPagination.orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              dataModel={dataModel}
              rowCount={rowLength}
              headCells={headCells}
              isButtons={rowButtons.length > 0}
            />
            <TableBody>
              {dataRows.map((row, rowIndex) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${rowIndex}`;
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
                    {/* 放选择框 */}
                    {selectBox && <TableCell padding="checkbox" onClick={event => handleClick(event, row.id)}>
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </TableCell>}


                    {
                      // 普通格子
                      headCells.map((column, index) => {
                        
                        let columnContent;
                        let originalContent = row[column.name];
                        let className = column.className; 

                        if (column.lookup) className = _.get(column, ["className", originalContent]) || null // 如果是lookup。样式就是个array。否则直接是样式
                        columnContent = listOnShow[rowIndex] && listOnShow[rowIndex][column.name]; // 有预处理就取预处理，否则直接取值           

                        const handleCellClick = column.onClick ? column.onClick.bind(null, rowId) : null; 
                        const SolveRef = React.forwardRef((props, ref) => <div {...props} ref={ref}>{columnContent}</div>); // 显示tip强制需要这段

                        return index >= 0
                          && index < headCells.length
                          && <TableCell key={`${rowId}_${index}`} align={column.align} onClick={handleCellClick} className={className}>
                            <Tooltip title={`${originalContent}`}>
                              <SolveRef />
                            </Tooltip>
                          </TableCell>
                      })}
                    { // 放操作按钮的格子
                      rowButtons ? <TableCell align="right">
                        {
                          rowButtons.map((buttonObj, index) => <ActionButton key={`button_${rowId}_${index}`} {...buttonObj} id={rowId} getPaginationString={getPaginationString} />)
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

        {/* ------------------- pagination ----------------- */}
        <TablePaginationWrapper
          count={dataPagination.totalCount}
          rowsPerPage={dataPagination.perPage}
          page={dataPagination.page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage} />
      </Paper>
    </div>
  );
}

// ============================================================右边按钮. 给button传入pagination因为删除后, 页面刷新
const ActionButton = ({ id, label, onClick, color, url, icon, getPaginationString }) => {

  let returnValue = label;
  if (url) {

    returnValue = <Link to={`${url}/${id}`} className={`btn btn-sm btn-${color}`}
      role="button" style={{ margin: "0px 0px 0px 3px" }} aria-pressed="true">{icon}{label}</Link>
  } else {
    const propsOnClick = typeof (onClick) === 'function' ? onClick.bind(null, getPaginationString(), id) : null;

    returnValue = (<Button style={{ margin: "0px 0px 0px 3px" }} className={`btn btn-sm btn-${color}`}
      onClick={propsOnClick}> {icon}{label}</Button>)
  }

  return returnValue
}





// =========================================styles of material-ui

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