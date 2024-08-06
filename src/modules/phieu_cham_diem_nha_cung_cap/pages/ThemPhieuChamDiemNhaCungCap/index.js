import { useMemo } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import dayjs from "dayjs";

import { CCard, CCardBody } from "@coreui/react";

import { phieuChamDiemNCCApi } from "src/1/apis/phieu_cham_diem_ncc.api";
import { history } from "src/App";

import { FormTable, FormToolbar } from "../../components";
import { defaultValues, resolver } from "../../form";

const ThemPhieuChamDiemNhaCungCap = () => {
  //#region Data
  const { control, handleSubmit, reset } = useForm({
    mode: "all",
    defaultValues,
    resolver,
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "suppliers",
    keyName: "__id",
  });

  const watchSuppliers = useWatch({ control, name: "suppliers" });

  const controlledSuppliers = fields.map((field, index) => {
    return {
      ...field,
      ...watchSuppliers[index],
    };
  });

  const isSelectedAll = useMemo(
    () =>
      controlledSuppliers?.length &&
      controlledSuppliers?.every((e) => e?.selected),
    [controlledSuppliers]
  );

  const selectedList = useMemo(
    () => controlledSuppliers.filter((e) => e?.selected),
    [controlledSuppliers]
  );
  //#endregion

  //#region Event
  const onAddSupplier = () => {
    append({
      selected: false,
      code: "",
      name: "",
      financial: 5,
      reputation: 5,
      quality: 5,
      branch_review: 5,
      customer_review: 5,
      pricing: 5,
      materials: [],
      files: [],
    });
  };

  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        const payload = {
          ...values,
          evaluation_date: dayjs(values?.evaluation_date).format("YYYY-MM-DD"),
          suppliers: values?.suppliers?.map((e) => ({
            ...e,
            files: e?.files?.map((el) => el?.id),
          })),
        };
        await phieuChamDiemNCCApi.create(payload);

        noti("success", "Tạo phiếu chấm điểm nhà cung cấp thành công!");
        reset(defaultValues);
        history.push("/suppliers/list");
      } catch (error) {
        noti(
          "error",
          error?.message ?? "Tạo phiếu chấm điểm nhà cung cấp không thành công!"
        );
      }
    })();
  };

  const onSelectAll = (value) => {
    const newSuppliers = controlledSuppliers.map((e) => ({
      ...e,
      selected: value,
    }));
    replace(newSuppliers);
  };

  const onRemove = () => {
    let removeIndexs = [];
    controlledSuppliers.forEach((e, i) => {
      if (e.selected) {
        removeIndexs.push(i);
      }
    });
    remove(removeIndexs);
  };
  //#endregion

  //#region Render
  return (
    <>
      <CCard className="toolbar sticky">
        <CCardBody>
          <FormToolbar
            control={control}
            onSubmit={onSubmit}
            onAddSupplier={onAddSupplier}
            canRemove={selectedList?.length}
            onRemove={onRemove}
          />
        </CCardBody>
      </CCard>

      <CCard>
        <CCardBody className="px-0 pt-4">
          <FormTable
            control={control}
            dataTable={controlledSuppliers}
            isSelectedAll={isSelectedAll}
            onSelectAll={onSelectAll}
          />
        </CCardBody>
      </CCard>
    </>
  );
  //#endregion
};
export default ThemPhieuChamDiemNhaCungCap;
