import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  CButton,
  CInput,
  CNumber,
  CSelect,
} from "src/common/components/controls";
import { getAll as getAllSupplier } from "src/common/queries-fn/supplier.query";
import { MFileInput } from "./MFileInput";
import { createPriceSuggest } from "src/apis/material_suggest.api";

export const MForm = ({ code }) => {
  //#region Data
  const { control, handleSubmit, reset } = useForm({ mode: "all" });

  const { data } = getAllSupplier();

  const NCC = useMemo(() => {
    if (data && data?.length > 0) {
      const codes = data.map((e) => ({ value: e?.code, label: e?.code }));

      const names = data.map((e) => ({ value: e?.code, label: e?.name }));

      return { codes, names };
    }
    return { codes: [], names: [] };
  }, [data]);
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        const payload = { ...values };
        (payload.vendorId = values?.vendorId?.value),
          (payload.materialId = code),
          (payload.files = values?.files?.map((e) => e?.id));

        await createPriceSuggest(payload);
      } catch (error) {
        console.log(error);
      }
    })();
  };
  //#endregion

  //#region Render
  return (
    <div
      style={{
        border: "1px solid #cfcfcf",
        borderRadius: "8px",
        padding: "24px",
      }}
    >
      <div className="row">
        <div className="col-3">
          <Controller
            control={control}
            name="vendorId"
            rules={{ required: true }}
            render={({ field }) => (
              <CSelect {...field} label="Mã NCC" options={NCC.codes} required />
            )}
          />
        </div>
        <div className="col-5">
          <Controller
            control={control}
            name="vendorId"
            rules={{ required: true }}
            render={({ field }) => (
              <CSelect
                {...field}
                label="Tên NCC"
                options={NCC.names}
                required
              />
            )}
          />
        </div>
        <div className="col-4">
          <div className="row">
            <div className="col-6">
              <Controller
                control={control}
                name="price"
                rules={{ required: true }}
                render={({ field }) => (
                  <CNumber {...field} label="Đơn giá" required />
                )}
              />
            </div>
            <div className="col-6">
              <Controller
                control={control}
                name="unit"
                rules={{ required: true }}
                render={({ field }) => (
                  <CInput {...field} label="Đơn vị báo giá" required />
                )}
              />
            </div>
          </div>
        </div>
        <div className="col-3">
          <MFileInput control={control} />
        </div>
        <div className="col-5">
          <Controller
            control={control}
            name="note"
            render={({ field }) => <CInput {...field} label="Ghi chú" />}
          />
        </div>
        <div className="col-4">
          <div
            style={{
              display: "flex",
              alignItems: "end",
              justifyContent: "end",
              height: "100%",
            }}
          >
            <CButton className="btn-primary" onClick={onSubmit}>
              Thêm
            </CButton>
          </div>
        </div>
      </div>
    </div>
  );
  //#endregion
};
