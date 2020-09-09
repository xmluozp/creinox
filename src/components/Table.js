import React, { useState } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { format } from "date-fns";
import { history , h_setHistoryQuery, h_getHistoryQuery, h_getTableUniqueCode, h_removeHistoryQuery} from "../_helper";


import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import formatCurrency from "format-currency";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";

import { _DATATYPES } from "../_constants/_dataTypes";

import TableHeadWrapper from "./TableHeadWrapper";
import TableToolbarWrapper from "./TableToolbarWrapper";
import TablePaginationWrapper from "./TablePaginationWrapper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { TabPanel } from "./TabPanel";

import { ImageList } from "./ImageList";

// 所有pagination信息都从data来而不是本地
export const CreinoxTable = ({
  toggle = false,
  headCells, // name, disablePadding, className, width, onShow, lookup, onWrap
  onRowDbClick,
  onRowImageClick,
  searchBar,
  tableTitle,
  data,
  onGetBySearch,
  dataModel,
  rowButtons = [],
  selectBox,
  isImageListMode = false,
  onImageListMapping = () => {},
  toolbarButtons = [],
  preConditions = {},
  isBorder = true,
  collapsePanel = [],
  ...props
}) => {

  // 默认数据（如果是页面，则从params里取）. 如果是用户返回，则取历史数据
  const defaultPagination = {
    page: 0,
    perPage: 10,
    totalCount: 0,
    totalPage: 0,
    order: "desc",
    orderBy: "",
  };



  // const isData = data && data.pagination

  // 本页用来显示的数据。唯一可信数据来源是从store传下来的data
  const dataPagination = {
    page: _.get(data, "pagination.page") || defaultPagination.page,
    perPage: _.get(data, "pagination.perPage") || defaultPagination.perPage,
    totalCount:
      _.get(data, "pagination.totalCount") || defaultPagination.totalCount,
    totalPage:
      _.get(data, "pagination.totalPage") || defaultPagination.totalPage,
    order: _.get(data, "pagination.order") || defaultPagination.order,
    orderBy: _.get(data, "pagination.orderBy") || defaultPagination.orderBy,
  };

  // 以下信息是用来提交pagination请求的，不涉及页面显示；页面如何显示完全来自于data
  const [page, setPage] = useState(dataPagination.page);
  const [perPage, setPerPage] = useState(dataPagination.perPage);
  const [order, setOrder] = useState(dataPagination.order);
  const [orderBy, setOrderBy] = useState(dataPagination.orderBy);
  // const [nextSearchTerms, setNextSearchTerms] = useState(_.get(data, "searchTerms"));
  const [listOnShow, setListOnShow] = useState([]);
  const [selected, setSelected] = useState([]);
  const [collapseOpen, setcollapseOpen] = useState([]);
  const [tabSelect, setTabSelect] = useState(0);

  // --------------- DISPLAY
  const classes = useStyles();
  const isCollapsePanel = collapsePanel.length > 0;

  // 静态数据
  const dataRows = data && data.rows ? data.rows : [];
  const rowLength = data && data.rows ? data.rows.length : 0;
  const dataSearchTerms = data && data.searchTerms ? data.searchTerms : {};
  const emptyRows = dataPagination.perPage - dataRows.length;

  React.useEffect(() => {
    // 数据预处理。防止每次render都调用一遍
    const dataRows = (data && data.rows) ? data.rows : [];

    // render数据预处理用以渲染表格数据
    setListOnShow(dataRowsPreprocess(dataRows, headCells, dataModel));
  }, [data, headCells, dataModel]);

  const getPaginationFromState = React.useCallback(
    (pg = { page, perPage, order, orderBy }) => {
      return pg;
    },
    [page, perPage, order, orderBy]
  );

  // table的唯一标识。用来在返回的时候，从storage里存储和读取搜索结果的历史记录用
  const getTableUniqueCode = () => {

    return h_getTableUniqueCode(dataModel.dataStore, tableTitle)
  }  


  // 根据store的翻页信息更新data (刷新触发)
  const p_updateData = (newPagination = defaultPagination, newSearchTerms = {}) => {

    // call onGetBySearch #2
    // 200729: preConditions 应该有更高的优先级. 因为它代表的是前提条件.
    onGetBySearch(newPagination, { ...newSearchTerms, ...preConditions});

    // 20200601 更新历史记录。用来做浏览器返回用。记录根据dataModel来
    // h_setHistoryQuery(getTableUniqueCode(), {pagination: newPagination, searchTerms: { ...preConditions, ...newSearchTerms }})

    // 20200728 preConditions让给外部操控。外部换了preCondition这里就应该是新的
    h_setHistoryQuery(
      getTableUniqueCode(), 
      {pagination: newPagination, searchTerms: { ...newSearchTerms, ...preConditions }})
  };

  // 进入页面时更新data (跳转触发)
  const p_fetchData = React.useCallback(
    () => {
 
      let p, s
      const query = h_getHistoryQuery(getTableUniqueCode())
      // 如果是从浏览器返回，就读取历史记录的pagination
      if(props.history && props.history.action === "POP" && query) {
        p = query.pagination;
        s = query.searchTerms;
      } else {
        p = defaultPagination;
        s = {}
      }
      // call onGetBySearch #1
      return onGetBySearch(p, {...s, ...preConditions});
    }, // submit empty. refresh by store
    [onGetBySearch, preConditions]
  );

  // fetch data first time
  React.useEffect(() => {

    if (!data) {
      // 第一次取数据
      p_fetchData()
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 从外部强制刷新数据用. 页码设回0, 返回用的翻页记录清空.
  React.useEffect(() => {
    setPage(0)

    // 如果是页面返回，保留翻页
    // 200822: 会导致一返回记录也清空。如果加了判断导致翻页无效
    // if(!(props.history && props.history.action === "POP")) {
    //   h_removeHistoryQuery(getTableUniqueCode())
    // }    
    p_fetchData();
  }, [toggle]);

  // *********************************************** handle for fetchData ****************************************
  const handleOnRefresh = (e) => {

    // p_fetchData(); 
    // 20200601： 因为fetchData时，需要判断是否从浏览器点击返回，如果返回则取历史记录。这里如果直接fetch，返回后刷新也会误取历史记录
    p_updateData(defaultPagination, preConditions)
  };

  const handleOnSearch = (searchTerms) => {
    // 分别更新本地和远程
    // setNextSearchTerms(searchTerms); // work with paginatitor
    // onGetBySearch(getPaginationFromState(), searchTerms);

    p_updateData(defaultPagination, searchTerms);
  };

  const handleRequestSort = (e, newOrderBy) => {
    const isDesc = orderBy === newOrderBy && order === "desc";
    const newOrder = isDesc ? "asc" : "desc";
    if (order === newOrder && orderBy === newOrderBy) return;
    setOrder(newOrder);
    setOrderBy(newOrderBy);

    // fetchData
    p_updateData(
      { ...getPaginationFromState(), order: newOrder, orderBy: newOrderBy },
      dataSearchTerms // {}
    );
  };

  const handleChangePage = (e, newPage) => {

    console.log("change page", page, newPage)
    if (page === newPage) return;

    setPage(newPage);

    // fetchData
    p_updateData(
      { ...getPaginationFromState(), page: newPage },
      dataSearchTerms // {}
    );
  };

  const handleChangeRowsPerPage = (e) => {
    const newPerPage = parseInt(e.target.value, 10);
    if (perPage === newPerPage) return;

    setPerPage(newPerPage);
    setPage(0);

    // fetchData
    p_updateData({ ...getPaginationFromState(), page: 0, perPage: newPerPage });
  };
  const handleTabChange = (event, newValue) => {
    setTabSelect(newValue);
  };

  // *********************************************** handle for fetchData ****************************************

  // ----------------------- handle for table component
  const handleSelectAllClick = (e) => {
    if (e.target.checked) {
      const newSelecteds = data.rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleCollapseAll = (e) => {
    const newCollapseOpen = data.rows.map((n) => n.id);

    if (collapseOpen.length === 0) {
      setcollapseOpen(newCollapseOpen);
      return;
    } else {
      setcollapseOpen([]);
    }
  };

  const handleSelectOnAction = (e) => {
    selectBox &&
      selectBox.onAction(selected, { ...getPaginationFromState(), page: 0 });
    setSelected([]);
  };

  // 处理选择框
  const handleClick = (e, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    // 如果是第一个框，就是全选，否则就是选当列
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  // 处理展开关闭
  const handleClickCollapse = (e, rowId) => {
    const clickIndex = collapseOpen.indexOf(rowId);
    let newCollapseOpen = [];

    if (clickIndex === -1) {
      newCollapseOpen = newCollapseOpen.concat(collapseOpen, rowId);
    } else if (clickIndex === 0) {
      newCollapseOpen = newCollapseOpen.concat(collapseOpen.slice(1));
    } else if (clickIndex === collapseOpen.length - 1) {
      newCollapseOpen = newCollapseOpen.concat(collapseOpen.slice(0, -1));
    } else if (clickIndex > 0) {
      newCollapseOpen = newCollapseOpen.concat(
        collapseOpen.slice(0, clickIndex),
        collapseOpen.slice(clickIndex + 1)
      );
    }

    setcollapseOpen(newCollapseOpen);
  };
  // style={{ minWidth: "1200px" }}

  // 空行里有几个空列，填充用
  const colSpan =
    headCells.length +
    1 +
    ((selectBox && 1) || 0) +
    ((isCollapsePanel && 1) || 0);
  const CreinoxTableRow = ({ row, rowIndex }) => {
    const isItemSelected = selected.indexOf(row.id) !== -1;
    const isCollapseOpen = collapseOpen.indexOf(row.id) !== -1;

    const labelId = `enhanced-table-checkbox-${rowIndex}`;
    const rowId = row.id;

    const handleRowDbClick =
      (typeof onRowDbClick === "function" &&
        onRowDbClick.bind(null, rowId, row, getPaginationFromState())) ||
      null;

    return (
      <>
        <TableRow
          hover
          role="checkbox"
          aria-checked={isItemSelected}
          tabIndex={-1}
          key={row.id}
          onDoubleClick={handleRowDbClick}
          selected={isItemSelected}
          style={
            isCollapsePanel && isCollapseOpen
              ? { backgroundColor: "#fdffe9" }
              : null
          }
        >
          {/* 放折叠展开按钮 */}
          {isCollapsePanel && (
            <TableCell
              onClick={(event) => handleClickCollapse(event, row.id)}
              style={{width:50}}
            >
              <IconButton aria-label="expand row" size="small">
                {isCollapseOpen ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </IconButton>
            </TableCell>
          )}

          {/* 放选择框 */}
          {selectBox && (
            <TableCell
              padding="checkbox"
              onClick={(event) => handleClick(event, row.id)}
            >
              <Checkbox
                checked={isItemSelected}
                inputProps={{ "aria-labelledby": labelId }}
              />
            </TableCell>
          )}

          {
            // 普通格子
            headCells.map((column, index) => {
              let originalContent = row[column.name];
              {
                /* let className = column.className; */
              }

              // 取出预处理后的cell:{cellProps, columnContent}
              const columnObj =
                listOnShow[rowIndex] && listOnShow[rowIndex][column.name];
              // if (!columnObj) return; // 如果取不到就先不取

              const columnContent = columnObj && columnObj.columnContent || "";
              const cellProps = columnObj && columnObj.cellProps || {};


              // 显示tip必须要这段
              const SolveRef = React.forwardRef((props, ref) => (
                <div {...props} ref={ref}>
                  {columnContent}
                </div>
              ));

              return (
                <TableCell key={`${rowId}_${index}`} {...cellProps}>
                  <Tooltip title={`${originalContent}`}>
                    <SolveRef />
                  </Tooltip>
                </TableCell>
              );
            })
          }
          {
            // 放操作按钮的格子 (如果有行没id，说明是最下面的统计行。需要填上空列)
            (rowId <= 0) ? <TableCell/> : (rowButtons && rowButtons.length > 0) ? (
              <TableCell
                align="right"
                style={{ minWidth: 80 * rowButtons.length }}
              >
                {rowButtons.map((buttonObj, index) => (
                  <ActionButton
                    key={`button_${rowId}_${index}`}
                    {...buttonObj}
                    disabled="true"
                    id={rowId}
                    row={row}
                    getPaginationFromState={getPaginationFromState}
                    searchTerms={dataSearchTerms}
                  />
                ))}
              </TableCell>
            ) : null
          }
        </TableRow>

        {/* 折叠的面板 */}
        {isCollapsePanel && isCollapseOpen ? (
          <TableRow>
            <TableCell
              style={{
                padding: 0,
                // backgroundColor: "#d9e8f3",
                backgroundColor: "#e6eff6",
                borderBottom: "1px solid #2f353a",
              }}
              colSpan={colSpan}
            >
              <Tabs
                value={tabSelect}
                style={{ borderBottom: "1px solid #E0E0E0" }}
                onChange={handleTabChange}
                aria-label="tabs"
              >
                {collapsePanel.map((v, i) => {
                  var columnName = v.name;
                  return (
                    <Tab
                      label={v.title}
                      key={row.id + "_tab_" + columnName}
                      style={{ padding: 0 }}
                    />
                  );
                })}
              </Tabs>

              {collapsePanel.map((v, i) => {
                var Com = v.RenderComponent;
                var columnName = v.name;
                return (
                  <TabPanel
                    key={row.id + "_panel_" + columnName}
                    value={tabSelect}
                    index={i}
                    padding={0}
                  >
                    <Com data={row[columnName]} {...v.props} />
                  </TabPanel>
                );
              })}
            </TableCell>
          </TableRow>
        ) : null}
      </>
    );
  };

  const tableBody = (
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
        selectBox={{
          isSelectBox: selectBox,
          numSelected: selected.length,
          onSelectAllClick: handleSelectAllClick,
        }}
        collapseBox={{
          isCollapsePanel: isCollapsePanel,
          onCollapseAll: handleCollapseAll,
          isCollapseAll: collapseOpen.length > 0,
        }}
        order={dataPagination.order}
        orderBy={dataPagination.orderBy}
        onRequestSort={handleRequestSort}
        dataModel={dataModel}
        rowCount={rowLength}
        headCells={headCells}
        isButtons={rowButtons.length > 0}
      />
      <TableBody>
        {dataRows.map((row, rowIndex) => (
          <CreinoxTableRow row={row} rowIndex={rowIndex} key={row.id} />
        ))}

        {dataRows && listOnShow && (dataRows.length === listOnShow.length - 1) ? 
          <CreinoxTableRow row={listOnShow[listOnShow.length - 1]} rowIndex={listOnShow.length - 1} key={listOnShow[listOnShow.length - 1].id} /> : null
        }

        {emptyRows > 0 && ( // 补行
          <TableRow style={{ height: 33 * emptyRows }}>
            <TableCell colSpan={colSpan} />
          </TableRow>
        )}
      </TableBody>
    </Table>
  );

  // 图片如果没有特殊的onclic的话，就打开详情页链接
  const handleImageLinkToItem = (imageId, photo) => {
    const url = photo && photo.other && photo.other.url ? photo.other.url : -1
    if(url) {
      history.push(url)
    }    
  }

  const imageListData = onImageListMapping(dataRows) || [];
  const imageListClick =
    typeof onRowImageClick === "function"
      ? onRowImageClick.bind(null, getPaginationFromState())
      : handleImageLinkToItem;
  const imageListBody = (
    <div style={{ padding: 10 }}>
      <ImageList tileData={imageListData} onClick={imageListClick} />
    </div>
  );

  const insideTable = (
    <>
      {/* -------------------toolbar (search; select submit)----------------- */}
      <TableToolbarWrapper
        searchTerms={dataSearchTerms}
        searchBar={searchBar}
        selectBox={selectBox}
        selectOnAction={handleSelectOnAction}
        numSelected={selected.length}
        tableTitle={tableTitle}
        onRefresh={handleOnRefresh}
        onSearch={handleOnSearch}
        dataModel={dataModel}
        toolbarButtons={toolbarButtons}
        getPaginationFromState={getPaginationFromState}
        isBorder={isBorder}
      />

      <div className={classes.tableWrapper}>
        {isImageListMode ? imageListBody : tableBody}
      </div>

      {/* ------------------- pagination ----------------- */}
      <TablePaginationWrapper
        count={dataPagination.totalCount}
        rowsPerPage={dataPagination.perPage}
        page={dataPagination.page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );

  // 判断要不要显示外框。如果是内页就不显示（比如公司的联系人列表）
  return (
    <div className={classes.root}>
      {isBorder ? (
        <Paper className={classes.paper}>{insideTable}</Paper>
      ) : (
        insideTable
      )}
    </div>
  );
};

// ============================================================右边按钮. 给button传入pagination因为删除后, 页面刷新
export const ActionButton = ({
  id,
  row,
  label,
  onClick,
  onShow,
  color,
  url,
  icon,
  getPaginationFromState,
  searchTerms,
}) => {
  // 加这个的原因是：有的属性是根据row动态变化的，比如id
  let injectOptions;
  if (typeof onShow === "function") {
    injectOptions = onShow(row);
  }

  let returnValue = label;
  if (url) {

    // 可以用渲染也可以用文本
    const renderUrl = typeof(url) === "function"? url(row) : `${url}/${id}`
    returnValue = (
      <Link
        to={renderUrl}
        className={`btn btn-sm btn-${color}`}
        role="button"
        style={{ margin: "0px 0px 0px 3px" }}
        aria-pressed="true"
        {...injectOptions}
      >
        {icon}
        {label}
      </Link>
    );
  } else {
    const propsOnClick =
      typeof onClick === "function"
        ? onClick.bind(null, id, row, getPaginationFromState(), searchTerms)
        : null;

    returnValue = (
      <Button
        style={{ margin: "0px 0px 0px 3px" }}
        className={`btn btn-sm btn-${color}`}
        onClick={propsOnClick}
        {...injectOptions}
      >
        {" "}
        {icon}
        {label}
      </Button>
    );
  }

  return returnValue;
};

// render数据预处理函数
export const dataRowsPreprocess = (dataRows, headCells, dataModel) => {
  const listOnShowTemp = [];

  const wrapUpRow = {}
  let isWrapUp = false;

  dataRows.map((row) => {
    const rowObj = {};
    headCells.map((column) => {
      let columnContent;
      const columnName = column.name;

      // 最后统计用
      const columnOnWrap = column.onWrap;

      let originalContent = row[columnName];

      //  ==================================================================== content
      // 如果是外键，就取 外键.labelName 的字段。这个数据API预生成
      const refLabel = _.get(dataModel, ["columns", columnName, "refLabel"]);
      if (refLabel) {
        // originalContent = row[`${columnName}.${refLabel}`] || originalContent;
        const refField = `${columnName}.row`; // 格式： imagexx_id.row.path
        originalContent =
          (row[refField] && row[refField][refLabel]) || originalContent;
      }

      // 如果是Enum，根据列名从datatypes里取文本
      const dataModelColumn = _.get(dataModel, ["columns", columnName]);
      if (dataModelColumn && dataModelColumn.type === _DATATYPES.ENUM) {
        originalContent = _DATATYPES.ENUM[columnName][originalContent];
      }
      // 如果是Money，变成currency
      if (dataModelColumn && dataModelColumn.type === _DATATYPES.MONEY) {
        originalContent = formatCurrency(originalContent);
      }

      // 如果是时间，改变格式
      if (dataModelColumn && dataModelColumn.type === _DATATYPES.DATETIME) {
        const newDateTime = new Date(originalContent);
        originalContent = format(newDateTime, "yyyy/MM/dd HH:mm:ss");
      }

      if (dataModelColumn && dataModelColumn.type === _DATATYPES.DATE) {
        const newDateTime = new Date(originalContent);
        originalContent = format(newDateTime, "yyyy/MM/dd");
      }

      // 如果是callBak，预先生成结果
      if (typeof column.onShow === "function") {
        originalContent = column.onShow(originalContent, row);
      }

      // 如果是lookup预先翻译内容。但样式要在下面取
      if (column.lookup) {
        columnContent = column.lookup[originalContent];
      } else {
        columnContent = originalContent;
      }

      // ==================================================================== props
      // 如果是数字，右对齐
      const isNumber =
        dataModelColumn &&
        (dataModelColumn.type === _DATATYPES.INT ||
          dataModelColumn.type === _DATATYPES.DECIMAL ||
          dataModelColumn.type === _DATATYPES.MONEY) &&
        column.name !== "id";

      /* columnContent =
                listOnShow[rowIndex] && listOnShow[rowIndex][column.name]; // 有预处理就取预处理，否则直接取值 */
      let className = column.className;
      if (column.lookup) {
        className = _.get(column, ["className", originalContent]) || null; // 如果是lookup。样式就是个array。否则直接是样式
      }

      const handleCellClick = column.onClick
        ? column.onClick.bind(null, row.id)
        : null;

      // 控制列宽，防止超过或者挤压, ID是例外
      // const minWidth = column.width
      //   ? column.width
      //   : column.minWidth
      //   ? column.minWidth
      //   : dataModelColumn && dataModelColumn.minWidth
      //   ? dataModelColumn.minWidth
      //   : dataModelColumn && dataModelColumn.label === "ID"
      //   ? 50
      //   : 100;
      // const maxWidth = column.width
      //   ? column.width
      //   : column.maxWidth
      //   ? column.maxWidth
      //   : dataModelColumn && dataModelColumn.maxWidth
      //   ? dataModelColumn.maxWidth
      //   : "auto";

      // const width = column.width ? column.width: "auto"

      const cellProps = {
        align: column.align ? column.align : isNumber ? "right" : "left",
        style: {
          borderRight: "1px dashed rgba(224, 224, 224, 1)",
          // width:width,
          // minWidth: minWidth,
          // maxWidth: maxWidth,
        },
        className: className,
        onClick: handleCellClick,
      };

      rowObj[column.name] = {
        cellProps,
        columnContent: columnContent,
      };

      // 
      if(columnOnWrap && typeof(columnOnWrap) ==='function') {
        isWrapUp = true

        const lastColumnContent = wrapUpRow[column.name] &&  wrapUpRow[column.name].columnContent
        wrapUpRow[column.name] = {
          cellProps,
          columnContent: columnOnWrap(columnContent, lastColumnContent),
        }
      }

      return null;
    });
    listOnShowTemp.push(rowObj);
    return null;
  });

  // 最后一列塞入
  if(isWrapUp) {
    wrapUpRow.id = -1
    listOnShowTemp.push(wrapUpRow);
  }

  return listOnShowTemp;
};

// =========================================styles of material-ui

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
  tableWrapper: {
    overflowX: "auto",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));
