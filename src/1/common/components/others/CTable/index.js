import { useCallback, useEffect, useRef } from "react";
import classNames from "classnames";

import "../PTable/styles.scss";

export const CTable = ({
  headers = [
    {
      key: "",
      label: "",
      width: "auto",
      align: "center",
      colSpan: 1,
      render: null,
      cellRender: null,
      style: {},
    },
  ],
  data = [],
  rowKey = "id",
  headerMultiline = false,
  headerTransform = "none",
  fontSizeBody = 14,
  ...props
}) => {
  //#region Render
  return (
    <div
      id="c-table-phuc-container"
      className={classNames("overflow-auto block")}
    >
      <table id="c-table-phuc" {...props}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={header.key + index}
                align={header.align ?? "center"}
                colSpan={header.colSpan ?? 1}
                style={{
                  width: header.width ?? "auto",
                  whiteSpace: headerMultiline ? "pre-wrap" : "nowrap",
                  textTransform: headerTransform ?? "none",
                  ...header.style,
                }}
              >
                {header?.render ? header.render() : header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr key={row[rowKey]}>
                {headers.map((column, _index) => (
                  <td
                    key={column.key + _index}
                    align={column.align ?? "center"}
                    style={{ fontSize: fontSizeBody }}
                  >
                    {!column.align || column.align === "center" ? (
                      <div className="flex w-full items-center justify-center">
                        {column?.cellRender
                          ? column.cellRender(row?.[column.key], row, index)
                          : typeof row?.[column.key] !== "string" ||
                            typeof row?.[column.key] !== "number"
                          ? row?.[column.key]?.toString()
                          : row?.[column.key]}
                      </div>
                    ) : column?.cellRender ? (
                      column.cellRender(row?.[column.key], row, index)
                    ) : typeof row?.[column.key] !== "string" ||
                      typeof row?.[column.key] !== "number" ? (
                      row?.[column.key]?.toString()
                    ) : (
                      row?.[column.key]
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="100%">
                <div className="min-h-[300px] flex justify-center items-center">
                  Không có dữ liệu hiển thị
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
  //#endregion
};
