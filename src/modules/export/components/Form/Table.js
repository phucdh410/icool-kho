import { Controller, useWatch } from "react-hook-form";
import { useQuery } from "react-query";

import { nguyenVatLieuApi } from "src/1/apis/nguyen_vat_lieu.api";

import { CCheckbox, CInput, CNumberInput, CSelect } from "_components/controls";

import { TotalCell } from "./TotalCell";

export default ({ control, fields, setValue, isSelectAll, handleCheckAll }) => {
  //#region Data
  const store_code = useWatch({ control, name: "store_code" });

  const { data: material_options = [] } = useQuery({
    queryKey: ["danh-sach-nguyen-vat-lieu-theo-chi-nhanh", store_code],
    queryFn: () => nguyenVatLieuApi.getAll({ store_code }),
    enabled: !!store_code,
    select: (response) =>
      response?.data?.data?.map((e) => ({
        ...e,
        value: e?.code,
        label: e?.name,
      })),
  });
  //#endregion

  //#region Event
  const onCodeChange = (onChangeCallback, index) => (selectedOption) => {
    onChangeCallback(selectedOption?.value);
    setValue(`materials.${index}.price`, selectedOption?.price);
    setValue(`materials.${index}.unit`, selectedOption?.unit);
  };
  //#endregion

  //#region Render
  return (
    <table className="table table-hover border c-table selectable">
      <thead>
        <tr>
          <th style={{ width: "50px", paddingLeft: "20px" }}>
            <CCheckbox value={isSelectAll} onChange={handleCheckAll} />
          </th>
          <th style={{ minWidth: "330px" }}>Mã NVL</th>
          <th style={{ minWidth: "350px" }}>Tên NVL</th>
          <th style={{ minWidth: "100px" }}>Số lượng</th>
          <th style={{ minWidth: "150px" }}>ĐVT</th>
          <th style={{ minWidth: "200px" }}>Đơn giá</th>
          <th style={{ minWidth: "200px" }}>Thành tiền</th>
          <th style={{ minWidth: "200px" }}>Ghi chú</th>
        </tr>
      </thead>
      <tbody>
        {fields.map((d, index) => (
          <tr key={d.__id}>
            <td>
              <Controller
                control={control}
                name={`materials.${index}.checked`}
                render={({ field }) => <CCheckbox {...field} />}
              />
            </td>
            <td>
              <Controller
                control={control}
                name={`materials.${index}.material_code`}
                render={({ field: { onChange, ..._field } }) => (
                  <CSelect
                    {..._field}
                    display="code"
                    options={material_options}
                    onChange={onCodeChange(onChange, index)}
                  />
                )}
              />
            </td>
            <td>
              <Controller
                control={control}
                name={`materials.${index}.material_code`}
                render={({ field: { onChange, ..._field } }) => (
                  <CSelect
                    {..._field}
                    options={material_options}
                    onChange={onCodeChange(onChange, index)}
                  />
                )}
              />
            </td>
            <td>
              <Controller
                control={control}
                name={`materials.${index}.ware_q`}
                render={({ field }) => <CNumberInput {...field} />}
              />
            </td>
            <td>
              <Controller
                control={control}
                name={`materials.${index}.unit`}
                render={({ field }) => <CInput {...field} readOnly />}
              />
            </td>
            <td>
              <Controller
                control={control}
                name={`materials.${index}.price`}
                render={({ field }) => <CNumberInput {...field} readOnly />}
              />
            </td>
            <td>
              <TotalCell control={control} index={index} setValue={setValue} />
            </td>
            <td>
              <Controller
                control={control}
                name={`materials.${index}.note`}
                render={({ field }) => <CInput {...field} />}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    //#endregion
  );
};
