import { useMemo } from "react";

import { getAll } from "../../queries-fn/good.query";

import Row from "./GoodRow";

export default ({ edit, isLoading, data, store_code, onChange }) => {
  //#region Date
  const { data: goods } = getAll({ store_code }, isLoading || !store_code);

  const ignore = useMemo(() => data.map((d) => d.code), [data]);
  //#endregion

  //#region
  const change = (index) => (_data) => {
    const _new = [...data];
    _new[index] = _data;
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
    <table className="table table-hover border c-table">
      <thead>
        <tr>
          <th
            style={{ width: "50px", paddingLeft: "20px", paddingRight: "24px" }}
          ></th>
          <th style={{ width: "8%", minWidth: "150px", paddingRight: "24px" }}>
            Mã Mặc Hàng
          </th>
          <th
            style={{ width: "auto", minWidth: "450px", paddingRight: "24px" }}
          >
            Tên Mặc Hàng
          </th>
          <th style={{ width: "10%", minWidth: "150px", paddingRight: "24px" }}>
            ĐVT
          </th>
          <th style={{ width: "10%", minWidth: "100px", paddingRight: "24px" }}>
            Số lượng
          </th>
          <th style={{ width: "15%", minWidth: "100px", paddingRight: "24px" }}>
            Thành tiền
          </th>
          <th style={{ width: "15%", minWidth: "150px", paddingRight: "24px" }}>
            Ghi chú
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((d, index) => (
          <Row
            key={d.id || d.code}
            data={d}
            options={goods}
            ignore={ignore}
            onChange={change(index)}
            onSelect={select(index)}
          />
        ))}
      </tbody>
    </table>
  );
  //#endregion
};
