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

export const withSimpleTable = (headCells, dataModel) => {
  const SimpleTable = ({ data, style, rowButtons, tableTitle, ...props }) => {
    const [listOnShow, setListOnShow] = useState([]);

    useEffect(() => {
      // render数据预处理用以渲染表格数据
      data = data || []

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

                return <TableCell key={`panel_${label}`}>{label}</TableCell>;
              })}

              {rowButtons && rowButtons.length > 0 ? (
                <TableCell align="center">操作</TableCell>
              ) : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* ============================= row =============================== */}
            {data && data.map((row, rowIndex) => (
              <TableRow key={row.id + row.code}>
                {headCells.map((column, columnIndex) => {
                  // 取出预处理后的cell:{cellProps, columnContent}
                  const columnObj =
                    listOnShow[rowIndex] && listOnShow[rowIndex][column.name];
                  if (!columnObj) return; // 如果取不到就先不取

                  const columnContent = columnObj.columnContent;
                  const cellProps = columnObj.cellProps;

                  return (
                    <TableCell key={`${row.id}_${columnIndex}`} {...cellProps}>
                      {columnContent}
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
                          key={`button_${row.id}_${index}`}
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
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return SimpleTable;
};

export default withSimpleTable();
