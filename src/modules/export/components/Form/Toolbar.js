import { useCallback, useEffect } from "react";
import { Controller } from "react-hook-form";
import { useQuery } from "react-query";
import classNames from "classnames";

import { CCol, CCollapse, CRow } from "@coreui/react";

import { cuaHangApi } from "src/1/apis/cua_hang.api";

import { CDate, CInput, CSelect } from "_components/controls";
import { CActionGroup } from "_components/others";

import { exportDefaultValues } from "../../form";

export default ({ control, onAdd, onSave, onRemove, isEdit, replace }) => {
  //#region Data
  const { data: stores } = useQuery({
    queryKey: ["danh-sach-chi-nhanh"],
    queryFn: () => cuaHangApi.getAll(),
    select: (response) =>
      response?.data?.data?.map((e) => ({
        ...e,
        label: e?.name ?? "",
        value: e?.code ?? "",
      })),
  });
  //#endregion

  //#region Event
  const onClick = useCallback(
    (state) => {
      switch (state) {
        case "add":
          return onAdd();
        case "save":
          return onSave();
        case "remove":
          return onRemove();
      }
    },
    [onAdd, onSave, onRemove]
  );

  const onStoreChange = (onChangeCallback) => (selectedOption) => {
    onChangeCallback(selectedOption?.value);
    replace(exportDefaultValues.materials);
  };
  //#endregion

  //#region Render
  return (
    <>
      <CRow>
        <CCol xs="12" className="action">
          <div>
            <CActionGroup
              onClick={onClick}
              canAdd={true}
              canSave={true}
              canEdit={false}
              canRemove
            />
          </div>
          <div
            className={classNames(
              "btn",
              "btn-primary",
              "btn-collapse",
              "extend",
              "show"
            )}
          ></div>
        </CCol>
      </CRow>
      <CCollapse show>
        <div className="mt-3 grid grid-cols-5 gap-3">
          <Controller
            control={control}
            name="code"
            render={({ field }) => (
              <CInput label="Số đơn hàng" readOnly {...field} />
            )}
          />
          <Controller
            name="store_code"
            control={control}
            render={({ field: { onChange, ..._field } }) => (
              <CSelect
                label="Đến chi nhánh"
                disabled={isEdit}
                required
                onChange={onStoreChange(onChange)}
                options={stores}
                {..._field}
              />
            )}
          />
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <CDate
                maxDate={Date.now()}
                label="Ngày giao"
                required
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="phone_number"
            render={({ field }) => (
              <CInput
                label="Số điện thoại"
                required
                control={control}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="note"
            render={({ field }) => <CInput label="Ghi chú" {...field} />}
          />
        </div>
      </CCollapse>
    </>
  );
  //#endregion
};
