import { useMemo, useState } from "react";

import Row from "./Row";

export default ({ materials, data, onChange }) => {
  //#region Data
  const [selectedList, setSelectedList] = useState([]);
  //#endregion

  //#region Event
  const onSelect = (index, checkStatus) => {
    if (check) {
    }
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
            Mã MH
          </th>
          <th
            style={{ width: "auto", minWidth: "450px", paddingRight: "24px" }}
          >
            Tên MH
          </th>
          <th style={{ width: "10%", minWidth: "100px", paddingRight: "24px" }}>
            Số lượng
          </th>
          <th style={{ width: "15%", minWidth: "150px", paddingRight: "24px" }}>
            Đơn giá
          </th>
          <th style={{ width: "15%", minWidth: "150px", paddingRight: "24px" }}>
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
            options={materials}
            onSelect={select(index)}
            index={index}
          />
        ))}
      </tbody>
    </table>
  );
  //#endregion
};
