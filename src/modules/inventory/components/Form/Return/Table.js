import { CCheckbox } from "_components/controls";

import Row from "./Row";

export default ({ control, data, onSelect, isSelectedAll, selected }) => {
  //#region Data
  //#endregion

  //#region Event
  //#endregion

  //#region Render
  return (
    <table className="table table-hover border c-table selectable">
      <thead>
        <tr>
          <th
            style={{ width: "50px", paddingLeft: "20px", paddingRight: "24px" }}
          >
            <CCheckbox value={isSelectedAll} onChange={onSelect()} />
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
          data.map((e, index) => (
            <Row
              key={e?.__id}
              control={control}
              index={index}
              onSelect={onSelect}
              selected={selected}
            />
          ))}
      </tbody>
    </table>
  );
  //#endregion
};
