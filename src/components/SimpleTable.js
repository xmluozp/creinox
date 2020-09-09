import React, { useState, useEffect } from "react";
import _ from "lodash";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";

import { dataRowsPreprocess, ActionButton } from "./Table";

export const withSimpleTable = ({ headCells, dataModel }) => {
  const SimpleTable = ({ data, style, rowButtons, tableTitle, ...props }) => {
    const [listOnShow, setListOnShow] = useState([]);

    useEffect(() => {
      // render数据预处理用以渲染表格数据
      data = data || [];

      setListOnShow(dataRowsPreprocess(data, headCells, dataModel));
    }, [data, headCells, dataModel]);

    return (
      <TableContainer style={style} {...props}>
        <Table
          aria-label="collapsible table"
          aria-labelledby={tableTitle}
          stickyHeader={false}
          size="small"
          style={{ backgroundColor: "#f9fcff" }}
        >
          {/* ============================= head =============================== */}
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => {
                const labelFromModel =
                  dataModel &&
                  dataModel.columns[headCell.name] &&
                  dataModel.columns[headCell.name].label;
                const label =
                  headCell.label || labelFromModel || headCell.name || "";
                
                const dataModelColumn = dataModel && dataModel.columns[headCell.name]
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

                const width = headCell.width ? headCell.width : "auto";

                return <TableCell
                  key={`panel_${label}`}
                  style={{
                    whiteSpace: "nowrap",
                    width: width,
                    minWidth: minWidth,
                    maxWidth: maxWidth,
                  }}
                >
                  {label}
                </TableCell>;
              })}

              {rowButtons && rowButtons.length > 0 ? (
                <TableCell align="center">操作</TableCell>
              ) : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* ============================= row =============================== */}
            {data &&
              data.map((row, rowIndex) => (
                <TableRow key={`row_${rowIndex}`}>
                  {headCells.map((column, columnIndex) => {
                    // 取出预处理后的cell:{cellProps, columnContent}
                    const columnObj =
                      listOnShow[rowIndex] && listOnShow[rowIndex][column.name];
                    if (!columnObj) return; // 如果取不到，说明没有预处理，就不取预处理

                    const columnContent = columnObj.columnContent;
                    const cellProps = columnObj.cellProps;

                    return (
                      <TableCell
                        key={`column_${rowIndex}_${columnIndex}`}
                        {...cellProps}
                      >
                        {columnContent || "-"}
                      </TableCell>
                    );
                  })}
                  {/* 控制的部分 */}
                  {
                    // 放操作按钮的格子
                    rowButtons ? (
                      <TableCell
                        align="right"
                        style={{ minWidth: 80 * rowButtons.length }}
                      >
                        {rowButtons.map((buttonObj, index) => (
                          <ActionButton
                            key={`row_${rowIndex}_button_${index}`}
                            {...buttonObj}
                            disabled="true"
                            id={row.id}
                            row={row}
                          />
                        ))}
                      </TableCell>
                    ) : null
                  }
                </TableRow>
              ))}
            {/* ============================= foot =============================== */}
            {data && listOnShow && data.length === listOnShow.length - 1 ? (
              <TableRow key={`row_${listOnShow.length - 1}`}>
                {headCells.map((column, columnIndex) => {
                  const rowIndex = listOnShow.length - 1;

                  // 和上面的代码一模一样
                  const columnObj =
                    listOnShow[rowIndex] && listOnShow[rowIndex][column.name];
                  {
                    /* if (!columnObj) return; // 如果取不到，说明没有预处理，就不取预处理 */
                  }

                  const columnContent =
                    (columnObj && columnObj.columnContent) || "";
                  const cellProps = (columnObj && columnObj.cellProps) || {};

                  return (
                    <TableCell
                      key={`column_${rowIndex}_${columnIndex}`}
                      {...cellProps}
                    >
                      {columnContent}
                    </TableCell>
                  );
                })}
                {rowButtons ? <TableCell></TableCell> : null}
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return SimpleTable;
};

export default withSimpleTable({});
