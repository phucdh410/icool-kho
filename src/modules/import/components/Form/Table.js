import { useMemo } from "react";

import { CCheckbox } from "_components/controls";

import { getAll } from "../../queries-fn/material.query";

import Row from "./Row";

export default ({
  edit,
  isLoading,
  data,
  store_code,
  onChange,
  isSelectAll,
}) => {
  //#region Data
  const { data: materials } = getAll(
    { all: edit, store_code },
    isLoading || !store_code
  );

  const ignore = useMemo(() => data.map((d) => d.code), [data]);
  // #endregion

  //#region Event
  const selectAll = (v) => onChange(data.map((d) => ({ ...d, check: v })));

  const change = (index) => (_data) => {
    const _new = [...data];
    _new[index] = { ..._new[index], ..._data };
    onChange(_new);
  };

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
          <th style={{ width: "50px", paddingLeft: "20px" }}>
            <CCheckbox value={isSelectAll} onChange={selectAll} />
          </th>
          <th style={{ width: "10%", minWidth: "150px" }}>Mã MH</th>
          <th style={{ width: "20%", minWidth: "250px" }}>Tên MH</th>
          <th style={{ width: "15%", minWidth: "150px" }}>Số lượng</th>
          <th style={{ width: "15%", minWidth: "150px" }}>ĐVT</th>
          <th style={{ width: "15%", minWidth: "150px" }}>Đơn giá</th>
          <th style={{ width: "auto", minWidth: "150px" }}>Thành tiền</th>
          {/* <th style={{ width: "auto", minWidth: "350px" }}>Ghi chú</th> */}
        </tr>
      </thead>
      <tbody>
        {data.map((d, index) => (
          <Row
            key={d.id}
            data={d}
            options={materials}
            ignore={ignore}
            onChange={change(index)}
            onSelect={select(index)}
          />
        ))}
      </tbody>
    </table>
    //#endregion
  );
};
