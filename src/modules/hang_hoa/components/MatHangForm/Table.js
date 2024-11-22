import { useEffect, useMemo } from "react";
import {
  Controller,
  useController,
  useFieldArray,
  useWatch,
} from "react-hook-form";
import { useQuery } from "react-query";

import { CCard, CCardBody } from "@coreui/react";

import { nguyenVatLieuApi } from "src/1/apis/nguyen_vat_lieu.api";
import { PTable } from "src/1/common/components/others";
import { CNumber, CSelect } from "src/common/components/controls";
import { CTable } from "src/common/components/others";

export const Table = ({ control }) => {
  //#region Data
  const {
    fields: materials,
    append,
    remove,
    update,
  } = useFieldArray({ control, name: "materials", keyName: "__id" });
  console.log("🚀 ~ Table ~ materials:", materials);

  const watchMaterials = useWatch({ control, name: "materials" });
  const currentMaterials = useMemo(() => {
    return materials.map((field, index) => ({
      ...field,
      ...watchMaterials[index],
    }));
  }, [materials, watchMaterials]);
  console.log("🚀 ~ Table ~ currentMaterials:", currentMaterials);

  const { data: material_options } = useQuery({
    queryKey: ["materials"],
    queryFn: () => nguyenVatLieuApi.getAll(),
    select: (response) =>
      response?.data?.data?.map((e) => ({ ...e, value: e?.id })),
  });

  const onAddRow = () => {
    append({ nvl_id: "", price: 0, quantity: 1, ware_unit: "" });
  };

  const onRemoveRow = (index) => () => {
    remove(index);
  };

  const onSelectMaterial = (index, onChange) => (selectedOption) => {
    update(index, {
      nvl_id: selectedOption,
      quantity: 1,
      ware_unit: selectedOption?.wareUnit,
      price: selectedOption?.price,
    });
    onChange(selectedOption);
  };

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
      key: "nvl_id",
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
      key: "quantity",
      label: "Số lượng",
    },
    {
      key: "price",
      label: "Giá",
    },
    {
      key: "ware_unit",
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
    nvl_id: (item, index) => (
      <td>
        <Controller
          control={control}
          name={`materials.${index}.nvl_id`}
          render={({ field: { onChange, ..._field } }) => (
            <CSelect
              {..._field}
              onChange={onSelectMaterial(index, onChange)}
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
          name={`materials.${index}.nvl_id`}
          render={({ field: { onChange, ..._field } }) => (
            <CSelect
              {..._field}
              onChange={onSelectMaterial(index, onChange)}
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
          name={`materials.${index}.nvl_id`}
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
    quantity: (item, index) => (
      <td>
        <Controller
          control={control}
          name={`materials.${index}.quantity`}
          render={({ field }) => <CNumber {...field} />}
        />
      </td>
    ),
    price: ({ price }) => <td>{money(price)}</td>,
    ware_unit: (item, index) => (
      <td>
        <Controller
          control={control}
          name={`materials.${index}.nvl_id`}
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

  const totalCost = useMemo(() => {
    return (
      currentMaterials?.reduce(
        (prev, cur) => prev + (cur?.price * cur?.quantity ?? 0),
        0
      ) ?? 0
    );
  }, [currentMaterials]);

  const {
    field: { onChange: onCostChange },
  } = useController({ control, name: "cost" });
  //#endregion

  useEffect(() => {
    onCostChange(totalCost);
  }, [totalCost]);

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

        <Controller
          control={control}
          name="cost"
          render={({ field: { value } }) => <span>{money(value)}</span>}
        />
      </div>
    </>
  );

  //#endregion
};
