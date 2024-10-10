import { useCallback } from "react";
import { Controller, useWatch } from "react-hook-form";
import { useQuery } from "react-query";
import classNames from "classnames";

import { CCol, CCollapse, CRow } from "@coreui/react";

import { cuaHangApi } from "src/1/apis/cua_hang.api";
import { nhomNguyenVatLieuApi } from "src/1/apis/nhom_nguyen_vat_lieu.api";

import { CDate, CInput, CSelect } from "_components/controls";
import { CActionGroup } from "_components/others";

export default ({ onAdd, onSave, onRemove, canRemove, control }) => {
  //#region Data
  const { data: stores = [] } = useQuery({
    queryKey: ["danh-sach-cua-hang"],
    queryFn: () => cuaHangApi.getAll(),
    select: (response) =>
      response?.data?.data?.map((e) => ({
        ...e,
        value: e?.code,
        label: e?.name,
      })),
  });

  const { data: material_groups = [] } = useQuery({
    queryKey: ["danh-sach-nhom-nguyen-vat-lieu"],
    queryFn: () => nhomNguyenVatLieuApi.getAll(),
    select: (response) =>
      response?.data?.data?.map((e) => ({
        ...e,
        value: e?.code,
        label: e?.name,
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
              "show"
            )}
          ></div>
        </CCol>
      </CRow>
      <CCollapse show>
        <CRow className="mt-3">
          <CCol xs="12" sm="6" md="4" lg="4" xl="4" xxl="4">
            <Controller
              name="createdBy"
              control={control}
              render={({ field }) => (
                <CInput
                  {...field}
                  label="Người kiểm"
                  placeholder="Không hiểu field này là gì"
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
                  {...field}
                  maxDate={Date.now()}
                  label="Ngày kiểm"
                  required
                />
              )}
            />
          </CCol>
          <CCol xs="12" sm="6" md="4" lg="4" xl="4" xxl="4">
            <Controller
              name="store_code"
              control={control}
              render={({ field }) => (
                <CSelect
                  {...field}
                  label="Kho kiểm"
                  required
                  select="value"
                  options={stores}
                />
              )}
            />
          </CCol>
          <CCol xs="12" sm="6" md="4" lg="4" xl="4" xxl="4">
            <Controller
              name="group_code"
              control={control}
              render={({ field }) => {
                return (
                  <CSelect
                    {...field}
                    label="Nhóm Nguyên Vật Liệu"
                    select="value"
                    required
                    options={material_groups}
                  />
                );
              }}
            />
          </CCol>
          <CCol xs="12" sm="12" md="8" lg="8" xl="8" xxl="8">
            <Controller
              name="note"
              control={control}
              render={({ field }) => <CInput {...field} label="Ghi chú" />}
            />
          </CCol>
        </CRow>
      </CCollapse>
    </>
  );
  //#endregion
};
