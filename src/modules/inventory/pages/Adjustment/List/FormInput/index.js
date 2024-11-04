import { forwardRef, useEffect, useImperativeHandle } from "react";
import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";

import { CCol, CCollapse, CRow } from "@coreui/react";

import { CActionGroup } from "src/common/components/others";
import { ERROR_MESSAGE } from "src/configs/constant";

import { C1Upload, CDate, CInput, CSelect } from "_components/controls";

const initial = {
  code: "",
  file_id: "",
  ware_code: "",
  date: dayjs().toDate(),
  materials: [],
};

export default forwardRef(
  (
    { warehouses, status, onSave, selectedNo, onAdd, onEdit, onRemove },
    ref
  ) => {
    //#region Data
    const { control, watch, reset, handleSubmit } = useForm({
      defaultValue: initial,
    });
    //#endregion

    //#region Events
    const save = handleSubmit(
      (d) => onSave(d),
      (e) => {
        noti("error", ERROR_MESSAGE.INVENTORY_ADJUSTMENT.REQUIRED);
      }
    );

    const onClick = (state) => {
      switch (state) {
        case "add":
          return onAdd();
        case "edit":
          return onEdit();
        case "save":
          return save();
        case "remove":
          return onRemove();
        case "print":
          return onPrint();
      }
    };
    //#endregion

    useImperativeHandle(ref, () => ({
      setData: (editedData) => reset(editedData),
    }));

    useEffect(() => {
      if (!status) reset(initial);
    }, [status]);

    //#region Render
    return (
      <>
        <div className="btn-group">
          <CActionGroup
            status={status}
            onClick={onClick}
            canAdd={status !== 3}
            canSave={status > 1}
            canEdit={status === 3 || selectedNo === 1}
            canRemove={status !== 3 && selectedNo === 1}
          />
        </div>
        <CCollapse show={status > 1}>
          <CRow className="mt-3">
            <CCol style={{ minWidth: "200px" }}>
              <CInput
                label="Mã phiếu"
                value={watch("code")}
                readOnly
                required
              />
            </CCol>
            <CCol style={{ minWidth: "200px" }}>
              <Controller
                control={control}
                name="ware_code"
                rules={{ required: true }}
                render={({ field }) => (
                  <CSelect
                    options={warehouses ?? []}
                    disabled={status === 3}
                    label="Kho"
                    select="code"
                    required
                    {...field}
                  />
                )}
              />
            </CCol>
            <CCol style={{ minWidth: "200px" }}>
              <Controller
                control={control}
                name="date"
                rules={{ required: true }}
                render={({ field }) => (
                  <CDate
                    label="Ngày"
                    maxDate={Date.now()}
                    required
                    {...field}
                  />
                )}
              />
            </CCol>
            <CCol style={{ minWidth: "200px" }}>
              <Controller
                control={control}
                name="file_id"
                rules={{ required: true }}
                render={({ field }) => (
                  <C1Upload label="File đính kèm" required {...field} />
                )}
              />
            </CCol>
          </CRow>
        </CCollapse>
      </>
    );
    //#endregion
  }
);
