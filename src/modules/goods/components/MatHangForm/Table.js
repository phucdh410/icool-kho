import { CCard, CCardBody } from "@coreui/react";
import { Controller, useFieldArray } from "react-hook-form";
import { useQuery } from "react-query";
import { CNumber, CSelect } from "src/common/components/controls";
import { CTable } from "src/common/components/others";
import { nguyenVatLieuApi } from "src/1/apis/nguyen_vat_lieu.api";
import { useMemo } from "react";

export const Table = ({ control }) => {
  //#region Data
  const {
    fields: materials,
    append,
    remove,
  } = useFieldArray({ control, name: "materials", keyName: "__id" });

  const { data: material_options } = useQuery({
    queryKey: ["materials"],
    queryFn: () => nguyenVatLieuApi.getAll(),
    select: (response) =>
      response?.data?.data?.map((e) => ({ ...e, value: e?.code })),
  });

  //#region Event
  const onAddRow = () => {
    append({ code: "", name: "", group: "", amount: 1, don_vi_tinh: "" });
  };

  const onRemoveRow = (index) => () => {
    remove(index);
  };
  //#endregion

  const fields = [
    {
      key: "action",
      label: (
        <button
          onClick={onAddRow}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full !outline-none !border-none hover:bg-slate-100 hover:bg-opacity-50"
        >
          <i className="fa-regular fa-circle-plus text-2xl text-[#053C7F]"></i>
        </button>
      ),
      _style: { textAlign: "center", width: "140px" },
      sorter: false,
    },
    {
      key: "code",
      label: "Mã NVL",
    },
    {
      key: "name",
      label: "Tên NVL",
      _style: { textAlign: "left" },
    },
    {
      key: "group_name",
      label: "Nhóm NVL",
    },
    {
      key: "amount",
      label: "Số lượng",
    },
    {
      key: "wareUnit",
      label: "ĐVT lưu kho",
    },
  ];

  const render = {
    action: (item, index) => (
      <td>
        <button
          onClick={onRemoveRow(index)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full !outline-none !border-none hover:bg-slate-100 hover:bg-opacity-50"
        >
          <i className="fa-solid fa-trash-can-xmark text-2xl text-[#F26464]"></i>
        </button>
      </td>
    ),
    code: (item, index) => (
      <td>
        <Controller
          control={control}
          name={`materials.${index}.code`}
          render={({ field }) => (
            <CSelect
              {...field}
              options={material_options ?? []}
              display="code"
            />
          )}
        />
      </td>
    ),
    name: (item, index) => (
      <td>
        <Controller
          control={control}
          name={`materials.${index}.code`}
          render={({ field }) => (
            <CSelect
              {...field}
              options={material_options ?? []}
              display="name"
            />
          )}
        />
      </td>
    ),
    group_name: (item, index) => (
      <td>
        <Controller
          control={control}
          name={`materials.${index}.code`}
          render={({ field }) => (
            <CSelect
              {...field}
              readOnly
              options={material_options ?? []}
              display="group_name"
            />
          )}
        />
      </td>
    ),
    amount: ({ amount }) => (
      <td>
        <CNumber />
      </td>
    ),
    wareUnit: (item, index) => (
      <td>
        <Controller
          control={control}
          name={`materials.${index}.code`}
          render={({ field }) => (
            <CSelect
              {...field}
              readOnly
              options={material_options ?? []}
              display="wareUnit"
            />
          )}
        />
      </td>
    ),
  };
  //#endregion

  //#region Render
  return (
    <>
      <CCard>
        <CCardBody className="px-0 pt-3">
          <div className="table-responsive">
            <CTable fields={fields} data={materials} render={render} />
          </div>
        </CCardBody>
      </CCard>

      <div className="mt-3 flex items-center gap-3 font-bold text-xl">
        <span>Tổng cost từ NVL:</span>
        {/* cost */}
        <span>{(50000).toLocaleString("vi-VN")}</span>
      </div>
    </>
  );

  //#endregion
};
