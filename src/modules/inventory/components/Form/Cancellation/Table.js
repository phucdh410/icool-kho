import React, { useEffect, useMemo } from "react";

import Row from "./Row";

import { CCheckbox } from "_components/controls";

import { getAll } from "../../../queries-fn/material-group.query";

export default ({ data, warehouse, isSelectAll, onChange }) => {
  //#region Data
  const { data: materials } = getAll({});
  //#endregion

  //#region Event
  const selectAll = (v) => onChange(data.map((d) => ({ ...d, check: v })));

  const select = (index) => (v) => {
    const _new = [...data];
    _new[index] = { ..._new[index], check: v };

    onChange(_new);
  };
  //#endregion

  //#region Render
  return (
    <table className="table table-hover border c-table selectable">
      <thead>
        <tr>
          <th
            style={{ width: "50px", paddingLeft: "20px", paddingRight: "24px" }}
          >
            <CCheckbox value={isSelectAll} onChange={selectAll} />
          </th>
          <th
            style={{ width: "250px", minWidth: "250px", paddingRight: "24px" }}
          >
            Mã NVL
          </th>
          <th
            style={{ width: "auto", minWidth: "250px", paddingRight: "24px" }}
          >
            Tên NVL
          </th>
          <th
            style={{ width: "200px", minWidth: "200px", paddingRight: "24px" }}
          >
            Số lượng
          </th>
          <th
            style={{ width: "150px", minWidth: "150px", paddingRight: "24px" }}
          >
            ĐVT
          </th>
          <th
            style={{ width: "200px", minWidth: "200px", paddingRight: "24px" }}
          >
            Đơn giá
          </th>
          <th
            style={{ width: "200px", minWidth: "200px", paddingRight: "24px" }}
          >
            Tổng tiền
          </th>
          <th
            style={{ width: "200px", minWidth: "200px", paddingRight: "24px" }}
          >
            Nguyên nhân
          </th>
          <th
            style={{ width: "200px", minWidth: "200px", paddingRight: "24px" }}
          >
            Hình ảnh
          </th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((m, index) => (
            <Row
              key={m.id}
              data={m}
              warehouse={warehouse}
              materials={materials}
              onSelect={select(index)}
            />
          ))}
      </tbody>
    </table>
  );
  //#endregion
};
