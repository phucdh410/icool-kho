import React from "react";
import classNames from "classnames";
import { Controller, useForm } from "react-hook-form";

import { CRow, CCol, CCollapse } from "@coreui/react";

import { CButton, CSelect, CDate, CInput } from "_components/controls";
import { CActionGroup } from "_components/others";
import { Magnifying, XCircleFill } from "_assets/icons";
import { STATUS_OPTIONS } from "src/configs/constant";

import { filter as filterFunc } from "src/utils/funcs";

export const ListToolbar = ({
  params,
  status,
  toggleStatus,
  canAdd,
  canSave,
  canRemove,
  onAdd,
  onEdit,
  onRemove,
  onSearch,
  selected,
}) => {
  //#region Data
  const { control, handleSubmit } = useForm({
    defaultValues: params,
  });
  //#endregion

  //#region Event
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

  const search = handleSubmit(
    (d) => onSearch(filterFunc(d)),
    (e) => noti("error", e)
  );

  const toggleCollapse = () => toggleStatus(1);
  //#endregion

  //#region Render
  return (
    <>
      <CRow>
        <CCol xs="12" className="action">
          <div>
            <CActionGroup
              onClick={onClick}
              canAdd={canAdd}
              canSave={canSave}
              canRemove={canRemove}
            />
          </div>
          <div>
            <CButton
              className="btn-fill"
              color="danger"
              disabled={selected.length !== 1}
              onClick={() => {}}
              icon={<XCircleFill />}
            >
              Ngưng
            </CButton>
            <CButton
              className="btn-fill"
              color="success"
              onClick={() => {}}
              icon={<i className="text-[20px] fa-regular fa-circle-plus"></i>}
            >
              Thêm Hàng Hóa
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
                <CInput label="Code:" placeholder="Tất cả" {...field} />
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
              name="start_at"
              control={control}
              render={({ field }) => <CDate label="Từ ngày: " {...field} />}
            />
          </CCol>
          <CCol xs="12" sm="6" md="4" lg="4" xl="2" xxl="2">
            <Controller
              name="end_at"
              control={control}
              render={({ field }) => <CDate label="Đến ngày: " {...field} />}
            />
          </CCol>
          <CCol xs="12" sm="6" md="4" lg="4" xl="2" xxl="2">
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <CDate label="Ngày áp dụng: " {...field} />
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
              <CButton icon={<Magnifying />} onClick={search} className="m-0">
                Tìm kiếm
              </CButton>
            </div>
          </CCol>
        </CRow>
      </CCollapse>
    </>
  );
  //#endregion
};
