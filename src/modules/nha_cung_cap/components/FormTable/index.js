import { Controller } from "react-hook-form";
import { useQuery } from "react-query";

import { nguyenVatLieuApi } from "src/1/apis/nguyen_vat_lieu.api";
import {
  CCheckbox,
  CInput,
  CRating,
  CSelectMulti,
} from "src/common/components/controls";
import { CTable } from "src/common/components/others";

import { FilesCell } from "./FilesCell";

export const FormTable = ({ control, dataTable }) => {
  //#region Data
  const { data: materials_options } = useQuery({
    queryKey: ["danh-sach-nvl"],
    queryFn: () => nguyenVatLieuApi.getAll(),
    select: (response) =>
      response?.data?.data?.map((e) => ({ value: e?.code, label: e?.name })),
  });
  //#endregion

  //#region Event
  const onListChange = (changeCb) => (options) => {
    changeCb(options?.map((opt) => opt?.value));
  };
  //#endregion

  //#region Render
  const fields = [
    {
      key: "select",
      label: <CCheckbox />,
      sorter: false,
    },
    {
      key: "code",
      label: "Mã NCC",
      _style: { minWidth: "190px" },
    },
    {
      key: "name",
      label: "Tên NCC",
      _style: { minWidth: "250px" },
    },
    {
      key: "financial",
      label: "Năng lực tài chính",
      sorter: false,
      _style: { minWidth: "180px" },
    },
    {
      key: "reputation",
      label: "Uy tín NCC",
      sorter: false,
    },
    {
      key: "quality",
      label: "Chất lượng",
      sorter: false,
    },
    {
      key: "pricing",
      label: "Giá cả",
      sorter: false,
    },
    {
      key: "materials",
      label: "Danh sách NVL cung cấp",
      _style: { minWidth: "350px", maxWidth: "450px" },
    },
    {
      key: "files",
      label: "Tài liệu minh chứng",
      _style: { minWidth: "185px" },
      sorter: false,
    },
  ];

  const render = {
    select: () => (
      <td>
        <CCheckbox />
      </td>
    ),
    code: (record, index) => (
      <td>
        <Controller
          control={control}
          name={`suppliers.${index}.code`}
          render={({ field }) => (
            <CInput {...field} placeholder="Nhập mã NCC" />
          )}
        />
      </td>
    ),
    name: (record, index) => (
      <td>
        <Controller
          control={control}
          name={`suppliers.${index}.name`}
          render={({ field }) => (
            <CInput {...field} placeholder="Nhập tên NCC" />
          )}
        />
      </td>
    ),
    financial: (record, index) => (
      <td>
        <div className="w-full flex items-center justify-center">
          <Controller
            control={control}
            name={`suppliers.${index}.financial`}
            render={({ field }) => <CRating {...field} />}
          />
        </div>
      </td>
    ),
    reputation: (record, index) => (
      <td>
        <div className="w-full flex items-center justify-center">
          <Controller
            control={control}
            name={`suppliers.${index}.reputation`}
            render={({ field }) => <CRating {...field} />}
          />
        </div>
      </td>
    ),
    quality: (record, index) => (
      <td>
        <div className="w-full flex items-center justify-center">
          <Controller
            control={control}
            name={`suppliers.${index}.quality`}
            render={({ field }) => <CRating {...field} />}
          />
        </div>
      </td>
    ),
    pricing: (record, index) => (
      <td>
        <div className="w-full flex items-center justify-center">
          <Controller
            control={control}
            name={`suppliers.${index}.pricing`}
            render={({ field }) => <CRating {...field} />}
          />
        </div>
      </td>
    ),
    materials: (record, index) => (
      <td>
        <div className="w-full flex items-center justify-center">
          <Controller
            control={control}
            name={`suppliers.${index}.materials`}
            render={({ field: { onChange, ..._field } }) => (
              <CSelectMulti
                {..._field}
                onChange={onListChange(onChange)}
                className="flex-1"
                options={materials_options ?? []}
                canWrap
              />
            )}
          />
        </div>
      </td>
    ),
    files: (record, index) => <FilesCell control={control} index={index} />,
  };

  return (
    <CTable
      className="selectable"
      fields={fields}
      render={render}
      data={dataTable}
    />
  );
  //#endregion
};
