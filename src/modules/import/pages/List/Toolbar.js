import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { createSelector } from "reselect";

import { CCol, CCollapse, CRow } from "@coreui/react";

import { STATUS_OPTIONS } from "src/configs/constant";
import { filter as filterFn } from "src/utils/funcs";

import { Magnifying } from "_assets/icons";
import { CButton, CDate, CInput, CSelect } from "_components/controls";
import { CActionGroup } from "_components/others";

import { getAll } from "../../queries-fn/store.query";

const selectIsLoading = createSelector(
  (state) => state.config,
  ({ isLoading }) => isLoading
);

export default ({
  filter,
  status,
  selectedNo,
  toggleStatus,
  onEdit,
  onApprove,
  onRemove,
  onSearch,
}) => {
  //#region Data
  const isLoading = useSelector(selectIsLoading);

  const { control, handleSubmit } = useForm({
    defaultValues: filter,
  });

  const { data: stores } = getAll({}, isLoading);
  //#endregion

  //#region Events
  const search = handleSubmit(
    (d) => onSearch(filterFn(d)),
    (e) => noti("error", e)
  );

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

  //#region Render
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
            <CButton className="btn-fill" to="/import/form">
              Tạo Phiếu nhập hàng
            </CButton>
            <CButton
              className="btn-fill"
              disabled={selectedNo !== 1}
              onClick={onApprove}
            >
              Nhập hàng vào kho
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
        <CRow className="mt-3  justify-content-lg-end justify-content-xxl-end">
          <CCol xs="12" sm="6" md="4" lg="4" xl="2" xxl="2">
            <Controller
              name="code"
              control={control}
              render={({ field }) => (
                <CInput label="Số đơn hàng: " placeholder="Tất cả" {...field} />
              )}
            />
          </CCol>
          <CCol xs="12" sm="6" md="4" lg="4" xl="2" xxl="2">
            <Controller
              name="store_code"
              control={control}
              render={({ field }) => (
                <CSelect
                  label="Chi nhánh: "
                  placeholder="Tất cả"
                  options={stores}
                  optionAll
                  {...field}
                  onChange={({ value }) => field.onChange(value)}
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
                  label="Trạng thái: "
                  placeholder="Tất cả"
                  options={STATUS_OPTIONS}
                  {...field}
                  onChange={({ value }) => field.onChange(value)}
                />
              )}
            />
          </CCol>
          <CCol xs="12" sm="6" md="4" lg="4" xl="2" xxl="2">
            <Controller
              name="startAt"
              control={control}
              render={({ field }) => (
                <CDate
                  label="Tạo từ ngày: "
                  placeholderText="Chọn ngày"
                  {...field}
                />
              )}
            />
          </CCol>
          <CCol xs="12" sm="6" md="4" lg="4" xl="2" xxl="2">
            <Controller
              name="endAt"
              control={control}
              render={({ field }) => (
                <CDate
                  label="Đến ngày: "
                  placeholderText="Chọn ngày"
                  {...field}
                />
              )}
            />
          </CCol>
          <CCol xs="12" sm="6" md="4" lg="4" xl="2" xxl="2">
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <CDate
                  label="Ngày mua: "
                  placeholderText="Chọn ngày"
                  {...field}
                />
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
            className="text-right text-sm-left text-lg-right btn-search"
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
  //#enregion
};
