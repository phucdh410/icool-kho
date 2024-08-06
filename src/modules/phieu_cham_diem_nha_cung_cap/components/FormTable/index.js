import { useQuery } from "react-query";

import { nguyenVatLieuApi } from "src/1/apis/nguyen_vat_lieu.api";
import { nhaCungCapApi } from "src/1/apis/nha_cung_cap.api";
import { PTable } from "src/1/common/components/others";
import { CCheckbox } from "src/common/components/controls";

import { Row } from "./Row";

export const FormTable = ({
  control,
  dataTable = [],
  onlyView = false,
  isSelectedAll,
  onSelectAll,
}) => {
  //#region Data
  const { data: materials_options } = useQuery({
    queryKey: ["danh-sach-nvl"],
    queryFn: () => nguyenVatLieuApi.getAll(),
    select: (response) =>
      response?.data?.data?.map((e) => ({ value: e?.code, label: e?.name })),
  });

  const { data: suppliers_options } = useQuery({
    queryKey: ["danh-sach-nha-cung-cap"],
    queryFn: () => nhaCungCapApi.getAll(),
    select: (response) =>
      response?.data?.data?.map((e) => ({
        value: e?.code,
        label: e?.name,
        code: e?.code,
      })),
  });
  //#endregion

  //#region Event
  const onListChange = (changeCb) => (options) => {
    changeCb(options?.map((opt) => opt?.value));
  };
  //#endregion

  //#region Render
  return (
    <PTable>
      <thead>
        <tr>
          {!onlyView && (
            <th>
              <CCheckbox
                value={isSelectedAll}
                onChange={onSelectAll}
                disabled={onlyView}
              />
            </th>
          )}
          <th className="min-w-[190px]" style={{ textTransform: "capitalize" }}>
            Mã NCC
          </th>
          <th className="min-w-[350px]" style={{ textTransform: "capitalize" }}>
            Tên NCC
          </th>
          <th className="min-w-[180px]" style={{ textTransform: "capitalize" }}>
            Năng lực tài chính
          </th>
          <th className="min-w-[140px]" style={{ textTransform: "capitalize" }}>
            Uy tín NCC
          </th>
          <th className="min-w-[140px]" style={{ textTransform: "capitalize" }}>
            Chất lượng
          </th>
          <th className="min-w-[140px]" style={{ textTransform: "capitalize" }}>
            Đánh giá từ
            <br />
            chi nhánh
          </th>
          <th className="min-w-[140px]" style={{ textTransform: "capitalize" }}>
            Đánh giá từ
            <br />
            khách hàng
          </th>
          <th className="min-w-[140px]" style={{ textTransform: "capitalize" }}>
            Giá cả
          </th>
          <th className="min-w-[350px]" style={{ textTransform: "capitalize" }}>
            Danh sách NVL cung cấp
          </th>
          <th className="min-w-[185px]" style={{ textTransform: "capitalize" }}>
            Tài liệu minh chứng
          </th>
          {onlyView && <th className="min-w-[150px]">Đánh giá</th>}
        </tr>
      </thead>
      <tbody>
        {dataTable.map((row, index) => (
          <Row
            key={row?.__id}
            control={control}
            data={row}
            index={index}
            onlyView={onlyView}
            suppliers_options={suppliers_options}
            materials_options={materials_options}
            onListChange={onListChange}
          />
        ))}
      </tbody>
    </PTable>
  );
  //#endregion
};
