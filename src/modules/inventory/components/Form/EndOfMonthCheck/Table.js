import { useEffect, useMemo } from "react";
import { useWatch } from "react-hook-form";
import { useQuery } from "react-query";
import dayjs from "dayjs";

import { kiemKhoCuoiThangApi } from "src/1/apis/kiem_kho_cuoi_thang.api";

import { CCheckbox } from "_components/controls";

import Row from "./Row";

export default ({ fields, control, setValue }) => {
  //#region Data
  const checked = useWatch({ control, name: "checked" });
  const store_code = useWatch({ control, name: "store_code" });
  const _materials = useWatch({ control, name: "materials" });

  const totalCount = useMemo(
    () => _materials.reduce((prev, cur) => prev + cur?.ware_q, 0),
    [_materials]
  );
  const totalPrice = useMemo(
    () => _materials.reduce((prev, cur) => prev + cur?.ware_q * cur?.price, 0),
    [_materials]
  );

  const { data: materials = [] } = useQuery({
    queryKey: ["danh-sach-nguyen-vat-lieu", store_code],
    queryFn: () =>
      kiemKhoCuoiThangApi.getMaterials({
        store_code,
        date: dayjs(checked).format("YYYY-MM-DD"),
      }),
    enabled: !!store_code,
    select: (response) =>
      response?.data?.data?.map((e) => ({
        ...e,
        value: e?.code,
        label: e?.name,
      })),
  });
  //#endregion

  useEffect(() => {
    if (totalPrice) {
      setValue("value", totalPrice);
    } else {
      setValue("value", 0);
    }
  }, [totalPrice]);

  //#region Render
  return (
    <table className="table table-hover border c-table selectable">
      <thead>
        <tr>
          <th
            style={{ width: "50px", paddingLeft: "20px", paddingRight: "24px" }}
          >
            <CCheckbox />
          </th>
          <th
            style={{ width: "250px", minWidth: "250px", paddingRight: "24px" }}
          >
            Mã NVL
          </th>
          <th
            style={{ width: "auto", minWidth: "250px", paddingRight: "24px" }}
          >
            Tên nguyên vật liệu
          </th>
          <th
            style={{ width: "150px", minWidth: "150px", paddingRight: "24px" }}
          >
            Đơn vị
          </th>
          <th
            style={{ width: "200px", minWidth: "200px", paddingRight: "24px" }}
          >
            Số lượng
          </th>
          <th
            style={{ width: "200px", minWidth: "200px", paddingRight: "24px" }}
          >
            Đơn giá
          </th>
          <th
            style={{ width: "200px", minWidth: "200px", paddingRight: "24px" }}
          >
            Thành tiền
          </th>
        </tr>
      </thead>
      <tbody>
        {fields.map((row, index) => (
          <Row
            key={row?.__id}
            control={control}
            index={index}
            materials={materials}
            setValue={setValue}
          />
        ))}
        <tr>
          <td colSpan={3}></td>
          <td>
            <span className="font-weight-bold">Tổng</span>
          </td>
          <td>
            <span className="font-weight-bold">{totalCount}</span>
          </td>
          <td></td>
          <td>
            <span className="font-weight-bold">{totalPrice}</span>
          </td>
        </tr>
      </tbody>
    </table>
  );
  //#endregion
};
