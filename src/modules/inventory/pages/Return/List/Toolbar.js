import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { createSelector } from "reselect";

import { CCol, CCollapse, CRow } from "@coreui/react";

import { filter } from "src/utils/funcs";

import { Magnifying } from "_assets/icons";
import { CButton, CDate, CInput, CSelect } from "_components/controls";
import { CActionGroup } from "_components/others";

import { getAll as getAllWarehouse } from "../../../queries-fn/warehouse.query";

const selectIsLoading = createSelector(
  (state) => state.config,
  ({ isLoading }) => isLoading
);

export default ({
  filter: _filter,
  status,
  selectedNo,
  toggleStatus,
  onEdit,
  onRemove,
  onSearch,
}) => {
  //#region Data
  const isLoading = useSelector(selectIsLoading);
  const { control, handleSubmit } = useForm({
    defaultValues: _filter,
  });

  const { data: warehouses } = getAllWarehouse({}, isLoading);
  //#endregion

  //#region Event
  const toggleCollapse = () => toggleStatus(1);

  const search = handleSubmit(
    (d) => onSearch(filter(d)),
    (e) => noti("error", e)
  );

  const onClick = (state) => {
    switch (state) {
      case "edit":
        return onEdit();
      case "remove":
        return onRemove();
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
              canPrint={false}
            />
          </div>
          <div>
            <CButton className="btn-fill" to="/inventory-return/form">
              Tạo phiếu trả hàng
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
        <div className="mt-3 flex flex-row justify-between items-end">
          <div className="flex flex-row gap-3">
            <Controller
              name="code"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <CInput placeholder="Tất cả" label="Mã Phiếu" {...field} />
              )}
            />
            <Controller
              name="store_code"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <CSelect
                  className="min-w-[240px]"
                  label="Kho"
                  options={warehouses}
                  optionAll
                  placeholder="Tất cả"
                  {...field}
                  onChange={(v) => field.onChange(v.value)}
                />
              )}
            />
            <Controller
              name="start_at"
              control={control}
              render={({ field }) => <CDate label="Từ ngày" {...field} />}
            />
            <Controller
              name="end_at"
              control={control}
              render={({ field }) => <CDate label="Đến ngày" {...field} />}
            />
          </div>

          <div className="form-group c-input">
            <div>
              <CButton icon={<Magnifying />} onClick={search} className="mr-0">
                Tìm kiếm
              </CButton>
            </div>
          </div>
        </div>
      </CCollapse>
    </>
  );
};
