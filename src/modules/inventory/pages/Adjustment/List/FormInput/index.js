import { forwardRef, useEffect, useImperativeHandle } from "react";
import { Controller, useForm } from "react-hook-form";
import moment from "moment";

import { CCol, CCollapse, CRow } from "@coreui/react";

import { CActionGroup } from "src/common/components/others";
import { ERROR_MESSAGE } from "src/configs/constant";

import { CDate, CFile, CInput, CSelect } from "_components/controls";

const initial = {
  code: "",
  ware_code: "",
  store_code: "",
  date: moment.now(),
  file: [],
};

export default forwardRef(
  (
    {
      warehouses,
      status,
      onSave,
      selectedNo,
      onAdd,
      onEdit,
      onRemove,
      onStoreChange,
    },
    ref
  ) => {
    //#region Data
    const { control, watch, setValue, handleSubmit } = useForm({
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

    const setData = (_data) =>
      Object.keys(_data).forEach((key) => setValue(key, _data[key]));

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

    const onWarehouseChoose = ({ data }) => {
      setValue("ware_code", data.code);
      setValue("store_code", data.store_code);

      onStoreChange(data.store_code);
    };
    //#endregion

    useImperativeHandle(ref, () => ({ setData }));

    useEffect(() => {
      if (!status) setData(initial);
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
            canRemove={selectedNo && status === 0}
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
                    label="Kho"
                    required
                    {...field}
                    onChange={onWarehouseChoose}
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
                name="file"
                rules={{ required: true }}
                render={({ field }) => (
                  <CFile
                    label="File đính kèm"
                    render={(file) => (
                      <span key={file}>{file.name || file}</span>
                    )}
                    required
                    max={1}
                    {...field}
                  />
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
