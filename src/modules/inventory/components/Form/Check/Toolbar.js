import { useCallback } from "react";
import classNames from "classnames";
import { Controller } from "react-hook-form";

import { CRow, CCol, CCollapse } from "@coreui/react";

import { CActionGroup } from "_components/others";
import { CDate, CInput, CSelect } from "_components/controls";

import { getAll as getAllMaterialGroup } from "../../../queries-fn/material-group.query";
import { getAll as getAllWarehouse } from "../../../queries-fn/warehouse.query";
import { getByStore as getUserByStore } from "../../../queries-fn/user.query";

export default ({
  isLoading,
  status,
  watch,
  control,
  setValue,
  onStatusChange,
  onMaterialGroupSelect,
  canRemove,
  onAdd,
  onSave,
  onRemove,
}) => {
  //#region Data
  const { data: materialGroups } = getAllMaterialGroup({}, isLoading);

  const { data: warehouses } = getAllWarehouse({}, isLoading);

  const { data: users } = getUserByStore(
    watch("storeCode"),
    !watch("storeCode")
  );
  //#endregion

  //#region Event
  const toggleCollapse = useCallback(() => onStatusChange(1), [onStatusChange]);

  const selectMaterialGroup = useCallback(
    ({ value }) => {
      onMaterialGroupSelect(value);
    },
    [onMaterialGroupSelect]
  );

  const onSelectWarehouse = useCallback(
    ({ data, value }) => {
      setValue("storeCode", data.storeCode);
      setValue("wareCode", data.code);
    },
    [setValue]
  );

  const onSelectChecker = useCallback(({ data, value }) => {
    setValue("createdBy", value);
  });

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
            />
          </div>
          <div
            className={classNames(
              "btn",
              "btn-primary",
              "btn-collapse extend",
              status == 1 && "show"
            )}
            onClick={toggleCollapse}
          ></div>
        </CCol>
      </CRow>
      <CCollapse show={status == 1}>
        <CRow className="mt-3">
          <CCol xs="12" sm="6" md="4" lg="4" xl="4" xxl="4">
            <Controller
              name="createdBy"
              control={control}
              render={({ field }) => (
                <CSelect
                  options={users}
                  label="Người kiểm"
                  required
                  {...field}
                  onChange={onSelectChecker}
                />
              )}
            />
          </CCol>
          <CCol xs="12" sm="6" md="4" lg="4" xl="4" xxl="4">
            <Controller
              name="checked"
              control={control}
              render={({ field }) => (
                <CDate
                  maxDate={Date.now()}
                  label="Ngày kiểm"
                  required
                  {...field}
                />
              )}
            />
          </CCol>
          <CCol xs="12" sm="6" md="4" lg="4" xl="4" xxl="4">
            <Controller
              name="wareCode"
              control={control}
              render={({ field }) => (
                <CSelect
                  options={warehouses}
                  label="Kho kiểm"
                  required
                  {...field}
                  onChange={onSelectWarehouse}
                />
              )}
            />
          </CCol>
          <CCol xs="12" sm="6" md="4" lg="4" xl="4" xxl="4">
            <Controller
              name="groupCode"
              control={control}
              render={({ field }) => {
                return (
                  <CSelect
                    label="Nhóm Nguyên Vật Liệu"
                    options={materialGroups}
                    {...field}
                    required
                    onChange={selectMaterialGroup}
                  />
                );
              }}
            />
          </CCol>
          <CCol xs="12" sm="12" md="8" lg="8" xl="8" xxl="8">
            <Controller
              name="note"
              control={control}
              render={({ field }) => <CInput label="Ghi chú" {...field} />}
            />
          </CCol>
        </CRow>
      </CCollapse>
    </>
  );
  //#endregion
};
