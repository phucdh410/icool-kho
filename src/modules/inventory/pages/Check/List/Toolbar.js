import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { createSelector } from "reselect";

import { CCol, CCollapse,CRow } from "@coreui/react";

import { ENTITY_GROUP_CODE, PERMISSION_VALUE } from "src/configs/constant";
import { Can } from "src/utils/ability";
import { filter } from "src/utils/funcs";

import { Magnifying } from "_assets/icons";
import { CButton, CDate,CInput, CSelect } from "_components/controls";
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
  onApproved,
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
              canEdit={selectedNo == 1}
              canRemove={selectedNo}
              canPrint={false}
            />
          </div>
          <div>
            <Can
              do={PERMISSION_VALUE.CREATE}
              on={ENTITY_GROUP_CODE.INVENTORY_SLIP}
            >
              <CButton to="/inventory-check/form" className="btn-fill">
                Tạo Phiếu Kiểm Kho
              </CButton>
            </Can>
            <Can
              do={PERMISSION_VALUE.APPROVE}
              on={ENTITY_GROUP_CODE.INVENTORY_SLIP}
            >
              <CButton
                className="btn-fill"
                disabled={!selectedNo}
                onClick={onApproved}
              >
                Xác nhận
              </CButton>
            </Can>
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
        <CRow className="mt-3 justify-content-xxl-end">
          <CCol xs="12" sm="6" md="3" lg="4" xl="3" xxl="2">
            <Controller
              name="code"
              control={control}
              defaultValue=""
              render={({ field }) => <CInput label="Số Phiếu" {...field} />}
            />
          </CCol>
          <CCol xs="12" sm="6" md="3" lg="4" xl="3" xxl="2">
            <Controller
              name="wareCode"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <CSelect
                  label="Kho"
                  options={
                    warehouses && warehouses.length > 2
                      ? [{ value: "all", label: "Tất cả" }, ...warehouses]
                      : warehouses
                  }
                  placeholder="Tất cả"
                  {...field}
                  onChange={(v) => field.onChange(v.value)}
                />
              )}
            />
          </CCol>
          <CCol xs="12" sm="6" md="3" lg="4" xl="3" xxl="2">
            <Controller
              name="approvedStatus"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <CSelect
                  label="Trạng thái"
                  options={[
                    { value: "", label: "Tất cả" },
                    { value: 0, label: "Chưa duyệt" },
                    { value: 1, label: "Đã duyệt" },
                  ]}
                  placeholder="Tất cả"
                  {...field}
                  onChange={(v) => field.onChange(v.value)}
                />
              )}
            />
          </CCol>
          <CCol xs="12" sm="6" md="3" lg="4" xl="3" xxl="2">
            <Controller
              name="startAt"
              control={control}
              render={({ field }) => <CDate label="Từ ngày" {...field} />}
            />
          </CCol>
          <CCol xs="12" sm="6" md="3" lg="4" xl="3" xxl="2">
            <Controller
              name="endAt"
              control={control}
              render={({ field }) => <CDate label="Đến ngày" {...field} />}
            />
          </CCol>
          <CCol
            xs="12"
            sm="6"
            md="5"
            lg="4"
            xl="3"
            xxl="2"
            className="btn-search"
          >
            <div className="form-group c-input">
              <div>
                <CButton
                  icon={<Magnifying />}
                  onClick={search}
                  className="mr-0"
                >
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
