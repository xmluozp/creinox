import React from "react";
import PropTypes from "prop-types";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableSortLabel from "@material-ui/core/TableSortLabel";

import Checkbox from "@material-ui/core/Checkbox";
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

// 表头，包含排序
const TableHeadWrapper = (props) => {
  const {
    selectBox,
    collapseBox,
    classes,
    order,
    orderBy,
    rowCount,
    onRequestSort,
    headCells,
    dataModel,
    isButtons,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {collapseBox && collapseBox.isCollapsePanel && (
          <TableCell
                  onClick={collapseBox.onCollapseAll}
                >
                  <IconButton aria-label="expand row" size="small">

                    {collapseBox.isCollapseAll?<KeyboardArrowUpIcon/> :  <KeyboardArrowDownIcon/> }
                    
                  </IconButton>
          </TableCell>
        )}

        {selectBox && selectBox.isSelectBox && (
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={selectBox.numSelected > 0 && selectBox.numSelected < rowCount}
              checked={selectBox.numSelected === rowCount}
              onChange={selectBox.onSelectAllClick}
              inputProps={{ "aria-label": "select all items" }}
            />
          </TableCell>
        )}

        {headCells.map((headCell) => {
          const labelFromModel =
            dataModel &&
            dataModel.columns[headCell.name] &&
            dataModel.columns[headCell.name].label;
          const label = headCell.label || labelFromModel || headCell.name || "";

          const className =
            (typeof headCell.className === "string" && headCell.className) ||
            "";

          const dataModelColumn = dataModel && dataModel.columns[headCell.name]

          // 控制列宽，防止超过或者挤压, ID是例外
          const minWidth = headCell.width
            ? headCell.width
            : headCell.minWidth
            ? headCell.minWidth
            : dataModelColumn && dataModelColumn.minWidth
            ? dataModelColumn.minWidth
            : dataModelColumn && dataModelColumn.label === "ID"
            ? 50
            : 100;
          const maxWidth = headCell.width
            ? headCell.width
            : headCell.maxWidth
            ? headCell.maxWidth
            : dataModelColumn && dataModelColumn.maxWidth
            ? dataModelColumn.maxWidth
            : "auto";

          const width = headCell.width ? headCell.width: "auto"

          return (
            <TableCell
              key={headCell.name}
              align={headCell.align ? headCell.align : "left"}
              padding={headCell.disablePadding ? "none" : "default"}
              sortDirection={orderBy === headCell.name ? order : false}
              style={{ 
                whiteSpace: "nowrap" ,
                width:width,
                minWidth: minWidth,
                maxWidth: maxWidth,
              }}
            >
              <TableSortLabel
                active={orderBy === headCell.name}
                direction={order}
                onClick={createSortHandler(headCell.name)}
                className={className}
              >
                {label}
                {orderBy === headCell.name ? (
                  <span className={classes.visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          );
        })}
        {isButtons ? <TableCell align="center">操作</TableCell> : null}
      </TableRow>
    </TableHead>
  );
};

TableHeadWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
  // numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  // onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  headCells: PropTypes.array.isRequired,
};

export default TableHeadWrapper;
