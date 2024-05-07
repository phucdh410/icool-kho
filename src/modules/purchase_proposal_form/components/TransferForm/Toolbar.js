import { useCallback } from "react";
import { Controller } from "react-hook-form";

import { CRow, CCol, CCollapse } from "@coreui/react";
import { CActionGroup } from "_components/others";
import { CInput, CSelect, CDate } from "_components/controls";

import { getAll } from "../../queries-fn/store.query";

export default ({
  isLoading,
  watch,
  control,
  canRemove,
  onAdd,
  onSave,
  onRemove,
}) => {
  //#region Data
  const { data: stores } = getAll({}, isLoading);
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

  const onStoreChange = (cbChange) => (selectedOption) => {
    cbChange(selectedOption?.value);
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
              canRemove={canRemove}
              hideEditBtn
            />
          </div>
        </CCol>
      </CRow>
      <CCollapse show>
        <CRow className="mt-3">
          <CCol xs="12" sm="12" md="4" lg="2">
            <CInput value={watch("code")} disabled label="Số đơn hàng" />
          </CCol>
          <CCol xs="12" sm="12" md="4" lg="2">
            <Controller
              name="date"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <CDate label="Ngày giao" {...field} />}
            />
          </CCol>
          <CCol xs="12" sm="12" md="12" lg="12" xl="2">
            <Controller
              name="note"
              control={control}
              render={({ field }) => <CInput label="Ghi chú" {...field} />}
            />
          </CCol>
          <CCol xs="12" sm="12" md="4" lg="3" xl="3">
            <Controller
              name="store_from"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, ..._field } }) => (
                <CSelect
                  label="Chi nhánh chuyển"
                  options={stores}
                  {..._field}
                  onChange={onStoreChange(onChange)}
                />
              )}
            />
          </CCol>
          <CCol xs="12" sm="12" md="4" lg="3" xl="3">
            <Controller
              name="store_to"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, ..._field } }) => (
                <CSelect
                  label="Chi nhánh nhận"
                  options={stores}
                  {..._field}
                  onChange={onStoreChange(onChange)}
                />
              )}
            />
          </CCol>
        </CRow>
      </CCollapse>
    </>
  );
  //#endregion
};
