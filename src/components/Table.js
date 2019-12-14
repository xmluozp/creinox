import React, {useState} from 'react';
import _ from 'lodash'
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { history } from "../_helper";

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

import {_DATATYPES} from "../_constants/_dataTypes"

import TableHeadWrapper from './TableHeadWrapper'
import TableToolbarWrapper from './TableToolbarWrapper'
import TablePaginationWrapper from './TablePaginationWrapper'


// 所有pagination信息都从data来而不是本地
export const CreinoxTable = ({ headCells, editUrl, searchBar, tableTitle, data, onGetBySearch, dataModel, rowButtons = [], selectBox, toolbarButtons = [], ...props }) => {

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
  // const [loaded, setLoaded] = useState(false) // 配合useEffect绕过无法callBack的问题。
  const [page, setPage] = useState(dataPagination.page);
  const [perPage, setPerPage] = useState(dataPagination.perPage);
  const [order, setOrder] = useState(dataPagination.order);
  const [orderBy, setOrderBy] = useState(dataPagination.orderBy);
  // const [nextSearchTerms, setNextSearchTerms] = useState(_.get(data, "searchTerms"));
  const [listOnShow, setListOnShow] = useState([])
  const [selected, setSelected] = useState([]);
  // --------------- DISPLAY
  const classes = useStyles();
  const isSelected = name => selected.indexOf(name) !== -1;

  // 静态数据
  const dataRows = data && data.rows ? data.rows : [];
  const rowLength = data && data.rows ? data.rows.length : 0;
  const dataSearchTerms = data && data.searchTerms ? data.searchTerms : {};
  const emptyRows = dataPagination.perPage - Math.min(dataPagination.perPage, dataPagination.totalCount - page * dataPagination.perPage);

  // render数据预处理
  React.useEffect(() => {

    // 数据预处理。防止每次render都调用一遍
    const listOnShowTemp = []
    const dataRows = data && data.rows ? data.rows : [];

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
          originalContent = row[`${columnName}.${refLabel}`] || originalContent;
        } 

        // 如果是Enum，根据列名从datatypes里取文本
        const dataModelColumn = _.get(dataModel,["columns", columnName]);
        if (dataModelColumn && dataModelColumn.type === _DATATYPES.ENUM) {
          originalContent = _DATATYPES.ENUM[columnName][originalContent];
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

    // 用以渲染表格数据
    setListOnShow(listOnShowTemp);
  }, [data, headCells, dataModel])


  const getPaginationFromState = React.useCallback(
    (pg = { page, perPage, order, orderBy }) => {return pg},
    [ page, perPage, order, orderBy],
  )

  const p_updateData = (newPagination = {}, newSearchTerms = {}) => {
      onGetBySearch(newPagination, newSearchTerms); 
  }

  // 根据store的翻页信息更新data (刷新触发)
  const p_fetchData = React.useCallback(
    () => onGetBySearch({page:0}), // submit empty. refresh by store
    [onGetBySearch],
  )


  // fetch data first time
  React.useEffect(() => {
    if (!data) p_fetchData();
  }, [p_fetchData, data])


  // fetch data after change page
  // React.useEffect(() => {
  //   if(loaded) p_updateData();
  // }, [onGetBySearch, getPaginationFromState, nextSearchTerms, p_updateData])


  // *********************************************** handle for fetchData ****************************************
  const handleOnRefresh = e => {
    p_fetchData();
  }

  const handleOnSearch = (searchTerms) => {
    // 分别更新本地和远程
    // setNextSearchTerms(searchTerms); // work with paginatitor
    // onGetBySearch(getPaginationFromState(), searchTerms);

    p_updateData({}, searchTerms)
  }

  const handleRequestSort = (e, newOrderBy) => {
    const isDesc = orderBy === newOrderBy && order === 'desc';
    const newOrder = isDesc ? 'asc' : 'desc'
    if(order === newOrder && orderBy === newOrderBy) return;
    setOrder(newOrder);
    setOrderBy(newOrderBy);

    // fetchData
    p_updateData({...getPaginationFromState(), order: newOrder, orderBy: newOrderBy}, {});
  };

  const handleChangePage = (e, newPage) => {

    if (page === newPage) return;
    
    setPage(newPage);

    // fetchData
    p_updateData({...getPaginationFromState(), page: newPage}, {});
  };

  const handleChangeRowsPerPage = e => {
    const newPerPage = parseInt(e.target.value, 10)
    if (perPage === newPerPage) return;

    setPerPage(newPerPage);
    setPage(0);

    // fetchData
    p_updateData({...getPaginationFromState(), page: 0, perPage: newPerPage });
  };
// *********************************************** handle for fetchData ****************************************

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
          getPaginationFromState={getPaginationFromState}
        />

        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby={tableTitle}
            stickyHeader={false}
            size="small"
            aria-label={tableTitle}
            style={{minWidth: '1200px'}}
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
                        const handleCellDbClick = () => {if(editUrl) history.push(`${editUrl}/${rowId}`); } 
                        const SolveRef = React.forwardRef((props, ref) => <div {...props} ref={ref}>{columnContent}</div>); // 显示tip强制需要这段

                        return index >= 0
                          && index < headCells.length
                          && <TableCell key={`${rowId}_${index}`} align={column.align} 
                          onClick={handleCellClick} 
                          onDoubleClick={handleCellDbClick}
                          className={className}>
                            <Tooltip title={`${originalContent}`}>
                              <SolveRef />
                            </Tooltip>
                          </TableCell>
                      })}
                    { // 放操作按钮的格子
                      rowButtons ? <TableCell align="right" style={{minWidth: 80 * rowButtons.length}}>
                        {
                          rowButtons.map((buttonObj, index) => <ActionButton key={`button_${rowId}_${index}`} {...buttonObj} id={rowId} getPaginationFromState={getPaginationFromState} />)
                        }
                      </TableCell> : null
                    }
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 33 * emptyRows }}>
                  <TableCell colSpan={headCells.length + 1 + (selectBox&&1) || 0 } />
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
const ActionButton = ({ id, label, onClick, color, url, icon, getPaginationFromState }) => {

  let returnValue = label;
  if (url) {

    returnValue = <Link to={`${url}/${id}`} className={`btn btn-sm btn-${color}`}
      role="button" style={{ margin: "0px 0px 0px 3px" }} aria-pressed="true">{icon}{label}</Link>
  } else {
    const propsOnClick = typeof (onClick) === 'function' ? onClick.bind(null, getPaginationFromState(), id) : null;

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