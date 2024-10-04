import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { createSelector } from "reselect";

import { CCol, CCollapse, CRow } from "@coreui/react";

import {
  CENTRAL_KITCHEN,
  CENTRAL_WAREHOUSE,
  STATUS_OPTIONS,
} from "src/configs/constant";
import { filter as filterFn } from "src/utils/funcs";

import { Magnifying } from "_assets/icons";
import { CButton, CDate, CInput, CSelect } from "_components/controls";
import { CActionGroup } from "_components/others";

import { getAll } from "../../queries-fn/store.query";

const selectIsLoading = createSelector(
  (state) => state.config,
  (state) => state.auth,
  ({ isLoading }, { store_code }) => ({ isLoading, store_code })
);

export default ({
  status,
  filter,
  selectedNo,
  toggleStatus,
  onApprove,
  onEdit,
  onRemove,
  onSearch,
}) => {
  //#region Data
  const { isLoading, store_code } = useSelector(selectIsLoading);

  const { control, setValue, handleSubmit } = useForm({
    defaultValues: filter,
  });

  const { data: stores } = getAll({}, isLoading);
  //#endregion

  //#region Event
  const search = handleSubmit(
    (d) => onSearch(filterFn(d)),
    (e) => noti("error", e)
  );

  const onStoreChange = useCallback(({ value }) => {
    setValue("store_code", value);
  });

  const onStatusChange = useCallback(({ value }) => {
    setValue("status", value);
  });

  const toggleCollapse = () => toggleStatus(1);

  const onClick = (state) => {
    switch (state) {
      case "add":
        return onAdd();
      case "edit":
        return onEdit();
      case "remove":
        return onRemove();
      case "print":
        return;
    }
  };
  //#endregion

  return (
    <>
      <CRow>
        <CCol xs="12" className="action">
          <div>
            <CActionGroup
              onClick={onClick}
              canAdd={false}
              canSave={false}
              canEdit={selectedNo === 1}
              canRemove={selectedNo === 1}
            />
          </div>
          <div>
            {[CENTRAL_WAREHOUSE, CENTRAL_KITCHEN].includes(store_code) ? (
              <CButton className="btn-fill" to="/export/form" calc>
                Tạo Phiếu xuất hàng
              </CButton>
            ) : (
              ""
            )}

            <CButton
              className="btn-fill"
              disabled={selectedNo !== 1}
              onClick={onApprove}
            >
              Xuất hàng/Xuất kho
            </CButton>
          </div>
          <div
            className={classNames(
              "btn",
              "btn-primary",
              "btn-collapse",
              status == 1 && "show"
            )}
            onClick={toggleCollapse}
          ></div>
        </CCol>
      </CRow>

      <CCollapse show={status === 1}>
        <CRow className="mt-3 justify-content-lg-end justify-content-xxl-end">
          <CCol xs="12" sm="6" md="4" lg="4" xl="2" xxl="2">
            <Controller
              name="code"
              control={control}
              render={({ field }) => (
                <CInput {...field} label="Số đơn hàng: " placeholder="Tất cả" />
              )}
            />
          </CCol>
          <CCol xs="12" sm="6" md="4" lg="4" xl="2" xxl="2">
            <Controller
              name="store_code"
              control={control}
              render={({ field }) => (
                <CSelect
                  {...field}
                  label="Đến chi nhánh: "
                  placeholder="Tất cả"
                  options={
                    stores && stores.length > 2
                      ? [{ value: "", label: "Tất cả" }, ...stores]
                      : stores
                  }
                  onChange={onStoreChange}
                />
              )}
            />
          </CCol>
          <CCol xs="12" sm="6" md="4" lg="4" xl="2" xxl="2">
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <CSelect
                  {...field}
                  label="Trạng thái: "
                  placeholder="Tất cả"
                  options={STATUS_OPTIONS}
                  onChange={onStatusChange}
                ></CSelect>
              )}
            />
          </CCol>
          <CCol xs="12" sm="6" md="4" lg="4" xl="2" xxl="2">
            <Controller
              name="startAt"
              control={control}
              render={({ field }) => (
                <CDate
                  {...field}
                  label="Tạo từ ngày: "
                  placeholder="Chọn ngày"
                />
              )}
            />
          </CCol>
          <CCol xs="12" sm="6" md="4" lg="4" xl="2" xxl="2">
            <Controller
              name="endAt"
              control={control}
              render={({ field }) => (
                <CDate {...field} label="Đến ngày: " placeholder="Chọn ngày" />
              )}
            />
          </CCol>
          <CCol xs="12" sm="6" md="4" lg="4" xl="2" xxl="2">
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <CDate {...field} label="Ngày giao: " placeholder="Chọn ngày" />
              )}
            />
          </CCol>
          <CCol
            xs="12"
            sm="6"
            md="3"
            lg="4"
            xl="2"
            xxl="2"
            className="text-right text-sm-left text-lg-right"
          >
            <div className="form-group c-input">
              <div>
                <CButton icon={<Magnifying />} onClick={search} className="m-0">
                  Tìm kiếm
                </CButton>
              </div>
            </div>
          </CCol>
        </CRow>
      </CCollapse>
    </>
  );
};
