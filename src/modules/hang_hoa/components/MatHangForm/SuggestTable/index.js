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

import { Row } from "./Row";

export const SuggestTable = ({ control }) => {
  //#region Data
  const {
    fields: materials,
    append,
    remove,
    update,
  } = useFieldArray({ control, name: "materials", keyName: "__id" });

  const watchMaterials = useWatch({ control, name: "materials" });
  const currentMaterials = useMemo(() => {
    return materials.map((field, index) => ({
      ...field,
      ...watchMaterials[index],
    }));
  }, [materials, watchMaterials]);

  const { data: material_options } = useQuery({
    queryKey: ["materials"],
    queryFn: () => nguyenVatLieuApi.getAll(),
    select: (response) =>
      response?.data?.data?.map((e) => ({ ...e, value: e?.code })),
  });

  const onAddRow = () => {
    append({ nvl_id: "", price: 0, quantity: 1, ware_unit: "" });
  };

  const onRemoveRow = (index) => () => {
    remove(index);
  };

  const onSelectMaterial = (index) => (selectedOption) => {
    update(index, {
      nvl_id: selectedOption,
      quantity: 1,
      ware_unit: selectedOption?.wareUnit,
      price: selectedOption?.price,
    });
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
          <PTable>
            <thead>
              <tr>
                <th>
                  <button
                    onClick={onAddRow}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full !outline-none !border-none hover:bg-slate-100 hover:bg-opacity-50"
                  >
                    <i className="fa-regular fa-circle-plus text-2xl text-[#053C7F]"></i>
                  </button>
                </th>
                <th style={{ minWidth: "220px" }}>Mã NVL</th>
                <th align="left" style={{ minWidth: "220px" }}>
                  Tên NVL
                </th>
                <th>Nhóm NVL</th>
                <th style={{ width: "150px" }}>Số Lượng</th>
                <th style={{ minWidth: "180px" }}>Giá</th>
                <th>ĐVT Lưu Kho</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((material, index) => (
                <Row
                  key={material.__id}
                  material_options={material_options}
                  onSelectMaterial={onSelectMaterial}
                  control={control}
                  index={index}
                  onRemoveRow={onRemoveRow}
                />
              ))}
            </tbody>
          </PTable>
        </CCardBody>
      </CCard>

      <div className="mt-3 flex items-center gap-3 font-bold text-xl">
        <span>Tổng cost từ NVL:</span>

        <Controller
          control={control}
          name="cost"
          render={({ field: { value } }) => (
            <span>{value.toLocaleString("vi-VN")}</span>
          )}
        />
      </div>
    </>
  );
  //#endregion
};
