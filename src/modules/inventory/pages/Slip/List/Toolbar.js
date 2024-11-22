import React from "react";
import { Controller, useForm } from "react-hook-form";
import classNames from "classnames";

import { CCol, CCollapse, CRow } from "@coreui/react";

import { history } from "src/App";
import { filter } from "src/utils/funcs";

import { Magnifying } from "_assets/icons";
import { CButton, CDate, CInput, CSelect } from "_components/controls";
import { CActionGroup } from "_components/others";

import { getAll as getAllGroup } from "../../../queries-fn/material-group.query";
import { getAll as getAllWarehouse } from "../../../queries-fn/warehouse.query";

export default ({
  isLoading,
  filter: _filter,
  status,
  selectedNo,
  toggleStatus,
  onSearch,
  onExport,
}) => {
  //#region Data
  const { control, handleSubmit } = useForm({
    defaultValues: _filter,
  });

  const { data: groups } = getAllGroup({}, isLoading);
  const { data: warehouses } = getAllWarehouse({}, isLoading);
  //#endregion

  //#region Event
  const toggleCollapse = () => toggleStatus(1);

  const search = handleSubmit(
    (d) => onSearch(filter(d)),
    (e) => noti("error", e)
  );

  const exportExcel = handleSubmit(
    (d) => onExport(filter(d)),
    (e) => noti("error", e)
  );

  const onClick = (state) => {
    switch (state) {
      case "print":
        return history.push();
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
              canEdit={false}
              canRemove={false}
              canPrint={selectedNo}
            />
          </div>
          <div>
            <CButton className="btn-fill" onClick={exportExcel}>
              Xuất File Excel
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
        <CRow className="mt-3 justify-content-xxl-end">
          <CCol xs="12" sm="6" md="3" lg="4" xl="3" xxl="2">
            <Controller
              name="groupCode"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <CSelect
                  label="Nhóm hàng"
                  options={groups}
                  optionAll
                  {...field}
                  onChange={(v) => field.onChange(v.value)}
                />
              )}
            />
          </CCol>
          <CCol xs="12" sm="6" md="3" lg="4" xl="3" xxl="2">
            <Controller
              name="code"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <CInput placeholder="Tất cả" label="Mã NVL" {...field} />
              )}
            />
          </CCol>
          <CCol xs="12" sm="6" md="3" lg="4" xl="3" xxl="2">
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <CInput placeholder="Tất cả" label="Tên NVL" {...field} />
              )}
            />
          </CCol>
          <CCol xs="12" sm="6" md="3" lg="4" xl="3" xxl="2">
            <Controller
              name="ware_code"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <CSelect
                  label="Kho"
                  options={warehouses}
                  optionAll
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
              render={({ field }) => <CDate label="Ngày" {...field} />}
            />
          </CCol>
          <CCol xs="12" sm="6" md="3" lg="4" xl="3" xxl="2">
            <Controller
              name="endAt"
              control={control}
              defaultValue=""
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
            className="text-xxl-right btn-search"
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
