import React from './node_modules/react';
import PropTypes from './node_modules/prop-types';

import TableCell from './node_modules/@material-ui/core/TableCell';
import TableRow from './node_modules/@material-ui/core/TableRow';
import TableHead from './node_modules/@material-ui/core/TableHead';
import TableSortLabel from './node_modules/@material-ui/core/TableSortLabel';

import Checkbox from './node_modules/@material-ui/core/Checkbox';

// 表头，包含排序
const TableHeadWrapper = (props) => {
    const { classes, onSelectAllClick, selectBox,  order, orderBy, numSelected, rowCount, onRequestSort, headCells, dataModel, isButtons } = props;
    const createSortHandler = property => event => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          {selectBox &&
          <TableCell padding="checkbox">
           
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all items' }}
            />
          </TableCell>}
          {headCells.map(headCell => {
            const labelFromModel = dataModel && dataModel.columns[headCell.name] && dataModel.columns[headCell.name].label;
            const label = headCell.label || labelFromModel || headCell.name || "";

            const className = ((typeof(headCell.className) === 'string') && headCell.className) || "";
            
            return (
            <TableCell
              key={headCell.name}
              align={
                headCell.align ? headCell.align : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.name ? order : false}
              style={{whiteSpace: "nowrap"}}
            >
              <TableSortLabel
                active={orderBy === headCell.name}
                direction={order}
                onClick={createSortHandler(headCell.name)}
                className = {className}
                
              >
                {label}
                {orderBy === headCell.name ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          )}
          )}
          {isButtons ? <TableCell align='center'>操作</TableCell> : null}
        </TableRow>
      </TableHead>
    );
  }
  
  TableHeadWrapper.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
    headCells: PropTypes.array.isRequired
  };
  
  export default TableHeadWrapper;